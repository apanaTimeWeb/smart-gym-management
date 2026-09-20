# Superadmin Messaging Whatsapp â€” Feature Map

## Module Purpose
The messaging_whatsapp module is responsible for the Superadmin business workflow managing Messaging_whatsapp. It enables superadmins to view, monitor, and control the lifecycle and configurations of Messaging_whatsapp across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

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
| Superadmin Messaging Whatsapp | `/superadmin/messaging` | clear queue; click outside; complete; mark all read; mark read; open; select; send | `SuperadminMessagingTemplateInsightsApi.ts`, `SuperadminMessagingApi.ts`, `SuperadminMessagingWhatsappApi.ts` | Source-verified; host runtime pending |

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

## Edge Cases / AI Warnings
- **Strict Isolation**: Never import admin or manager components into messaging_whatsapp.
- **Destructive Actions**: Any deletion or modification of messaging_whatsapp records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for messaging_whatsapp do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

