# Superadmin Gym Detail 360 — Feature Map

## Module Purpose
This is the Superadmin-only tenant detail workspace for one specific gym ID. It consolidates commercial, billing, resource-use, health, activity, and support signals into one route so a platform operator can understand one tenant without jumping across unrelated modules. The route is keyed by `/superadmin/gyms/[id]`, and every Gym 360 API request must carry that same gym ID. No other gym may reuse the selected tenant's response.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `gyms_components/` | Tenant detail presentation | `SuperadminGymDetailV1Client.tsx`, `SuperadminGymDetailClient/SuperadminGymDetailClient.tsx` |
| `gyms_api/` | Gym 360 API boundary | `superadmin_gym_detail_business_overview_api.ts` |
| `gyms_types/` | Gym 360 data/schema/page-prop contracts | `SuperadminGymDetailV1Types.ts`, `SuperadminGymDetailPageTypes.ts` |
| `gyms_utils/` | TanStack Query orchestration | `useSuperadminGymDetailV1.ts` |
| `gyms_mocks/handlers/` | Gym-ID-aware MSW handler | `SuperadminGymDetailV1MockHandlers.ts` |
| `gyms_mocks/fixtures/` | Full fixture per gym ID | `SuperadminGymDetailV1MockFixtures.ts` |

## Feature Inventory
| Feature | Route | What the Superadmin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Overview | `/superadmin/gyms/[id]` | Review the selected gym's health, recurring income, and support signals | `GET /api/superadmin/gym-detail/business-overview?gymId=:id` | Implemented; gym-ID wiring fixed |
| Subscription | `/superadmin/gyms/[id]` | Review plan, start date, next renewal, and monthly income | Same endpoint | Implemented |
| Billing | `/superadmin/gyms/[id]` | Review next payment, failed payments, discount, monthly income | Same endpoint | Implemented |
| Usage | `/superadmin/gyms/[id]` | Review members, storage, messaging, and staff usage against limits | Same endpoint | Implemented |
| Health | `/superadmin/gyms/[id]` | Review combined health, login trend, member trend, payment failures, and open tickets | Same endpoint | Implemented |
| Activity | `/superadmin/gyms/[id]` | Review recent account activity | Same endpoint | Implemented |
| Support | `/superadmin/gyms/[id]` | Review open tickets, response time, and satisfaction | Same endpoint | Implemented |

## Data and State Architecture
- Query key: `['superadmin', 'gym', 'detail-business-overview', gymId]`.
- API call: `fetchGymDetailBusinessOverview(gymId)`.
- URL builder: `SuperadminGymDetailV1UrlConfig.BACKEND_API.BY_GYM(gymId)`.
- MSW fixture lookup: exact `gymId` key; missing IDs return a not-found response.
- The route Server Component passes the same `id` to both Gym Detail clients.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchGymDetailBusinessOverview(gymId)` | GET | `/api/superadmin/gym-detail/business-overview?gymId=:gymId` | `gymId` | `SuperadminGymDetailV1Data` |

## UI Data Requirements
Every Gym 360 section is backed by `SuperadminGymDetailV1Data`: `gymId`, `gymName`, `tabs`, health score/trends/failures/tickets, usage labels/used/limit/percent, billing dates/failures/discount/income, support tickets/response/satisfaction, activity date/event, subscription plan/dates/income.

## Permissions and Security
- Required role: `SUPERADMIN`.
- The gym ID is a route identifier, not an authorization boundary. Backend authorization remains authoritative.
- No cross-role business imports.

## Loading, Empty, and Error States
- Gym detail route has `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- Gym 360 client shows a structure-matching loading skeleton.
- API errors show a safe retry state without raw server details.

## Edge Cases and AI Warnings
- **Never omit gymId:** the selected route ID must be present in the hook query key and API request.
- **Never reuse another gym fixture:** mock lookup is keyed by the requested ID.
- **Never use array index as a key:** usage and activity entries have stable derived domain keys.
- **Keep the response complete:** subscription, billing, usage, health, activity, and support fields must all remain in the schema and fixture.
- **Do not add a second endpoint contract just for the client:** the same module contract must serve mock and real backend paths.
- **Nullable fields must use `displayValue()` where applicable.**

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminGymDetailV1Client.tsx` | Renders Gym 360 tabs and the selected gym's business overview. |
| `SuperadminGymDetailClient.tsx` | Preserves the existing Superadmin gym profile/detail experience. |

## External Infrastructure Dependencies
- `@/lib/api`
- `@/lib/formatters`
- `@tanstack/react-query`
- `msw`
- Next.js App Router route infrastructure.
