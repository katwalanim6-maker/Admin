# Universal Admin / Control Panel

A reusable, dependency-free control-panel UI that can be dropped into different web projects.

**Live demo:** https://katwalanim6-maker.github.io/Admin/

## What this repository is

This is **not** an attendance-management application anymore. It is a reusable UI shell for future projects.

The panel owns the common administrative experience:

- Responsive sidebar + mobile navigation
- Header, search, notifications and user area
- Configurable navigation
- Dashboard stat cards and recent activity
- Project action buttons
- Custom project-specific content slots
- Theme/accent configuration
- Browser/framework agnostic JavaScript
- No database, authentication or backend lock-in
- No third-party runtime dependencies

Your project owns its data, business logic, authentication and backend.

## Add it to any HTML project

Copy `universal-admin-panel.js` into your project and add:

```html
<script src="./universal-admin-panel.js"></script>
<div id="admin-panel"></div>
<script>
  UniversalAdminPanel.mount('#admin-panel', {
    brand: 'KITC',
    subtitle: 'Secretary Hub',
    accent: '#2563eb',
    user: { name: 'Secretary', role: 'Administrator' },
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
      { id: 'members', label: 'Members', icon: '♙' },
      { id: 'meetings', label: 'Meetings', icon: '▣' },
      { id: 'events', label: 'Events', icon: '◈' },
      { id: 'reports', label: 'Reports', icon: '◒' },
      { id: 'settings', label: 'Settings', icon: '⚙' }
    ],
    stats: [
      { label: 'Members', value: 42, note: 'Active members' },
      { label: 'Open Tasks', value: 7, note: 'Needs attention' }
    ],
    actions: [
      { label: 'Add Member', primary: true, onClick: () => openMemberForm() }
    ]
  });
</script>
```

## Custom project pages

Use the `content` renderer when the selected navigation item needs real project UI:

```js
content: ({ page, item, data }) => {
  if (page === 'members') return renderMembers(data.members);
  if (page === 'meetings') return renderMeetings(data.meetings);
  return null; // fall back to the built-in dashboard/module shell
}
```

The panel also emits `panel:navigate`, `panel:search`, `panel:action`, and `panel:notification` events.

## Custom element option

The panel is also a Web Component:

```html
<universal-admin-panel id="panel"></universal-admin-panel>
<script>
  document.querySelector('#panel').setConfig({
    brand: 'School System',
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
      { id: 'students', label: 'Students', icon: '♙' }
    ]
  });
</script>
```

## Architecture rule

Keep the reusable panel generic. Do **not** put attendance, KITC, shop, school or other project-specific business logic inside the panel core.

```text
Universal Panel
├── Shell / Layout
├── Navigation
├── Shared UI
├── Dashboard primitives
└── Events / configuration

Project
├── Business data
├── Authentication
├── API / database
├── Project modules
└── Project permissions
```

This separation lets the same panel become the admin foundation for many projects without rebuilding the UI each time.
