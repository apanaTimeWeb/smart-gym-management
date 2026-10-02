# Superadmin Messaging Whatsapp — Feature Map

## Module Purpose
superadmin_messaging_whatsapp_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/messaging``. Authenticated Superadmin users can clear queue; click outside; complete; mark all read; mark read; open; select; send. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``../superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `../superadmin_messaging_api/SuperadminMessagingApi.ts`, `../superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** None identified in the owned API surface.
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.
- **API Ownership:** No dedicated API facade matching this documentation node was found under the owning feature API folder; behavior is delegated/documented at the parent feature boundary where applicable.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_messaging`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_messaging_features.md, superadmin_messaging_forbidden.md, superadmin_messaging_theme_contract.md, superadmin_messaging_url_config.ts` |
| `superadmin_messaging_api/` | Owns module-scoped api artifacts. | `SuperadminMessagingApi.ts, SuperadminMessagingTemplateInsightsApi.ts` |
| `superadmin_messaging_components/` | Owns module-scoped components artifacts. | `SuperadminMessagingComposeModal.tsx, SuperadminMessagingDateRangePicker.tsx, SuperadminMessagingMain.tsx, SuperadminMessagingMessagesTab.tsx, SuperadminMessagingNotificationsTab.tsx` (+3 more) |
| `superadmin_messaging_constants/` | Owns module-scoped constants artifacts. | `SuperadminMessagingConstants.ts, SuperadminMessagingDateRangeConstants.ts, SuperadminMessagingQueryKeys.ts, SuperadminMessagingStatusBadgeConfig.test.ts, SuperadminMessagingStatusBadgeConfig.ts` |
| `superadmin_messaging_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_messaging_repair_map.md, superadmin_messaging_template_insights_features.md, superadmin_messaging_template_insights_forbidden.md, superadmin_messaging_template_insights_repair_map.md, superadmin_messaging_template_insights_theme_contract.md` (+4 more) |
| `superadmin_messaging_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminMessaging.test.tsx, useSuperadminMessaging.ts, useSuperadminMessagingCompose.test.ts, useSuperadminMessagingCompose.ts, useSuperadminMessagingDateRangePicker.test.ts` (+15 more) |
| `superadmin_messaging_locales/` | Owns module-scoped locales artifacts. | `superadmin_messaging_en.json, superadmin_messaging_hi.json` |
| `superadmin_messaging_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_messaging_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminMessagingApiSchema.ts, SuperadminMessagingComposeSchema.test.ts, SuperadminMessagingComposeSchema.ts, SuperadminMessagingTypesSchemas.ts, SuperadminMessagingV1ResponseSchema.ts` (+4 more) |
| `superadmin_messaging_tests/` | Owns module-scoped tests artifacts. | `SuperadminMessagingBasic.test.tsx, SuperadminMessagingDateRangeUtils.testBehavior.ts, SuperadminMessagingTemplateInsights.test.ts, SuperadminMessagingV1WhatsApp.test.ts` |
| `superadmin_messaging_types/` | Owns module-scoped types artifacts. | `SuperadminMessagingComposeModalTypes.ts, SuperadminMessagingComposeTypes.ts, SuperadminMessagingDateRangePickerTypes.ts, SuperadminMessagingDateRangeTypes.ts, SuperadminMessagingMessagesTabTypes.ts` (+13 more) |
| `superadmin_messaging_utils/` | Owns module-scoped utils artifacts. | `SuperadminMessagingDateRangeUtils.test.ts, SuperadminMessagingDateRangeUtils.ts, SuperadminMessagingFormatCurrency.test.ts, SuperadminMessagingFormatCurrency.ts, SuperadminMessagingFormatters.test.ts` (+1 more) |
| `superadmin_messaging_whatsapp_api/` | Owns module-scoped whatsapp api artifacts. | `SuperadminMessagingWhatsappApi.ts` |
| `superadmin_messaging_whatsapp_components/` | Owns module-scoped whatsapp components artifacts. | `SuperadminMessagingV1WhatsAppAudiencePanel.tsx, SuperadminMessagingV1WhatsAppBulkCenter.test.tsx, SuperadminMessagingV1WhatsAppBulkCenter.tsx, SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx, SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx` (+4 more) |
| `superadmin_messaging_whatsapp_hooks/` | Owns module-scoped whatsapp hooks artifacts. | `useSuperadminMessagingV1WhatsApp.test.tsx, useSuperadminMessagingV1WhatsApp.ts, useSuperadminMessagingV1WhatsAppCampaign.test.tsx, useSuperadminMessagingV1WhatsAppCampaign.ts` |
| `superadmin_messaging_whatsapp_mocks/` | Owns module-scoped whatsapp mocks artifacts. | `` |
| `superadmin_messaging_whatsapp_tests/` | Owns module-scoped whatsapp tests artifacts. | `` |
| `superadmin_messaging_whatsapp_types/` | Owns module-scoped whatsapp types artifacts. | `SuperadminMessagingV1WhatsAppTypes.ts, SuperadminMessagingWhatsAppTypes.ts` |
| `superadmin_messaging_whatsapp_utils/` | Owns module-scoped whatsapp utils artifacts. | `SuperadminMessagingV1WhatsAppAudienceUtils.test.ts, SuperadminMessagingV1WhatsAppAudienceUtils.ts, SuperadminMessagingV1WhatsAppUtils.test.ts, SuperadminMessagingV1WhatsAppUtils.ts` |

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
| Superadmin Messaging Whatsapp | `/superadmin/messaging` | clear queue; click outside; complete; mark all read; mark read; open; select; send | `../superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `../superadmin_messaging_api/SuperadminMessagingApi.ts`, `../superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/messaging_whatsapp route to load the Messaging_whatsapp data context securely via TanStack Query.
2. Interact with the Messaging_whatsapp dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Messaging_whatsapp status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `../page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_messaging`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `../superadmin_messaging_whatsapp_hooks/useSuperadminMessagingV1WhatsApp.ts`, `../superadmin_messaging_whatsapp_hooks/useSuperadminMessagingV1WhatsAppCampaign.ts`, `../superadmin_messaging_hooks/useSuperadminMessagingDateRangePicker.ts`, `../superadmin_messaging_hooks/useSuperadminMessagingNotifications.ts`, `../superadmin_messaging_hooks/useSuperadminMessagingV1.ts`, `../superadmin_messaging_hooks/useSuperadminMessaging.ts`, `../superadmin_messaging_hooks/useSuperadminMessagingNotificationMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_messaging_constants/SuperadminMessagingQueryKeys.ts`

## API Contract

- **API files:** `../superadmin_messaging_api/SuperadminMessagingApi.ts`, `../superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `../superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Detected API symbols:** `fetchMessages` — `../superadmin_messaging_api/SuperadminMessagingApi.ts`; `fetchNotifications` — `../superadmin_messaging_api/SuperadminMessagingApi.ts`; `fetchTenants` — `../superadmin_messaging_api/SuperadminMessagingApi.ts`; `markNotificationRead` — `../superadmin_messaging_api/SuperadminMessagingApi.ts`; `markAllNotificationsRead` — `../superadmin_messaging_api/SuperadminMessagingApi.ts`; `sendMessage` — `../superadmin_messaging_api/SuperadminMessagingApi.ts`; `fetchMessagingTemplateInsights` — `../superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`; `fetchWhatsAppBulkCenter` — `../superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`; `createWhatsAppCampaign` — `../superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx` | `campaigns` | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Module-owned fixture/handler |
| `superadmin_messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx` | `templates` | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Module-owned fixture/handler |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx` | `id`, `name` | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Module-owned fixture/handler |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx` | `templates`, `recipients`, `status`, `recipient`, `message`, `audiences`, `variables`, `campaigns` | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Module-owned fixture/handler |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx` | `id`, `name`, `templateName`, `audienceLabel`, `totalRecipients`, `sentCount`, `skippedCount`, `status` | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Module-owned fixture/handler |
| `superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx` | `status`, `recipient` | `superadmin_messaging_api/SuperadminMessagingApi.ts`, `superadmin_messaging_api/SuperadminMessagingTemplateInsightsApi.ts`, `superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`../loading.tsx`:** `../loading.tsx`
- **`../error.tsx`:** `../error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `../page.tsx` | Renders the page component and its associated UI logic. |
| `../superadmin_messaging_components/SuperadminMessagingNotificationsTab.tsx` | Renders notification state and delegates read mutations to the Superadmin Messaging hook. |
| `../superadmin_messaging_components/SuperadminMessagingDateRangePicker.tsx` | Renders the SuperadminMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility. |
| `../superadmin_messaging_components/SuperadminMessagingComposeModal.tsx` | Owns Superadmin Messaging form presentation and client-side Zod validation. |
| `../superadmin_messaging_components/SuperadminMessagingV1CampaignEngagementPanel.tsx` | Renders the Superadmin messaging V1 Campaign engagement view. |
| `../superadmin_messaging_components/SuperadminMessagingTenantDropdown.tsx` | Renders the Messaging Tenant Dropdown component and its associated UI logic. |
| `../superadmin_messaging_components/SuperadminMessagingMessagesTab.tsx` | Renders the searchable, filterable, URL-backed Superadmin tenant message table. |
| `../superadmin_messaging_components/SuperadminMessagingMain.tsx` | Renders the Superadmin tenant messaging workspace using the module's URL-backed query state. |
| `../superadmin_messaging_components/SuperadminMessagingV1TemplateLibraryPanel.tsx` | Renders the Superadmin messaging V1 Template library view. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppQueuePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppTemplatePicker.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppPreviewPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppAudiencePanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppComposerPanel.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature. |
| `../superadmin_messaging_whatsapp_components/SuperadminMessagingV1WhatsAppBulkCenter.tsx` | Renders or orchestrates the Superadmin MessagingV1WhatsAppBulkCenter responsibility defined by this module feature. |
| `../superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationBell.tsx` | Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications. |
| `../superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationIcon.tsx` | Renders the semantic icon for one Superadmin notification severity. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into messaging_whatsapp.
- **Destructive Actions**: Any deletion or modification of messaging_whatsapp records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for messaging_whatsapp do not expose cross-tenant sensitive data.

- **Module API boundary:** All `messaging` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `messaging` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `messaging` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `messaging` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `messaging` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Canonical Current Source Structure (v13-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_messaging_api/`
- `superadmin_messaging_components/`
- `superadmin_messaging_constants/`
- `superadmin_messaging_locales/`
- `superadmin_messaging_mocks/`
- `superadmin_messaging_constants/`
- `superadmin_messaging_schemas/`
- `superadmin_messaging_tests/`
- `superadmin_messaging_types/`
- `../superadmin_messaging_url_config.ts`
- `superadmin_messaging_utils/`
- `superadmin_messaging_whatsapp_api/`
- `superadmin_messaging_whatsapp_components/`
- `superadmin_messaging_whatsapp_mocks/`
- `superadmin_messaging_whatsapp_tests/`
- `superadmin_messaging_whatsapp_types/`
- `superadmin_messaging_whatsapp_utils/`

### Current root files
- `../error.tsx`
- `../loading.tsx`
- `../not-found.tsx`
- `../page.tsx`
- `../superadmin_messaging_features.md`
- `../superadmin_messaging_forbidden.md`
- `superadmin_messaging_repair_map.md`
- `superadmin_messaging_template_insights_features.md`
- `superadmin_messaging_template_insights_forbidden.md`
- `superadmin_messaging_template_insights_repair_map.md`
- `superadmin_messaging_template_insights_theme_contract.md`
- `../superadmin_messaging_theme_contract.md`
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

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.
