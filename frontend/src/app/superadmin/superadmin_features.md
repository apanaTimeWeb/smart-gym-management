# Superadmin — Feature Map

## Module Purpose
The Superadmin module is the platform-owner control surface for tenant and platform administration. Its business features are split into independently navigable folders so an AI agent can repair one feature without loading unrelated Superadmin business code. Superadmins can manage tenants, plans, billing, support, messaging, infrastructure, migrations, reporting, audits, jobs, backups, settings, and related platform operations represented by the current routes. Operational features belonging to other roles are outside this module.

## Directory Structure

| Folder | Responsibility | Key files |
|---|---|---|
| `affiliates/` | Owns the `affiliates` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `analytics/` | Owns the `analytics` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `backups/` | Owns the `backups` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `branches/` | Owns the `branches` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `broadcasts/` | Owns the `broadcasts` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `cancellations/` | Owns the `cancellations` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `coupons/` | Owns the `coupons` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `dashboard/` | Owns the `dashboard` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `features/` | Owns the `features` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `franchises/` | Owns the `franchises` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `global-audit/` | Owns the `global-audit` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `gyms/` | Owns the `gyms` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `infrastructure/` | Owns the `infrastructure` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `invoices/` | Owns the `invoices` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `jobs/` | Owns the `jobs` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `messaging/` | Owns the `messaging` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `migrations/` | Owns the `migrations` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `onboarding/` | Owns the `onboarding` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `plans/` | Owns the `plans` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `profile/` | Owns the `profile` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `reports/` | Owns the `reports` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `settings/` | Owns the `settings` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `system/` | Owns the `system` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `tickets/` | Owns the `tickets` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `usage-meters/` | Owns the `usage-meters` business feature and route. | `page.tsx`, `loading.tsx`, `error.tsx`, feature-owned API/types/docs where present |
| `team/` | Owns internal Superadmin operator access, role groups, and alert preferences. | `page.tsx`, `team_components/SuperadminTeamClient.tsx`, module API/types/mocks |
| `integrations/` | Owns platform integrations, webhook delivery, and tenant developer access metadata. | `page.tsx`, `integrations_components/SuperadminIntegrationsClient.tsx`, module API/types/mocks |
| `offboarding/` | Owns tenant cancellation/offboarding queues, export/grace/purge policy, and safety checks. | `page.tsx`, `offboarding_components/SuperadminOffboardingClient.tsx`, module API/types/mocks |
| `compliance/` | Owns platform tax registration coverage and compliance document readiness. | `page.tsx`, `compliance_components/SuperadminComplianceClient.tsx`, module API/types/mocks |
| `segments/` | Owns reusable saved tenant groups and quick filter presets. | `page.tsx`, `segments_components/SuperadminSegmentsClient.tsx`, module API/types/mocks |
| `superadmin_components/` | Shared Superadmin shell/UI primitives and confirmation/error infrastructure, not business-domain API ownership. | `SuperadminLayout/`, `SuperadminFeedback/`, `SuperadminShared/` |
| `superadmin_utils/` | Stable Superadmin-wide UI helpers such as URL-state handling. | `useSuperadminUrlState.ts` |

## V1 Business Expansion
The V1 expansion adds platform-level SaaS intelligence and operations without moving gym-staff business workflows into Superadmin. The new areas are:

- **Dashboard:** monthly income movement, retention indicators, tenant comparison, and a unified critical-alert view.
- **Gyms:** advanced tenant filtering, saved views, bulk operations, and comparison.
- **Gym Detail:** switchable tenant 360 sections for overview, subscription, billing, usage, health, activity, and support.
- **Plans:** comparison, price history, add-ons, and plan-change impact preview.
- **Invoices:** failed-payment recovery, recovery timing, and financial adjustment review.
- **Analytics / Reports:** retention, cohort, adoption, concentration, acquisition, and period/segment comparisons.
- **Onboarding / Cancellations:** activation journey, stall points, conversion trends, and cancellation reasons.
- **Franchises / Branches:** franchise and branch comparison plus franchise financial control.
- **Messaging / Broadcasts / Tickets:** reusable templates, audience building, campaign engagement, support workload, backlog age, and support categories.
- **Features / Infrastructure / Jobs / Backups / Audit / Settings:** rollout control, release log, endpoint/queue health, backup verification, audit investigation, and governance controls.
- **Team / Integrations / Offboarding / Tax & Compliance / Saved Segments:** delegated Superadmin access, connection/webhook/developer access, tenant data lifecycle, compliance readiness, and reusable tenant groups.

User-facing V1 labels intentionally prefer plain-language names such as `Monthly income`, `Income kept from existing gyms`, `Gym retention`, `Revenue lost`, `Customer churn`, `Developer keys`, and `Extra sign-in`.

## Feature Inventory
Each route-backed folder listed above is a separate feature boundary. See the matching `*_features.md` file inside that folder for the current route, files, API functions, state, UI data, permissions, loading/error states, edge cases, and tests.

## Data and State Architecture
Server/async data is owned by TanStack Query. UI-only shared state belongs in feature-scoped Zustand when needed; component-private state belongs in local React state. Feature business data is not stored in global/shared business modules. Feature API clients validate response data at the API boundary with Zod. Shared `@/lib/api` is transport infrastructure only.

## API Contract
Every feature owns its API boundary and its single feature URL configuration. Cross-feature business dependencies are forbidden; when a feature consumes another backend resource for UI purposes, the consuming feature owns a local minimal contract rather than importing the sibling feature's business types/API/config.

## Permissions and Security
The module is intended for the `SUPERADMIN` role. Frontend UI checks do not replace backend authorization. Destructive and security-sensitive actions must preserve the documented Superadmin confirmation and error-handling behavior.

## Loading, Empty, and Error States
Every route-backed feature should expose `loading.tsx` and `error.tsx` where applicable. Independently fetched sections should isolate failure with the Superadmin error-boundary infrastructure and should never expose raw technical errors.

## Edge Cases and AI Warnings
- **No sibling business imports:** do not couple one Superadmin feature to another feature's APIs, schemas, types, stores, or business constants.
- **No global business dumping ground:** shared infrastructure/UI is allowed; shared business logic is not a convenience layer.
- **No server data in Zustand:** TanStack Query remains the server-state source of truth.
- **No hardcoded URLs or HTTP statuses:** use the feature URL config and standard status constants where required.
- **No fake production records:** mocked backend data belongs to module-owned mock/fixture layers.
- **Do not weaken confirmation/security flows:** destructive actions must retain their feature-specific guard behavior.

## External Infrastructure Dependencies
- `@/lib/api` — global API transport and response envelope.
- Global design-system primitives and app-level authentication/error-monitoring infrastructure where documented by the host project.
- Full CI/runtime verification is **NOT VERIFIED** in this repair environment because dependencies were not installed.

## Documentation Consistency
All Superadmin feature maps in this archive use the actual current folder/file inventory rather than the former centralized business-module description.


## User Flows & Interactions
1. Enter the `/superadmin` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `affiliates/affiliates_components/SuperadminAffiliateModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `affiliates/affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `analytics/analytics_components/SuperadminAnalyticsClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `backups/backups_components/SuperadminBackupsClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `backups/backups_components/SuperadminBackupsRestoreModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `backups/backups_components/SuperadminBackupsScheduleModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `backups/backups_components/SuperadminBackupsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `backups/backups_components/SuperadminBackupsTriggerModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `branches/branches_components/SuperadminBranchesClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastQueueModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastStatusBadge/SuperadminBroadcastStatusBadge.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastsClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastsHeader/SuperadminBroadcastsHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `broadcasts/broadcasts_components/SuperadminBroadcastsTable/SuperadminBroadcastsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `cancellations/cancellations_components/SuperadminCancellationsClient/SuperadminCancellationsClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `cancellations/cancellations_components/SuperadminCancellationsActionModal/SuperadminCancellationsActionModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `cancellations/cancellations_components/SuperadminCancellationsEmptyState/SuperadminCancellationsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `cancellations/cancellations_components/SuperadminCancellationsFilters/SuperadminCancellationsFilters.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `cancellations/cancellations_components/SuperadminCancellationsKPIs/SuperadminCancellationsKPIs.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `cancellations/cancellations_components/SuperadminCancellationsTable/SuperadminCancellationsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponEditModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsRedemptionDrawer.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `coupons/coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `dashboard/dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `features/features_components/SuperadminFeatureHistoryModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `features/features_components/SuperadminFeatureRolloutModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `features/features_components/SuperadminFeaturesClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `franchises/franchises_components/SuperadminFranchiseModal/SuperadminFranchiseModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `franchises/franchises_components/SuperadminFranchisesClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `global-audit/global-audit_components/SuperadminGlobalAuditClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminAddGymForm/SuperadminAddGymForm.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymDetailClient/SuperadminGymDetailClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymEditModal/SuperadminGymEditModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymsCalendar/SuperadminGymsCalendar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymsClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymsTable/SuperadminGymsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `gyms/gyms_components/SuperadminGymsToolbar/SuperadminGymsToolbar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `invoices/invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `jobs/jobs_components/SuperadminJobsView.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `messaging/messaging_components/SuperadminMessagingClient.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |

## Rule Compliance Checklist
- [ ] Static and runtime verification completed for all applicable architecture, API, state, test, accessibility and design rules.
- [ ] No cross-module business imports.
- [ ] All async data remains in TanStack Query.
- [ ] All non-trivial forms use React Hook Form + Zod.
- [ ] Module documentation matches current code.
- [ ] Meaningful tests prove critical user-visible behavior.


## Module-Owned MSW Fixtures

Feature-specific mock fixtures and MSW handlers are owned by this feature directory. API responses consumed by UI must remain complete for all documented table fields, KPIs, charts, filters, detail views and mutation messages. Global MSW bootstrap is registration infrastructure only.
