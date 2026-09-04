-- Attendance Admin production data layer
create extension if not exists pgcrypto;

create table if not exists public.attendance_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 role text not null default 'Viewer' check (role in ('Admin','Teacher','Viewer')),
 status text not null default 'Active' check (status in ('Active','Disabled')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.attendance_teachers (
 id uuid primary key default gen_random_uuid(), full_name text not null, email text, contact text,
 assigned_classes text default '', status text not null default 'Active' check(status in ('Active','Archived')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.attendance_classes (
 id uuid primary key default gen_random_uuid(), class_name text not null, section text not null,
 teacher_id uuid references public.attendance_teachers(id) on delete set null,
 status text not null default 'Active' check(status in ('Active','Archived')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(class_name,section)
);
create table if not exists public.attendance_students (
 id uuid primary key default gen_random_uuid(), full_name text not null, roll_number text not null,
 class_id uuid references public.attendance_classes(id) on delete set null, contact text,
 status text not null default 'Active' check(status in ('Active','Archived')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.attendance_records (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.attendance_students(id) on delete restrict,
 class_id uuid references public.attendance_classes(id) on delete set null, attendance_date date not null,
 status text not null check(status in ('present','absent')),
 marked_by uuid references auth.users(id) on delete set null, corrected_at timestamptz,
 corrected_by uuid references auth.users(id) on delete set null, correction_reason text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(student_id,attendance_date)
);
create table if not exists public.attendance_activity_logs (
 id bigint generated always as identity primary key, actor_id uuid references auth.users(id) on delete set null,
 action text not null, target_type text, target_id text, target_label text, change_data jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);

create or replace function public.attendance_current_role() returns text language sql security definer stable set search_path=public as $$
 select coalesce((select role from public.attendance_profiles where id=auth.uid() and status='Active'),'') $$;
create or replace function public.attendance_has_permission(p text) returns boolean language sql security definer stable set search_path=public as $$
 select case public.attendance_current_role() when 'Admin' then true when 'Teacher' then p in ('view','create','edit','view_reports','correct_attendance') when 'Viewer' then p in ('view','view_reports') else false end $$;

alter table public.attendance_profiles enable row level security;
alter table public.attendance_teachers enable row level security;
alter table public.attendance_classes enable row level security;
alter table public.attendance_students enable row level security;
alter table public.attendance_records enable row level security;
alter table public.attendance_activity_logs enable row level security;

drop policy if exists profiles_self_or_admin on public.attendance_profiles;
create policy profiles_self_or_admin on public.attendance_profiles for select using (id=auth.uid() or public.attendance_current_role()='Admin');
drop policy if exists profiles_admin_write on public.attendance_profiles;
create policy profiles_admin_write on public.attendance_profiles for all using (public.attendance_current_role()='Admin') with check (public.attendance_current_role()='Admin');

drop policy if exists teachers_view on public.attendance_teachers;
create policy teachers_view on public.attendance_teachers for select using (public.attendance_has_permission('view'));
drop policy if exists teachers_admin_write on public.attendance_teachers;
create policy teachers_admin_write on public.attendance_teachers for all using (public.attendance_current_role()='Admin') with check (public.attendance_current_role()='Admin');

drop policy if exists classes_view on public.attendance_classes;
create policy classes_view on public.attendance_classes for select using (public.attendance_has_permission('view'));
drop policy if exists classes_admin_write on public.attendance_classes;
create policy classes_admin_write on public.attendance_classes for all using (public.attendance_current_role()='Admin') with check (public.attendance_current_role()='Admin');

drop policy if exists students_view on public.attendance_students;
create policy students_view on public.attendance_students for select using (public.attendance_has_permission('view'));
drop policy if exists students_admin_write on public.attendance_students;
create policy students_admin_write on public.attendance_students for all using (public.attendance_current_role()='Admin') with check (public.attendance_current_role()='Admin');

drop policy if exists attendance_view on public.attendance_records;
create policy attendance_view on public.attendance_records for select using (public.attendance_has_permission('view'));
drop policy if exists attendance_teacher_insert on public.attendance_records;
create policy attendance_teacher_insert on public.attendance_records for insert with check (public.attendance_has_permission('create') and marked_by=auth.uid());
drop policy if exists attendance_correct on public.attendance_records;
create policy attendance_correct on public.attendance_records for update using (public.attendance_has_permission('correct_attendance')) with check (public.attendance_has_permission('correct_attendance'));
drop policy if exists attendance_admin_delete on public.attendance_records;
create policy attendance_admin_delete on public.attendance_records for delete using (public.attendance_current_role()='Admin');

drop policy if exists logs_admin_view on public.attendance_activity_logs;
create policy logs_admin_view on public.attendance_activity_logs for select using (public.attendance_current_role()='Admin');
drop policy if exists logs_insert_authenticated on public.attendance_activity_logs;
create policy logs_insert_authenticated on public.attendance_activity_logs for insert with check (auth.uid() is not null and actor_id=auth.uid());

create index if not exists attendance_students_class_idx on public.attendance_students(class_id);
create index if not exists attendance_records_date_idx on public.attendance_records(attendance_date);
create index if not exists attendance_records_student_idx on public.attendance_records(student_id);
create index if not exists attendance_logs_created_idx on public.attendance_activity_logs(created_at desc);

-- Important: create the first Admin profile manually after creating the auth user.
-- Never put a service-role/secret key in index.html or any client-side asset.