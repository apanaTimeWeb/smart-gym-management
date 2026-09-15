# Onboarding Module — Feature Map

## Module Purpose
Tracks the full lifecycle of a new tenant from signup through email verification, onboarding checklist completion, and trial-to-paid conversion. Gives superadmins visibility and control over every tenant's onboarding health.

## Directory Structure
- `onboarding_components/` — Client UI orchestrator (`SuperadminOnboardingClient.tsx`)
- `onboarding_types/` — TypeScript types (`onboarding_types.ts`) and static constants/mock data (`onboarding_constants.ts`)
- `page.tsx` — Server component entry point
- `loading.tsx` — Structural skeleton UI
- `error.tsx` — Module-level error boundary with `reset()` retry

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|
| Onboarding table | `SuperadminOnboardingClient.tsx` | Lists all tenants with status, trial info, checklist progress | `GET /superadmin/onboarding` (future) | Superadmin |
| Expand row | `SuperadminOnboardingClient.tsx` | Shows full checklist + trial details inline | — | Superadmin |
| Mark email verified | `SuperadminOnboardingClient.tsx` | Manually marks email as verified | `PATCH /superadmin/onboarding/:id/verify` (future) | Superadmin |
| Resend welcome email | `SuperadminOnboardingClient.tsx` | Triggers welcome email resend | `POST /superadmin/onboarding/:id/resend` (future) | Superadmin |
| Extend trial | `SuperadminOnboardingClient.tsx` | Adds N days to trial — modal with hardened numeric input | `PATCH /superadmin/onboarding/:id/extend-trial` (future) | Superadmin |
| Convert to paid | `SuperadminOnboardingClient.tsx` | Converts trial to paid — double confirmation modal (Rule 71) | `POST /superadmin/onboarding/:id/convert` (future) | Superadmin |

## Data and State Architecture
- Server-state query keys: `['superadmin', 'onboarding']` (future TanStack Query)
- Zustand stores: none
- Context providers: none
- Local-storage keys: none
- MSW handler file: `src/mocks/handlers/superadmin-onboarding.handlers.ts` (future)

## API Contract
- `GET /superadmin/onboarding` → `ApiResponse<TenantOnboarding[]>`
- `PATCH /superadmin/onboarding/:id/verify` → `ApiResponse<TenantOnboarding>`
- `POST /superadmin/onboarding/:id/resend` → `ApiResponse<{ sent: boolean }>`
- `PATCH /superadmin/onboarding/:id/extend-trial` → `ApiResponse<TenantOnboarding>`
- `POST /superadmin/onboarding/:id/convert` → `ApiResponse<TenantOnboarding>`

## Permissions and Security
- All actions restricted to `SUPERADMIN` role only
- Convert to Paid is a financial action — requires double confirmation modal (Rule 71)

## Loading, Empty, Error States
- Loading: `loading.tsx` — structural skeleton (5 stat cards + table rows)
- Empty: inline "No tenants match your search" message in table body
- Error: `error.tsx` — module-specific fallback with `reset()` retry button

## Edge Cases / AI Warnings
- `key={index}` is forbidden — all list keys use stable IDs (`tenant.id`, `item.key`)
- Extend trial input uses `onKeyDown` to block `-`, `e`, `+` (Rule 65)
- Convert to Paid fires a confirmation modal before mutating state (Rule 71)
- `TRIAL_STATUS_STYLES` and `ONBOARDING_STATUS_STYLES` live in `onboarding_constants.ts` — never inline

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

Types found but could not be parsed.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — single client component, types isolated
- [x] Rule 3: Module prefix naming — `SuperadminOnboardingClient`, `onboarding_types`, `onboarding_constants`
- [x] Rule 7: Type isolation — all types in `onboarding_types.ts`
- [x] Rule 8: Server/client boundary — `page.tsx` is server component
- [x] Rule 9: Loading/error handling — `loading.tsx` skeleton + `error.tsx` with `reset()`
- [x] Rule 38: RESPONSIBILITY comment on client component
- [x] Rule 40: `forbidden.md` present
- [x] Rule 55: No `key={index}` — stable IDs used
- [x] Rule 65: Hardened numeric input on extend trial modal
- [x] Rule 71: Double confirmation for Convert to Paid (financial action)
- [x] Rule 73: `import type` used for all type-only imports
- [x] Design §5a: Gold gradient on all KPI stat cards
- [x] Design §9: `size={18} strokeWidth={2}` on all icons
- [x] Design §12/29: `motion-safe:` prefix on all transitions
- [x] Rule 3: `KPI_CARD_GRADIENT` moved to `onboarding_constants.ts`
- [x] Rule 9: `not-found.tsx` present with branded 404 + Back to Dashboard
- [x] Design §30: `bg-overlay` used for modals

---

## Edge Cases and AI Warnings

- **Delete Onboarding is permanent and irreversible:** Never use `window.confirm()` for Onboarding deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Onboarding Table Row Clicks:** The `Onboarding` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Onboarding:** Do not allow a single failed API fetch in Onboarding to unmount the entire page. Major components (like the Onboarding data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Onboarding Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Onboarding.
- **No Client-Side Pagination for Onboarding:** If the dataset grows large, do not fetch all Onboarding and paginate on the client. Always implement robust server-side pagination, sorting, and filtering via query parameters.
