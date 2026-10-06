# INTEGRATION_GUIDE — Smart Gym 360 Manager Frontend v12-fix

## Scope
This package is the repaired `frontend_manager` role snapshot from the explicit `frontend-manager-v11-fix.zip` input and is delivered as `frontend-manager-v12-fix.zip`. It contains the 22 Manager feature modules, role shell/navigation/infrastructure, module-owned MSW fixtures/handlers, co-located tests, and 22 isolated Playwright E2E specifications. It is **not** the complete host Next.js application.

## 1. Host placement
Copy the role container into the host App Router source tree:

```text
src/app/frontend_manager/
```

Preserve the canonical feature-owned route tree. Do not create an unprefixed sibling route tree or duplicate a Manager feature outside its owning module.

## 2. Global route registration
The supplied role already owns its route boundary at:

```text
src/app/frontend_manager/layout.tsx
```

The feature pages remain inside their owning modules (`manager_<feature>/page.tsx`). Next.js App Router registration is therefore filesystem-based rather than a central route table. The canonical page wrapper pattern is:

```tsx
import ManagerMembersMain from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_main/ManagerMembersMain';

export default function ManagerMembersPage() {
  return <ManagerMembersMain />;
}
```

If the host uses route groups or rewrites, point them to these canonical paths without copying business implementation. The host routing/middleware files were not supplied, so their exact registration and authorization wiring remain `BLOCKED_BY_SUPPLIED_SCOPE`.

## 3. Required aliasing
Use the canonical `@/*` TypeScript alias for cross-module integration.

```ts
import ManagerMembersMain from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_main/ManagerMembersMain';
import { MANAGER_MEMBERS_URLS } from '@/app/frontend_manager/manager_members/manager_members_url_config';
```

Never introduce `../../` or `../` cross-boundary imports.

## 4. Provider / shell integration
The role layout composes these supplied role dependencies:

```tsx
<ManagerMswBrowserBootstrap>
  <ManagerQueryProvider>
    <ManagerConfirmProvider>
      <ManagerLayout>{children}</ManagerLayout>
    </ManagerConfirmProvider>
  </ManagerQueryProvider>
</ManagerMswBrowserBootstrap>
```

The consuming host must provide its approved application-wide infrastructure, including the global API transport (`@/lib/api`), auth/session/permission wiring, `next-intl`, theme provider/global theme stylesheet, logger/error monitoring, and production MSW mode configuration as appropriate. These host files are intentionally not fabricated in this package.

## 5. Environment variables
Manager browser configuration is centralized in `frontend_manager/manager_infrastructure/ManagerEnvConfig.ts`. The snapshot references:

```text
NEXT_PUBLIC_GYM_NAME
NEXT_PUBLIC_GYM_PHONE
NEXT_PUBLIC_GYM_GST
NEXT_PUBLIC_GYM_ADDRESS
NEXT_PUBLIC_CURRENCY_CODE
NEXT_PUBLIC_MANAGER_DEMO_MODE
NEXT_PUBLIC_API_URL (optional)
```

Do not place secrets in `NEXT_PUBLIC_*` variables.

## 6. NPM dependencies
The feature code follows the approved frontend package registry. The host must already provide the locked project dependencies rather than upgrading packages for this repair.

```bash
npm install next@15 zustand@5 @tanstack/react-query@5 react-hook-form@7 zod@3 @hookform/resolvers@3 lucide-react sonner react-apexcharts@1 date-fns@3 nextjs-toploader next-intl next-themes
```

Vitest, React Testing Library, MSW, and Playwright must exist in the host test environment according to the host lockfile.

## 7. Global theme / Tailwind
The Manager role consumes the Smart Gym 360 semantic token system. The host must supply the canonical `globals.css` and Tailwind semantic mapping. Feature JSX uses semantic classes such as `bg-card`, `text-primary`, `bg-success-bg`, `text-danger`, `border-border`, `shadow-card`, and related documented tokens.

Do not replace semantic classes with raw hex, arbitrary CSS-variable Tailwind expressions, or semantic-background opacity modifiers.

## 8. API transport and URL integration
Each feature owns exactly one URL config. Feature API calls go through the global `apiFetch` boundary and do not invent a second HTTP client. The host transport must join the module-relative endpoint paths with the configured API base exactly once.

## 9. i18n
Each business module owns its locale JSON files under its own `[moduleName]_locales/` folder. The host must provide the `next-intl` provider and the documented locale build/merge workflow. Do not create a central business-locale bucket.

## 10. MSW
Each business module owns its own fixtures and handlers. `frontend_manager/manager_mocks/` is registration/bootstrap infrastructure only. The same API client contract should be used in demo/test mode and production.

## 11. Verification
From the complete host repository, execute:

```bash
npm run i18n:merge
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright test
npm audit --audit-level=high
gitleaks detect
```

Then verify host CODEOWNERS/branch-protection/security review gates. These runtime/CI checks are `BLOCKED_BY_SUPPLIED_SCOPE` for this role-only package because the complete host repository, package manifest, lockfile, and CI configuration were not supplied.

## 12. E2E tree
The package contains 22 isolated specs under:

```text
playwright_e2e/frontend_manager_e2e/<manager_module>/<manager_module>_e2e.spec.ts
```

No cross-module E2E helpers are introduced.

## 13. Final integration condition
The role snapshot is integration-ready at the supplied source boundary when the host provides the documented application infrastructure and completes the blocked runtime/CI gates.
