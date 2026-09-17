# Tax & Compliance — Feature Map

## Module Purpose
This Superadmin-only module provides platform-level visibility into tax registration and compliance readiness across gym tenants and regions. It solves the problem of scattered tax information by giving the platform owner a regional coverage view, tenant document list, and readiness summary. A Superadmin can identify missing tax details and documents nearing expiry before they become an operational or billing problem. The module does not replace tenant accounting workflows; it provides the platform governance layer above them.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `compliance_components/` | Regional coverage, document readiness, and summary sections | `SuperadminComplianceClient.tsx`, `SuperadminCompliancePageHeader.tsx`, `SuperadminComplianceSummaryCards.tsx`, `SuperadminComplianceRegionalCoveragePanel.tsx`, `SuperadminComplianceDocumentsPanel.tsx`, `SuperadminComplianceReadinessPanel.tsx` |
| `compliance_api/` | API boundary | `superadmin_compliance_api.ts` |
| `compliance_types/` | Zod contract and inferred types | `SuperadminComplianceTypes.ts` |
| `compliance_mocks/fixtures/` | Complete regional and document fixtures | `SuperadminComplianceMockFixtures.ts` |
| `compliance_mocks/handlers/` | MSW handler | `SuperadminComplianceMockHandlers.ts` |
| `compliance_utils/` | TanStack Query orchestration | `useSuperadminCompliancePage.ts` |

## Feature Inventory
| Feature | Route | What the Superadmin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Regional Coverage | `/superadmin/compliance` | Compare registration completeness and configured tax rates by region | `GET /api/superadmin/compliance` | Implemented in source; runtime build not verified here |
| Compliance Documents | `/superadmin/compliance` | Review tenant registrations, validity, and expiry dates | `GET /api/superadmin/compliance` | Implemented in source; runtime build not verified here |
| Readiness | `/superadmin/compliance` | Review missing tax details and open compliance work | `GET /api/superadmin/compliance` | Implemented in source; runtime build not verified here |

## User Flows & Interactions
1. Superadmin opens the compliance page.
2. The query retrieves summary, regional coverage, and document records.
3. Zod validates the response before UI consumption.
4. The Superadmin identifies regions requiring attention and documents nearing expiry.

## Data and State Architecture
- Query key: `['superadmin', 'compliance', 'overview']`.
- Server state: TanStack Query.
- UI state: local only.
- MSW fixtures and handlers remain module-owned.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchComplianceData()` | GET | `/api/superadmin/compliance` | None | `SuperadminComplianceResponse` |

## UI Data Requirements
| UI Element | Required Field(s) | Response Path | Nullable? |
|---|---|---|---|
| Registered tenants | `registeredTenants` | `data.summary.registeredTenants` | No |
| Missing tax details | `missingTaxDetails` | `data.summary.missingTaxDetails` | No |
| Expiring documents | `documentsExpiring` | `data.summary.documentsExpiring` | No |
| Open compliance tasks | `openComplianceTasks` | `data.summary.openComplianceTasks` | No |
| Region | `region` | `data.regions[].region` | No |
| Registered count | `registered` | `data.regions[].registered` | No |
| Missing count | `missing` | `data.regions[].missing` | No |
| Tax rate | `taxRate` | `data.regions[].taxRate` | No |
| Regional status | `status` | `data.regions[].status` | No |
| Tenant | `tenant` | `data.documents[].tenant` | No |
| Document | `document` | `data.documents[].document` | No |
| Document status | `status` | `data.documents[].status` | No |
| Expiry | `expires` | `data.documents[].expires` | Yes |

## Permissions and Security
- Required role: `SUPERADMIN`.
- Compliance records are sensitive platform data; only approved role capabilities may access the route.
- Tax/document mutations must be audited and confirmation-protected when mutation controls are added.
- No cross-role business imports.

## Loading, Empty, and Error States
- `loading.tsx` provides structural skeletons.
- `error.tsx` provides the branded retry state.
- Nullable document expiry uses the canonical en dash fallback.

## Edge Cases and AI Warnings
- **Expiry may be unknown:** `expires = null` is valid and must render as `—`.
- **Region can require attention:** do not imply a region is ready solely because its tax rate exists.
- **Counts are API data:** never hardcode a registration count into JSX.
- **Status colors stay centralized:** use `SuperadminStatusBadgeConfig.ts` for status presentation.
- **Do not import tenant accounting data from another role module:** use the compliance API contract.
- **Tax rules are region-sensitive:** the response must remain authoritative when a real backend replaces the mock.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminComplianceClient.tsx` | Orchestrates page query state and sections. |
| `SuperadminCompliancePageHeader.tsx` | Renders title and description. |
| `SuperadminComplianceSummaryCards.tsx` | Renders readiness summary metrics. |
| `SuperadminComplianceRegionalCoveragePanel.tsx` | Renders region-by-region coverage comparison. |
| `SuperadminComplianceDocumentsPanel.tsx` | Renders tenant compliance documents and expiry. |
| `SuperadminComplianceRegionalCoverageEmptyState.tsx` | Renders the empty state for regional coverage. |
| `SuperadminComplianceDocumentsEmptyState.tsx` | Renders the empty state for compliance documents. |
| `SuperadminComplianceReadinessPanel.tsx` | Renders readiness follow-up signals. |

## External Infrastructure Dependencies
- `@/lib/api`
- `@/lib/formatters`
- `@tanstack/react-query`
- `msw`
- Superadmin shared UI primitives.

## Final Component Additions
- `SuperadminComplianceRegionalCoverageEmptyState.tsx` — renders the regional coverage empty state.
- `SuperadminComplianceDocumentsEmptyState.tsx` — renders the compliance-document empty state.

Regional percentage calculations safely return zero when no regional records are present.
