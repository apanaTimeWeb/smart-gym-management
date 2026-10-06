# Integration Guide — Admin Frontend v18 Fix

## Artifact
- Baseline: `frontend-admin-v17-fix(1).zip`
- Delivery: `frontend-admin-v18-fix.zip`
- Scope: `frontend_admin/` role container + isolated Playwright suites + required documentation/tooling.

## 1. Host Route Registration
Mount the supplied role tree at the host's canonical `src/app/frontend_admin/` alias location. Keep the supplied framework-reserved route files as the single canonical route owners; do not create a duplicate `/admin/*` business tree.

Example host composition:
```tsx
import AdminLayout from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayout';
import AdminBranchesHeaderSelector from '@/app/frontend_admin/admin_branches/admin_branches_components/admin_branches_header_selector/AdminBranchesHeaderSelector';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout headerContextSlot={<AdminBranchesHeaderSelector />}>
      {children}
    </AdminLayout>
  );
}
```

The shell intentionally does not import the business branch module. The host composes the zero-business shell slot with the feature selector.

## 2. Query Provider
Provide the host application's canonical TanStack Query v5 client above the role tree. Do not create a second QueryClient cache boundary solely for this role.

## 3. Global State / Providers
Use the host's existing application/session/theme providers. Module-owned Zustand stores remain inside their feature modules. No extra global business provider should be introduced.

## 4. Environment / Transport
The supplied role expects the host's existing global transport/base URL/auth/session infrastructure. No new base URL was invented. Any real API base URL, authentication headers, WebSocket transport, or persistence utility must be supplied by the host.

## 5. Styling / Theme
The host must expose the semantic theme variables and Tailwind token mappings defined by the supplied global design-system contract. Feature modules consume semantic classes such as `bg-page`, `bg-card`, `bg-primary`, `text-primary`, `bg-success-bg`, `text-success`, `border-border`, and `ring-primary`; do not replace these with raw colors.

## 6. Dependencies
The role package uses the dependencies already reflected in its imports (Next.js App Router, next-intl, TanStack Query, Zustand, Zod, React Hook Form, MSW, lucide-react, and the host test/browser toolchain). Exact installation versions are host-owned and were not invented because `package.json` is outside the supplied scope.

## 7. Data Export
`admin_data_export` remains `BLOCKED_BY_SUPPLIED_SCOPE` until the authoritative endpoint/request/response contract is supplied. Do not invent an endpoint.

## 8. Verification Steps
1. Run host TypeScript typecheck.
2. Run host lint.
3. Run the 166 module unit/component tests.
4. Run the 23 `playwright_E2E/frontend_admin_e2e/` suites with authenticated state.
5. Exercise desktop/tablet/mobile viewports including the narrow 320px case.
6. Verify keyboard-only navigation, focus visibility, dialog focus trap, screen-reader labeling, reduced-motion, and touch alternatives.
7. Verify WebSocket reconnect/focus/visibility recovery and the host persistence adapter.
8. Verify export/blob transport behavior once the host transport contract is available.
