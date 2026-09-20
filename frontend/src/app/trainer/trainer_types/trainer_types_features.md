# trainer_types — Feature Map

## Module Purpose
`trainer_types/` contains Trainer role-level type contracts that are consumed by the Trainer shell and approved infrastructure. It does not own a user-facing business route, server state, mock data, or business workflow. The folder is limited to stable type declarations such as role-guard props and related infrastructure contracts. Business-domain types must remain inside their owning feature module.

## Directory Structure
| Folder/File | Responsibility | Key Files |
|---|---|---|
| `trainer_types/` | Stable role/infrastructure TypeScript contracts | `TrainerRoleGuardTypes.ts`, `trainer_types_url_config.ts`, documentation files |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/*` only where needed by an infrastructure contract.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Role guard type contracts | N/A | Not user-facing; provides compile-time contracts for Trainer infrastructure | `TrainerRoleGuardTypes.ts` | None | ✅ Maintained |

## User Flows & Interactions
- No user-facing flow is owned by this folder. Runtime behavior remains owned by the Trainer shell or the target feature.

## Data and State Architecture
- **State pattern:** None; this folder contains static type contracts.
- **Zustand stores:** None
- **Context providers:** None
- **Local-storage keys:** None
- **MSW handler location:** None
- **MSW fixture location:** None
- **MSW scenarios:** Not applicable because no server-data feature is owned here.

## API Contract
- No API functions are owned by this folder. API contracts remain inside feature-owned API directories.

## UI Data Requirements
- No user-facing UI is owned here.

## Permissions and Security
- **Role:** `TRAINER` contracts only; authorization is enforced by approved global/session infrastructure, not by this type-only folder.
- **Destructive actions:** None
- **Cross-role isolation:** No business-role imports.

## Loading, Empty, and Error States
- Not applicable; this folder does not render UI.

## Edge Cases and AI Warnings
- **Do not add business models here:** Domain types belong to the owning feature module.
- **Do not add API clients here:** API ownership belongs to the feature that consumes the endpoint.
- **Do not turn this folder into a role-wide business bucket:** Similar-looking business types must remain feature-local.

## Component Responsibility Map
- No React components are owned here.

## Rule Compliance Checklist
- [x] No feature mock data outside its owning module.
- [x] No business API client in this folder.
- [x] No sibling business-feature imports.
- [x] Type-only responsibility remains isolated.
