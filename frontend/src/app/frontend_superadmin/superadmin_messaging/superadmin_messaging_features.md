# superadmin_messaging — Feature Map

## Module Purpose
The Messaging module provides Superadmins with tenant-scoped outbound messaging and notification management, including the supplied WhatsApp operational center. Users can search/filter tenant messages, compose email/SMS/in-app messages, mark notifications read, mark all notifications read, and operate the WhatsApp campaign/queue/audience/template/history flows included in the supplied module. Server data remains in TanStack Query and browser-facing controls are localized through the module-owned `en` and `hi` catalogs. The module must never leak transport exceptions into the UI.


## Routes

- Primary feature route: `/superadmin/messaging`
- Route ownership remains inside `superadmin_messaging`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminMessagingComposeModal.tsx`, `SuperadminMessagingDateRangePicker.tsx`, `SuperadminMessagingMain.tsx`, `SuperadminMessagingMessagesTab.tsx`, `SuperadminMessagingNotificationBell.tsx`, `SuperadminMessagingNotificationIcon.tsx`, `SuperadminMessagingNotificationsTab.tsx`, `SuperadminMessagingTenantDropdown.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `fetchMessages`, `fetchNotifications`, `fetchTenants`, `markAllNotificationsRead`, `markNotificationRead`, `sendMessage`.
- URL paths remain centralized in `superadmin_messaging_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_messaging_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_messaging_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest
- Next.js App Router route/page boundary as supplied.
- React + TypeScript.
- TanStack Query for server state and module query-key registries.
- Zod at form/API boundaries where the module contract defines schemas.
- next-intl with active `en` and `hi` module-local catalogs.
- React Hook Form for form workflows present in this module.
- MSW fixtures/handlers for frontend contract testing.
- Approved application infrastructure imported from `frontend_superadmin/superadmin_layout` and dumb UI primitives only.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchMessages`, `fetchMessagingTemplateInsights`, `fetchNotifications`, `fetchTenants`
- **Update / Action:** `markAllNotificationsRead`, `markNotificationRead`, `sendMessage`
- **Delete:** None identified in the owned API surface.

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
- `@/components/ui/MetricCard`
- `@/components/ui/Panel`
- `@/components/ui/ProgressBar`
- `@/components/ui/SearchableDropdown`
- `@/components/ui/Tooltip`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutSocketProvider`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes`

## Feature Inventory
| Feature | Route Ownership | What the User Can Do | Main API/Query Surface | Status |
|---|---|---|---|---|
| Root page | `frontend_superadmin/superadmin_messaging` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1
Open Messages → load notifications/messages/tenant scope → use debounced search and filters → paginate → retry translated error states when needed.
### Flow 2
Compose a tenant message → select tenant/channel → enter subject/body → validate with Zod → confirm unsaved changes when leaving → send once with idempotency → show authoritative response feedback.
### Flow 3
Open WhatsApp center → select tenant/audience/template → edit campaign content → submit with idempotency → reconcile queue/history state and render the server result.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## Data and State Architecture

- **Server state:** TanStack Query for API-backed async data where present.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **URL state:** `useUrlState` detected for shareable list/filter state.
- **Query-key registries:** `superadmin_messaging_constants/SuperadminMessagingQueryKeys.ts`
- **MSW handlers:** `superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers.ts`, `superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingV1MockHandlers.ts`, `superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers.ts`
- **MSW fixtures:** `superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingMockFixtures.ts`, `superadmin_messaging_mocks/superadmin_messaging_mocks_fixtures/SuperadminMessagingV1MockFixtures.ts`, `superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_fixtures/SuperadminMessagingV1WhatsAppMockFixtures.ts`

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `createWhatsAppCampaign`
- `fetchMessagingTemplateInsights`
- `fetchWhatsAppBulkCenter`
- `superadminMessagingApi`

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

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases and AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

- **Module API boundary:** All `messaging` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `messaging` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `messaging` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `messaging` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `messaging` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Component Responsibility Map
- Main/page composition components: render the page and assemble child views.
- Feature hooks/view-models: perform query/mutation orchestration and derived-state calculations.
- API files: define transport calls and response schemas.
- Types/schemas/constants: define contracts, validation, and static configuration only.
- Mocks/tests: encode the same frontend contract and recoverable interaction flows.

## Rule Compliance Checklist
- [x] Feature-prefixed folder hierarchy retained.
- [x] Query-key registry present.
- [x] URL configuration present.
- [x] API response schemas supplied at transport boundary where contracts exist.
- [x] No relative imports in production feature code.
- [x] No raw runtime exception text rendered to end users.
- [x] All intrinsic interactive controls carry `data-testid`, explicit button type, visible focus, and minimum touch sizing in AST audit.
- [x] Custom hook JSDoc coverage completed.
- [x] Active `en` and `hi` locales are module-local.
- [x] MSW handlers/fixtures remain module-owned.
- [ ] Host-wide CI/build/ESLint/Prettier/CODEOWNERS enforcement: `BLOCKED BY SUPPLIED SCOPE` because repository host configuration is not present in the supplied ZIP.
- [ ] Global token definition/Tailwind mapping verification: `BLOCKED BY SUPPLIED SCOPE` because the global theme/CSS host files are not present in the supplied ZIP.

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

## V13 Repair Freshness

Current repair baseline: `frontend-superadmin-v13-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.
