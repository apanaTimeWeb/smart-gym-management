# Superadmin Profile â€” Feature Map

## Module Purpose
The profile module is responsible for the Superadmin business workflow managing Profile. It enables superadmins to view, monitor, and control the lifecycle and configurations of Profile across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_api/` | Feature-owned responsibility for profile api. | `SuperadminProfileApi.ts` |
| `profile_components/` | Feature-owned responsibility for profile components. | `(directory present; no direct files)` |
| `profile_mocks/` | Feature-owned responsibility for profile mocks. | `(directory present; no direct files)` |
| `profile_tests/` | Feature-owned responsibility for profile tests. | `SuperadminProfileBasic.test.tsx` |
| `profile_types/` | Feature-owned responsibility for profile types. | `SuperadminProfileAvatarCardTypes.ts`, `SuperadminProfilePersonalFormTypes.ts`, `SuperadminProfileSecurityFormTypes.ts`, `SuperadminProfileTypes.ts` |
| `profile_utils/` | Feature-owned responsibility for profile utils. | `SuperadminProfileConstants.ts`, `SuperadminProfilePersonalFormSchema.ts`, `SuperadminProfileSecurityFormSchema.ts`, `useSuperadminProfilePage.test.tsx`, `useSuperadminProfilePage.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Profile | `/superadmin/profile` | password submit; submit; toggle2 f a | `SuperadminProfileApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/profile route to load the Profile data context securely via TanStack Query.
2. Interact with the Profile dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Profile status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `profile`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `profile_utils/useSuperadminProfilePage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'profile']`

## API Contract

- **API files:** `profile_api/SuperadminProfileApi.ts`
- **Detected API symbols:** `fetchProfile` — `profile_api/SuperadminProfileApi.ts`; `updateProfile` — `profile_api/SuperadminProfileApi.ts`; `updatePassword` — `profile_api/SuperadminProfileApi.ts`; `updateTwoFactor` — `profile_api/SuperadminProfileApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm.tsx`, `profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard.tsx`, `profile_components/SuperadminProfileMain/SuperadminProfileMain.tsx`, `profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component entry point for /superadmin/profile. |
| `profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm.tsx` | Security settings form — change password and toggle 2FA. |
| `profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard.tsx` | Displays the superadmin's avatar, name, role badge, and last login info. |
| `profile_components/SuperadminProfileMain/SuperadminProfileMain.tsx` | Root client orchestrator for the Superadmin Profile page. |
| `profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm.tsx` | Form for updating the superadmin's personal profile fields. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into profile.
- **Destructive Actions**: Any deletion or modification of profile records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for profile do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

