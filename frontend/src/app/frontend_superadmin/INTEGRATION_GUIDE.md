# Superadmin Frontend Module Integration Guide

## 1. Route integration
This package uses Next.js App Router feature-owned route files. Do **not** create a second route tree and do **not** duplicate business implementations.

Copy the package role directory to the host frontend:

```text
src/app/frontend_superadmin/
```

The supplied feature folders own their `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` files. Because routing is physically owned by the feature modules, no additional React Router `<Route>` registration or parallel route facade should be added.

The role shell can remain the host composition boundary:

```tsx
// src/app/frontend_superadmin/layout.tsx
import SuperadminLayout from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/superadmin_layout_shell/SuperadminLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SuperadminLayout>{children}</SuperadminLayout>;
}
```

## 2. Import alias requirement
Use the host project's `@/` TypeScript alias. Cross-module integration must not use `../../` relative paths.

Example:

```ts
import SuperadminGymsMain from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/SuperadminGymsMain';
```

## 3. Providers / global infrastructure
The module expects the host application to provide the project's existing:

- TanStack Query provider.
- `next-intl` locale/messages integration.
- authenticated session infrastructure.
- global API transport (`@/lib/api`).
- approved global logging/monitoring infrastructure.
- approved zero-business UI primitives.

Do not introduce feature business state into a global provider.

## 4. Environment variable
The supplied source references:

```env
NEXT_PUBLIC_SUPERADMIN_WS_URL=...
```

Set this in the host application's environment when the Superadmin realtime infrastructure is enabled.

## 5. Approved packages
The host should already satisfy the approved frontend package registry. Relevant packages evidenced by the module include:

```bash
npm install next@15 zustand@5 @tanstack/react-query@5 react-hook-form@7 zod@3 @hookform/resolvers@3 next-intl lucide-react msw sonner http-status-codes
```

Only install packages actually missing from the host project. Do not add unapproved alternatives.

## 6. Styling / theme
The host application's canonical `globals.css` / theme implementation must expose the semantic design tokens consumed by the module. The feature theme contracts document the exact dependencies for each module.

Do not replace semantic classes with hardcoded colors or arbitrary Tailwind values.

## 7. Verification in the host app
After integration:

1. Run the host dependency install and lockfile validation.
2. Run the host TypeScript check and lint.
3. Run the module/unit test suite with the host's configured test runner.
4. Start the application and exercise every Superadmin route.
5. Verify loading, empty, error, retry, mutation-success and mutation-error states.
6. Verify mutation idempotency and cache reconciliation.
7. Run the available Playwright/browser suite.
8. Verify responsive behavior at desktop, tablet and approximately 320px mobile width.
9. Verify keyboard focus, Escape handling, dialog focus restoration and reduced-motion behavior.
10. Verify the deployed API/WebSocket environment values.
