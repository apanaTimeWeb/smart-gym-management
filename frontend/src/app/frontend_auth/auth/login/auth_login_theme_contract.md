# Login Module — Theme Portability Contract

## Global semantic tokens consumed
- Surfaces: `bg-page`, `bg-sidebar`, `bg-card`, `bg-input`, `bg-skeleton-base`, `bg-skeleton-highlight`, `bg-danger-bg`, `bg-success-bg`, `bg-warning-bg`.
- Text: `text-primary`, `text-secondary`, `text-disabled`, `text-danger`, `text-success`, `text-warning`, `text-on-primary`.
- Brand: `bg-primary`, `bg-primary-hover`, `bg-primary-subtle`.
- Border/focus: `border-border`, `border-focus`, `ring-primary`.
- Elevation: `shadow-card`.

## Motion tokens consumed
- `motion-safe:transition-*`
- `motion-safe:duration-base`
- `motion-safe:active:scale-95`
- `motion-safe:group-hover:translate-x-0.5`
- `motion-safe:hover:-translate-y-1`
- `motion-safe:animate-spin`
- `motion-safe:animate-pulse`

## Typography
The module uses the global Inter/base-14 typography system. Page title/form title and body sizing follow the design-system scale and do not define feature-local font tokens.

## Rules
- No raw hex/RGBA values.
- No arbitrary CSS-variable Tailwind values.
- No semantic `/opacity` background modifiers.
- Solid primary button must pair `bg-primary` with `text-on-primary`.
- Error surfaces use `bg-danger-bg` with `text-danger`.
- Interactive motion must remain `motion-safe` guarded.
- The desktop hero is presentation-only; mobile uses a separate header component and never depends on hover.


## Applicable design patterns
- Auth page: public auth layout, explicitly outside the authenticated ERP shell.
- Form: one-column credential form with all documented input states.
- Loading: structural skeleton mirrors the login composition.
- Error: route and component error boundaries with retry.
- Loading button: stable width with spinner and accessible busy state.
- Responsive: desktop hero + form, mobile branded header + form; no hover-dependent task completion.
- Reduced motion: animation/transition utilities are motion-safe guarded.

## Not applicable to Login
- Tables, KPI cards, charts, drag/drop, Kanban, wizard, timeline, command palette, confirmation drawer, inline-edit cells, pagination/filter/search lists, payment tokens.

## Host typography mapping note
The supplied global design document defines exact typography CSS variables but does not expose the host Tailwind typography mapping in this module artifact. The Login module therefore does not invent an arbitrary `text-[22px]` class or a new global typography token. Host global theme configuration remains a runtime integration responsibility and is `NOT VERIFIED` in the module-only artifact.
