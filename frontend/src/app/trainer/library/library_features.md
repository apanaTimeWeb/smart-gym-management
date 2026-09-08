# Trainer Library — Feature Map

## Module Purpose
The Trainer Library module provides access to the diet plan library for the Trainer role.
Trainers can view existing diet plans and assign them to their assigned members. Trainers
cannot create or delete global diet plans — that is a Manager responsibility. This module
is a read-and-assign interface only.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Grid skeleton |
| `error.tsx` | Error boundary |
| `library_components/TrainerLibraryMain.tsx` | Root Client Component |
| `library_components/TrainerLibraryGrid.tsx` | Card grid of available diet plans |
| `library_components/TrainerLibraryPlanCard.tsx` | Single diet plan card with Assign button |
| `library_components/TrainerLibraryAssignModal.tsx` | Assign plan to assigned member |
| `library_context/LibraryProvider.tsx` | Fetch state, plan list |
| `library_types/TrainerLibraryTypes.ts` | `DietPlan`, `AssignPlanDto` types |
| `library_api/TrainerLibraryApi.ts` | API wrappers |
| `library_utils/TrainerLibraryUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Diet Plan Grid | `/trainer/library` | View all available diet plans | `GET /trainer/library/plans` | ✅ Live |
| Assign to Member | `/trainer/library` | Link plan to assigned member | `PATCH /trainer/members/:id/diet` | ✅ Live |

## Data and State Architecture
- Server-state: `LibraryProvider` — plan list
- Zustand stores: `useTrainerLibraryStore` — modal open/close, selected plan
- Context providers: `LibraryProvider`
- Local-storage keys: None

## User Flows
1. Trainer opens `/trainer/library` → plan grid loads
2. Trainer clicks "Assign" on a plan → `TrainerLibraryAssignModal` → member search (assigned members only) → submit → `PATCH`

## Component Responsibility Map
- `TrainerLibraryMain` — layout + provider. MUST NOT contain form logic.
- `TrainerLibraryAssignModal` — member search uses `SearchableDropdown` scoped to assigned members only.

## Permissions and Security
| Action | Required Role |
|---|---|
| View diet plans | `TRAINER` |
| Assign to member | `TRAINER` |
| ❌ Create / Delete plans | Manager only — forbidden in Trainer role |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 6 plan card skeletons
- **Empty:** "No diet plans available" — contact Manager message
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Assign modal member list** — must only show members assigned to the authenticated trainer, not the full branch member list.
- **No create/delete** — never add create or delete actions to this module.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — no create/delete, assigned members only in assign modal
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modal
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 20: Member search uses `SearchableDropdown`
