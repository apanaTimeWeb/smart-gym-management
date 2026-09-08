# Manager Library — Feature Map

## Module Purpose
The Manager Library module manages the branch diet plan library. Managers can create, view,
edit, and assign diet plans to members. Diet plans contain meal schedules, calorie targets,
and nutritional guidance. Assignment links a plan to a specific member profile. Deletion
requires `useConfirm()` if the plan is assigned to active members.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Grid skeleton |
| `error.tsx` | Error boundary |
| `library_components/ManagerLibraryMain.tsx` | Root Client Component |
| `library_components/ManagerLibraryGrid.tsx` | Card grid of all diet plans |
| `library_components/ManagerLibraryPlanCard.tsx` | Single diet plan card |
| `library_components/ManagerLibraryAddModal.tsx` | Create new diet plan form |
| `library_components/ManagerLibraryEditModal.tsx` | Edit diet plan form |
| `library_components/ManagerLibraryAssignModal.tsx` | Assign plan to member |
| `library_context/LibraryProvider.tsx` | Fetch state, plan list |
| `library_types/ManagerLibraryTypes.ts` | `DietPlan`, `CreateDietPlanDto`, `AssignPlanDto` types |
| `library_api/ManagerLibraryApi.ts` | API wrappers |
| `library_utils/ManagerLibraryUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Diet Plan Grid | `/manager/library` | View all diet plans | `GET /manager/library/plans` | ✅ Live |
| Add Plan | `/manager/library` | Create new diet plan | `POST /manager/library/plans` | ✅ Live |
| Edit Plan | `/manager/library` | Update plan details | `PATCH /manager/library/plans/:id` | ✅ Live |
| Delete Plan | `/manager/library` | Remove diet plan | `DELETE /manager/library/plans/:id` | ✅ Live |
| Assign to Member | `/manager/library` | Link plan to member | `PATCH /manager/members/:id/diet` | ✅ Live |

## Data and State Architecture
- Server-state: `LibraryProvider` — plan list
- Zustand stores: `useManagerLibraryStore` — modal open/close, selected plan
- Context providers: `LibraryProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/library` → plan card grid loads
2. Manager clicks "Add Plan" → `ManagerLibraryAddModal` → submit → `POST` → grid refreshes
3. Manager clicks a plan card → `ManagerLibraryEditModal` opens with pre-filled data
4. Manager clicks "Assign" on a plan → `ManagerLibraryAssignModal` → member search → submit → `PATCH`
5. Manager deletes plan → `useConfirm()` → `DELETE` → grid refreshes

## Component Responsibility Map
- `ManagerLibraryMain` — layout + provider. MUST NOT contain form logic.
- `ManagerLibraryGrid` — renders plan cards from context. MUST NOT fetch directly.
- `ManagerLibraryAssignModal` — member search uses `SearchableDropdown` (Rule 20).

## Permissions and Security
| Action | Required Role |
|---|---|
| View / Create / Edit plans | `MANAGER` |
| Delete plan | `MANAGER` — requires `useConfirm()` |
| Assign to member | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 plan card skeletons in a grid
- **Empty:** "No diet plans yet" with "Add Plan" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Member search in assign modal** — must use `SearchableDropdown`, not a native `<select>`.
- **Delete blocked if assigned** — API returns `400` with descriptive `message` if plan has active assignments. Surface via toast from `response.message`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 20: Member search uses `SearchableDropdown`
- [x] Rule 71: Delete uses `useConfirm()` double-verification
