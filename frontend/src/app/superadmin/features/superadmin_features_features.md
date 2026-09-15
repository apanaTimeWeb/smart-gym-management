# Superadmin Features — Feature Map

## Module Purpose
The Superadmin Features module is the platform-level feature flag control panel. Superadmins
enable or disable specific product features per SaaS plan tier or per individual tenant
(overrides). This controls which modules appear in a tenant's sidebar, which API endpoints
are accessible, and which UI sections are rendered. Feature flags are the enforcement
mechanism for plan-based feature gating across the entire platform.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Feature flag table skeleton |
| `error.tsx` | Error boundary with retry |
| `features_components/SuperadminFeaturesClient.tsx` | Root Client Component — tabs (By Plan / By Tenant) |
| `features_components/SuperadminFeaturesByPlanTab.tsx` | Matrix table — plans as columns, features as rows |
| `features_components/SuperadminFeaturesByTenantTab.tsx` | Per-tenant override table |
| `features_components/SuperadminFeaturesToggle.tsx` | Single toggle cell — enabled/disabled with optimistic update |
| `features_components/SuperadminFeaturesTenantOverrideModal.tsx` | Add/edit per-tenant feature override |
| `features_components/SuperadminFeaturesSearchBar.tsx` | Search features by name |
| `features_types/SuperadminFeaturesTypes.ts` | `FeatureFlag`, `PlanFeatureMatrix`, `TenantOverride`, `ToggleFeatureDto` |
| `features_utils/SuperadminFeaturesConstants.ts` | `FEATURE_CATEGORY_LABELS`, `FEATURE_LIST` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Plan Feature Matrix | `/superadmin/features` | Toggle features per plan tier | `GET /superadmin/features/matrix` | ✅ Live |
| Toggle Plan Feature | `/superadmin/features` | Enable/disable feature for a plan | `PATCH /superadmin/features/plan/:planId/feature/:featureKey` | ✅ Live |
| Tenant Overrides List | `/superadmin/features` | Per-tenant feature overrides | `GET /superadmin/features/overrides` | ✅ Live |
| Add Tenant Override | `/superadmin/features` | Override feature for specific tenant | `POST /superadmin/features/overrides` | ✅ Live |
| Remove Tenant Override | `/superadmin/features` | Remove override — revert to plan default | `DELETE /superadmin/features/overrides/:id` | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'features', 'matrix']`, `['superadmin', 'features', 'overrides']`
- Mutations: `useTogglePlanFeature`, `useAddTenantOverride`, `useRemoveTenantOverride`
- Zustand stores: None
- Context providers: None
- Local-state: `activeTab`, `searchQuery` — local to `SuperadminFeaturesClient`

## User Flows
1. Superadmin opens `/superadmin/features` → "By Plan" tab loads matrix
2. Superadmin clicks toggle cell → optimistic update → `PATCH` → revert on error
3. Superadmin switches to "By Tenant" tab → overrides list loads
4. Superadmin clicks "Add Override" → `SuperadminFeaturesTenantOverrideModal` → tenant + feature + enabled → `POST`
5. Superadmin clicks "Remove Override" → `useConfirm()` → `DELETE`

## Component Responsibility Map
- `SuperadminFeaturesClient` — tab state + search state. MUST NOT contain toggle logic.
- `SuperadminFeaturesByPlanTab` — matrix display. MUST NOT manage tab state.
- `SuperadminFeaturesToggle` — single toggle with optimistic update. MUST revert on API error.
- `SuperadminFeaturesTenantOverrideModal` — form only. MUST use RHF + Zod.

## Permissions and Security
| Action | Required Role |
|---|---|
| View feature matrix | `SUPERADMIN` |
| Toggle plan features | `SUPERADMIN` |
| Add tenant override | `SUPERADMIN` |
| Remove tenant override | `SUPERADMIN` |
| ❌ Tenant self-managing features | Forbidden — superadmin only |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — matrix table skeleton (features × plans grid)
- **Empty overrides:** "No tenant overrides — all tenants follow plan defaults"
- **Error:** `error.tsx` with retry; toggle errors show inline toast

## Edge Cases / AI Warnings
- **Optimistic toggle** — `SuperadminFeaturesToggle` must optimistically flip the toggle and revert if the `PATCH` fails. Never wait for API before updating UI.
- **FEATURE_LIST** — the canonical list of all feature keys must live in `SuperadminFeaturesConstants.ts`; never hardcode feature keys in components.
- **Override vs plan default** — tenant override takes precedence over plan default; UI must visually distinguish overridden cells.
- **Remove override confirmation** — MUST use `useConfirm()` before `DELETE`.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export type FeatureFlag = z.infer<typeof FeatureFlagSchema>;

export type ReleaseNote = z.infer<typeof ReleaseNoteSchema>;

export type SuperadminFeaturesTenant = z.infer<typeof SuperadminFeaturesTenantSchema>;
```

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminFeatures*`
- [x] Rule 7: Type isolation — all types in `SuperadminFeaturesTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 26: Remove override uses `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable feature keys + override IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports

---

## Edge Cases and AI Warnings

- **Delete Feature is permanent and irreversible:** Never use `window.confirm()` for Feature deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Features Table Row Clicks:** The `Features` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Features:** Do not allow a single failed API fetch in Features to unmount the entire page. Major components (like the Features data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Features Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Features.
- **No Client-Side Pagination for Features:** If the dataset grows large, do not fetch all Features and paginate on the client. always implement robust server-side pagination, sorting, and filtering via query parameters using useSuperadminUrlState.
