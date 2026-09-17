# Integrations & Developer Access — Feature Map

## Module Purpose
This Superadmin-only module is the platform control center for third-party connection health, webhook delivery, and tenant developer access. It helps the platform owner see when payments, messaging, email, or storage connections are degraded, investigate webhook delivery problems, and review tenant-issued developer access metadata without exposing secrets. It is strictly platform-level and does not configure tenant operational workflows such as attendance or membership management.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `integrations_components/` | Connection, webhook, developer-access UI, and dedicated empty states | `SuperadminIntegrationsClient.tsx`, `SuperadminIntegrationsPageHeader.tsx`, `SuperadminIntegrationsSummaryCards.tsx`, `SuperadminIntegrationsConnectionHealthPanel.tsx`, `SuperadminIntegrationsConnectionsEmptyState.tsx`, `SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx`, `SuperadminIntegrationsWebhooksEmptyState.tsx`, `SuperadminIntegrationsDeveloperAccessEmptyState.tsx` |
| `integrations_api/` | API boundary | `superadmin_integrations_api.ts` |
| `integrations_types/` | Zod response contract and inferred types | `SuperadminIntegrationsTypes.ts` |
| `integrations_mocks/fixtures/` | Complete integration, webhook, and developer-key fixture data | `SuperadminIntegrationsMockFixtures.ts` |
| `integrations_mocks/handlers/` | MSW endpoint implementation | `SuperadminIntegrationsMockHandlers.ts` |
| `integrations_utils/` | TanStack Query orchestration | `useSuperadminIntegrationsPage.ts` |

## Feature Inventory
| Feature | Route | What the Superadmin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Connection Health | `/superadmin/integrations` | Review connection status, failed events, last event, and health percentage | `SuperadminIntegrationsConnectionHealthPanel.tsx` | `GET /api/superadmin/integrations` | Implemented in source; runtime build not verified here |
| Webhook Delivery | `/superadmin/integrations` | Review event delivery status, retry attempts, latency, and integration | `SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx` | `GET /api/superadmin/integrations` | Implemented in source; runtime build not verified here |
| Tenant Developer Access | `/superadmin/integrations` | Review safe key metadata, tenant, rate limit, status, and last use | `SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx` | `GET /api/superadmin/integrations` | Implemented in source; runtime build not verified here |

## User Flows & Interactions
### Flow 1: Check an unhealthy connection
1. Superadmin opens the integrations page.
2. The query retrieves the connection list.
3. A degraded connection is identified by status and failed-event count.
4. The last event is shown with a nullable-safe display fallback.

### Flow 2: Investigate a failed webhook
1. Superadmin reviews Webhook Delivery.
2. The failed event shows its integration, attempts, and latency.
3. The event identifier remains visible for investigation; secret payload data is not exposed.

## Data and State Architecture
- Query key: `['superadmin', 'integrations', 'overview']`.
- Server state: TanStack Query only.
- UI state: local only.
- MSW handler and fixture are module-owned.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchIntegrationsData()` | GET | `/api/superadmin/integrations` | None | `SuperadminIntegrationsResponse` |

## UI Data Requirements
| UI Element | Required Field(s) | Response Path | Nullable? |
|---|---|---|---|
| Connection name | `name` | `data.integrations[].name` | No |
| Connection type | `type` | `data.integrations[].type` | No |
| Connection status | `status` | `data.integrations[].status` | No |
| Last event | `lastEvent` | `data.integrations[].lastEvent` | Yes |
| Failed events | `failedEvents` | `data.integrations[].failedEvents` | No |
| Health percentage | `health` | `data.integrations[].health` | No |
| Webhook ID | `id` | `data.webhooks[].id` | No |
| Webhook event | `event` | `data.webhooks[].event` | No |
| Webhook integration | `integration` | `data.webhooks[].integration` | No |
| Delivery status | `status` | `data.webhooks[].status` | No |
| Attempts | `attempts` | `data.webhooks[].attempts` | No |
| Latency | `latency` | `data.webhooks[].latency` | No |
| Webhook time | `time` | `data.webhooks[].time` | No |
| Developer key ID | `id` | `data.keys[].id` | No |
| Tenant | `tenant` | `data.keys[].tenant` | No |
| Key label | `label` | `data.keys[].label` | No |
| Key status | `status` | `data.keys[].status` | No |
| Last use | `lastUsed` | `data.keys[].lastUsed` | Yes |
| Rate limit | `rateLimit` | `data.keys[].rateLimit` | No |

## Permissions and Security
- Required role: `SUPERADMIN`.
- Secret values are never rendered; only safe metadata is shown.
- Developer access changes must be protected by the approved confirmation flow and audited before mutation wiring is added.
- No imports from other role/business modules.

## Loading, Empty, and Error States
- `loading.tsx` provides the structural skeleton.
- `error.tsx` provides the branded retry state.
- Nullable last-event and last-use values render with the canonical en dash fallback.

## Edge Cases and AI Warnings
- **A connection can be healthy with recent failures:** show both health and failed-event count; never infer one from the other.
- **No recent event is valid:** render `—`, not an empty string or `undefined`.
- **Never render developer secrets:** the fixture intentionally contains metadata only.
- **Keep webhook history module-owned:** do not pull another module's event fixtures into this page.
- **Status mapping is centralized:** use `SuperadminStatusBadgeConfig.ts` instead of inline status color conditions.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminIntegrationsClient.tsx` | Orchestrates loading/error/success states. |
| `SuperadminIntegrationsPageHeader.tsx` | Renders the page title and context. |
| `SuperadminIntegrationsSummaryCards.tsx` | Renders high-level integration metrics. |
| `SuperadminIntegrationsConnectionHealthPanel.tsx` | Renders connection health records. |
| `SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx` | Renders webhook and safe developer-access records. |

## External Infrastructure Dependencies
- `@/lib/api`
- `@/lib/formatters`
- `@tanstack/react-query`
- `msw`
- Superadmin shared UI primitives.

## Final Component Additions
- `SuperadminIntegrationsConnectionsEmptyState.tsx` — renders the connection-list empty state.
- `SuperadminIntegrationsWebhooksEmptyState.tsx` — renders the webhook-list empty state.
- `SuperadminIntegrationsDeveloperAccessEmptyState.tsx` — renders the developer-access empty state.
