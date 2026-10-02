# INTEGRATION GUIDE — frontend_superadmin V14

## Package

`frontend-superadmin-v14-fix.zip`

This package is a canonical `frontend_superadmin` role container for a Next.js App Router host. The business feature implementation remains inside the supplied feature modules; the host should register only the role container and required application infrastructure.

## 1. Global Route Registration

Copy the packaged `frontend_superadmin/` directory under the host application's `src/app/` so the final layout is:

```text
src/app/
└── frontend_superadmin/
```

The package already owns framework route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) inside their canonical feature modules. Do not create a second duplicate feature tree.

For a host using explicit navigation imports, import the feature route entry by the host's canonical Next.js route structure rather than creating duplicate business components:

```tsx
// Example host composition only when the host uses a custom route registry.
import '@/app/frontend_superadmin/superadmin_dashboard/page';
```

## 2. Provider / Global State Wrapping

The package's role layout owns its role-local provider composition. The host must provide the application's canonical TanStack Query client/provider once.

If the host already has a `QueryClientProvider`, do not add a second client. Otherwise use the host's canonical provider location:

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({{ children }}: {{ children: React.ReactNode }}) {{
  return <QueryClientProvider client={{{{queryClient}}}}>
    {{{{children}}}}
  </QueryClientProvider>;
}}
```

> Host note: the placeholder provider snippet above is illustrative because the host's existing provider architecture was not supplied. The package itself does not add a new global query provider.

## 3. Path Alias / Import Resolution

The package expects the canonical alias form used throughout the architecture rules:

```ts
import { Something } from '@/app/frontend_superadmin/superadmin_members/...';
```

Avoid cross-module relative imports such as `../../...`.

## 4. Global Styling / Theme

The role layout imports its module-owned layout stylesheet from:

```text
frontend_superadmin/superadmin_layout/superadmin_layout_styles/SuperadminLayoutStyles.css
```

The host remains responsible for the global semantic token source (`globals.css` or equivalent). Do not duplicate the global token implementation inside feature modules.

## 5. Environment Variables

V14 introduces no new environment variables.

API transport continues to use the host application's existing canonical transport/base configuration.

## 6. NPM Dependencies

V14 does not introduce a new dependency.

The supplied frontend rules expect the host environment to provide its approved package set, including TanStack Query v5, React Hook Form v7, Zod, next-intl, sonner, lucide-react, and the supplied test tooling where applicable.

## 7. Verification

After integration, run the host's canonical commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npx playwright test
```

Where browser tooling is available, additionally verify responsive states at 375px, 768px, and 1280px and run the host's accessibility checks.

## 8. V14 Repair Verification Already Completed

Static source checks on the repaired package report:

- `1477` frontend role files
- `22` role feature roots
- `45` API facade files
- `26` URL config files
- `52` module locale files
- `274` frontend test files
- `27` E2E spec files
- 57 `useMutation` blocks with `onSuccess` present
- zero relative-import matches
- zero `react-hot-toast` matches
- zero `window.confirm` matches
- zero `console.log` matches
- zero `@ts-ignore` / `@ts-nocheck` matches
- zero semantic background opacity-modifier matches
- zero URL-config contract violations
- zero feature-map mandatory-section omissions
- zero E2E specs with fewer than two test blocks

Host build/runtime verification remains outside the supplied package scope.
