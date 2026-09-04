# Attendance Management Admin Panel

https://katwalanim6-maker.github.io/Admin/

A responsive administrative dashboard for students, teachers, classes, attendance, reports, users, roles, permissions and audit logs.

## Included
- Responsive desktop sidebar + mobile drawer
- Dashboard with attendance KPIs, trend and activity
- Student and teacher lifecycle management with archive/restore
- Class/section and teacher assignment workflows
- Daily attendance with present/absent review and save
- Attendance statistics and report views
- User roles: Admin, Teacher, Viewer
- Validation, duplicate prevention, confirmations and toast feedback
- Search/filter/sort-ready management views
- Activity/audit log UI
- Local demo persistence so the UI works immediately
- Supabase PostgreSQL schema with RLS and permission functions in `supabase/schema.sql`
- GitHub Pages deployment workflow

## Demo mode
The hosted static UI currently runs with browser-local demo data. Sign in with the prefilled demo account. This is intentional: a GitHub Pages frontend must not contain a service-role or other secret credential.

For production, connect the UI to Supabase Auth/Postgres and deploy the SQL in `supabase/schema.sql`. Enforce authorization with RLS/database functions, not by hiding buttons in JavaScript.

## Security model
The repository includes server/data-layer policies for:
- authenticated profile access
- Admin-only user/profile and master-data writes
- Teacher/Viewer permission boundaries
- attendance creation/correction controls
- admin-only audit-log viewing
- authenticated audit-log insertion

Attendance corrections should always include the correcting user, timestamp and reason in the production UI/data layer.

## Deploy
The repository includes `.github/workflows/deploy-pages.yml`. Enable GitHub Pages for the repository using **GitHub Actions** as the source. The workflow publishes the repository root, including `index.html`.
