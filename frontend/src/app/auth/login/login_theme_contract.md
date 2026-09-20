# Login Module — Theme Portability Contract

The Login feature consumes the global Smart Gym 360 semantic theme through these Tailwind tokens:

- Surfaces: `bg-page`, `bg-sidebar`, `bg-card`, `bg-input`, `bg-danger-bg`, `bg-success-bg`, `bg-warning-bg`, `bg-info-bg`.
- Typography: `text-primary`, `text-secondary`, `text-disabled`, `text-danger`, `text-success`, `text-warning`, `text-info`, `text-on-primary`.
- Status borders: `border-danger`, `border-success`.
- Borders/focus: `border-border`, `border-focus`, `ring-primary`.
- Elevation: `shadow-card`.
- Loading: `bg-skeleton-base`, `bg-skeleton-highlight`.
- Brand: `bg-primary`, `bg-primary-hover`.

No Login component may use raw hex colors, raw RGBA values, arbitrary Tailwind values, or semantic background opacity modifiers.
