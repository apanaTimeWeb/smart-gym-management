# Business Overview — Feature Map

## Module Purpose
This Superadmin-only feature gives platform operators a focused workspace for business overview. It exists at `/superadmin/dashboard` and is intentionally limited to platform-level tenant/SaaS operations; gym-staff daily operations are outside this boundary. The V1 layer keeps the UI backend-ready by flowing server data through its module API, Zod contract, module-owned MSW fixture/handler, and TanStack Query hook.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `dashboard/` | Owns this Superadmin route and all feature-specific artifacts. | `page.tsx`, `loading.tsx`, `error.tsx`, `SuperadminDashboardV1Client.tsx` |
| `dashboard_api/` | Calls the feature endpoint and validates the response data. | API service for `GET /api/superadmin/dashboard/business-overview` |
| `dashboard_types/` | Owns the response data contract and runtime validation. | V1 type/schema file |
| `dashboard_mocks/handlers/` | Intercepts the V1 endpoint in frontend-first development. | V1 MSW handler |
| `dashboard_mocks/fixtures/` | Owns realistic V1 server-like data. | V1 mock fixture |
| `dashboard_utils/` | Orchestrates TanStack Query for this feature. | `useSuperadminDashboardV1.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Business Overview | `/superadmin/dashboard` | Monthly income movement, existing-gym income retention, gym retention, revenue lost, customer churn, top/at-risk gym comparison, critical platform alerts. | `GET /api/superadmin/dashboard/business-overview` | ✅ V1 mocked and rendered |

## User Flows & Interactions
1. Superadmin opens `/superadmin/dashboard` and the client view requests the feature payload through `useSuperadminDashboardV1.ts`.
2. TanStack Query receives the module API response and renders the documented panels, metrics, comparisons, charts, tables, and/or alerts.
3. The module fixture supplies realistic values for the visible UI while the backend is unavailable.
4. A request failure stays inside the module and exposes a user-safe Retry action rather than a raw backend error.

## Data and State Architecture
- **Server state:** TanStack Query; no API response data is stored in Zustand or React Context.
- **UI state:** local component state only where the feature has private display state; shared UI state stays module-scoped if added later.
- **Query key:** feature hook owns a Superadmin-namespaced query key.
- **Mock ownership:** fixture and MSW handler both remain inside `dashboard/`.

## API Contract
All calls use the global transport `@/lib/api` and the feature URL config.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchDashboardBusinessOverview` | GET | `GET /api/superadmin/dashboard/business-overview` | None in V1 | Module V1 data schema |

The V1 handler returns the canonical flat `ApiResponse<T>` payload. Response data is validated at the API boundary using the module-owned Zod schema.

## UI Data Requirements
| UI Data | Source | Validation/Mock Ownership |
|---|---|---|
| `data.openingIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.newIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.growthIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.returningIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.reducedIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.lostIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.endingIncome` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.existingIncomeRetained` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.gymRetention` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.revenueLostPercent` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.customerChurn` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.alerts` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.id` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.level` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.title` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.detail` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.count` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.leaderboard` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.name` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |
| `data.plan` | GET /api/superadmin/dashboard/business-overview | Module-owned Zod contract + MSW fixture |

The consuming component is the source for the exact rendered sub-fields. V1 business values are not embedded in JSX.

## Permissions and Security
- **Required role:** `SUPERADMIN`, with backend authorization remaining authoritative.
- **Cross-role isolation:** no Admin, Manager, Trainer, or other business-role implementation is imported.
- **Financial/destructive controls:** any future mutation must use the existing Superadmin confirmation contract and authoritative backend response.
- **Sensitive data:** user-facing identifiers and long dynamic text must follow the existing Superadmin masking/truncation rules.

## Loading, Empty, and Error States
- **Loading:** route `loading.tsx` or V1 client structural skeleton mirrors the major content blocks rather than using a full-page spinner.
- **Error:** route `error.tsx` and/or V1 client retry state shows a concise user-safe explanation and Retry action.
- **Empty:** entity/list sections use the module's existing empty-state pattern where applicable.

## Edge Cases and AI Warnings
- **Do not hardcode server records in JSX:** all business data belongs to the API contract and module-owned fixture.
- **Do not import sibling business logic:** duplicate small domain contracts locally rather than creating cross-module coupling.
- **Do not bypass the module API:** UI must not read fixtures directly.
- **Keep response shape flat:** V1 handlers return `ApiResponse<T>` with the V1 data object directly under `data`.
- **Keep user-facing terms simple:** technical SaaS abbreviations should remain internal; display plain labels such as `Monthly income`, `Gym retention`, and `Income lost`.
- **Keep documentation fresh:** update this feature map when the route, endpoint, UI fields, or flow changes.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminDashboardV1Client.tsx` | Renders the Superadmin-only feature view and consumes the query state. |
| `useSuperadminDashboardV1.ts` | Owns TanStack Query orchestration and exposes server state without JSX. |

## External Infrastructure Dependencies
- `@/lib/api` — global API transport.
- `@/lib/formatters` — centralized numeric/date/currency formatting where needed.
- Existing Superadmin shared presentation primitives and authentication infrastructure.
