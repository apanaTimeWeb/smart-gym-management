# Trainer Frontend v9-fix — Integration Guide

## Artifact identity and boundaries

- **Repair artifact:** `frontend-trainer-v9-fix.zip`
- **Source:** `frontend-trainer-v8-fix.zip`
- **Source SHA-256:** `347dab4b2da1adb6db4eae7edfb51f4d2d17cf3e487f4c66332a1ebb9db203bc`
- **Target:** web frontend (`Next.js App Router` / React / TypeScript / Tailwind)
- **Not included:** host package manifest/lockfile, root `src/app` shell/providers, global auth/session implementation, backend/API server, database, CI, or executable test/runtime configuration.

This is a **repaired module bundle, not a standalone runnable Next.js application**. Do not treat the static verification report as a production build/test result.

## Canonical placement and routes

Copy the single canonical role folder to `src/app/frontend_trainer/` while preserving every relative module path. Do not create a second implementation tree.

| Public route in the supplied Trainer URL contract | Canonical feature page folder |
|---|---|
| `/trainer/dashboard` | `src/app/frontend_trainer/trainer_dashboard/page.tsx` |
| `/trainer/attendance` | `src/app/frontend_trainer/trainer_attendance/page.tsx` |
| `/trainer/earnings` | `src/app/frontend_trainer/trainer_earnings/page.tsx` |
| `/trainer/library` | `src/app/frontend_trainer/trainer_library/page.tsx` |
| `/trainer/members` | `src/app/frontend_trainer/trainer_members/page.tsx` |
| `/trainer/notifications` | `src/app/frontend_trainer/trainer_notifications/page.tsx` |
| `/trainer/profile` | `src/app/frontend_trainer/trainer_profile/page.tsx` |
| `/trainer/progress-tracking` | `src/app/frontend_trainer/trainer_progress_tracking/page.tsx` |
| `/trainer/schedule` | `src/app/frontend_trainer/trainer_schedule/page.tsx` |
| `/trainer/sessions` | `src/app/frontend_trainer/trainer_sessions/page.tsx` |
| `/trainer/workout` | `src/app/frontend_trainer/trainer_workout/page.tsx` |

The feature module remains the source of truth. Public URL registration is host routing infrastructure. If the host uses Next rewrites and the module bundle's API base points to a **separate backend origin**, an integration mapping may follow this shape in the existing `next.config.ts` (merge into the host config; do not replace other config):

```ts
import type { NextConfig } from 'next';

const trainerRouteRewrites = [
  { source: '/trainer/dashboard', destination: '/frontend_trainer/trainer_dashboard' },
  { source: '/trainer/attendance', destination: '/frontend_trainer/trainer_attendance' },
  { source: '/trainer/earnings', destination: '/frontend_trainer/trainer_earnings' },
  { source: '/trainer/library', destination: '/frontend_trainer/trainer_library' },
  { source: '/trainer/members', destination: '/frontend_trainer/trainer_members' },
  { source: '/trainer/notifications', destination: '/frontend_trainer/trainer_notifications' },
  { source: '/trainer/profile', destination: '/frontend_trainer/trainer_profile' },
  { source: '/trainer/progress-tracking', destination: '/frontend_trainer/trainer_progress_tracking' },
  { source: '/trainer/schedule', destination: '/frontend_trainer/trainer_schedule' },
  { source: '/trainer/sessions', destination: '/frontend_trainer/trainer_sessions' },
  { source: '/trainer/workout', destination: '/frontend_trainer/trainer_workout' },
];

const nextConfig: NextConfig = {
  async rewrites() {
    return trainerRouteRewrites;
  },
};

export default nextConfig;
```

**Route/API collision guard:** The feature URL registry has backend endpoint paths under `/trainer/...`. Only apply the rewrite example after confirming `NEXT_PUBLIC_API_URL` targets a distinct backend origin or otherwise proving the rewrite cannot intercept API requests. If the host uses another approved route-group/delegate arrangement, keep that mechanism and make its route entry points delegate to the canonical feature module rather than copying business implementation.

## Import aliasing

The module uses imports such as:

```ts
import TrainerAttendanceMain from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_main/TrainerAttendanceMain';
```

Ensure the host `tsconfig.json` retains the expected root alias, normally:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

The bundle's static import scan found zero unresolved internal `@/app/frontend_trainer/...` aliases. It does depend on the host aliases `@/lib/api`, `@/config/env`, `@/lib/usePermissions`, and `@/components/ThemeToggle`; their source files are not part of this ZIP, by design.

## Required global providers and infrastructure

Integrate with existing canonical providers; do not add duplicate global providers per feature:

- TanStack Query v5 `QueryClientProvider`.
- `next-intl` locale/provider setup and the host locale-merge pipeline.
- The approved theme provider / `next-themes` integration and `ThemeToggle` host component.
- Auth/session and role-permission plumbing. Frontend permission gates control UX visibility only; the server remains authoritative.
- The host `@/lib/api` transport and `apiFetch`, which must provide the API envelope/error semantics expected by the module.
- Global error monitoring/logging, socket approval/provider, and any top-loader/shell provider used by the host.

Example Query provider if (and only if) the host does not already own one:

```tsx
'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function AppQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

Do not instantiate a separate Query client for each Trainer feature. Preserve the host's configured defaults, devtools, hydration, and error boundary policies when wrapping the app.

## Environment variables

Observed module environment dependency:

```dotenv
NEXT_PUBLIC_API_URL=https://your-approved-api-origin.example
```

Replace the example with the actual approved API base URL. This must be a non-secret base URL only. **Never** put API keys, access tokens, passwords, or PII in a `NEXT_PUBLIC_*` variable. No real endpoint origin was supplied, so the example is intentionally non-operational.

## Required/approved npm dependencies

The host project's locked versions are authoritative. Compare its existing `package.json` and lockfile before installing anything; do not mix package managers or upgrade existing versions merely because this module was copied.

Runtime imports used by the supplied source include Next.js/React, `next-intl`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `react-apexcharts`, `date-fns`, `socket.io-client`, `http-status-codes`, and `sonner`. The host also provides `next-themes` if the existing global theme toggle requires it.

If and only if dependencies are missing, install the approved runtime set from the host's chosen registry/versions, then commit the updated lockfile. The unpinned command below is an inventory aid only; it is **not** a verified lockfile or a recommendation to override versions:

```bash
npm install next react react-dom next-intl @tanstack/react-query zustand react-hook-form zod @hookform/resolvers lucide-react react-apexcharts date-fns socket.io-client http-status-codes sonner
```

Test/tooling imports in the supplied source include Vitest, React Testing Library, MSW, and Playwright. Install only missing/approved tooling packages after the host has selected versions and configured scripts:

```bash
npm install -D typescript vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw @playwright/test eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-boundaries prettier husky lint-staged
```

Also verify Tailwind CSS v4/PostCSS integration and the project's approved ESLint/Prettier/Husky setup. `socket.io-client` approval and server endpoint remain `NOT_VERIFIED` from the supplied bundle alone.

## Theme and fonts

- Treat the included root `globals.css` as token/template evidence. **Merge it into the host's single canonical global stylesheet; do not blindly overwrite host styles.**
- Preserve the design-document chain: `globals.css` variables → Tailwind semantic token mappings (`@theme inline` for Tailwind v4) → semantic classes in JSX.
- Do not add raw hex values/arbitrary CSS-variable classes, semantic background opacity modifiers, or feature-specific global tokens.
- Keep `Inter` loaded via `next/font/google` in the host's canonical app layout. Do not use a Google Fonts CSS CDN import.
- Feature modules must keep their own `*_theme_contract.md`; role/theme token responsibility must not absorb business statuses or feature config.

## Verification steps after host integration

1. Confirm all aliases and expected host APIs/providers resolve, and confirm role routes are reachable without colliding with backend endpoint paths.
2. Check environment setup and auth/permission behavior using the real host session. The server must enforce protected operations independently of frontend UI visibility.
3. From the host root, run the scripts that actually exist in its `package.json` (expected gates, if configured):

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npx playwright test
npm run build
```

4. For the actual app, verify loading/empty/error/retry states, all CRUD/submit/confirm flows, route/query state changes, live API response validation, keyboard-only navigation, accessible names/current sort state, restored focus on dialog close, reduced motion, light/dark theme, 320px/768px/1280px layouts, 200% zoom, and long Hindi strings.
5. Verify all `NEXT_PUBLIC_*` variables for secrets/PII and confirm error-monitoring payloads never include sensitive data.
6. Close the backend URL-path authority and Earnings CSV export contract blockers before describing all feature flows as production-complete.

## Evidence and known blockers

- `STATIC_VERIFICATION_V9.json`: static parser/import/size/theme/locale/E2E-source checks. It reports no findings within the named static scan categories.
- `AUDIT_AND_REPAIR_REPORT_V9.md`: details the fresh source scan, module inventory, repairs, heading-level coverage matrix, historical audit count discrepancy, and blockers.
- `REPAIR_CHANGELOG_V9.md`: repair groups and what was deliberately not changed.

No TypeScript semantic typecheck, lint command, unit test, Playwright test, browser accessibility test, live API test, or production build was run. These remain `NOT_VERIFIED` until performed in the host application.
