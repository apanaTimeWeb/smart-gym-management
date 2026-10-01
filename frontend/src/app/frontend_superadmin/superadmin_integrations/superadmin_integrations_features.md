# superadmin_integrations — Feature Map

## Module Purpose
The Integrations module gives Superadmins visibility into configured external integrations and a secure flow for generating API keys. It separates read-only integration discovery from the sensitive one-time secret-generation workflow. Generated secrets are shown only in the result state and are not rendered as a reusable hidden business store. The feature does not infer provider configuration or credentials beyond the supplied frontend contract.

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
Create: generateSuperadminApiKey creates a new API credential. Read: fetchIntegrations loads the integration inventory. Update: not supported by the supplied contract. Delete: not supported by the supplied contract.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_integrations_api/` | feature-owned API clients and server operations | SuperadminIntegrationsApi.ts, SuperadminIntegrationsApiCrudApi.ts |
| `superadmin_integrations_components/` | page and interaction presentation, including modals/tables | SuperadminIntegrationsGenerateApiKeyModal.tsx, SuperadminIntegrationsConnectionHealthPanel.tsx, SuperadminIntegrationsConnectionsEmptyState.tsx, SuperadminIntegrationsDeveloperAccessEmptyState.tsx, SuperadminIntegrationsMain.tsx, SuperadminIntegrationsPageHeader.tsx, SuperadminIntegrationsSummaryCards.tsx, SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx |
| `superadmin_integrations_constants/` | static UI/business mappings with no server state | SuperadminIntegrationsConstants.ts |
| `superadmin_integrations_locales/` | module-local `en`/`hi` translations | en.json, hi.json |
| `superadmin_integrations_mocks/` | MSW handlers and deterministic fixtures | directory-specific files |
| `superadmin_integrations_query_keys/` | TanStack Query key registry preserving resource identity | SuperadminIntegrationsQueryKeys.ts |
| `superadmin_integrations_schemas/` | client request/form Zod contracts | SuperadminIntegrationsSchema.ts |
| `superadmin_integrations_tests/` | co-located module tests | SuperadminIntegrationsGenerateApiKeyContract.test.ts, SuperadminIntegrationsBasic.test.tsx |
| `superadmin_integrations_types/` | domain/API/form/view contracts | SuperadminIntegrationsGenerateApiKeyTypes.ts, SuperadminIntegrationsKeyScopeTypes.ts, SuperadminIntegrationsTypes.ts, SuperadminIntegrationsUiTypes.ts, SuperadminIntegrationsRouteErrorTypes.ts |
| `superadmin_integrations_url_config.ts` | centralized backend and route URL sources | superadmin_integrations_url_config.ts |
| `superadmin_integrations_utils/` | utilities, formatters, and feature-local helpers | SuperadminIntegrationsConstants.test.ts, SuperadminIntegrationsStatusBadgeConfig.test.ts, SuperadminIntegrationsStatusBadgeConfig.ts, useSuperadminIntegrationsGenerateApiKey.test.ts, useSuperadminIntegrationsGenerateApiKey.ts, useSuperadminIntegrationsPage.test.ts, useSuperadminIntegrationsPage.test.tsx, useSuperadminIntegrationsPage.ts |

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
| Root page | `frontend_superadmin/superadmin_integrations` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1
Open Integrations → load current integrations → show integration-specific status and details.
### Flow 2
Choose Generate API Key → select tenant/scopes and enter a label → validate → confirm/guard dirty form → submit once with an idempotency key → display the returned one-time secret → close/reset safely.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `fetchIntegrations`
- `generateSuperadminApiKey`

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
