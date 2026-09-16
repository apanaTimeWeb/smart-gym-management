# Manager Plans — Feature Map

## Module Purpose
The Manager Plans module displays branch membership plans and provides a manager-only membership operations panel. Plan records remain server-owned; membership activation, renewal, and freeze actions call dedicated APIs. Plan-change requests use a dedicated request endpoint rather than mutating plan definitions.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth/route entry |
| `loading.tsx` | Premium route skeleton |
| `error.tsx` | Typed route error boundary |
| `plans_components/ManagerPlansMain/` | View layer for plans and membership operations |
| `plans_api/ManagerPlansApi.ts` | Plan API client with Zod response validation |
| `plans_api/ManagerPlansMembershipApi.ts` | Membership action API client |
| `plans_api/ManagerPlansChangeRequestApi.ts` | Dedicated plan-change request API client |
| `plans_api/ManagerUseManagerPlansMembershipQueries.ts` | Membership overview query |
| `plans_api/ManagerUseManagerPlansMembershipMutations.ts` | Activate/renew/freeze mutations |
| `plans_types/` | Plan and membership DTO/types/schemas |
| `plans_fixtures/` | MSW-only plan and membership fixtures |

## Feature Inventory
| Feature | Route | Main API |
|---|---|---|
| Plans Grid | `/manager/plans` | `GET /manager/plans` |
| Membership Overview | `/manager/plans` | `GET /manager/plans/membership-overview` |
| Activate Membership | `/manager/plans` | `POST /manager/plans/membership-activate` |
| Renew Membership | `/manager/plans` | `POST /manager/plans/membership-renew` |
| Freeze Membership | `/manager/plans` | `POST /manager/plans/membership-freeze` |
| Request Plan Change | `/manager/plans` | `POST /manager/plans/change-requests` |

## Data and State Architecture
Server responses are owned by TanStack Query. RHF + Zod owns only transient form drafts. Membership fixtures are consumed only by module MSW handlers; no business records are embedded in JSX.

## Loading, Empty, Error States
Every independent query exposes a loading state and an inline retry/error state. Empty membership results render the Manager empty-state pattern. Mutation feedback uses the backend response `message`.

## Edge Cases / AI Warnings
- Never hardcode member names, plan names, dates, or membership records in JSX.
- Never implement a plan-change request by PATCHing the plan definition.
- Destructive/sensitive membership actions require the Manager confirmation flow before mutation.

## Rule Compliance Checklist
- [x] Module-owned data and fixtures are isolated under Manager Plans.
- [x] Membership business data is API/query driven.
- [x] Forms use RHF + Zod.
- [x] API responses are Zod validated.
- [x] No plan-definition mutation is used for change requests.
