# superadmin_messaging — Feature Map

## Module Purpose
The Messaging module provides Superadmins with tenant-scoped outbound messaging and notification management, including the supplied WhatsApp operational center. Users can search/filter tenant messages, compose email/SMS/in-app messages, mark notifications read, mark all notifications read, and operate the WhatsApp campaign/queue/audience/template/history flows included in the supplied module. Server data remains in TanStack Query and browser-facing controls are localized through the module-owned `en` and `hi` catalogs. The module must never leak transport exceptions into the UI.

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
Create: sendMessage and createWhatsAppCampaign. Read: fetchMessages, fetchNotifications, fetchTenants, fetchMessagingTemplateInsights, fetchWhatsAppBulkCenter. Update: notification read-state mutations and other supplied server-state updates. Delete: not supported by the supplied messaging contract.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_messaging_api/` | feature-owned API clients and server operations | SuperadminMessagingApi.ts, SuperadminMessagingTemplateInsightsApi.ts |
| `superadmin_messaging_components/` | page and interaction presentation, including modals/tables | SuperadminMessagingComposeModal.tsx, SuperadminMessagingDateRangePicker.tsx, SuperadminMessagingMain.tsx, SuperadminMessagingMessagesTab.tsx, SuperadminMessagingNotificationsTab.tsx, SuperadminMessagingTenantDropdown.tsx, SuperadminMessagingV1CampaignEngagementPanel.tsx, SuperadminMessagingV1TemplateLibraryPanel.tsx |
| `superadmin_messaging_constants/` | static UI/business mappings with no server state | SuperadminMessagingConstants.ts, SuperadminMessagingDateRangeConstants.ts |
| `superadmin_messaging_locales/` | module-local `en`/`hi` translations | en.json, hi.json |
| `superadmin_messaging_mocks/` | MSW handlers and deterministic fixtures | directory-specific files |
| `superadmin_messaging_query_keys/` | TanStack Query key registry preserving resource identity | SuperadminMessagingQueryKeys.ts |
| `superadmin_messaging_schemas/` | client request/form Zod contracts | SuperadminMessagingComposeSchema.test.ts, SuperadminMessagingComposeSchema.ts, SuperadminMessagingSchema.ts |
| `superadmin_messaging_tests/` | co-located module tests | SuperadminMessagingBasic.test.tsx, SuperadminMessagingDateRangeUtils.test.ts, SuperadminMessagingTemplateInsights.test.ts |
| `superadmin_messaging_types/` | domain/API/form/view contracts | SuperadminMessagingComposeModalTypes.ts, SuperadminMessagingComposeTypes.ts, SuperadminMessagingDateRangePickerTypes.ts, SuperadminMessagingDateRangeTypes.ts, SuperadminMessagingMessagesTabTypes.ts, SuperadminMessagingNotificationIconTypes.ts, SuperadminMessagingNotificationMutationTypes.ts, SuperadminMessagingNotificationsTabTypes.ts |
| `superadmin_messaging_url_config.ts` | centralized backend and route URL sources | superadmin_messaging_url_config.ts |
| `superadmin_messaging_utils/` | utilities, formatters, and feature-local helpers | SuperadminMessagingDateRangeUtils.test.ts, SuperadminMessagingDateRangeUtils.ts, SuperadminMessagingStatusBadgeConfig.test.ts, SuperadminMessagingStatusBadgeConfig.ts, SuperadminMessagingFormatCurrency.test.ts, SuperadminMessagingFormatCurrency.ts, useSuperadminMessaging.test.ts, useSuperadminMessaging.test.tsx |
| `superadmin_messaging_whatsapp_api/` | WhatsApp-specific API boundary | SuperadminMessagingWhatsappApi.ts |
| `superadmin_messaging_whatsapp_components/` | WhatsApp-specific UI flows | SuperadminMessagingV1WhatsAppAudiencePanel.tsx, SuperadminMessagingV1WhatsAppBulkCenter.tsx, SuperadminMessagingV1WhatsAppCampaignHistoryPanel.tsx, SuperadminMessagingV1WhatsAppCampaignSummaryCards.tsx, SuperadminMessagingV1WhatsAppComposerPanel.tsx, SuperadminMessagingV1WhatsAppPreviewPanel.tsx, SuperadminMessagingV1WhatsAppQueuePanel.tsx, SuperadminMessagingV1WhatsAppTemplatePicker.tsx |
| `superadmin_messaging_whatsapp_mocks/` | WhatsApp MSW fixtures/handlers | directory-specific files |
| `superadmin_messaging_whatsapp_tests/` | WhatsApp co-located tests | SuperadminMessagingV1WhatsAppBulkCenter.test.tsx, SuperadminMessagingV1WhatsAppSchema.test.ts |
| `superadmin_messaging_whatsapp_types/` | WhatsApp types/contracts | SuperadminMessagingV1WhatsAppTypes.ts, SuperadminMessagingWhatsAppTypes.ts |
| `superadmin_messaging_whatsapp_utils/` | WhatsApp utilities and view models | SuperadminMessagingV1WhatsApp.test.ts, SuperadminMessagingV1WhatsAppUtils.test.ts, SuperadminMessagingV1WhatsAppUtils.ts, useSuperadminMessagingV1WhatsApp.test.ts, useSuperadminMessagingV1WhatsApp.test.tsx, useSuperadminMessagingV1WhatsApp.ts, useSuperadminMessagingV1WhatsAppCampaign.test.ts, useSuperadminMessagingV1WhatsAppCampaign.ts |

## Approved External Dependencies
### Application Infrastructure
- `frontend_superadmin/superadmin_layout` — API transport, global error boundary/theme/socket infrastructure already supplied by the role bundle.
- `@/components/ui/*` — zero-business-logic UI primitives.
- `@/lib/*` — formatting/logger/API primitives where imported by the module.
### Business Feature Dependencies
- None.
### Role-Level Business Dependencies
- None outside the explicitly approved `superadmin_layout` infrastructure.

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

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `createWhatsAppCampaign`
- `fetchMessagingTemplateInsights`
- `fetchWhatsAppBulkCenter`
- `superadminMessagingApi`

## UI Data Requirements
- Loading: module page/loading states and component-level pending states are explicit.
- Empty: module-specific empty copy is translated and has a recovery/CTA when an action is supported.
- Error: user-facing runtime errors use safe translated messages and retry actions; raw exception text is not rendered.
- Permission/security: backend authorization remains authoritative; frontend action visibility/disabled state must follow the supplied permission contract rather than inventing new roles.
- Responsive: authenticated shell geometry and mobile table/card treatments follow the global UI/UX source.

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases / AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

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


## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.


## V5 Repair Freshness

Current repair baseline: `frontend-superadmin-v5-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.
