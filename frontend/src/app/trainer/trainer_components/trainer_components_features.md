# trainer_components — Feature Map

## Module Purpose
`trainer_components/` is the Trainer role's zero-business UI/infrastructure layer. It provides shell presentation, generic feedback/confirmation infrastructure, pagination, search dropdown primitives, and generic stat/table UI primitives. It must not own Trainer business data, domain rules, API calls, or feature-specific mock handlers. Business-aware UI remains inside the owning feature module.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `TrainerFeedback/` | Generic Trainer feedback/confirmation/error presentation | `TrainerConfirmModal.tsx`, `TrainerConfirmProvider.tsx`, `TrainerToastHost.tsx`, `TrainerRouteErrorFallback.tsx`, `useTrainerFeedback.ts` |
| `TrainerLayout/` | Trainer shell header/layout/sidebar presentation | `TrainerLayout.tsx`, `TrainerHeader.tsx`, `TrainerSidebar.tsx` |
| `TrainerRoleGuard/` | Role-access presentation/guard wrapper | `TrainerRoleGuard.tsx` |
| `TrainerShared/` | Zero-business UI primitives used by multiple Trainer features | `TrainerPagination.tsx`, `TrainerSearchableDropdown.tsx`, `TrainerStatCard.tsx`, `TrainerTableSkeleton.tsx` |
| `trainer_components_types/` | Component prop/type contracts for this infrastructure | `TrainerPaginationProps.ts`, `TrainerRouteErrorFallbackProps.ts`, `TrainerSearchableDropdownProps.ts`, `TrainerSearchableDropdownOption.ts`, `TrainerStatCardProps.ts`, `TrainerStatCardTypes.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/*` approved infrastructure.
- Framework and third-party UI packages.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Trainer shell | `/trainer/*` | Navigate Trainer routes and access shell-level UI | `TrainerLayout`, `TrainerHeader`, `TrainerSidebar` | None owned here | ✅ Maintained |
| Confirmation/feedback infrastructure | `/trainer/*` | Confirm critical actions and receive feedback | `TrainerConfirmProvider`, `TrainerConfirmModal`, `TrainerToastHost` | None owned here | ✅ Maintained |
| Shared data-display primitives | `/trainer/*` | Use pagination, search dropdowns, stat cards, table skeletons | `TrainerPagination`, `TrainerSearchableDropdown`, `TrainerStatCard`, `TrainerTableSkeleton` | None owned here | ✅ Maintained |

## User Flows & Interactions
1. Trainer opens a protected route → `TrainerLayout` renders the shell → `TrainerSidebar` provides navigation.
2. A feature requests confirmation → `TrainerConfirmProvider` presents the standard dialog → the feature decides whether to mutate.
3. A shared primitive receives feature-owned props → it renders only presentation/interaction semantics and does not fetch business data.

## Data and State Architecture
- **State pattern:** No server-state ownership; this folder provides presentation/infrastructure only.
- **Zustand stores:** None
- **Context providers:** `TrainerConfirmProvider.tsx` owns confirmation-dialog UI state only.
- **Local-storage keys:** None
- **MSW handler/fixture:** None

## API Contract
- No feature API functions are owned here.

## UI Data Requirements
- Props received by these components must remain generic and business-agnostic.

## Permissions and Security
- `TrainerRoleGuard` is a presentation/infrastructure wrapper; actual capability definitions come from approved auth/session infrastructure.
- Critical actions use `TrainerConfirmProvider`; security-sensitive module rules remain owned by the calling feature.

## Loading, Empty, and Error States
- `TrainerTableSkeleton.tsx` provides table-shaped loading presentation.
- `TrainerRouteErrorFallback.tsx` provides role-shell-compatible safe error presentation.
- Entity-specific empty states remain feature-owned.

## Edge Cases and AI Warnings
- **Never add business API calls here:** this folder is zero-business UI/infrastructure.
- **Never add member/plan/payment-specific labels or status registries here.**
- **Preserve focus management:** confirmation and dropdown infrastructure must remain keyboard-accessible.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerLayout.tsx` | Renders the Trainer application shell. |
| `TrainerHeader.tsx` | Renders global Trainer header controls. |
| `TrainerSidebar.tsx` | Renders role-owned navigation presentation. |
| `TrainerConfirmProvider.tsx` | Owns generic confirmation dialog state and API. |
| `TrainerConfirmModal.tsx` | Renders the generic confirmation dialog. |
| `TrainerToastHost.tsx` | Renders global Trainer toast notifications. |
| `TrainerPagination.tsx` | Renders generic pagination controls from explicit props. |
| `TrainerSearchableDropdown.tsx` | Renders generic searchable option selection. |
| `TrainerStatCard.tsx` | Renders generic metric presentation. |
| `TrainerTableSkeleton.tsx` | Renders generic table loading skeletons. |

## Rule Compliance Checklist
- [x] Zero business feature data in shared UI.
- [x] No sibling feature imports.
- [x] Generic infrastructure ownership documented.
- [x] Component responsibility map reflects actual files.
