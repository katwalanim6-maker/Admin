# Universal Admin / Control Panel

A reusable, dependency-free administrative UI shell designed to be embedded into different projects.

**Live demo:** https://katwalanim6-maker.github.io/Admin/

## Core rule

The panel owns the admin UI, not the project's data. A host project supplies authentication, permissions, data source and business logic through configuration and a data adapter.

The core must stay project-agnostic. Do not add project-specific business rules here.

## What the panel provides

- Responsive desktop sidebar and mobile navigation
- Branding, theme accent, user area, search and notifications
- Configurable navigation
- Generic resource tables
- Optional generic Create / Update / Delete UI
- Host-project data adapter for list/create/update/delete operations
- Permission-aware CRUD controls
- Custom page rendering through `content`
- Events for navigation, search, actions, data changes, errors and denied operations
- No database, authentication provider or framework dependency

## Design standards

The public demonstration intentionally avoids common template-like patterns. Do not add purple gradients, pill-shaped buttons, fabricated reviews, fabricated metrics, vague marketing claims, emoji UI icons, cursor effects, excessive scroll animations, AI-generated photography or fabricated customer counters.

Do not present sample data as real operational data. Prefer clear labels, restrained motion, conventional controls and specific product copy.

## Data adapter

A host project can connect its own storage with:

```js
const adapter = {
  async list(resource) { return []; },
  async create(resource, payload) {},
  async update(resource, id, payload) {},
  async delete(resource, id) {}
};
```

The adapter is the boundary between the reusable panel and the host project's actual records. The panel never invents a database or assumes a particular backend.

## Permissions

`permissions` controls what the UI exposes, but real security must also be enforced by the host data layer. A production project should reject unauthorized mutations at its protected storage boundary.

## Legal pages

The public demonstration includes `privacy.html` and `terms.html`. These pages describe the demonstration and clarify that an integrating project is responsible for its own data practices and legal requirements.

## AI development instructions

Before changing this repository:

1. Read this README completely.
2. Preserve the universal, backend-agnostic architecture.
3. Keep project-specific data and business logic outside the panel core.
4. Do not remove existing public APIs without documenting the migration.
5. Validate JavaScript after changes.
6. Update this README with a brief description of every commit/change.
7. Keep the code and its README changelog entry in the same commit.
8. Verify the final repository state after committing.
9. Recheck the visual implementation against the design standards above.

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

### 2026-09-05 — Public demo cleanup
- Reworked the demo host page around a restrained neutral interface.
- Removed fabricated dashboard metrics and activity from the public demo.
- Removed pill-style demo labeling and purple accent usage.
- Added a favicon.
- Added Privacy Policy and Terms and Conditions pages.
- Added explicit visual and content standards for future changes.
