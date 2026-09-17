# Tenant Offboarding — Feature Map

## Module Purpose
This Superadmin-only module manages the platform side of a gym tenant leaving Smart Gym 360. It exists to prevent uncontrolled deletion by making export, grace-period, approval, backup, and purge stages visible before data is removed. A Superadmin can review the offboarding queue, inspect lifecycle dates, and review the safety policy that protects tenant data. It does not manage day-to-day gym cancellations; it governs the platform's data lifecycle after cancellation.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `offboarding_components/` | Queue, lifecycle policy, and safety sections | `SuperadminOffboardingClient.tsx`, `SuperadminOffboardingPageHeader.tsx`, `SuperadminOffboardingSummaryCards.tsx`, `SuperadminOffboardingQueuePanel.tsx`, `SuperadminOffboardingPolicyAndSafetyPanel.tsx` |
| `offboarding_api/` | API boundary | `superadmin_offboarding_api.ts` |
| `offboarding_types/` | Zod contract and types | `SuperadminOffboardingTypes.ts` |
| `offboarding_mocks/fixtures/` | Complete lifecycle queue and policy fixtures | `SuperadminOffboardingMockFixtures.ts` |
| `offboarding_mocks/handlers/` | MSW handler | `SuperadminOffboardingMockHandlers.ts` |
| `offboarding_utils/` | TanStack Query orchestration | `useSuperadminOffboardingPage.ts` |

## Feature Inventory
| Feature | Route | What the Superadmin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Offboarding Queue | `/superadmin/offboarding` | Review cancelled tenants, lifecycle stage, dates, export size, and owner | `GET /api/superadmin/offboarding` | Implemented in source; runtime build not verified here |
| Offboarding Policy | `/superadmin/offboarding` | Review export window, grace period, purge delay, approval, and backup requirements | `GET /api/superadmin/offboarding` | Implemented in source; runtime build not verified here |
| Export Requests | `/superadmin/offboarding` | Review tenant requests for a complete data export before purge | `GET /api/superadmin/offboarding` | Implemented in source; runtime build not verified here |
| Safety Checks | `/superadmin/offboarding` | Verify the required backup and type-to-confirm safety expectations | `GET /api/superadmin/offboarding` | Implemented in source; runtime build not verified here |

## User Flows & Interactions
1. Superadmin opens the queue and loads cancelled-tenant lifecycle data.
2. The queue is rendered through the module API contract and TanStack Query.
3. A tenant can be reviewed by stage, grace end date, owner, and export state.
4. Policy and safety panels explain the safeguards that must precede a purge.

## Data and State Architecture
- Query key: `['superadmin', 'offboarding', 'overview']`.
- Server state: TanStack Query.
- UI state: local only.
- Fixture and handler ownership remain inside this module.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchOffboardingData()` | GET | `/api/superadmin/offboarding` | None | `SuperadminOffboardingResponse` |

## UI Data Requirements
| UI Element | Required Field(s) | Response Path | Nullable? |
|---|---|---|---|
| Queue ID | `id` | `data.queue[].id` | No |
| Tenant | `tenant` | `data.queue[].tenant` | No |
| Lifecycle stage | `status` | `data.queue[].status` | No |
| Cancelled date | `cancelledAt` | `data.queue[].cancelledAt` | No |
| Grace end | `graceEndsAt` | `data.queue[].graceEndsAt` | No |
| Export size | `exportSize` | `data.queue[].exportSize` | Yes |
| Owner | `owner` | `data.queue[].owner` | Yes |
| Export window | `exportWindowDays` | `data.policy.exportWindowDays` | No |
| Grace period | `gracePeriodDays` | `data.policy.gracePeriodDays` | No |
| Purge delay | `purgeAfterGraceDays` | `data.policy.purgeAfterGraceDays` | No |
| Approval required | `approvalRequired` | `data.policy.approvalRequired` | No |
| Backup before purge | `backupBeforePurge` | `data.policy.backupBeforePurge` | No |
| Export request tenant | `tenant` | `data.requests[].tenant` | No |
| Requested by | `requestedBy` | `data.requests[].requestedBy` | No |
| Request type | `requestType` | `data.requests[].requestType` | No |
| Request status | `status` | `data.requests[].status` | No |
| Requested date | `requestedAt` | `data.requests[].requestedAt` | No |

## Permissions and Security
- Required role: `SUPERADMIN`.
- Final deletion must always use the type-to-confirm safeguard and be auditable.
- Backup requirement must remain visible before any future purge mutation.
- No raw tenant credentials or database secrets are rendered.

## Loading, Empty, and Error States
- `loading.tsx` provides structural loading placeholders.
- `error.tsx` provides a branded retryable route error.
- Nullable owner/export-size fields use the canonical en dash fallback.

## Edge Cases and AI Warnings
- **Do not purge without a verified backup:** backup state is a prerequisite to final deletion.
- **Grace dates can already be past:** overdue lifecycle rows remain visible for manual action.
- **Owner can be unknown:** render `—`, not a blank cell.
- **Export size can be unknown:** render `—` until the server confirms an export artifact.
- **Never bypass type-to-confirm:** a purge must never execute from a single click.
- **Do not copy cancellation data from another module:** this module owns its mock/API lifecycle contract.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminOffboardingClient.tsx` | Orchestrates query state and child panels. |
| `SuperadminOffboardingPageHeader.tsx` | Renders title and lifecycle description. |
| `SuperadminOffboardingSummaryCards.tsx` | Renders lifecycle counts. |
| `SuperadminOffboardingQueuePanel.tsx` | Renders tenant offboarding records. |
| `SuperadminOffboardingPolicyAndSafetyPanel.tsx` | Renders platform policy and safety rules. |

## External Infrastructure Dependencies
- `@/lib/api`
- `@/lib/formatters`
- `@tanstack/react-query`
- `msw`
- Superadmin confirmation/observability infrastructure when mutation wiring is enabled.

## Final Component Additions
- `SuperadminOffboardingQueueEmptyState.tsx` — renders the offboarding queue empty state.
- `SuperadminOffboardingRequestsPanel.tsx` — renders tenant export requests returned by the API.
- `SuperadminOffboardingRequestsEmptyState.tsx` — renders the export-request empty state.
- `SuperadminOffboardingPolicyAndSafetyPanel.tsx` — uses human-readable policy labels and centralized numeric formatting.
