# superadmin_profile — Feature Map

## Module Purpose
The Profile module manages the authenticated Superadmin personal profile, security settings, and asynchronous tenant data export request. It supports loading the current profile, editing profile fields, changing the password, toggling two-factor authentication, and requesting a background full-data export. Security-sensitive changes use validated forms, unsaved-change protection, and feature-owned mutation hooks rather than embedding API calls in presentation components. It does not create or delete user accounts.

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
Create: not supported. Read: fetchProfile. Update: updateProfile, updatePassword, updateTwoFactor. Asynchronous action: requestFullDataExport. Delete/offboarding mutation: not implemented because no exact offboarding API contract was supplied.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_profile_api/` | feature-owned API clients and server operations | SuperadminProfileApi.ts, SuperadminProfileDataExportApi.ts |
| `superadmin_profile_components/` | page and interaction presentation, including modals/tables | directory-specific files |
| `superadmin_profile_constants/` | static UI/business mappings with no server state | SuperadminProfileConstants.ts |
| `superadmin_profile_locales/` | module-local `en`/`hi` translations | en.json, hi.json |
| `superadmin_profile_mocks/` | MSW handlers and deterministic fixtures | directory-specific files |
| `superadmin_profile_query_keys/` | TanStack Query key registry preserving resource identity | SuperadminProfileQueryKeys.ts |
| `superadmin_profile_schemas/` | client request/form Zod contracts | SuperadminProfilePersonalFormSchema.ts, SuperadminProfileSchema.ts, SuperadminProfileSecurityFormSchema.ts |
| `superadmin_profile_tests/` | co-located module tests | SuperadminProfileBasic.test.tsx |
| `superadmin_profile_types/` | domain/API/form/view contracts | SuperadminProfileAvatarCardTypes.ts, SuperadminProfileDataExportTypes.ts, SuperadminProfilePersonalFormTypes.ts, SuperadminProfileSecurityFormTypes.ts, SuperadminProfileTypes.ts |
| `superadmin_profile_url_config.ts` | centralized backend and route URL sources | superadmin_profile_url_config.ts |
| `superadmin_profile_utils/` | utilities, formatters, and feature-local helpers | SuperadminProfileConstants.test.ts, SuperadminProfilePersonalFormSchema.test.ts, SuperadminProfileSecurityFormSchema.test.ts, useSuperadminProfilePage.test.ts, useSuperadminProfilePage.test.tsx, useSuperadminProfilePage.ts, useSuperadminProfileToggleTwoFactorMutation.ts, useSuperadminProfileUpdatePasswordMutation.ts |

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
| Root page | `frontend_superadmin/superadmin_profile` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1
Open Profile → fetch and render the current server profile → edit allowed profile fields → validate → submit with idempotency → reconcile the profile query.
### Flow 2
Open Password settings → validate current/new password rules → submit → expose only safe translated failure feedback.
### Flow 3
Toggle two-factor authentication → submit the security mutation → update the authoritative profile state without an optimistic security claim.

### Flow 4
Open Data Export & Offboarding → review ZIP/CSV background-processing notice → request full data export → receive 202-style started confirmation → await centralized `export.completed` WebSocket feedback. The destructive offboarding API itself remains blocked until an exact supplied contract exists.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `superadminProfileApi`

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
