# Universal Admin / Control Panel

A reusable, dependency-free administrative UI shell designed to be embedded into many different projects.

**Live demo:** https://katwalanim6-maker.github.io/Admin/

## Core rule

The panel owns the **admin UI**, not the project's data. A host project supplies its authentication, permissions, data source and business logic through configuration and a data adapter.

The core must stay project-agnostic. Do not add KITC, attendance, school, shop or other project-specific business rules here.

## What the panel provides

- Responsive desktop sidebar and mobile navigation
- Branding, theme accent, user area, search and notifications
- Configurable navigation and dashboard statistics
- Generic resource tables
- Optional generic Create / Update / Delete UI
- Host-project data adapter for list/create/update/delete operations
- Permission-aware CRUD controls
- Custom page rendering through `content`
- Events for navigation, search, actions, data changes, errors and denied operations
- No database, authentication provider or framework dependency

## Data adapter

A host project can connect its own storage with:

```js
const adapter = {
  async list(resource) { return []; },
  async create(resource, payload) {},
  async update(resource, id, payload) {},
  async delete(resource, id) {}
};

UniversalAdminPanel.mount('#admin-panel', {
  resources: [
    {
      id: 'members',
      label: 'Members',
      singular: 'Member',
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' }
      ],
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' }
      ]
    }
  ],
  permissions: { read: true, create: true, update: true, delete: true },
  adapter
});
```

The adapter is the boundary between the reusable panel and the host project's actual records. The panel never invents a database or assumes a particular backend.

## Permissions

`permissions` controls what the UI exposes, but **real security must also be enforced by the host data layer**. A production project should reject unauthorized mutations server-side or at its protected storage boundary.

Typical modes:

- Read-only user: `read: true`, all write permissions `false`
- Admin: `read/create/update/delete: true`

A physical USB can be part of a project's authentication/device workflow, but the panel itself does not treat a USB as a security boundary.

## Custom project pages

For pages that need project-specific UI, use `content`:

```js
content: ({ page, item, data, rows, permissions, panel }) => {
  if (page === 'custom-page') return renderCustomPage(data);
  return null;
}
```

## Embedding

Copy `universal-admin-panel.js` into a host project or vendor it under that project's own assets. Then load it before the host integration code:

```html
<script src="./universal-admin-panel.js"></script>
<div id="admin-panel"></div>
```

The host project decides when the panel is shown, which user is logged in, which resources are available and which adapter is used.

## AI development instructions

Before changing this repository:

1. Read this README completely.
2. Preserve the universal, backend-agnostic architecture.
3. Keep project-specific data and business logic outside the panel core.
4. Do not remove existing public APIs without documenting the migration.
5. Validate JavaScript after changes.
6. Update this README with a brief description of **every commit/change**.
7. Keep the code and its README changelog entry in the same commit.
8. Verify the final repository state after committing.

## Architecture

```text
Universal Admin Panel
├── Shell / layout
├── Navigation
├── Shared UI
├── Generic resource UI
├── Data-adapter boundary
└── Permission-aware controls

Host Project
├── Authentication
├── Authorization
├── Database / files / API
├── Business logic
├── Project-specific pages
└── Admin panel configuration
```

## Changelog

### 2026-09-05 — Adapter + CRUD upgrade
- Added a generic host-project data adapter API.
- Added configurable resources and generic CRUD table/form UI.
- Added permission-aware create, update and delete controls.
- Expanded events and documented the integration boundary.
- Added explicit AI development rules so future contributors and AI tools can understand the repository before modifying it.
