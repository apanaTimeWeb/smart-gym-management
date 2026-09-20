# trainer/trainer_components — Feature Map

## Module Purpose
[REQUIRED: 3–6 sentences. Must answer: (1) What business problem does this module solve? (2) Who uses it? (3) What are the 3–5 most important things a user can DO? (4) What is strictly OFF-LIMITS? Fill this out accurately.]

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `trainer_components_components/` | Renders UI components | TBD |
| `trainer_components_api/` | API endpoints | `trainer_components_url_config.ts` |

### Approved External Dependencies
### Application Infrastructure
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Example | /trainer/trainer_components | Manage entity | Main.tsx | GET /... | 🚧 TBD |

## User Flows & Interactions
### Flow 1: [Name]
1. TBD

## Data and State Architecture
- **State pattern:** TanStack Query for server state + Zustand for UI state.
- **Zustand stores:** [List actual store files]
- **Context providers:** [List actual provider files]
- **MSW handler location:** [module-owned handler]

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| TBD | GET | /... | — | `any` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| TBD | TBD | GET /... | data... | No | Yes |

## Permissions and Security
- **Required role:** `TRAINER`
- **Destructive actions:** TBD
- **Cross-role isolation:** Zero imports from other roles.

## Loading, Empty, and Error States
| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` | `trainer_componentsEmptyState.tsx` | `error.tsx` |

## Edge Cases and AI Warnings
- **[Specific Warning]:** [Explanation]

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| TBD | TBD |

## Rule Compliance Checklist
- [ ] Rule 1: Micro-modularization
- [ ] Rule 2: Total Role Isolation
- [ ] Module Self-Containment
- [ ] Feature Dependency Firewall
