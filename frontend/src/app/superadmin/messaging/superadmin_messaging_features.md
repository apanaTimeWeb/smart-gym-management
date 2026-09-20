# Superadmin Messaging â€” Feature Map

## Module Purpose
The messaging module is responsible for the Superadmin business workflow managing Messaging. It enables superadmins to view, monitor, and control the lifecycle and configurations of Messaging across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `messaging_api/` | Feature-owned responsibility for messaging api. | `SuperadminMessagingApi.ts`, `SuperadminMessagingTemplateInsightsApi.ts` |
| `messaging_mocks/` | Feature-owned responsibility for messaging mocks. | `(directory present; no direct files)` |
| `messaging_schemas/` | Feature-owned responsibility for messaging schemas. | `SuperadminMessagingComposeSchema.test.ts`, `SuperadminMessagingComposeSchema.ts` |
| `messaging_tests/` | Feature-owned responsibility for messaging tests. | `SuperadminMessagingBasic.test.tsx`, `SuperadminMessagingTemplateInsights.test.ts` |
| `messaging_types/` | Feature-owned responsibility for messaging types. | `SuperadminMessagingComposeModalTypes.ts`, `SuperadminMessagingConstants.ts`, `SuperadminMessagingMessagesTabTypes.ts`, `SuperadminMessagingNotificationIconTypes.ts`, `SuperadminMessagingNotificationsTabTypes.ts`, `SuperadminMessagingTenantDropdownTypes.ts`, `SuperadminMessagingTypes.ts`, `SuperadminMessagingV1Types.ts`, `SuperadminMessagingV1WhatsAppAudiencePanelTypes.ts`, `SuperadminMessagingV1WhatsAppCampaignHistoryPanelTypes.ts`, `SuperadminMessagingV1WhatsAppCampaignSummaryCardsTypes.ts`, `SuperadminMessagingV1WhatsAppComposerPanelTypes.ts` |
| `messaging_utils/` | Feature-owned responsibility for messaging utils. | `SuperadminMessagingStatusBadgeConfig.ts`, `useSuperadminMessaging.test.tsx`, `useSuperadminMessaging.ts`, `useSuperadminMessagingNotificationMutations.ts`, `useSuperadminMessagingNotifications.ts`, `useSuperadminMessagingV1.ts` |
| `messaging_whatsapp_api/` | Feature-owned responsibility for messaging whatsapp api. | `SuperadminMessagingWhatsappApi.ts` |
| `messaging_whatsapp_components/` | Feature-owned responsibility for messaging whatsapp components. | `SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `SuperadminMessagingV1WhatsAppTemplatePicker.tsx` |
| `messaging_whatsapp_mocks/` | Feature-owned responsibility for messaging whatsapp mocks. | `(directory present; no direct files)` |
| `messaging_whatsapp_tests/` | Feature-owned responsibility for messaging whatsapp tests. | `SuperadminMessagingV1WhatsAppBulkCenter.test.tsx`, `SuperadminMessagingV1WhatsAppSchema.test.ts` |
| `messaging_whatsapp_types/` | Feature-owned responsibility for messaging whatsapp types. | `SuperadminMessagingV1WhatsAppTypes.ts`, `SuperadminMessagingWhatsAppTypes.ts` |
| `messaging_whatsapp_utils/` | Feature-owned responsibility for messaging whatsapp utils. | `SuperadminMessagingV1WhatsApp.test.ts`, `SuperadminMessagingV1WhatsAppUtils.ts`, `useSuperadminMessagingV1WhatsApp.test.tsx`, `useSuperadminMessagingV1WhatsApp.ts`, `useSuperadminMessagingV1WhatsAppCampaign.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Messaging | `/superadmin/messaging` | clear queue; click outside; complete; mark all read; mark read; open; select; send | `SuperadminMessagingTemplateInsightsApi.ts`, `SuperadminMessagingApi.ts`, `SuperadminMessagingWhatsappApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/messaging route to load the Messaging data context securely via TanStack Query.
2. Interact with the Messaging dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Messaging status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `messaging`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp.ts`, `messaging_whatsapp_utils/useSuperadminMessagingV1WhatsAppCampaign.ts`, `messaging_components/useSuperadminMessagingDateRangePicker.ts`, `messaging_utils/useSuperadminMessagingNotifications.ts`, `messaging_utils/useSuperadminMessagingV1.ts`, `messaging_utils/useSuperadminMessaging.ts`, `messaging_utils/useSuperadminMessagingNotificationMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'messaging', 'whatsapp-bulk-center']`, `['superadmin', 'messaging_template_insights']`, `[...MESSAGE_QUERY_KEY, queryParams]`

## API Contract

- **API files:** `messaging_api/SuperadminMessagingApi.ts`, `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `messaging_components/SuperadminMessagingNotificationsTab.tsx`, `messaging_components/SuperadminMessagingDateRangePicker.tsx`, `messaging_components/SuperadminMessagingComposeModal.tsx`, `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `messaging_components/SuperadminMessagingTenantDropdown.tsx`, `messaging_components/SuperadminMessagingMessagesTab.tsx`, `messaging_components/SuperadminMessagingClient.tsx`, `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx`, `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Renders the page component and its associated UI logic. |
| `messaging_components/SuperadminMessagingNotificationsTab.tsx` | Renders notification state and delegates read mutations to the Superadmin Messaging hook. |
| `messaging_components/SuperadminMessagingDateRangePicker.tsx` | Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility. |
| `messaging_components/SuperadminMessagingComposeModal.tsx` | Owns Superadmin Messaging form presentation and client-side Zod validation. |
| `messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx` | Renders the Superadmin messaging V1 Campaign engagement view. |
| `messaging_components/SuperadminMessagingTenantDropdown.tsx` | Renders the Messaging Tenant Dropdown component and its associated UI logic. |
| `messaging_components/SuperadminMessagingMessagesTab.tsx` | Renders the searchable, filterable, URL-backed Superadmin tenant message table. |
| `messaging_components/SuperadminMessagingClient.tsx` | Renders the Superadmin tenant messaging workspace using the module's URL-backed query state. |
| `messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx` | Renders the Superadmin messaging V1 Template library view. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature. |
| `messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature. |
| `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationBell.tsx` | Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications. |
| `messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon.tsx` | Renders the semantic icon for one Superadmin notification severity. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into messaging.
- **Destructive Actions**: Any deletion or modification of messaging records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for messaging do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

