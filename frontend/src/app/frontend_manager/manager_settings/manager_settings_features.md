# Manager Settings — Feature Map

## Module Purpose
Manager Settings is the branch configuration workspace. Managers can update language/timezone preferences, gym profile details, operating hours, membership rules, and notification templates. Settings are server data and form drafts are local RHF state. The module does not own authentication secrets or global environment configuration.

Module root: `frontend_manager/manager_settings/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Not exposed | No module API client uses POST in the supplied snapshot. |
| Read | Exposed | ManagerSettingsApi: fetchSettings. |
| Update | Exposed | ManagerSettingsApi |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_settings_api/` | Owns feature API clients and request/response transport contracts. | `ManagerSettingsApi.ts` |
| `manager_settings_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_settings_components/manager_settings_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSettingsMain.tsx` |
| `manager_settings_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerSettingsConstants.ts`, `ManagerSettingsConstants.ts`, `ManagerSettingsFieldLabels.test.ts`, `ManagerSettingsFieldLabels.ts`, `ManagerSettingsQueryKeys.ts` |
| `manager_settings_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerSettingsForm.test.ts`, `useManagerSettingsForm.ts`, `useManagerSettingsLogic.test.ts`, `useManagerSettingsLogic.ts`, `useManagerSettingsQuery.test.ts`, `useManagerSettingsQuery.ts` |
| `manager_settings_locales/` | Owns module English and Hindi translation catalogs. | `manager_settings_en.json`, `manager_settings_hi.json` |
| `manager_settings_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_settings_mocks/manager_settings_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSettingsMockData.ts` |
| `manager_settings_mocks/manager_settings_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerSettingsMockHandlers.ts` |
| `manager_settings_schemas/` | Owns feature Zod validation and response schemas. | `ManagerSettingsSchema.ts` |
| `manager_settings_tests/` | Owns module behavior and utility tests. | `ManagerSettingsBehavior.test.tsx` |
| `manager_settings_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerSettingsFormTypes.ts`, `ManagerSettingsTypes.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_settings_features.md`
- `manager_settings_forbidden.md`
- `manager_settings_theme_contract.md`
- `manager_settings_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `@testing-library/user-event`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchSettings | `/manager/settings` | Uses the fetchSettings workflow with typed request/response handling. | `GET /manager/settings` | ✅ Implemented |
| updateSettings | `/manager/settings` | Uses the updateSettings workflow with typed request/response handling. | `PATCH /manager/settings` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Update settings
1. Manager loads the complete ManagerAllSettings response.
2. The active settings tab edits only the relevant form fields.
3. RHF + Zod validates the draft and protects against unsaved changes.
4. updateSettings() submits the partial settings payload and the authoritative response becomes the rendered state.

## Component Tree

- Route: `manager_settings/page.tsx`
  - `<ManagerSettingsMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** No URL-backed list state was detected; this module must add URL state before introducing a searchable/filterable/paginated list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key registry:** `ManagerSettingsQueryKeys.current()` owns the settings query identity.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_settings/manager_settings_mocks/manager_settings_mocks_handlers/` and `manager_settings/manager_settings_mocks/manager_settings_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchSettings` | `GET` | `/api/v1/manager/settings` | `—` | `ManagerAllSettings` |
| `updateSettings` | `PATCH` | `/api/v1/manager/settings` | `Partial<ManagerAllSettings>` | `ManagerAllSettings` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Preferences: Language | `preferences.language` | `/api/v1/manager/settings` | `data.preferences.language` | No | Yes |
| Preferences: Timezone | `preferences.timezone` | `/api/v1/manager/settings` | `data.preferences.timezone` | No | Yes |
| Preferences: Push notifications | `preferences.pushNotificationsEnabled` | `/api/v1/manager/settings` | `data.preferences.pushNotificationsEnabled` | No | Yes |
| Preferences: Daily email reports | `preferences.emailDailyReports` | `/api/v1/manager/settings` | `data.preferences.emailDailyReports` | No | Yes |
| Gym: Name | `gymProfile.gymName` | `/api/v1/manager/settings` | `data.gymProfile.gymName` | No | Yes |
| Gym: Logo | `gymProfile.logoUrl` | `/api/v1/manager/settings` | `data.gymProfile.logoUrl` | Yes | Yes |
| Gym: Address | `gymProfile.address` | `/api/v1/manager/settings` | `data.gymProfile.address` | No | Yes |
| Gym: City | `gymProfile.city` | `/api/v1/manager/settings` | `data.gymProfile.city` | No | Yes |
| Gym: State | `gymProfile.state` | `/api/v1/manager/settings` | `data.gymProfile.state` | No | Yes |
| Gym: Pincode | `gymProfile.pincode` | `/api/v1/manager/settings` | `data.gymProfile.pincode` | No | Yes |
| Hours: Day | `operatingHours[].day` | `/api/v1/manager/settings` | `data.operatingHours[].day` | No | Yes |
| Hours: Open | `operatingHours[].openTime` | `/api/v1/manager/settings` | `data.operatingHours[].openTime` | No | Yes |
| Hours: Close | `operatingHours[].closeTime` | `/api/v1/manager/settings` | `data.operatingHours[].closeTime` | No | Yes |
| Membership: Grace period | `membershipSettings.gracePeriodDays` | `/api/v1/manager/settings` | `data.membershipSettings.gracePeriodDays` | No | Yes |
| Membership: Freeze days | `membershipSettings.maxFreezeDaysPerYear` | `/api/v1/manager/settings` | `data.membershipSettings.maxFreezeDaysPerYear` | No | Yes |
| Template: Body | `notificationTemplates[].body` | `/api/v1/manager/settings` | `data.notificationTemplates[].body` | No | Yes |
| Template: Subject | `notificationTemplates[].subject` | `/api/v1/manager/settings` | `data.notificationTemplates[].subject` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_settings_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Settings updates must use the single module endpoint and reconcile the returned full settings object:** Settings updates must use the single module endpoint and reconcile the returned full settings object.
- **Do not move public/private environment configuration into the settings form:** Do not move public/private environment configuration into the settings form.
- **Notification template variables should remain backend-defined values, not arbitrary client strings:** Notification template variables should remain backend-defined values, not arbitrary client strings.
- **Unsaved settings changes must be guarded before in-app navigation:** Unsaved settings changes must be guarded before in-app navigation.
- **Gym profile logo URL is optional and must have explicit empty-state handling:** Gym profile logo URL is optional and must have explicit empty-state handling.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_settings/manager_settings_components/manager_settings_main/ManagerSettingsMain.tsx` | Renders the editable Manager Settings tabs using an RHF draft backed by Manager Settings API data. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_SETTINGS`
- Active locales: `en`, `hi`
- English catalog: `manager_settings/manager_settings_locales/manager_settings_en.json`
- Hindi catalog: `manager_settings/manager_settings_locales/manager_settings_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerSettingsMain.tsx`
- Primary query-key registry: `ManagerSettingsQueryKeys.ts`
- Primary module constants registry: `ManagerSettingsConstants.ts`
- Canonical schema file: `ManagerSettingsSchema.ts` in `manager_settings_schemas/`
- Module theme contract: `manager_settings_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_settings_components/manager_settings_main/ManagerSettingsMain.tsx` | YES |
| API client | `ManagerSettingsApi.ts` | YES |
| Schema file | `ManagerSettingsSchema.ts` | YES |
| Query-key registry | `ManagerSettingsQueryKeys.ts` | YES |
| Constants registry | `ManagerSettingsConstants.ts` | YES |
| URL config | `manager_settings_url_config.ts` | YES |
| Behavior test | `ManagerSettingsBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_settings_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_settings/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_settings/manager_settings_mocks/manager_settings_mocks_fixtures/` and `manager_settings/manager_settings_mocks/manager_settings_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
