# Plan Comparison & Pricing Control — Feature Map

## Module Purpose
This Superadmin-only feature gives platform operators a focused workspace for plan comparison & pricing control. It exists at `/superadmin/plans` and is intentionally limited to platform-level tenant/SaaS operations; gym-staff daily operations are outside this boundary. The V1 layer keeps the UI backend-ready by flowing server data through its module API, Zod contract, module-owned MSW fixture/handler, and TanStack Query hook.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `plans/` | Owns this Superadmin route and all feature-specific artifacts. | `page.tsx`, `loading.tsx`, `error.tsx`, `SuperadminPlansV1Client.tsx` |
| `plans_api/` | Calls the feature endpoint and validates the response data. | API service for `GET /api/superadmin/plans/business-controls` |
| `plans_types/` | Owns the response data contract and runtime validation. | V1 type/schema file |
| `plans_mocks/handlers/` | Intercepts the V1 endpoint in frontend-first development. | V1 MSW handler |
| `plans_mocks/fixtures/` | Owns realistic V1 server-like data. | V1 mock fixture |
| `plans_utils/` | Orchestrates TanStack Query for this feature. | `useSuperadminPlansV1.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Plan Comparison & Pricing Control | `/superadmin/plans` | plan comparison, price history, add-ons, plan move preview. | `GET /api/superadmin/plans/business-controls` | ✅ V1 mocked and rendered |

## User Flows & Interactions
1. Superadmin opens `/superadmin/plans` and the client view requests the feature payload through `useSuperadminPlansV1.ts`.
2. TanStack Query receives the module API response and renders the documented panels, metrics, comparisons, charts, tables, and/or alerts.
3. The module fixture supplies realistic values for the visible UI while the backend is unavailable.
4. A request failure stays inside the module and exposes a user-safe Retry action rather than a raw backend error.

## Data and State Architecture
- **Server state:** TanStack Query; no API response data is stored in Zustand or React Context.
- **UI state:** local component state only where the feature has private display state; shared UI state stays module-scoped if added later.
- **Query key:** feature hook owns a Superadmin-namespaced query key.
- **Mock ownership:** fixture and MSW handler both remain inside `plans/`.

## API Contract
All calls use the global transport `@/lib/api` and the feature URL config.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPlansBusinessControls` | GET | `GET /api/superadmin/plans/business-controls` | None in V1 | Module V1 data schema |

The V1 handler returns the canonical flat `ApiResponse<T>` payload. Response data is validated at the API boundary using the module-owned Zod schema.

## UI Data Requirements
| UI Data | Source | Validation/Mock Ownership |
|---|---|---|
| `data.plans` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.name` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.monthly` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.members` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.storage` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.branches` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.versions` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.plan` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.version` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.effective` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.change` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.addons` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.price` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.migration` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.from` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.to` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.tenants` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.monthlyChange` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.limitConflicts` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |
| `data.message` | GET /api/superadmin/plans/business-controls | Module-owned Zod contract + MSW fixture |

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
| `SuperadminPlansV1Client.tsx` | Renders the Superadmin-only feature view and consumes the query state. |
| `useSuperadminPlansV1.ts` | Owns TanStack Query orchestration and exposes server state without JSX. |

## External Infrastructure Dependencies
- `@/lib/api` — global API transport.
- `@/lib/formatters` — centralized numeric/date/currency formatting where needed.
- Existing Superadmin shared presentation primitives and authentication infrastructure.
