# Superadmin Messaging Whatsapp — Feature Map

## Module Purpose
The messaging_whatsapp module is responsible for the Superadmin business workflow managing Messaging_whatsapp. It enables superadmins to view, monitor, and control the lifecycle and configurations of Messaging_whatsapp across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_messaging_api/` | Feature-owned responsibility for messaging api. | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts` |
| `superadmin_messaging_mocks/` | Feature-owned responsibility for messaging mocks. | `(directory present; no direct files)` |
| `superadmin_messaging_schemas/` | Feature-owned responsibility for messaging schemas. | `superadmin_messaging_schemas/SuperadminMessagingComposeSchema.test.ts`, `superadmin_messaging_schemas/SuperadminMessagingComposeSchema.ts` |
| `superadmin_messaging_tests/` | Feature-owned responsibility for messaging tests. | `superadmin_messaging_tests/SuperadminMessagingBasic.test.tsx`, `superadmin_messaging_tests/SuperadminMessagingTemplateInsights.test.ts` |
| `superadmin_messaging_types/` | Feature-owned responsibility for messaging types. | `superadmin_messaging_types/SuperadminMessagingComposeModalTypes.ts`, `superadmin_messaging_constants/SuperadminMessagingConstants.ts`, `superadmin_messaging_types/SuperadminMessagingMessagesTabTypes.ts`, `superadmin_messaging_types/SuperadminMessagingNotificationIconTypes.ts`, `superadmin_messaging_types/SuperadminMessagingNotificationsTabTypes.ts`, `superadmin_messaging_types/SuperadminMessagingTenantDropdownTypes.ts`, `superadmin_messaging_types/SuperadminMessagingTypes.ts`, `superadmin_messaging_types/SuperadminMessagingV1Types.ts`, `superadmin_messaging_types/SuperadminMessagingV1WhatsAppAudiencePanelTypes.ts`, `superadmin_messaging_types/SuperadminMessagingV1WhatsAppCampaignHistoryPanelTypes.ts`, `superadmin_messaging_types/SuperadminMessagingV1WhatsAppCampaignSummaryCardsTypes.ts`, `superadmin_messaging_types/SuperadminMessagingV1WhatsAppComposerPanelTypes.ts` |
| `superadmin_messaging_utils/` | Feature-owned responsibility for messaging utils. | `superadmin_messaging_utils/SuperadminMessagingStatusBadgeConfig.ts`, `superadmin_messaging_utils/useSuperadminMessaging.test.tsx`, `superadmin_messaging_utils/useSuperadminMessaging.ts`, `superadmin_messaging_utils/useSuperadminMessagingNotificationMutations.ts`, `superadmin_messaging_utils/useSuperadminMessagingNotifications.ts`, `superadmin_messaging_utils/useSuperadminMessagingV1.ts` |
| `messaging_whatsapp_api/` | Feature-owned responsibility for messaging whatsapp api. | `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` |
| `messaging_whatsapp_components/` | Feature-owned responsibility for messaging whatsapp components. | `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx` |
| `messaging_whatsapp_mocks/` | Feature-owned responsibility for messaging whatsapp mocks. | `(directory present; no direct files)` |
| `messaging_whatsapp_tests/` | Feature-owned responsibility for messaging whatsapp tests. | `superadmin_messaging_whatsapp_tests/SuperadminMessagingV1WhatsAppBulkCenter.test.tsx`, `superadmin_messaging_whatsapp_tests/SuperadminMessagingV1WhatsAppSchema.test.ts` |
| `messaging_whatsapp_types/` | Feature-owned responsibility for messaging whatsapp types. | `superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes.ts`, `superadmin_messaging_whatsapp_types/SuperadminMessagingWhatsAppTypes.ts` |
| `messaging_whatsapp_utils/` | Feature-owned responsibility for messaging whatsapp utils. | `superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsApp.test.ts`, `superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils.ts`, `superadmin_messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp.test.tsx`, `superadmin_messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp.ts`, `superadmin_messaging_whatsapp_utils/useSuperadminMessagingV1WhatsAppCampaign.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui` — role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` — only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Messaging Whatsapp | `/superadmin/messaging` | clear queue; click outside; complete; mark all read; mark read; open; select; send | `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/messaging_whatsapp route to load the Messaging_whatsapp data context securely via TanStack Query.
2. Interact with the Messaging_whatsapp dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Messaging_whatsapp status) through feature-owned API contracts.
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
- **Custom hooks:** `superadmin_messaging_whatsapp_utils/useSuperadminMessagingV1WhatsApp.ts`, `superadmin_messaging_whatsapp_utils/useSuperadminMessagingV1WhatsAppCampaign.ts`, `superadmin_messaging_components/useSuperadminMessagingDateRangePicker.ts`, `superadmin_messaging_utils/useSuperadminMessagingNotifications.ts`, `superadmin_messaging_utils/useSuperadminMessagingV1.ts`, `superadmin_messaging_utils/useSuperadminMessaging.ts`, `superadmin_messaging_utils/useSuperadminMessagingNotificationMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'messaging', 'whatsapp-bulk-center']`, `['superadmin', 'messaging_template_insights']`, `[...MESSAGE_QUERY_KEY, queryParams]`

## API Contract

- **API files:** `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `superadmin_messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `superadmin_messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `superadmin_messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `superadmin_messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `superadmin_messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `superadmin_messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `superadmin_messaging_components/SuperadminMessagingNotificationsTab.tsx`, `superadmin_messaging_components/SuperadminMessagingDateRangePicker.tsx`, `superadmin_messaging_components/SuperadminMessagingComposeModal.tsx`, `superadmin_messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx`, `superadmin_messaging_components/SuperadminMessagingTenantDropdown.tsx`, `superadmin_messaging_components/SuperadminMessagingMessagesTab.tsx`, `superadmin_messaging_components/SuperadminMessagingMain.tsx`, `superadmin_messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx`, `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx`, `superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationBell.tsx`, `superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationIcon.tsx`
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
| `superadmin_messaging_components/SuperadminMessagingNotificationsTab.tsx` | Renders notification state and delegates read mutations to the Superadmin Messaging hook. |
| `superadmin_messaging_components/SuperadminMessagingDateRangePicker.tsx` | Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility. |
| `superadmin_messaging_components/SuperadminMessagingComposeModal.tsx` | Owns Superadmin Messaging form presentation and client-side Zod validation. |
| `superadmin_messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx` | Renders the Superadmin messaging V1 Campaign engagement view. |
| `superadmin_messaging_components/SuperadminMessagingTenantDropdown.tsx` | Renders the Messaging Tenant Dropdown component and its associated UI logic. |
| `superadmin_messaging_components/SuperadminMessagingMessagesTab.tsx` | Renders the searchable, filterable, URL-backed Superadmin tenant message table. |
| `superadmin_messaging_components/SuperadminMessagingMain.tsx` | Renders the Superadmin tenant messaging workspace using the module's URL-backed query state. |
| `superadmin_messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx` | Renders the Superadmin messaging V1 Template library view. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature. |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature. |
| `superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationBell.tsx` | Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications. |
| `superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationIcon.tsx` | Renders the semantic icon for one Superadmin notification severity. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into messaging_whatsapp.
- **Destructive Actions**: Any deletion or modification of messaging_whatsapp records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for messaging_whatsapp do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_messaging_api/`
- `superadmin_messaging_components/`
- `superadmin_messaging_constants/`
- `superadmin_messaging_locales/`
- `superadmin_messaging_mocks/`
- `superadmin_messaging_query_keys/`
- `superadmin_messaging_schemas/`
- `superadmin_messaging_tests/`
- `superadmin_messaging_types/`
- `superadmin_messaging_url_config.ts`
- `superadmin_messaging_utils/`
- `superadmin_messaging_whatsapp_api/`
- `superadmin_messaging_whatsapp_components/`
- `superadmin_messaging_whatsapp_mocks/`
- `superadmin_messaging_whatsapp_tests/`
- `superadmin_messaging_whatsapp_types/`
- `superadmin_messaging_whatsapp_utils/`

### Current root files
- `error.tsx`
- `loading.tsx`
- `not-found.tsx`
- `page.tsx`
- `superadmin_messaging_features.md`
- `superadmin_messaging_forbidden.md`
- `superadmin_messaging_repair_map.md`
- `superadmin_messaging_template_insights_features.md`
- `superadmin_messaging_template_insights_forbidden.md`
- `superadmin_messaging_template_insights_repair_map.md`
- `superadmin_messaging_template_insights_theme_contract.md`
- `superadmin_messaging_theme_contract.md`
- `superadmin_messaging_whatsapp_features.md`
- `superadmin_messaging_whatsapp_forbidden.md`
- `superadmin_messaging_whatsapp_repair_map.md`
- `superadmin_messaging_whatsapp_theme_contract.md`


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.



## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.
