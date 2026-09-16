# Superadmin Franchises — Feature Map

## Module Purpose
The Superadmin Franchises module manages franchise groups — collections of gyms that operate
under a shared brand or ownership entity. A franchise can own multiple gym tenants, share
a billing account, and receive consolidated reporting. Superadmins create franchise records,
assign gyms to franchises, and manage franchise-level billing contacts. This is a platform
organizational layer above individual gyms.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 8 row placeholders |
| `error.tsx` | Error boundary with retry |
| `franchises_components/SuperadminFranchisesClient.tsx` | Root Client Component — table + actions |
| `franchises_components/SuperadminFranchisesTable.tsx` | Paginated franchise table |
| `franchises_components/SuperadminFranchisesTableRow.tsx` | Single franchise row — name, owner, gym count, plan, status |
| `franchises_components/SuperadminFranchisesCreateModal.tsx` | Create franchise — name, owner contact, plan |
| `franchises_components/SuperadminFranchisesDetailDrawer.tsx` | Franchise detail — gym list, billing contact, stats |
| `franchises_components/SuperadminFranchisesAssignGymModal.tsx` | Assign existing gym to franchise |
| `franchises_types/SuperadminFranchisesTypes.ts` | `Franchise`, `FranchiseStatus`, `CreateFranchiseDto`, `AssignGymDto` |
| `franchises_utils/SuperadminFranchisesConstants.ts` | `FRANCHISE_STATUS_STYLES` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Franchise List | `/superadmin/franchises` | All franchise groups, paginated | `GET /superadmin/franchises?page=` | ✅ Live |
| Create Franchise | `/superadmin/franchises` | New franchise group | `POST /superadmin/franchises` | ✅ Live |
| View Franchise Detail | `/superadmin/franchises` | Franchise profile + gym list | `GET /superadmin/franchises/:id` | ✅ Live |
| Assign Gym to Franchise | `/superadmin/franchises` | Link existing gym to franchise | `PATCH /superadmin/franchises/:id/assign-gym` | ✅ Live |
| Remove Gym from Franchise | `/superadmin/franchises` | Unlink gym — gym remains active | `PATCH /superadmin/franchises/:id/remove-gym` | ✅ Live |
| Deactivate Franchise | `/superadmin/franchises` | Deactivate franchise group | `PATCH /superadmin/franchises/:id/deactivate` | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'franchises', { page }]`, `['superadmin', 'franchises', franchiseId]`
- Mutations: `useCreateFranchise`, `useAssignGym`, `useRemoveGym`, `useDeactivateFranchise`
- Zustand stores: None
- Context providers: None
- Local-state: `page` — local to `SuperadminFranchisesClient`

## User Flows
1. Superadmin opens `/superadmin/franchises` → franchise list loads
2. Superadmin clicks "Create Franchise" → `SuperadminFranchisesCreateModal` → RHF + Zod → `POST`
3. Superadmin clicks franchise row → `SuperadminFranchisesDetailDrawer` → gym list + billing contact
4. Superadmin clicks "Assign Gym" in drawer → `SuperadminFranchisesAssignGymModal` → gym search → `PATCH`
5. Superadmin clicks "Remove Gym" → `useConfirm()` → `PATCH /remove-gym`
6. Superadmin clicks "Deactivate" → `useConfirm()` with warning → `PATCH /deactivate`

## Component Responsibility Map
- `SuperadminFranchisesClient` — pagination state. MUST NOT contain form logic.
- `SuperadminFranchisesDetailDrawer` — read-only profile + gym list. Assign/Remove actions open modals.
- `SuperadminFranchisesAssignGymModal` — gym search + assign. MUST use `SearchableDropdown` for gym selection.
- `SuperadminFranchisesCreateModal` — form only. MUST use RHF + Zod.

## Permissions and Security
| Action | Required Role |
|---|---|
| View franchises | `SUPERADMIN` |
| Create franchise | `SUPERADMIN` |
| Assign/remove gym | `SUPERADMIN` |
| Deactivate franchise | `SUPERADMIN` |
| ❌ Delete franchise | Forbidden — deactivate only |
| ❌ Manage franchise internal operations | Gym-level management |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8 table row skeletons
- **Empty:** "No franchises registered" with "Create First Franchise" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Remove gym** — removing a gym from a franchise does NOT delete or suspend the gym; it only unlinks the organizational relationship. Show this clearly in the confirmation.
- **Deactivate confirmation** — MUST use `useConfirm()` with warning text about impact on member gyms.
- **FRANCHISE_STATUS_STYLES** — maps `ACTIVE | INACTIVE` to badge classes; must live in constants.
- **Gym search in assign modal** — MUST use `SearchableDropdown`; never a native `<select>`.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export type FranchiseStatus = z.infer<typeof FranchiseStatusSchema>;

export type SuperadminFranchise = z.infer<typeof SuperadminFranchiseSchema>;
```

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminFranchises*`
- [x] Rule 7: Type isolation — all types in `SuperadminFranchisesTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 20: Gym search uses `SearchableDropdown`
- [x] Rule 26: Remove + Deactivate use `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable franchise + gym IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports

---

## Edge Cases and AI Warnings

- **Delete Franchise is permanent and irreversible:** Never use `window.confirm()` for Franchise deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Franchises Table Row Clicks:** The `Franchises` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Franchises:** Do not allow a single failed API fetch in Franchises to unmount the entire page. Major components (like the Franchises data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Franchises Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Franchises.
- **No Client-Side Pagination for Franchises:** If the dataset grows large, do not fetch all Franchises and paginate on the client. always implement robust server-side pagination, sorting, and filtering via query parameters using useSuperadminUrlState.


## API Contract
All calls are isolated to `superadmin_franchises_api.ts`.

- `return apiFetch<ApiResponse<SuperadminFranchise[]>>(`${FranchisesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SuperadminFranchiseSchema) });`
- `apiFetch<ApiResponse<SuperadminFranchise>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: SuperadminFranchiseSchema }),`
- `apiFetch<ApiResponse<void>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}/suspend`, { method: 'POST',`
- `apiFetch<ApiResponse<void>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}/activate`, { method: 'POST',`
- `apiFetch<ApiResponse<SuperadminFranchise>>(`${FranchisesUrlConfig.BACKEND_API.BASE}/${id}`, {`


## State Architecture
- Server State: TanStack Query
- UI State: React `useState` or Zustand
