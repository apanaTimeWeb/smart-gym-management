# Auth Login Theme Contract — v9-fix

## Required Global Tokens
- `bg-page`, `bg-card`, `bg-input`, `bg-sidebar`
- `bg-success`, `bg-success-bg`, `text-success`
- `bg-warning-bg`, `text-warning`
- `bg-danger-bg`, `text-danger`
- `text-primary`, `text-secondary`, `text-disabled`, `text-on-primary`
- `border-border`, `border-focus`, `ring-primary`
- `shadow-card`
- `bg-skeleton-base`, `bg-skeleton-highlight`

## Geometry / Typography
- Host `font-sans` must resolve to Inter.
- Base body typography targets 14px.
- Interactive controls use at least 44px target sizing where practical.
- Login desktop split layout begins at `xl:` (>=1280px); mobile/tablet remain single-column.

## Component Rules
- No raw theme colors, arbitrary Tailwind values, inline styles, or semantic-background opacity modifiers in Login production JSX.
- Interactive motion is guarded with `motion-safe:`.
- Loading/error surfaces use semantic tokens.
- Password visibility uses Lucide `Eye`/`EyeOff` at 18px with `strokeWidth={2}`.
- Focus-visible states use semantic ring tokens.

## Host Verification Boundary
Global Tailwind token mapping, global CSS values, ThemeProvider, and the host `ThemeToggle` implementation are outside the supplied module artifact and remain **NOT VERIFIED** until checked in the host application.
