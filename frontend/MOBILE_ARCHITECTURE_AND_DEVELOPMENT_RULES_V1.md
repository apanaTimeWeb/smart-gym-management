# React Native Mobile Development Instructions — Enterprise / Industry Scale

> ⛔⛔⛔ **AI AGENT — MANDATORY ENFORCEMENT & INTEGRITY DIRECTIVE — READ FIRST** ⛔⛔⛔
>
> **VIOLATION OF ANY RULE IN THIS DOCUMENT = ARCHITECTURE FAILURE. ALL OUTPUT IS DISCARDED. MUST RESTART.**
>
> This document is the **absolute normative authority** for all React Native mobile code in this project. Every rule is MANDATORY unless the rule itself defines a named `NOT_APPLICABLE` condition with explicit evidence. The following words in this document carry their STRICTEST possible meaning:
>
> | Word | Meaning |
> |------|---------|
> | **MUST** | Absolute requirement — no exception, no omission, no interpretation |
> | **MUST NOT** | Absolute prohibition — no exception under any circumstance |
> | **FORBIDDEN** | Same as MUST NOT — harder emphasis |
> | **REQUIRED** | Same as MUST — mandatory deliverable |
> | **encouraged** / **preferred** | Still a **default requirement** — deviations require explicit documented justification |
> | **Optional** (sub-folders) | Only optional when the feature **genuinely has no such artifact** — omitting when the artifact exists = VIOLATION |
> | **except** / **unless** | Only a valid escape when ALL stated conditions for the exception are explicitly met and documented |
>
> **RULES APPLY TO THE ENTIRE DOCUMENT.** An AI that reads only the first half of this document and produces output is producing INCOMPLETE and INVALID output. Every rule from Rule 0A through Rule 67, the MOBILE DELIVERY FREEZE GATE, and the DEFINITION OF DONE is mandatory.
>
> ⛔ **BEFORE WRITING ANY CODE OR AUDIT FINDING, CONFIRM:**
> ```text
> [ ] Read complete MOBILE_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md (all 67+ rules)
> [ ] Confirmed TECHNOLOGY BASELINE — React Native Bare-Metal (New Architecture / Fabric + TurboModules)
> [ ] CRITICAL MOBILE STRUCTURE GATE passed — folder tree verified before any deeper rule
> [ ] Canonical feature structure confirmed (features/frontend_{role}/{module}/)
> [ ] File size ceilings verified (Screen 80 lines, Component 200 lines, Hooks/API 150 lines, Store 180 lines, Util 120 lines)
> [ ] MOBILE DELIVERY FREEZE GATE & DEFINITION OF DONE loaded into context
> ```
> **Failure to complete the above = entire output is discarded.**
>
> ⛔ **NO-PAUSE ON MISSING RUNTIME / HOST CAPABILITY (MANDATORY ANTI-STALL RULE):**
> Unavailability of a physical mobile device, Android/iOS emulator, Metro bundler, or Maestro E2E test runner is NEVER a reason to pause, stall, abort, or declare mobile code creation, audit, or repair "BLOCKED". The AI MUST fix every issue that can be resolved in source files (screens, components, custom hooks, Zustand stores, Zod schemas, URL configs, query key factories, MSW mock fixtures, documentation trio) in this session. Only live device/emulator execution or live Maestro runner execution is designated as `DEFERRED_TO_HOST_RUNTIME`. Missing runtime is strictly forbidden as a reason to pause.
> ⛔ **OFFLINE / STATIC SCORING DIRECTIVE:** When live mobile device or simulator execution is unavailable in the execution environment, ratings (1 to 10) MUST evaluate **Static Architecture & Code Completeness**. The AI MUST NOT penalize, artificially deduct points, or refuse to rate simply because a physical device or emulator is absent. State the Static Compliance Rating directly (up to 10.0), noting dynamic execution separately as `DEFERRED_TO_HOST_RUNTIME`.

## CRITICAL MOBILE STRUCTURE GATE (NON-NEGOTIABLE)

> ⛔ **STRUCTURE INVARIANT & REPAIR PROTOCOL:**
> - **In Audit Mode:** Failing ANY item = ARCHITECTURE FAILURE. Record `NON_COMPLIANT` with file and line evidence.
> - **In Repair Mode:** Structural violations (folder layout, thin screens, component naming, missing documentation trio) **MUST BE ACTIVELY REPAIRED FIRST (in RBG 1)** before repairing inner feature code.
> - **ANTI-STALL DIRECTIVE:** Structural non-compliance is the reason repair is required — it is **STRICTLY FORBIDDEN** to use structural violations as an excuse to halt, stall, refuse to repair, or declare code repair impossible.

Before generating, auditing, or repairing ANY mobile feature module, verify ALL of the following:

| Verification Item | Requirement | Consequence of Failure |
|---|---|---|
| **Role Container** | Must be `src/features/frontend_{role}/` (e.g., `src/features/frontend_admin/`) | Unprefixed role container = ARCHITECTURE VIOLATION. In repair: move to canonical prefix in RBG 1. |
| **Canonical Feature Module** | Must be `src/features/frontend_{role}/{role}_{module}/` (e.g., `src/features/frontend_manager/manager_members/`) — path MUST start with `src/features/` and module MUST be prefixed with role name | Unprefixed or wrong-path placement = NON_COMPLIANT. In repair: relocate and rename in RBG 1. |
| **Thin Screen Composition** | Screens in `screens/` MUST only compose components; hard maximum **80 lines**; ZERO business logic, state calculations, or direct API calls. Screen renders `<SafeAreaView>`, `<StatusBar>`, extracts route params, and renders ONE `[Role][Module][Screen]MainView.tsx` component. | Heavy screen = ARCHITECTURE VIOLATION. In repair: extract to MainView component in RBG 1. |
| **Prefixed Component Files** | Components in `components/` MUST use PascalCase with **Role+Module** prefix (e.g., `ManagerMembersMemberCard.tsx`, NOT `MembersMemberCard.tsx`). Max **200 lines**. | Unprefixed or role-missing component = NON_COMPLIANT. In repair: rename to Role+Module prefixed in RBG 1. |
| **Feature Custom Hooks** | Hooks in `hooks/` MUST use camelCase with `use` + **Role+Module** name (e.g., `useManagerMembers.ts`, `useManagerMembersFilters.ts`). Max **150 lines**. | Generic or role-missing hook name = NON_COMPLIANT. In repair: rename to Role+Module hook in RBG 1. |
| **Root Quarantine** | The feature root MUST contain ONLY the three documentation files: `[role_module]_features.md`, `[role_module]_forbidden.md`, and `[role_module]_theme_contract.md`. All source artifacts MUST live inside canonical sub-folders. | Loose source files at feature root = NON_COMPLIANT. In repair: move to correct sub-folder in RBG 1. |
| **Central Hardware Secure Storage** | Auth tokens, refresh tokens, biometric keys MUST use iOS Keychain / Android Keystore via `react-native-keychain`. NEVER `AsyncStorage`. | Tokens in AsyncStorage = CRITICAL SECURITY AUDIT FAILURE. In repair: replace with `react-native-keychain` wrapper in RBG 1. |
| **Module Documentation Trio** | Every feature MUST contain `[featureName]_features.md`, `[featureName]_forbidden.md`, and `[featureName]_theme_contract.md`. | Missing doc artifact = INCOMPLETE MODULE. In repair: generate missing docs from source in RBG 1. |
| **Centralized URL Config** | `config/[featureName].url_config.ts` MUST exist and define all routes and API endpoints as `as const`. | Missing URL config = HARDCODED ROUTE RISK. In repair: generate centralized URL config in RBG 1. |
| **Query Key Registry** | `api/[featureName].query_keys.ts` or `config/[featureName].query_keys.ts` MUST exist and namespace all TanStack Query keys with resource identity. | Missing query key factory = CACHE INCONSISTENCY RISK. In repair: create query key registry in RBG 1. |
| **Zero Cross-Feature Imports** | A feature MUST NOT import business components, hooks, or state from sibling features. | Sibling import = VIOLATION OF RULE 28. In repair: duplicate the required business artifact locally inside the owning feature module (Strict WET Principle) in RBG 1. Moving business logic to `src/core/` is STRICTLY FORBIDDEN. |

> ⛔ **Skipping this gate invalidates all downstream compliance results.**

---

This document defines the canonical architecture and development rules for a React Native bare-metal application. React Native is the normative implementation target for this project. Use React Native New Architecture (Fabric + TurboModules). No alternative framework is part of the normative implementation rules. React Native bare-metal is the only supported implementation target.

---

## BARE-METAL REACT NATIVE — LOCKED NPM PACKAGE REGISTRY

> ⛔ **AI AGENTS: You MUST ONLY use packages from this table. Adding any package NOT listed here requires explicit written justification in `_features.md` under `## Approved External Dependencies`. Expo packages (`expo-*`, `@expo/*`) are STRICTLY FORBIDDEN in bare-metal projects unless the specific package is listed below.**

| Category | Approved Package | Notes |
|---|---|---|
| **Navigation** | `@react-navigation/native` | Core navigation |
| **Navigation** | `@react-navigation/native-stack` | Native stack navigator |
| **Navigation** | `@react-navigation/bottom-tabs` | Bottom tab navigator |
| **Navigation** | `@react-navigation/drawer` | Drawer navigator |
| **Safe Area** | `react-native-safe-area-context` | SafeAreaView + useSafeAreaInsets |
| **Screens** | `react-native-screens` | Required by React Navigation |
| **Lists** | `@shopify/flash-list` | Virtualized lists (preferred over FlatList for >20 items) |
| **Images** | `react-native-fast-image` | Cached, optimized image loading |
| **Haptics** | `react-native-haptic-feedback` | Haptic feedback (NOT expo-haptics) |
| **Permissions** | `react-native-permissions` | All device permissions (NOT expo-permissions) |
| **Icons** | `lucide-react-native` | 100% icon symmetry with Web (lucide-react) |
| **Bottom Sheet** | `@gorhom/bottom-sheet` | Native bottom sheets |
| **Date Picker** | `@react-native-community/datetimepicker` | Platform-native date/time picker |
| **Secure Storage** | `react-native-keychain` | iOS Keychain / Android Keystore — auth tokens ONLY |
| **Fast Storage** | `react-native-mmkv` | Non-sensitive prefs and cache |
| **Charts** | `react-native-gifted-charts` | All charts — canonical library |
| **Animations** | `react-native-reanimated` | UI-thread animations |
| **Gestures** | `react-native-gesture-handler` | Swipe/pan/pinch gestures |
| **Server State** | `@tanstack/react-query` | TanStack Query v5 |
| **Client State** | `zustand` | Feature-scoped stores |
| **Forms** | `react-hook-form` | v7 only |
| **Validation** | `zod` | Schema validation |
| **HTTP Client** | `axios` | Central network client |
| **Mocking** | `msw` | MSW for React Native |
| **Testing** | `@testing-library/react-native` | Component tests |
| **Testing** | `jest` | Unit tests |
| **E2E** | `maestro` | E2E YAML test runner |
| **Clipboard** | `@react-native-clipboard/clipboard` | Copy to clipboard |
| **Status Bar** | `react-native` (built-in StatusBar) | Use built-in StatusBar component |
| **Fonts** | `react-native` font linking | Link fonts via native build — no expo-font |
| **Crash Reporting** | `@sentry/react-native` | Crash monitoring |
| **i18n** | `react-i18next` + `i18next` | Internationalization |

> ⛔ **FORBIDDEN packages (common AI hallucination traps):**
> `expo-font`, `expo-status-bar`, `expo-haptics`, `expo-permissions`, `expo-date-picker`, `@expo/vector-icons`, `react-native-vector-icons` (use `lucide-react-native` instead), `react-native-elements`, `native-base`

## CODE & COMPONENT ISOLATION DECISION MATRIX (STRICT WET VS SHARED INFRASTRUCTURE)

> ⛔ **AI AGENTS: Before deciding whether to share or duplicate any component, hook, utility, or constant across roles or modules, you MUST consult this matrix. Guessing is PROHIBITED.**

| Scenario | Classification | Required Decision |
|---|---|---|
| Pure UI primitive with zero business knowledge (Button, Input, Modal shell, Spinner) | `ZERO_BUSINESS_PRIMITIVE` | SHARE in `src/core/ui/` — no duplication permitted |
| UI component that knows any business status, label, or domain value (StatusBadge with gym states, PaymentBadge) | `BUSINESS_AWARE_COMPONENT` | DUPLICATE per feature module — SHARING IS STRICTLY PROHIBITED |
| Hook that fetches or mutates domain data (useManagerMembers, useAdminStats) | `DOMAIN_HOOK` | DUPLICATE per feature module — SHARING IS STRICTLY PROHIBITED |
| Hook that wraps pure infrastructure (useDebounce, usePagination with zero domain types) | `INFRASTRUCTURE_HOOK` | SHARE in `src/core/hooks/` — PERMITTED shared infrastructure only |
| Zod schema or TypeScript type describing a business entity | `DOMAIN_TYPE` | DUPLICATE per feature module — SHARING ACROSS ROLES IS STRICTLY FORBIDDEN |
| API client function (fetchMembers, createInvoice) | `DOMAIN_API_CLIENT` | DUPLICATE per feature module — SHARING IS STRICTLY PROHIBITED |
| Zustand store slice with domain state | `DOMAIN_STORE` | DUPLICATE per feature module — SHARING IS STRICTLY PROHIBITED |
| Constants file with business-specific values (STATUS_OPTIONS, PLAN_TYPES) | `BUSINESS_CONSTANTS` | DUPLICATE per feature module — SHARING IS STRICTLY PROHIBITED |
| Constants file with zero-domain values (DEBOUNCE_MS, PAGE_SIZE_OPTIONS) | `INFRA_CONSTANTS` | SHARE in `src/core/constants/` — PERMITTED shared constants only |
| Currency formatter with business-domain knowledge | `DOMAIN_UTILITY` | DUPLICATE per feature module as `[module]FormatCurrency.ts` — SHARING IS STRICTLY PROHIBITED |
| Utility with no business domain knowledge (formatDate, displayValue) | `INFRA_UTILITY` | SHARE in `src/core/utils/` — PERMITTED shared utility only |
| Same UI feature needed in Admin AND Manager | `CROSS_ROLE_FEATURE` | DUPLICATE the complete feature in each role module (Strict WET is MANDATORY) |

**Decision Invariants:**
- If the code contains ANY reference to a business entity, status, label, or domain type → it is `BUSINESS_AWARE` → it MUST be duplicated per feature. Sharing is a CRITICAL ISOLATION VIOLATION.
- `formatCurrency` is ALWAYS `DOMAIN_UTILITY` — it MUST be feature-local (`[feature]/utils/[module]FormatCurrency.ts`), never in `src/core/`.
- When in doubt, DUPLICATE. Over-isolation is always compliant; sharing business logic is NEVER permitted.

---

## Rule 0A — Feature Module Is the AI Repair Boundary

```text
APPLICATION
  └── ROLE CONTAINER (Prefixed with frontend_)
        └── FEATURE MODULE
              └── SUB-FEATURE / USE CASE
```

AI Repair Boundary = FEATURE MODULE
Role Container = NOT the repair boundary

## Rule 0A.1 — FRONTEND NAMESPACE PREFIXING (MANDATORY)

Because the project contains a 1-to-1 mapping of frontend and backend roles, the AI MUST explicitly separate frontend folders from backend folders.
- **The Rule:** EVERY top-level frontend role container or domain folder MUST be prefixed with `frontend_`.
- **Primary Examples:** `frontend_admin/`, `frontend_manager/`, `frontend_superadmin/`.
- **Why?** If an AI is told to "fix the manager billing bug" and the context contains `manager/billing/`, it may hallucinate and write backend NestJS code inside a frontend /React Native file. By strictly enforcing `frontend_manager/billing/`, there is zero ambiguity for the AI or the human developer.

Examples of ROLE CONTAINERS:
```text
features/frontend_admin/
features/frontend_manager/
features/frontend_superadmin/
features/frontend_trainer/
```
The exact names will differ by project, but the `frontend_` prefix is non-negotiable for root containers.

## Rule 0A.2 — MOBILE CONTEXT ISOLATION (MANDATORY)

For every mobile create, audit, repair, or implementation task, the AI MUST use only:

1. This mobile architecture/development document.
2. `MOBILE_UI_UX_DESIGN.md` when the design system is supplied as a separate document.
3. The supplied target feature/requirements document and its API contract.

The AI MUST NOT require, import, infer, or reference rule numbers from:
- Web frontend architecture documents
- Web frontend UI/UX documents
- Backend architecture documents
- Backend create/audit/repair prompts

Mobile rules are authoritative for mobile.

If a required mobile behavior is not defined by these mobile documents or the supplied feature contract, the AI MUST mark the requirement as `CONTRACT_MISSING` / `BLOCKED_BY_SUPPLIED_SCOPE` rather than inventing behavior.

---

## Rule 0A.3 — PRIMARY NAVIGATION 1-TO-1 FEATURE MODULE MAPPING & ISOLATED REPAIR HAND-OFF (MANDATORY)

> ⛔ **UNIVERSAL APPLICABILITY ACROSS ALL ROLES: This law applies globally, equally, and strictly to EVERY mobile role application (e.g., `frontend_admin`, `frontend_manager`, `frontend_trainer`, `frontend_member`, and any future mobile role). Any specific module names (such as `manager_attendance`, `trainer_schedule`, or `member_workouts`) referenced below are non-exhaustive concrete illustrations.**

To guarantee that any AI agent or mobile developer can repair, test, or expand a mobile feature without app-wide regression, the mobile architecture enforces strict 1-to-1 isomorphism between primary navigation destinations and filesystem feature modules:

1. **The 1:1 Navigation Law (Bottom Tabs / Drawer Items):**
   - Every primary destination present in ANY mobile role's primary navigation MUST map strictly 1-to-1 to an autonomous, self-contained feature folder directly under the role container: `src/features/frontend_{role}/{role}_{feature}/` (e.g., `src/features/frontend_manager/manager_members/`).
   - Merging distinct primary navigation tabs into a single mega-module (e.g., combining Attendance and Members, or Schedule and Workouts) is STRICTLY PROHIBITED.
   - Creating disjoint root-level folders for sub-screens or detail flows belonging to a navigation tab is STRICTLY PROHIBITED.

2. **100% Domain Self-Containment Inside the Feature Folder:**
   - When a user taps a navigation tab (e.g. Attendance ➔ `AttendanceScreen`, Schedule ➔ `ScheduleScreen`), **100% of the UI, state, and logic for that capability MUST reside INSIDE that single folder**:
     - Screen entries: `*Screen.tsx` (Thin orchestrators under 80 lines)
     - Components / Widgets: Feature-specific cards, list items, bottom sheets, headers, modals (under 200 lines)
     - Custom Hooks / Controllers: Feature data-fetching, mutation, and UI state hooks (under 150 lines)
     - Domain contracts: Types (`.types.ts`), Zod schemas (`.schemas.ts`), constants, formatting utilities
     - State management: Atomic Zustand stores or context providers (under 180 lines)
     - API services: REST/GraphQL queries and mutations (`.api.ts`)
     - Testing & Mocks: Unit/widget tests and mock fixtures
     - Local contract documentation: `[role_module]_features.md`, `[role_module]_forbidden.md`, `[role_module]_theme_contract.md`
   - ZERO cross-feature business imports: It is STRICTLY PROHIBITED for any feature module to import business components, hooks, stores, or types from any sibling feature (Rule 28).

3. **Isolated AI Repair Hand-Off (Single-Folder Boundary):**
   - If a bug, UI regression, or data issue occurs in ANY feature:
     - The developer or host system MUST provide **ONLY** that single feature module folder (`src/features/frontend_{role}/{role}_{feature}/`) to the AI agent.
     - The AI agent will audit, repair, test, and package that module in complete isolation.
     - Demanding host application root files (`package.json`, root `tsconfig.json`, `app.json`, root navigation container) or sibling feature folders is a **CRITICAL SCOPE CREEP VIOLATION**.

4. **Feature-Owned Route Config & Stack Navigator (AI Zip Principle):**
   - Every feature module MUST own its internal screen route names and param types inside `config/{role_module}.url_config.ts` (e.g., `config/manager_members.url_config.ts`). This file exports both internal `SCREEN_ROUTES` constants and the feature's `ParamList` type.
   - Every primary tab/drawer feature module MUST own a thin **`[Role][Module]Navigator.tsx`** (e.g., `ManagerMembersNavigator.tsx`) inside its `screens/` folder. This navigator orchestrates the internal stack (List → Detail → Add screens) and any feature-level modals/bottom sheets.
   - `src/core/navigation/` (Root/BottomTab/Drawer Navigator) mounts ONLY the top-level tab/drawer entries. It consumes the feature navigator component — it MUST NOT define internal screen routes for individual features.
   - Global `src/core/navigation/routes.ts` defines ONLY top-level tab/drawer route names. Feature-internal screen names live exclusively in the feature's own `config/{role_module}.url_config.ts`.
   - **Why:** If a developer needs to add a new sub-screen to `manager_members`, they ZIP only `src/features/frontend_manager/manager_members/` and hand it to the AI. The AI finds all route definitions, param types, and the stack navigator inside that single folder — zero dependency on global files.

5. **Navigation Shell Isolation:**
   - Root navigation orchestrators (`RootNavigator`, `BottomTabNavigator`, `DrawerNavigator`) reside in `src/core/navigation/`.
   - Navigation orchestrators consume ONLY top-level route constants from `src/core/navigation/routes.ts` and feature navigator components. They MUST NOT import business state, business components, or domain hooks from feature modules.
   - If an issue occurs with tab switching, deep linking config, or drawer presentation, the repair context is STRICTLY `src/core/navigation/`, NEVER individual feature modules.

---

## Rule 0B — Hard Feature Write Boundary

For a feature-specific task:
Default writable scope = `[owning-feature]/**`

AI MUST NOT modify:
- a sibling feature
- another role's feature
- another domain's business code
- global business folders

Only explicitly approved core/infrastructure files may be changed.

CI Mechanical Gate: The CI pipeline MUST include a mechanical diff gate (e.g., a script or tool) that explicitly fails the build if changes leak outside `[owning-feature]/**` without an authorized infrastructure exception. Import linting is insufficient; file modifications themselves must be constrained.

---

## Rule 0C — Explicit Expected-Product-Surface Audit Procedure

When the AI is tasked with auditing or repairing an existing mobile codebase (e.g., an existing ZIP), it MUST execute the following completeness protocol before generating code:

1. **EXPECTED MOBILE UI:** Analyze the supplied product requirements, API contract, and UI/UX design to discover the exact expected product surface. This includes discovering all necessary screens, modals, bottom sheets, navigation flows, forms, buttons, dropdowns, list views, and error states required by the feature.
2. **ACTUAL MOBILE UI:** Compare the `EXPECTED MOBILE UI` against the actual UI elements implemented in the supplied mobile codebase.
3. **MISSING:** Document any elements present in the `EXPECTED MOBILE UI` that are missing from the `ACTUAL MOBILE UI` (e.g., "The API contract expects a Superadmin chart and role-selection dropdown, but the existing codebase only implements a list view without a dropdown").
4. **REPAIR:** Implement the missing UI elements, integrating them correctly into the existing feature using the Mobile Architecture and Mobile UI/UX Design System. Do not merely report the missing elements — repair them.

The AI is explicitly forbidden from inventing missing features that are not defined by the supplied product requirements, API contract, or UI/UX design. The AI must preserve existing compliant functionality during the repair.

## Rule 0D — Change Scope Failure Condition

If an AI repair attempts to modify business logic in a sibling feature module to fulfill a requirement of the current feature module, the architecture gate FAILS. Feature isolation is absolute.

## Rule 1 — Micro-Modularization (One Feature = One Self-Contained Folder)

This is the most important structural rule. **One feature = one self-contained folder.**
If there is a bug in `manager_members`, you drag ONLY the `src/features/frontend_manager/manager_members/` folder to the AI.
Everything the AI needs — components, hooks/controllers, schemas, types, API, state,
tests, and the context file — lives inside that single folder. Zero need to open any other folder.

- One component/widget = one file. One file = one responsibility — never mix
  data-fetching, business logic, and presentation in the same file.
- Every feature lives ENTIRELY inside its own feature folder. Nothing feature-specific
  exists outside it.
- **Screen + MainView Pattern (80-line ceiling compliance):** `*Screen.tsx` (≤80 lines) renders ONLY `<SafeAreaView>`, `<StatusBar>`, route param extraction, and ONE `[Role][Module][Screen]MainView.tsx` component (inside `components/`, ≤200 lines). The MainView orchestrates all hooks, loading/empty/error states, and child components. This is the mobile equivalent of Web's `page.tsx` + `[ModuleName]Main.tsx` pattern.

### File Size Ceilings (Hard Ceilings — Zero Exceptions)

Any file exceeding its ceiling triggers an immediate `FILE_SIZE_VIOLATION` gate stop. Decompose immediately into focused sub-components or sub-hooks within the same feature folder. Never bypass this rule with artificial line wrapping or minification.

| File Type | Maximum Lines | Action When Exceeded | Consequence of Violation |
|---|---|---|---|
| Screen / Route entry point (`*Screen.tsx`) | **80 lines** | Extract widgets, layout wrappers, and query calls into feature sub-components and custom hooks | **HARD STOP** — PR/Task Blocked |
| Feature Component / Widget | **200 lines** | Extract sub-components (e.g., `MembersHeader`, `MembersCard`, `MembersList`) | **HARD STOP** — PR/Task Blocked |
| Custom Hook / Service Hook / Controller | **150 lines** | Split query, mutation, and local UI state into focused single-responsibility hooks | **HARD STOP** — PR/Task Blocked |
| Validation Schema / Validator class | **150 lines** | Split form schemas by sub-step or domain entity (e.g., `memberBaseSchema`, `memberBillingSchema`) | **HARD STOP** — PR/Task Blocked |
| API service file (`.api.ts`) | **150 lines** | Separate queries from mutations or split by sub-resource endpoint | **HARD STOP** — PR/Task Blocked |
| State Store / Context Provider / Notifier | **180 lines** | Decompose giant slices into atomic domain slices; use selector hooks | **HARD STOP** — PR/Task Blocked |
| Type / Model file (`.types.ts`) | **150 lines** | Split entity models, request payload types, and UI state types | **HARD STOP** — PR/Task Blocked |
| Utility / Formatter file | **120 lines** | Extract pure formatting functions into single-purpose utility modules | **HARD STOP** — PR/Task Blocked |

If a file exceeds its ceiling: split by **feature responsibility**, not randomly by line count.
Never create dumping folders named `helpers/`, `common/`, or `misc/`.
Keep all split files inside the **same feature folder**.

### Canonical Feature Folder Structure

All application source examples in this document use React Native TypeScript:
`*.ts` / `*.tsx`.
```
src/features/
├── frontend_admin/
│   └── admin_members/
├── frontend_manager/
│   └── manager_members/
└── frontend_trainer/
    └── trainer_members/                  ← entire feature lives here
        ├── screens/                      ← thin composition only (≤80 lines each)
        │   ├── TrainerMembersListScreen.tsx      ← renders <SafeAreaView>+<StatusBar>+<TrainerMembersListMainView/>
        │   ├── TrainerMembersDetailScreen.tsx    ← renders <SafeAreaView>+<StatusBar>+<TrainerMembersDetailMainView/>
        │   ├── TrainerMembersAddScreen.tsx       ← renders <SafeAreaView>+<StatusBar>+<TrainerMembersAddMainView/>
        │   └── TrainerMembersNavigator.tsx       ← feature-owned stack navigator
        ├── components/
        │   ├── TrainerMembersListMainView.tsx    ← ≤200 lines — main orchestrator for list screen
        │   ├── TrainerMembersDetailMainView.tsx  ← ≤200 lines — main orchestrator for detail screen
        │   ├── TrainerMembersAddMainView.tsx     ← ≤200 lines — main orchestrator for add screen
        │   ├── TrainerMembersMemberCard.tsx      ← Role+Module prefixed
        │   ├── TrainerMembersMemberCard.test.tsx
        │   ├── TrainerMembersMemberListItem.tsx
        │   └── TrainerMembersEmptyState.tsx
        ├── hooks/
        │   ├── useTrainerMembers.ts             ← Role+Module prefixed
        │   ├── useTrainerMembers.test.ts
        │   ├── useTrainerMembersFilters.ts
        │   └── useTrainerMembersFilters.test.ts
        ├── schemas/
        │   └── trainer_members.schema.ts
        ├── types/
        │   └── trainer_members.types.ts
        ├── api/
        │   ├── trainer_members.api.ts
        │   └── trainer_members.query_keys.ts
        ├── config/
        │   └── trainer_members.url_config.ts  ← internal routes + API endpoints
        ├── mocks/
        │   ├── trainer_members.fixtures.ts    ← initial seed data (mutable in-memory)
        │   └── trainer_members.handlers.ts    ← MSW handlers that mutate in-memory state
        ├── state/
        │   └── trainer_members.store.ts
        ├── tests/
        │   └── trainer_members.integration.test.ts
        ├── utils/
        │   └── trainerMembersFormatCurrency.ts  ← feature-local currency formatter (WET)
        ├── _locales/
        │   ├── trainer_members_en.json
        │   └── trainer_members_hi.json
        ├── trainer_members_features.md
        ├── trainer_members_forbidden.md
        └── trainer_members_theme_contract.md
```

### Hyper-Descriptive, Module-Prefixed Naming (AI Context Guarantee)

Every file name MUST make the feature identity immediately explicit. When you tag a file
in an AI prompt (e.g. `@MembersMemberCard.tsx`), the AI instantly knows which module
it belongs to — zero ambiguity, zero cross-module hallucination risk.

**Canonical filename grammar for the `trainer_members` feature (role = `trainer`, module = `members`):**

```
Screens (thin, ≤80 lines, Role+Module prefixed):
  TrainerMembersListScreen.tsx      ← renders SafeAreaView + StatusBar + TrainerMembersListMainView
  TrainerMembersDetailScreen.tsx
  TrainerMembersAddScreen.tsx
  TrainerMembersNavigator.tsx       ← feature-owned stack navigator

Main View Orchestrators (inside components/, ≤200 lines):
  TrainerMembersListMainView.tsx    ← Web equivalent of [ModuleName]Main.tsx
  TrainerMembersDetailMainView.tsx
  TrainerMembersAddMainView.tsx

Components / Widgets (PascalCase, Role+Module-prefixed):
  TrainerMembersMemberCard.tsx      ← Role+Module prefix MANDATORY
  TrainerMembersMemberListItem.tsx
  TrainerMembersEmptyState.tsx
  TrainerMembersListSkeleton.tsx

Hooks (camelCase with required `use` prefix + Role+Module name):
  useTrainerMembers.ts              ← Role+Module prefix MANDATORY
  useTrainerMembersFilters.ts
  useTrainerMembersSearch.ts

API / Types / Schema / Store / Config (dot-notation, role_module-prefixed, lowercase):
  trainer_members.api.ts
  trainer_members.types.ts
  trainer_members.schema.ts
  trainer_members.store.ts
  trainer_members.url_config.ts     ← lives inside config/ sub-folder
  trainer_members.query_keys.ts     ← lives inside api/ sub-folder

Mocks (mutable in-memory state):
  trainer_members.fixtures.ts       ← initial seed data array
  trainer_members.handlers.ts       ← MSW handlers that READ/MUTATE in-memory state

Feature-local utilities (WET — never shared to src/core/):
  trainerMembersFormatCurrency.ts   ← inside utils/ sub-folder

Locale files (co-located, NOT in global src/i18n/):
  _locales/trainer_members_en.json
  _locales/trainer_members_hi.json

Mandatory documentation files (feature root level):
  trainer_members_features.md
  trainer_members_forbidden.md
  trainer_members_theme_contract.md
```

**Why Role+Module prefix on EVERY file?** When you tag a file in an AI prompt (e.g. `@TrainerMembersMemberCard.tsx`), the AI instantly knows which role AND module it belongs to — zero ambiguity, zero cross-role hallucination risk. Without the role prefix, `useMembers.ts` in `frontend_admin/admin_members/` and `useMembers.ts` in `frontend_manager/manager_members/` are indistinguishable in AI context.

| Pattern | Example | Why permitted |
|---|---|---|
| `use` prefix on hooks | `useMembers.ts` | React/RN framework convention; feature name follows immediately |
| dot-notation API/type files | `members.api.ts` | Feature name IS the prefix, separated by dot |
| `*.integration.test.ts` suffix | `members.integration.test.ts` | Test type suffix is structural, feature still prefixed |
| `*_features.md`, `*_forbidden.md` | `members_features.md` | Mandatory doc format — feature name leads |
| `_locales/{lang}.json` | `_locales/en.json` | Standardized locale filename; feature ownership is established by the containing feature folder |

**What is forbidden regardless:**
```
❌ BAD:  Card.tsx, hook.ts, api.ts, store.ts, types.ts
❌ BAD:  useData.ts, loadItems.ts, getData.ts   ← no role\+module identity
✅ GOOD: TrainerMembersMemberCard.tsx, useTrainerMembers.ts, trainer_members.api.ts
```

**AI warning:** Do NOT rename `useMembers.ts` to `membersUseHook.ts` or similar to
"fix" the prefix. `useMembers.ts` is the correct, compliant filename.

- **No abbreviations:** Never `Btn`, `Nav`, `Util`. Use `Button`, `Navigation`, `Utility`.
- **Suffix by type:** `...Card`, `...List`, `...Form`, `...Modal`, `...Sheet`, `...EmptyState`.
- **Exported name = filename:** `MembersMemberCard.tsx` must export `MembersMemberCard`.
  No default exports with a different name — this prevents AI hallucination.
- **Props interfaces prefixed:** `export interface MembersMemberCardProps` — never generic `Props`.

### Role Isolation

Mobile role containers MUST remain isolated from one another.

A feature inside `frontend_admin/` MUST NOT be imported into
`frontend_manager/`, `frontend_superadmin/`, or `frontend_trainer/`.

Duplicate business-aware components when required for isolation.
Global UI primitives are permitted only when they contain zero business logic.

> **CRITICAL WARNING TO AI AGENTS:**
> Do NOT attempt to "DRY up" business components by moving them to global folders like `src/components/ui/` or `widgets/common/`.
> Components that contain domain-specific data/constants MUST be duplicated per feature, NEVER globalized.
> Global folders are strictly for dumb, zero-business primitives (like raw Buttons, Inputs, Dialogs).

```
features/
├── frontend_admin/
│   └── members/      ← AdminMembers — completely isolated
├── frontend_manager/
│   └── members/      ← ManagerMembers — isolated, even if visually similar
└── frontend_trainer/
    └── members/      ← TrainerMembers — isolated
```

## Rule 1A — Architectural Dependency & Interaction Rules

- **NO FAKE INTERACTION RULE:** A visible user interaction MUST produce its documented downstream behavior. Empty `onPress` handlers, `console.log`-only handlers, TODO handlers, fake success messages, and filters that do not affect data are explicitly **forbidden**. A user interaction is complete only when it triggers a handler → state change → API/domain action → success/error feedback → UI update.
- **Circular Dependency Rule:** The following architectural loops are forbidden: `A -> B -> A`, `Hooks -> Store -> Hooks`, `Components -> Components -> Parent`, and `API -> Hook -> API`. Every dependency chain MUST remain acyclic.
- **Dependency Direction Rule:** Dependency flow within a module MUST be unidirectional: `Screen -> Hooks -> API` OR `Screen -> Store`. Forbidden flows: `API -> Component`, `Store -> Component`, `Schema -> Component` (bypassing the hook).
- **Separation of Logic and UI:** Do not mix complex React logic (`useEffect`, data transformations) with JSX markup. Extract all heavy logic into a custom hook. The `Screen.tsx` or `Component.tsx` acts purely as a View layer consuming the hook.

## Rule 2 — Navigation

- Navigation MUST be declarative and centrally configured — a single navigation
  graph/router definition, not ad-hoc imperative pushes scattered across files.
- Every route takes typed parameters — no passing full objects through navigation;
  pass IDs and re-fetch inside the destination screen (see Rule 4).
- Deep linking must resolve through the SAME central route definition used for
  in-app navigation — never a second, separately maintained linking map.
- React Navigation is the canonical navigation framework for this React Native project.
  All navigation requirements in this document apply to React Navigation.
- Modals, bottom sheets, and nested tab/stack navigators must be defined once at
  the top of the navigation tree, not re-implemented per screen.

## Rule 3 — Styling & Design Tokens (No Magic Values, Anywhere)

- `MOBILE_UI_UX_DESIGN.md` serves as the single source of truth for both design specification and the executable token contract. Every color, spacing value, font size, radius, and shadow used in the code MUST come from the tokens defined in `MOBILE_UI_UX_DESIGN.md`. No raw hex codes, no arbitrary pixel/dp values typed directly into a component.
- Implementation uses React Native theme objects/configuration.
  The values and "no magic values" discipline are universal within the React Native application.
- There is no hover state on touch devices.
  React Native press/active states are allowed and MUST use the canonical press/active interaction tokens.
  Design and implement only press/active and disabled states, never hover-dependent interactions.
- Dark mode must use the SAME token names in light and dark variants so no
  component ever branches manually on "is dark mode" — the token resolves itself.

## Rule 4 — State Management (Server State vs Client State — Explicit Matrix)

**Two state ownership categories exist: Server State and Client State.**
Client state may be further subdivided into shared or local depending on scope.
Server state may optionally be persisted to local storage for offline use — persistence
is a *storage characteristic* of server state, not a third independent state category.
Do not invent a fourth ad-hoc pattern.

```text
State Ownership
├── Server State
│   └── optionally persisted to local storage (offline cache)
└── Client State
    ├── Shared (2+ components in one feature)
    └── Local (exactly one component)
```

| State Type | Category | Rule |
|---|---|---|
| Anything from an API (lists, details, counts, status) | **Server state** | Managed by TanStack Query v5 for React Native. Never duplicated into a separate "client" state container. **AI BAN:** `isLoading` is banned (use `isPending`). `onSuccess` inside `useQuery` is banned. For `useMutation`, `onSuccess: () => queryClient.invalidateQueries(...)` is **REQUIRED** inside the dedicated mutation hook — this is the canonical cache invalidation pattern (see Rule 60). |
| UI-only state shared across 2+ components in one feature | **Client state (shared)** | A lightweight, feature-scoped state container (e.g. Zustand). One container per feature — never one giant global store. |
| UI-only state used by exactly one component | **Client state (local)** | Local component state (`useState`/`useReducer` equivalent, or `React Component` local fields). |
| Data that must survive app restart offline | **Server state — persisted** | Only when explicitly required — server-state cache persisted to local storage. Must be documented in the feature's `_features.md` (Rule 24), including conflict-resolution strategy. Persistence does not make this a new category; it is still server state, stored locally. |

**Hard rule:** never copy API response data into the shared client-state
container "just in case." Components read server state directly through the
data-fetching layer, which handles request de-duplication and caching itself.

## Rule 4A — Derived Data Ownership Rule
Derived calculations (e.g., `fullName`, `membershipStatus`, `expiryIndicator`) MUST have exactly one owner.
- ✅ **Allowed:** Centralized in one place (a specific hook, model, or formatter).
- ❌ **Forbidden:** The same derivation logic repeated across multiple components, hooks, and list items.

## Rule 5 — Forms & Validation

- All non-trivial forms use a form-management library + a schema-validation
  library, kept separate from each other.
- **Enforced Stack:** React Hook Form (v7) + Zod. 
- **AI BAN:** The v6 `import { useForm, FormProvider }` without proper v7 register patterns is STRICTLY BANNED. Do not hallucinate legacy v6 patterns.
- Validation schema/rules live in the feature's `schemas/` (or `validators/`)
  folder — never written inline inside the widget/component.
- Client-side validation messages are for immediate UX feedback only. The
  backend's validation response (see Rule 7) is the final source of truth for
  what's actually accepted — never assume client validation alone is sufficient.

## Rule 5A — Interface, Schema, & TypeScript Strictness

- **Type Isolation (No Inline String Type Unions):** Never hardcode string type unions (e.g., `'idle' | 'loading' | 'success' | 'error'`) inline inside interfaces or component definitions. Always extract these into a named type in the module's `types/` folder.
- **No Barrel Files:** Place schemas and constants strictly in their respective folders (`schemas/`, `config/`). Do NOT create barrel files (`index.ts`) to re-export them. Import the specific file directly using absolute imports.
- **TypeScript Strictness:**
  - `any` is strictly forbidden. Use `unknown` and narrow safely.
  - `@ts-ignore` and `@ts-nocheck` are forbidden.

## Rule 6 — Secure Storage & Credential Handling

There is no browser `localStorage`/cookies on mobile. Classify every piece of
stored data and route it accordingly:

| Data type | Storage requirement |
|---|---|
| Auth tokens (JWT, refresh token), biometric keys, any credential | Hardware-backed secure storage ONLY — iOS Keychain / Android Keystore, accessed via a secure-storage library (e.g. `react-native-keychain`). Never anywhere else. |
| App preferences, non-sensitive cached data | Fast key-value or embedded database storage (e.g. `react-native-mmkv`). |
| Temporary session-only data | In-memory state only — cleared on app kill, never persisted. |

- Create exactly ONE central storage-access module per app. No other file may
  call the underlying secure-storage or key-value APIs directly — always go
  through this one module.
- Never log tokens, PII, or full request/response bodies containing sensitive
  fields — sanitize before any log line or crash-report breadcrumb.

## Rule 7 — API Layer & Error Handling

- ONE central network-client module for the whole app — one HTTP client
  instance, one place where auth headers, tenant headers (`x-tenant-id`), and
  correlation IDs are attached. No feature creates its own separate HTTP client.
- Every response is normalized into ONE canonical 8-field `ApiResponse<T>` shape:
  ```typescript
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    meta?: PaginationMeta;
    error?: string;
    errorCode?: string;
    statusCode?: number;
    validationErrors?: ValidationErrorItem[];
  }
  ```
  This matches the backend's canonical envelope exactly. There is NO second or partial mobile version.
  Every feature's API layer returns this shape — never raw, un-normalized responses.
- User-facing error messages come from the API `message` field —
  never hardcoded strings duplicated across screens.
- Authentication expiry (401) is handled by ONE centralized
  logout/token-refresh interceptor — never ad-hoc inside individual screens.

**Typed API Verb Contract:** Every function in a feature's `*.api.ts` MUST follow
the same explicit verb naming defined by the supplied feature API contract:
- `fetchMembers(params)` — paginated list
- `fetchMemberById(id)` — single entity
- `createMember(dto)` — POST creation
- `updateMember(id, dto)` — PATCH/PUT update
- `deleteMember(id)` — DELETE
- `exportMembersReport(params)` — report/export

**Non-CRUD Domain Action Verbs:** For domain actions that are not standard CRUD operations,
use the **exact operation name defined by the supplied feature/API contract**. Mobile architecture
MUST remain decoupled from server-side implementation details.
Only the external API operation/contract is authoritative.

```typescript
// Domain action verb examples — match the external API contract exactly:
renewMembership(memberId, dto)      // POST /api/v1/members/:id/renew
suspendMember(memberId, dto)        // POST /api/v1/members/:id/suspend
restoreMember(memberId)             // POST /api/v1/members/:id/restore
activateMember(memberId)            // POST /api/v1/members/:id/activate
assignTrainer(memberId, trainerId)  // POST /api/v1/members/:id/assign-trainer
```

AI agents must never invent arbitrary function names like `loadData()`, `getData()`,
`handleAction()`, or `doMemberThing()`. The mobile API function MUST strictly mirror the documented endpoint operation intent — no arbitrary aliasing.

## Rule 7A — Complete API Contract & UI Data Coverage

This rule defines the complete API-to-UI data coverage contract for mobile.
It closes the gap where incomplete API/mock responses cause mobile UI fields,
cards, lists, KPIs, charts, or relationships to render empty or undefined.

### The Required Chain

For every data-consuming feature, the following chain MUST be fully aligned before
the feature is considered complete:

```text
UI Requirement
      ↓
Feature API Contract (_features.md § API Contract)
      ↓
Type / Model (*.types.ts / models/*.)
      ↓
Schema / Validator (Zod schema or validator class)
      ↓
Mock / Stub Response (test boundary mock or API/server stub)
      ↓
Server-State Cache (TanStack Query)
      ↓
UI Rendering
```

### UI Data Coverage Requirement

Before creating or modifying a feature's API function or mock response, the AI agent
MUST inspect the complete consuming UI and identify the exact data required by:

- Every card and list-item field
- Every KPI / count / statistic widget
- Every chart and chart series
- Every filter, search, and sort parameter
- Every dropdown or picker option source
- Every detail-screen field
- Every modal / bottom-sheet field
- Every badge / status indicator
- Every relationship or reference displayed (e.g. plan name, owner name)
- Every pagination control
- Loading, empty, and error states

### Mutable In-Memory Mock State Mandate

When the backend is unavailable, the `mocks/` folder MUST maintain an in-memory mutable state store so that Create/Update/Delete operations produce real visible changes:

- **Create** → subsequent list refetch shows the new record
- **Update** → subsequent detail/list refetch shows changed values
- **Delete** → record disappears from subsequent list refetch

A toast-only mutation success that leaves the mock list unchanged is **FORBIDDEN**. The mock handlers MUST mutate the in-memory array so that when TanStack Query invalidates and refetches, the updated list is returned.

Structure inside `mocks/`:
- `[role_module].fixtures.ts` — initial seed data (exported mutable array)
- `[role_module].handlers.ts` — MSW handlers that read/mutate the in-memory state

```typescript
// mocks/manager_members.fixtures.ts
export let memberFixtures: Member[] = [
  { id: '1', name: 'Rahul Sharma', status: MemberStatus.ACTIVE, ... },
  { id: '2', name: 'Priya Singh', status: MemberStatus.EXPIRED, ... },
];

// mocks/manager_members.handlers.ts
http.post(MANAGER_MEMBERS_URLS.CREATE, async ({ request }) => {
  const dto = await request.json();
  const newMember = { id: uuid(), ...dto };
  memberFixtures.push(newMember); // ✅ MUTATES in-memory state
  return HttpResponse.json({ success: true, data: newMember });
}),
http.delete(MANAGER_MEMBERS_URLS.DELETE(':id'), ({ params }) => {
  memberFixtures = memberFixtures.filter(m => m.id !== params.id); // ✅ MUTATES
  return HttpResponse.json({ success: true, data: null });
}),
```

During the **feature-first development phase** (before a real API endpoint exists),
the mock response used in tests and development MUST:

1. Contain **every field** that the UI actually consumes — not just the fields
   convenient for initial development.
2. Include realistic value variation across multiple records:
   - Different statuses
   - Different plan/category combinations
   - Different dates and numeric values
   - Nullable/optional fields present and absent
   - Long text values where truncation is expected
   - Enough records to exercise pagination
3. Support an **empty-result scenario** (zero records) that visibly triggers the
   `EmptyState` component.
4. Support an **error scenario** that visibly triggers the error fallback.

### Forbidden: Minimal Mock / Stub

```text
❌ INVALID — UI needs all of these:
name, phone, membershipPlan, status, expiryDate, paymentStatus

Mock returns only:
id, name, status
→ Remaining fields render empty or undefined. FORBIDDEN.

✔ REQUIRED — Mock returns:
id, name, phone, membershipPlan, status, expiryDate, paymentStatus
→ Every rendered field has a source in the mock response.
```

### Forbidden: Component-Level Hardcoded Fallback Data

This pattern is **forbidden**:


```typescript
// ❌ React Native — FORBIDDEN
const planName = member.planName ?? 'Basic Plan';
const revenue = stats.revenue ?? 125000;
```

when those values are required fields of the API contract. Hardcoded fallback
business data hides an incomplete mock/API response. The correct fix is:

```text
UI requires field
→ update API contract in _features.md
→ update Type / Model
→ update Schema / Validator
→ update mock/stub response
→ render from response
```

### API Endpoint Transition Rule

When the real API endpoint becomes available:
- The UI MUST continue consuming the same API contract — no screen rewrites.
- The feature API client MUST remain the same unless the backend contract
  legitimately changes (see the supplied feature API contract).
- Any contract change MUST update the corresponding Type/Model, Schema/Validator,
  mock response, `_features.md` API Contract, and tests in the same change.

### Mutable In-Memory Mock State Mandate

When the backend is unavailable, the ``mocks/`` folder MUST maintain an in-memory mutable state store so that Create/Update/Delete operations produce real visible changes:

- **Create** \u2192 subsequent list refetch shows the new record
- **Update** \u2192 subsequent detail/list refetch shows changed values
- **Delete** \u2192 record disappears from subsequent list refetch

A toast-only mutation success that leaves the mock list unchanged is **FORBIDDEN**. The mock handlers MUST mutate the in-memory array so that when TanStack Query invalidates and refetches, the updated list is returned.

Structure inside ``mocks/``:
- ``[role_module].fixtures.ts`` \u2014 initial seed data (exported array)
- ``[role_module].handlers.ts`` \u2014 MSW handlers that read/mutate the in-memory state

### AI Verification Requirement

Before declaring a mobile feature complete, the AI MUST verify:

1. Every displayed data field has a documented source in `_features.md § API Contract`.
2. Every source field exists in the feature's Type/Model.
3. Every required field is present in the mock/stub response.
4. Every mock field is consumed correctly by the UI.
5. Cards and list items display populated values in all intended fields.
6. KPI and count widgets display non-placeholder values.
7. Charts receive complete series data.
8. Filters/search/sort/pagination produce different mocked results where applicable.
9. Empty state can actually be triggered.
10. Error state can actually be triggered.
11. No component contains hidden hardcoded business fallback data.
12. The feature works using the same API path that will be used with the real backend.

A feature MUST NOT be marked complete merely because the app builds or the screen
visually renders with placeholder values.

## Rule 7B — URL Config Contract

Every feature module MUST have exactly one `[moduleName].url_config.ts` (e.g., `members.url_config.ts`).

**Placement:** This file lives inside the feature's `config/` sub-folder (e.g., `src/features/frontend_manager/manager_members/config/members.url_config.ts`), NOT in the feature root.

**Separation of Concerns (no conflict with Rule 20):**
- **Base URL** (e.g., `https://api.example.com`) lives in Rule 20 infrastructure — defined per environment via native build configuration and set centrally in the network client. Feature modules MUST NOT define or read the base URL.
- **Endpoint paths** (e.g., `/api/v1/manager/members`) are feature-owned and MUST live in this file.

This file MUST export:
1. All API endpoint path strings as named constants.
2. A typed `MODULE_URLS` object grouping all endpoints.
3. NO hardcoded base URLs — only paths relative to the API base.
4. NO business logic — only URL path string definitions.

Example export shape:
```typescript
// src/features/frontend_manager/manager_members/config/members.url_config.ts
export const MEMBERS_URLS = {
  LIST:   '/api/v1/manager/members',
  DETAIL: (id: string) => `/api/v1/manager/members/${id}`,
  CREATE: '/api/v1/manager/members',
} as const;
```
This guarantees a single source of truth for endpoints and prevents scattered hardcoded URL strings inside the `*.api.ts` file.

## Rule 7C — Query Key Registry (Canonical Factory Pattern)

Every feature module MUST contain a dedicated query key registry file inside its `api/` or `config/` folder (e.g., `members.query_keys.ts`). This prevents the AI from inventing inconsistent, uncoordinated query keys like `['members']`, `['member']`, or `['member-list']`.

```typescript
// src/features/frontend_manager/manager_members/api/members.query_keys.ts
export const MEMBERS_QUERY_KEYS = {
  all:     ['manager_members'] as const,
  lists:   () => [...MEMBERS_QUERY_KEYS.all, 'list'] as const,
  list:    (filters: Record<string, unknown>) =>
             [...MEMBERS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...MEMBERS_QUERY_KEYS.all, 'detail'] as const,
  detail:  (id: string) =>
             [...MEMBERS_QUERY_KEYS.details(), id] as const,
};
```

### Resource Identity Preservation Rule

Whenever data belongs to a specific resource, query keys MUST include the resource identity.

```
❌ Forbidden:
  ['member']
  ['members']
  ['profile']

✅ Required:
  ['manager_members', 'detail', memberId]
  ['admin_attendance', 'list', { page: 1 }]
  ['manager_members', 'detail', gymId]
```

Two different resources MUST NOT share the same cache entry. Resource identity must remain consistent across:
```
Route → Selected Resource → Query Key → Request Parameter → API Response → Rendered UI
```
A route representing Resource A MUST NOT display cached data from Resource B. This is a **CRITICAL architectural violation**.

### Dedicated Mutation Hook Rule

Mutations MUST be orchestrated through dedicated, named mutation hooks (e.g., `useCreateMember.ts`, `useDeleteMember.ts`).
Screens and components MUST NEVER call `useMutation` directly or mix mutation logic inside JSX or Screen components.

```typescript
// ❌ BAD — mutation logic inlined in screen
function ManagerMembersAddScreen() {
  const { mutate } = useMutation({ mutationFn: createMember });
  // ...
}

// ✅ GOOD — dedicated mutation hook with onSuccess cache invalidation
// hooks/useCreateManagerMember.ts
export function useCreateManagerMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      // onSuccess IS REQUIRED here for cache invalidation — this is the canonical pattern
      queryClient.invalidateQueries({ queryKey: MANAGER_MEMBERS_QUERY_KEYS.lists() });
    },
  });
}
```

Cross-reference: Rule 60 (cache invalidation), Rule 7C (query key registry).

## Rule 8 — Lists & Rendering Performance

- Any list rendering more than ~20 items MUST use a virtualization-aware list
  component (e.g. `FlatList` or `@shopify/flash-list`
  — never a naively-mapped, fully-rendered list of widgets).
- List item components must be render-stable (memoized with `React.memo` or `useMemo`)
  to avoid unnecessary re-renders.

## Rule 9 — Images & Media Assets

- Use React Native's optimized image-loading mechanism exclusively — one that
  supports caching, placeholders, and format negotiation (e.g., `react-native-fast-image`
  — never the bare core `Image` or Expo Image).
- Always specify explicit dimensions or aspect ratio for network images to
  prevent layout shift while loading.
- Bundled assets are referenced statically — never construct a dynamically
  computed asset path at runtime; bundlers cannot resolve those reliably.

## Rule 10 — Iconography

- Use ONE icon library/family for the entire app — `lucide-react-native` is the canonical icon library (100% symmetry with Web's `lucide-react`). Never mix icon sets.
- Icon sizes and stroke/weight values must reference tokens from `MOBILE_UI_UX_DESIGN.md` — never arbitrary numeric values per usage.

## Rule 10A — Keyboard Safety for Forms (MANDATORY)

Every form screen and form bottom-sheet MUST handle mobile keyboard correctly to prevent the keyboard from covering inputs and the Submit button.

```typescript
// ✅ REQUIRED — every form screen/sheet
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <ScrollView keyboardShouldPersistTaps="handled">
    {/* form fields and submit button */}
  </ScrollView>
</KeyboardAvoidingView>
```

Rules:
- `KeyboardAvoidingView` with `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}` is MANDATORY on every screen/sheet containing form inputs.
- `ScrollView` wrapping form content MUST have `keyboardShouldPersistTaps="handled"` so tapping outside an input dismisses the keyboard without losing the tap event.
- Never use a plain `<View>` as the root of a form screen — it will cause the keyboard to cover the Submit button on small screens.

## Rule 10B — Pull-to-Refresh (MANDATORY for User-Browsable Lists)

Every user-browsable list (`FlatList` / `FlashList`) that displays server-fetched data MUST implement pull-to-refresh.

```typescript
// ✅ REQUIRED — every server-backed FlatList/FlashList
const { data, isPending, isRefetching, refetch } = useManagerMembers(params);

<FlashList
  data={data?.data ?? []}
  refreshing={isRefetching}
  onRefresh={refetch}
/>
```

Rules:
- `refreshing={isRefetching}` — use TanStack Query's `isRefetching` (not a manual boolean state).
- `onRefresh={refetch}` — calls TanStack Query's `refetch` directly.
- Pull-to-refresh MUST be wired on every list that a user would expect to refresh (members, attendance, payments, etc.).
- Static/configuration lists (e.g., plan type dropdowns) are exempt.

## Rule 11 — Animations, Gestures, & Haptics (The WOW Factor)

- Use React Native's high-performance animation system (a UI-thread-driven
  animation library like `react-native-reanimated` rather than the legacy JS-thread animation API).
- Use `react-native-gesture-handler` for swipe/pan/pinch —
  never reconstruct gesture recognition manually from raw touch events.
- Respect the OS-level reduced-motion accessibility setting — skip or shorten
  non-essential animations when the user has that setting enabled.
- Centralize reusable animation presets (durations, easing curves, spring
  configs) in one shared module — never redefine the same values per screen.
- **Haptic Feedback (Premium Feel):** To achieve a world-class SaaS feel, critical interactions MUST be accompanied by appropriate haptic feedback using `react-native-haptic-feedback` (NOT expo-haptics).
  - Use light impact for minor state changes (e.g., toggling a switch).
  - Use success notifications for successful mutations (e.g., saving a form).
  - Use error notifications for destructive actions or validation failures.

## Rule 12 — Charts & Data Visualization

- Use a native-rendering React Native charting package (`react-native-gifted-charts` is the canonical library for this project) — never a
  DOM/SVG/Canvas-web-only charting library, none of which render on mobile.
- Chart color palettes must pull from the design system's chart tokens — never
  hardcoded hex values per chart instance.

## Rule 13 — Platform-Specific Code

- Isolate genuinely divergent iOS/Android implementations into separate
  platform-specific files (e.g. `.ios.ts`, `.android.ts`) — not scattered inline
  platform checks throughout shared files.
- Inline `Platform.OS` / `Platform.select` checks MUST NOT exceed 2 occurrences per file (restricted strictly to minor style offsets such as shadow or border-radius). Any component requiring 3 or more platform checks MUST be split into `.ios.tsx` and `.android.tsx` files.
- Every platform-specific behavior (permission dialog wording, native UI
  quirks) must be noted in that feature's `_features.md` (Rule 24).

## Rule 14 — Permissions & Native Modules

- All permission requests (camera, location, notifications, media, contacts,
  biometrics) go through ONE central permissions module — no component or
  screen calls a native permission API directly.
- Before adding any new native dependency, verify it fully supports React Native's
  current-generation architecture (New Architecture / Fabric / TurboModules) —
  do not add a package flagged legacy-only without a documented, reviewed exception.
- Maintain an approved-dependency list per category (networking, forms,
  validation, state, storage, lists, images, icons, animation, charts,
  notifications, crash reporting) in `/docs/decisions/approved-dependencies.md`
  — extend only with written justification.

## Rule 15 — Push Notifications

- Token registration, permission flow, and notification-tap handling are each
  centralized in ONE module — never duplicated per screen.
- Notification-tap deep links resolve through the SAME central navigation
  definition used elsewhere in the app (Rule 2) — no separate ad-hoc routing
  logic for notifications.

## Rule 16 — Offline-First & Sync

- Default assumption: the app requires network connectivity. Offline support
  is opt-in per feature, explicitly justified — not a blanket architecture
  decision.
- Any feature requiring offline reads persists its server-state cache (Rule 4)
  to local storage, documented in that feature's `_features.md`, including
  cache invalidation triggers.
- Any offline write (queued mutation) requires an explicit, written
  conflict-resolution strategy — never silently assume "last write wins."

## Rule 17 — Testing (Full Pyramid)

- **Unit tests (Jest):** Pure business logic, validators, formatters, and utility functions
  are co-located directly beside the source file they test.
- **Component/widget tests (@testing-library/react-native):** Every non-trivial component/widget MUST have its
  matching test file co-located directly beside the component/widget file it tests.
  The feature-level `tests/` directory is reserved ONLY for integration-level tests
  that exercise multiple feature files together.
- **Integration tests:** Live inside the feature's `tests/` directory and verify
  multi-file feature flows, API/mock integration, state coordination, and critical
  feature behavior.
- **E2E tests (Maestro) - AI Zip Principle:**
  1. **Top-Level Mirrored Folders:** E2E tests MUST live in a completely separate top-level `mobile_e2e/` directory, entirely decoupled from the application code. The internal directory structure of `mobile_e2e/` MUST strictly mirror the mobile route structure (e.g., `mobile_e2e/mobile_admin_e2e/members/members.yaml`). Never dump E2E tests into the feature folders.
  2. **WET Over DRY (Module-Level Isolation):** Mobile E2E tests must be 100% self-contained at the **MODULE level**. Do NOT create a global `shared/` or `utils/` folder for E2E. If both the `members` test and `dashboard` test need a login helper script, duplicate it directly into BOTH the `members` and `dashboard` test folders.
     - **Why:** If a bug occurs in the Members mobile flow, a developer must be able to ZIP only the `mobile_e2e/mobile_admin_e2e/members/` folder and feed it to an AI. If the AI is missing parent helpers, it loses context and breaks the test.
  3. **No Cross-Module Imports:** A test script in `mobile_admin_e2e/members/` MUST NOT import a fixture or helper from `mobile_admin_e2e/dashboard/`. Isolation is absolute.
- Native modules (camera, biometrics, secure storage, notifications) are
  mocked at the test boundary — unit and component tests never touch a real
  native API.
- No feature is considered complete without its core logic/component tests
  passing — tracked in that feature's `_features.md` checklist.

### AI Test Integrity Gate

A test file existing is NOT sufficient evidence of testing.

The AI MUST NOT satisfy a test requirement with:
- Placeholder assertions (e.g. `expect(true).toBe(true)`, `expect(1).toEqual(1)`)
- Empty test bodies or `// TODO: add assertions`
- Snapshot-only tests for behavior that requires interaction testing
- Tests that only verify a component or widget mounts without asserting rendered data
- Mocked values that are completely unrelated to the feature's API contract
- Tests that pass while the UI visibly renders empty or incorrect data

Every required test MUST verify **observable behavior**, not implementation details.

For API-driven features, tests MUST verify:

1. Mock/stub response is returned through the real feature API path (not injected
   directly into the widget/component).
2. All required UI fields render the correct values from the mock response —
   this directly verifies Rule 7A fixture completeness.
3. Loading state appears while the request is pending.
4. Empty state component appears when the mock response contains zero records.
5. Error fallback appears when the mock request fails.
6. Search/filter/sort/pagination interactions change the requested parameters
   where applicable (verify the outgoing request, not just the rendered result).
7. Mutation success updates the UI only according to the feature's mutation
   policy (pessimistic — wait for 2xx, per Rule 4).
8. Backend `response.message` is surfaced for all user-facing API errors and
   successes — no hardcoded strings (Rule 7).
9. Critical user flows (add, edit, delete, renewal, payment) are covered by
   integration or E2E tests with a real app process.

**A test suite is considered incomplete if the application can visually fail
while all tests still pass.**

```text
npm test → PASS

does NOT mean:

feature is correct

It means:
the tests that were written happened to pass.
If those tests did not verify the right behavior,
the feature can be broken and PASS at the same time.
```

## Rule 18 — Native Build & Code Signing

- Android: signing keystore is generated once, backed up securely (encrypted,
  outside the repository), and never committed to version control. Use the
  platform's managed app-signing service where available to reduce upload-key
  exposure risk.
- iOS: distribution certificates and provisioning profiles are managed through
  a single, auditable process (e.g. a shared signing-management tool like
  fastlane match) — never distributed as ad-hoc files over chat/email.
- All signing secrets live ONLY in the CI/CD platform's protected secret store
  — never in the repository, build scripts, or plain-text config files.
- Build configuration (app ID, version code/name, bundle identifiers per
  environment) is generated from one central config source per environment —
  never manually edited per release.

## Rule 19 — CI/CD Pipeline

> Note: The architecture explicitly separates CI/CD concerns to prevent vendor lock-in.

- **CI (every pull request):** format check, static analysis/lint, run the
  full test pyramid (Rule 17), produce an unsigned development build. Must
  NOT have access to production signing secrets.
- **CD (on release tag / manual approval):** restore signing credentials from
  protected secrets, produce a signed release artifact (Android App
  Bundle / iOS IPA), upload to the store's internal/beta testing track.
- Use a general-purpose CI orchestrator paired with a dedicated mobile release-automation
  tool for signing and store upload. Do not tightly couple to a single vendor's all-in-one
  stack; treat each capability (build, test, distribute, monitor) as independently replaceable.
- Production deployment jobs sit behind a protected environment requiring
  manual approval and branch restrictions — no direct, unreviewed path from a
  feature branch to a store release.
- Pin the framework/SDK version and commit the dependency lockfile for
  reproducible builds — never build against a floating "latest" SDK version.

## Rule 20 — Environment & Configuration Management

- Base URLs and non-sensitive build configuration MUST be defined per environment
  through the native iOS scheme / Android build-variant mechanism.
- Secrets MUST exist only in CI/CD protected secret storage and MUST NOT be bundled
  into the application binary.
- Runtime feature flags MUST be fetched from the backend and accessed only through
  the centralized `useFeatureFlag()` mechanism.
- No component or screen reads a raw environment variable or config file
  directly — always go through the central config-access module or feature flag hook
  which validates presence/shape at app startup or runtime.

> **Separation of Infra vs Feature URL Concerns:** Rule 20 governs the BASE URL (scheme + host + port) only.
> Feature endpoint PATHS live in each feature's `config/members.url_config.ts` (Rule 7B).
> These two concerns MUST NEVER be merged into a single file or a single rule.

## Rule 21 — Over-The-Air (OTA) Updates & Hotfix Strategy

- OTA/JS-only patch delivery is OPTIONAL and must be a deliberate, documented
  decision — not a default assumption. For regulated or high-compliance
  industries, evaluate whether OTA patching is even permitted by internal
  policy before adopting it.
- If adopted: OTA covers script/asset changes ONLY. Any change touching
  native code, permissions, or native dependencies requires a full,
  store-reviewed release — never attempt to OTA around a native change.
- Choose ONE OTA mechanism appropriate to the framework and host it under
  your own infrastructure or a vetted managed provider — document the exact
  provider/self-hosted setup in `/docs/decisions/ota-strategy.md`, including
  rollback procedure and phased-rollout percentages.
- Every OTA push follows the same staged-rollout discipline as a full release
  (see Rule 27) — never push an OTA update to 100% of users immediately.

## Rule 22 — Security Scanning & Dependency Guardrails

- CI runs, on every push: (a) a software-composition-analysis (SCA)
  dependency vulnerability scan, (b) a secret-scanning check. Both must pass
  before merge.
- Code ownership (`CODEOWNERS`) requires mandatory human review on:
  - the central network client
  - the central storage module
  - the central permissions module
  - the central config module
  - **any auth flow and token-refresh logic**
  - **any payment or financial mutation**
  - any native build/signing config
  These paths MUST NEVER merge without a required human approval gate.
- No new dependency is added without:
  1. Checking the `/docs/decisions/approved-dependencies.md` list first.
  2. Confirming current-generation architecture compatibility (Rule 0 / Rule 14).
  3. Passing a vulnerability scan.
  4. Adding a written justification for why no existing approved library suffices.

**AI Dependency-Addition Guardrail:** An AI agent CANNOT add a new dependency
(`npm install` / `yarn add`) without first checking the approved-dependency list.
Before proposing a new library, the AI must explicitly explain why an existing
approved library (e.g. `react-native-keychain`, `zustand`, `react-hook-form`,
`zod`, `@tanstack/react-query`, `react-native-fast-image`, `date-fns`,
`react-native-reanimated`) does not suffice for the task.

## Rule 23 — Observability & Crash Reporting

- Crash reporting and JS exception tracking wired at app root, before
  any other initialization — use a React Native crash-reporting SDK
  (e.g. Sentry or Firebase Crashlytics).
- Every centralized module (network client, storage, permissions) reports
  errors with enough context (feature name, action attempted) to trace an
  issue without needing physical device logs.
- Track crash-free-rate and release health per version — mobile crashes are
  unrecoverable by "just refresh" the way a web page is, making this a
  release-blocking concern, not optional polish.

## Rule 24 — AI-Context Documentation (THE MODULARIZATION CONTRACT)

**This is the most important rule for AI-driven development.**

Every feature folder MUST contain a file named `[featureName]_features.md`.
This file is the single source of truth for that feature — an AI given ONLY
this file plus the feature folder must be able to fully understand, modify,
or debug it without reading any other part of the codebase.

**Before modifying a feature, read its `_features.md` in full first.**
If it is missing or stale, updating it is part of the same change — a feature
is never "done" while its context file is out of date.

### The Documentation Quality Standard

**CRITICAL — The difference between useful and useless documentation:**

❌ **BAD (what AI agents produce by default — completely useless):**
```
## Purpose
Handles members operations, UI display, and logic isolation.

## Screens & Entry Points
| Members Screen | /members | All roles |

## Edge Cases / AI Warnings
- Do not bypass API interceptors.
- Do not mix complex logic with UI.
```

✅ **GOOD (what this rule mandates — gives full context to any AI or human):**
```
## Purpose
The Members feature is the primary member management interface for gym managers.
Managers can view all branch members, add new members via a multi-step form, renew
memberships, record payments, and assign diet/workout plans. Trainers see ONLY their
assigned members with no financial data visible.

## Screens & Entry Points
| MembersListScreen   | members/list       | MANAGER (all members), TRAINER (assigned only) |
| MembersDetailScreen | members/detail/:id | MANAGER, TRAINER                               |
| MembersAddScreen    | members/add        | MANAGER only                                   |

## Edge Cases / AI Warnings
- Deleting a member removes ALL their membership history permanently. The confirmation
  bottom sheet must explicitly state this. Do not soften the message.
- The Add Member form is a 3-step wizard. Step 2 fetches live plan data from fetchPlans()
  — do NOT hardcode plan options in the form.
- Phone numbers must be masked (98****2310) in MembersMemberCard — full number visible
  only in MembersDetailScreen. Never remove masking from the list view.
- Member IDs are UUIDs. Never use array index as a FlatList/FlatList key.
```

**The rule:** if a section contains "TBD", "Handles X operations", "Do not bypass API
interceptors", or any other generic filler, the documentation **FAILS** this rule and
must be rewritten before the feature is considered complete.

### Mandatory `_features.md` Template with Content Requirements

Every `_features.md` MUST use this structure. Each section has mandatory content depth
requirements listed inline.

```markdown
# [FeatureName] — Feature Map

## Purpose
[REQUIRED: 3-5 sentences. Must answer: (1) What business problem does this feature solve?
(2) Which role(s) use it and what can they DO? (3) What is strictly OFF-LIMITS for each
role? Generic phrases like "handles X operations" are forbidden.]

## Dependency Manifest
[REQUIRED: List every library and core infrastructure module this feature uses. Example:
TanStack Query, Zustand, React Hook Form, Zod, react-native-reanimated.
This lets an AI instantly know what stack is used without reading every file.]

## Feature Lifecycle Contract
[REQUIRED: Explicitly state which CRUD operations exist. If any is absent, state why.
Example: Create ✓ | Read ✓ | Update ✓ | Delete ✓ | Export ✓ | Bulk ✗ (not in scope)
Prevents AI from blindly assuming standard CRUD capability.]

## Screens & Entry Points
[REQUIRED: Every screen with its exact route/stack name and which roles can access it.
"All roles" is not acceptable — name each role explicitly.]

| Screen name | Route / stack name | Role access | Entry trigger |
|---|---|---|---|

## Folder Structure
[REQUIRED: Every subfolder listed with its exact responsibility AND the key files inside
it. "Contains components" is not acceptable.]

| Folder | Responsibility | Key Files |
|---|---|---|
| `components/` | Presentational UI only — no API calls, no business logic | `MembersMemberCard.tsx`, `MembersEmptyState.tsx`, `MembersListSkeleton.tsx` |
| `hooks/` | Data-fetching and UI-state logic extracted from screens | `useMembers.ts` (server state), `useMembersFilters.ts` (client state) |
| `api/` | All network calls for this feature — nothing else | `members.api.ts` |
| `types/` | All interfaces, enums, type unions | `members.types.ts` |
| `schemas/` | Zod schemas / validator classes for forms | `members.schema.ts` |
| `state/` | Feature-scoped store for shared UI state | `members.store.ts` — holds: selectedMemberId, isAddSheetOpen, filterStatus |
| `config/` | Feature-specific configs like URL constants | `members.url_config.ts` |

## User Flows & Interactions
[REQUIRED: 2-4 most important multi-step flows. Numbered steps. This lets an AI
understand the full journey without reading every file.]

### Flow 1: Add New Member
1. Manager taps "Add Member" FAB in MembersListScreen
2. MembersAddScreen pushes onto stack
3. 3-step form: Personal Info → Plan Selection (fetches live plans) → Payment
4. On submit: createMember(dto) called → loading state shown on button
5. On 2xx: query cache invalidated, screen pops, toast shows backend message
6. On error: form preserves data, inline error from response.message

## Data & State Architecture
[REQUIRED: Name the ACTUAL store files, cache keys, and providers — not "TBD".]

- **State pattern:** [e.g., "TanStack Query for server state + Zustand members.store.ts for UI state"]
- **Cache / query keys:** [e.g., `MEMBERS_QUERY_KEYS.list(filters)`, `MEMBERS_QUERY_KEYS.detail(memberId)` — from `members.query_keys.ts` (Rule 7C)]
- **Feature-scoped store:** [e.g., `members.store.ts` — holds: selectedMemberId, isAddSheetOpen, filterStatus, searchQuery]
- **Local state decisions:** [e.g., "Detail screen tab selection is local useState — not shared"]
- **Persisted state (offline requirement):** Yes / No — if Yes, document cache strategy and invalidation triggers
- **Storage keys used:** ["None" or namespaced constants e.g. `MEMBERS_FILTER_PREFS_V1`] — if yes, document strategy

## API Contract
[REQUIRED: Every function in the feature's api file listed with exact HTTP method,
endpoint, request shape, and response type. "TBD" is not acceptable.]

All calls go through the central network client. Response envelope:
`{ success, message, data: T | null, meta?: PaginationMeta, error?: string, errorCode?: string, statusCode?: number, validationErrors?: ValidationErrorItem[] }`

| Function | Method | Endpoint | Request | Response data type |
|---|---|---|---|---|
| `fetchMembers(params)` | GET | `/api/v1/{role}/members` | `{ page, limit, search, status }` | `Member[]` + PaginationMeta |
| `fetchMemberById(id)` | GET | `/api/v1/{role}/members/:id` | — | `MemberDetail` |
| `createMember(dto)` | POST | `/api/v1/{role}/members` | `CreateMemberDto` | `Member` |
| `updateMember(id, dto)` | PATCH | `/api/v1/{role}/members/:id` | `UpdateMemberDto` | `Member` |
| `deleteMember(id)` | DELETE | `/api/v1/{role}/members/:id` | — | `null` |

## Approved External Dependencies
[REQUIRED: Must list all cross-layer and external packages. AI must not import anything outside this list.]

### Feature Business Dependencies
- None

### Core Infrastructure Dependencies
- `src/core/network/networkClient.ts`
- `src/core/navigation/routes.ts`
- `src/core/utils/formatters.ts`

### Allowed Packages
- `@tanstack/react-query`
- `react-hook-form`
- `zod`

### Forbidden Dependencies
- Any other feature folder
- Any role sibling feature
- Any business logic from `src/core`

## Permissions Used
[REQUIRED: "None" is a valid and complete answer if no device permissions are used.]

| Permission | Central module function | Rationale |
|---|---|---|

## Platform-Specific Notes
[REQUIRED: "None" is acceptable if there are no iOS/Android divergences. If there are,
name the exact component and what differs and why.]

## Offline Behavior
[REQUIRED: Explicit "No offline requirement" OR "Yes — [describe cache strategy,
invalidation triggers, and conflict-resolution approach]".]

## Loading, Empty, and Error States
[REQUIRED: Name the exact component file for each state per section. "Uses skeleton"
is not enough — describe what the skeleton mimics.]

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Members list | `MembersListSkeleton.tsx` — 5 ghost card rows matching MembersMemberCard height | `MembersEmptyState.tsx` — icon + "No members yet" + "Add Member" CTA | `MembersErrorFallback.tsx` — retry button re-runs the query |
| Detail screen | Skeleton matching header + 3 tab sections | N/A | Inline retry |

## Background Tasks
[REQUIRED: Must explicitly list any scheduled jobs, push handlers, or periodic syncs.]
None

## Edge Cases and AI Warnings
[REQUIRED: Minimum 5 items for any feature with CRUD. Must be feature-specific and
actionable — not generic advice. Format: bold title + explanation.]

- **[Specific warning title]:** [What breaks, why, and what to do instead]

## Component Responsibility Map
[REQUIRED for features with 4+ components. One line per file so an AI knows exactly
which file to open for any task without reading all files.]

| File | Responsibility |
|---|---|
| `MembersListScreen.tsx` | Entry screen. Renders toolbar + filter bar + FlatList. No direct API calls. |
| `MembersMemberCard.tsx` | Single list item. Displays masked phone. Tap navigates to detail screen. |
| `MembersDetailScreen.tsx` | Full member profile with tabs. Composes useMemberDetail(). Does not call members.api.ts directly. |
| `MembersEmptyState.tsx` | Empty state shown when list has zero items. Has "Add Member" CTA. |
| `MembersListSkeleton.tsx` | Loading skeleton — 5 ghost rows matching MembersMemberCard layout. |

## Rule Compliance Checklist
[REQUIRED: Mark honestly. An honest [ ] is better than a false [x].]

- [ ] Rule 1: Micro-modularization — module-prefixed files, size ceilings respected
- [ ] Rule 1: Role isolation — zero cross-role imports (frontend_admin/frontend_manager/frontend_superadmin/frontend_trainer isolated)
- [ ] Rule 2: Navigation uses typed params — no full objects passed through routes
- [ ] Rule 3: All styles use design tokens — no magic hex/dp values
- [ ] Rule 4: State placed per Server/Client decision matrix
- [ ] Rule 4: Pessimistic UI — financial/destructive mutations wait for 2xx before UI update
- [ ] Rule 5: Forms use form library + schema validator
- [ ] Rule 6: Auth tokens in hardware-backed secure storage only
- [ ] Rule 7 (API): All API calls through central network client, typed verb contract
- [ ] Rule 7 (messages): User-facing messages come from backend response.message — never hardcoded
- [ ] Rule 7A: API/mock response covers ALL UI fields — no missing card fields, KPI fields, chart series, filter fields, or relationship fields; no hardcoded business fallback data in components
- [ ] Rule 8: Lists use virtualized component for >20 items
- [ ] Rule 8: Search/filter inputs debounced — minimum 300ms before API call
- [ ] Rule 17: Co-located unit tests present; E2E for critical flows; AI Test Integrity Gate satisfied — no placeholder assertions, all required API-driven behaviors verified
- [ ] Rule 22: No unapproved dependencies added
- [ ] Rule 23: Observability wired for critical error paths
- [ ] Rule 24: This _features.md is complete, specific, and non-generic
- [ ] Rule 25: All interactive elements have accessible labels + 44/48dp targets
- [ ] Rule 28: Zero cross-feature imports (self-containment verified)
- [ ] Rule 29: `_forbidden.md` exists, is specific, and has minimum 5 entries
- [ ] Rule 30: Sensitive data masked in list/card views — full values only in detail screens
- [ ] Rule 31: Destructive/financial actions use centralized confirmation bottom sheet
- [ ] Rule 33: Paginated responses typed with canonical `PaginationMeta` — no local pagination re-derivation
- [ ] Rule 34: Status/type fields use string enums — no magic string literals
- [ ] Rule 35: All navigation calls use `ROUTES` constants — no hardcoded route strings
- [ ] Rule 36: Type-only imports use `import type`
- [ ] Rule 37: Currency/numbers formatted via `formatCurrency()` / `formatNumber()` — no inline `toFixed()`
- [ ] Rule 38: Null/empty fields use `displayValue()` — no blank cells or "N/A" strings
- [ ] Rule 39: Async-submit buttons have `minWidth` — no layout shift on loading state
- [ ] Rule 40: All toasts go through `showToast()` — no direct library calls
- [ ] Rule 41: Multi-step forms have `useUnsavedChangesGuard` wired to `isDirty`
- [ ] Rule 42: Every `useEffect` dependency array has an explanatory comment
- [ ] Rule 43: All hooks and exported utilities have JSDoc blocks
- [ ] Rule 44: Every file has `RESPONSIBILITY:` + `FLOW:` header comment
- [ ] Rule 45: TanStack Query v5 native status (`isPending`, `isError`, `data`) used directly for all API calls — zero parallel `NetworkState<T>` wrappers on server state
- [ ] Rule 46: Background tasks documented in `_features.md` `## Background Tasks` section
- [ ] Rule 47: All API calls have explicit timeouts from `TIMEOUT_CONFIG`
- [ ] Rule 48: 400 validation errors mapped to form fields via `handleValidationErrors()` (422 only if explicitly approved by API contract)
- [ ] Rule 49: List items keyed by entity ID — no array index keys
- [ ] Rule 50: Permitted record identifiers have copy-to-clipboard affordance in detail screens
- [ ] Rule 51: Every list screen has a dedicated named `EmptyState` component
- [ ] Rule 52: New design tokens added to `MOBILE_UI_UX_DESIGN.md` before implementation
- [ ] Rule 53: Every POST/PATCH/PUT/DELETE mutation uses a required stable Idempotency-Key; the same key is reused on retry and a new key is generated only for a new user intent
- [ ] Rule 54: Token refresh is single-flight — concurrent 401s share the same refresh promise
- [ ] Rule 55: `x-tenant-id` derived from trusted session context only — never from route params or local state
- [ ] Rule 56: Enterprise security constraints respected (encrypted offline cache, exponential backoff with jitter, AbortSignal on unmount, deep-link re-authorization, notification payload validation, clipboard policy)
- [ ] Rule 57: All import paths exactly match file casing on disk — CI/Linux compatible
- [ ] Rule 58: WebSockets managed via centralized `WebSocketContext` / `SocketProvider` — no direct `new WebSocket()` in components
- [ ] Rule 58A: App foreground resume calls the exact notification-recovery endpoint defined by the feature API contract; canonical project pattern: `GET /api/v1/{role}/notifications`
- [ ] Rule 59: Role-masked fields typed as optional in TypeScript interfaces and Zod schemas; UI handles `undefined` gracefully
- [ ] Rule 60: Every `useMutation` invalidates affected TanStack Query keys via `.mutateAsync().then()` or global `mutationCache`
- [ ] Rule 61: All client-authored/static user-visible strings use `t('namespace.KEY')`; backend-supplied `response.message` values are displayed as-is and NOT passed through `t()`; `Accept-Language` header attached by central network client
- [ ] Rule 62: Feature flags accessed via `useFeatureFlag()` — no raw build/env reads inside components
- [ ] Rule 63: Currency formatting is feature-local (`formatCurrency.ts`); approved currency metadata used; unsupported codes throw
- [ ] Rule 64: Tenant data export triggers async backend call + `202 Accepted` success feedback — no in-app download
- [ ] Rule 65: Every interactive control and critical state indicator has a deterministic `testID` in canonical format
- [ ] Rule 66: Every custom hook, complex component, and state store has an exhaustive JSDoc / docstring block

## Known Issues / Tech Debt
[REQUIRED: "None" is acceptable. Never leave blank without explicitly stating no known issues.]

None
```

### Documentation Freshness Rule

Every time a component is added, an API endpoint changes, a new screen is added, or a
user flow changes, the `_features.md` for that feature MUST be updated in the same
commit. Stale documentation is worse than no documentation because it actively misleads
future AI agents.

## Rule 25 — Accessibility

- Every interactive element exposes an accessible role/label — no exceptions
  for "obviously self-explanatory" icons or buttons.
- Minimum touch target: 44×44pt (iOS) / 48×48dp (Android) — enforced via the
  shared minimum-touch-target token in `MOBILE_UI_UX_DESIGN.md`, not
  per-component guesses.
- Respect system font-scaling accessibility settings — never disable dynamic
  text scaling unless a specific pixel-perfect element requires it, and
  document why when it does.

## Rule 26 — App Store & Regulatory Compliance

- iOS Privacy Manifest and Android Play Console Data Safety disclosures are
  kept in sync with actual data collection/usage — reviewed before every
  release, owned by whoever last touched the permissions or analytics code.
- Any use of advertising/tracking identifiers is documented in the relevant
  feature's `_features.md` and reflected in the store compliance forms.
- App icons, splash screens, and store metadata are managed through one
  central, version-controlled config — never manually edited inside
  platform-native project files directly (breaks on next native rebuild).

## Rule 27 — Release Management & Staged Rollout

- Every release increments a version identifier and has a changelog entry —
  no silent version bumps.
- Any release containing a New Architecture / rendering-engine change, or a
  major native dependency upgrade, ships via staged rollout (e.g. 5% → 20% →
  50% → 100% over roughly two weeks), monitoring crash-free rate at each
  stage before advancing — never a 100% release for high-risk native changes.

---

## Rule 28 — Zero Cross-Feature Imports (The Portable Folder Rule)

Every feature folder must be a **completely self-contained BUSINESS unit**.

A feature MUST NOT import or depend on another feature's business logic.

A feature **MAY** depend on:

- **(a)** Approved framework/package dependencies.
- **(b)** Approved zero-business-logic primitives from `src/core/ui/`.
- **(c)** Approved framework-level infrastructure from `src/core/`, such as:
  - network client
  - API response types (`ApiResponse<T>`, `PaginationMeta`)
  - authentication/session infrastructure
  - secure storage abstraction
  - navigation infrastructure
  - route constants
  - pagination types
  - formatting primitives (`formatNumber`, `displayValue`, `maskSensitiveData`) — **`formatCurrency` is DOMAIN_UTILITY and MUST be feature-local per Rule 63, never in `src/core/`**
  - logging/observability infrastructure
  - accessibility infrastructure
  - app-wide configuration required for correctness
- **(d)** Its own internal files.

A feature **MUST NEVER** depend on:
- another feature's components
- another feature's hooks/controllers/notifiers
- another feature's stores/providers/blocs
- another feature's schemas/validators
- another feature's business types/models
- another feature's API services
- another feature's business constants
- another feature's business utilities

`src/core/` is an **infrastructure boundary**, NOT a business-logic sharing layer.

The AI must understand the feature's business behavior from only the feature folder + `_features.md`.
Any external dependency must be explicitly documented in Approved External Dependencies with its integration contract.
The AI MUST NOT need unrelated business modules.

If business logic is required by two features, duplicate it inside each feature
rather than moving it into `src/core/`. This preserves portability without
artificially duplicating mandatory application infrastructure.

Enforce mechanically via `eslint-plugin-boundaries` so violations are caught in CI, not in
code review.

---

## Rule 29 — Forbidden Patterns Per Feature (`_forbidden.md`)

Every feature folder MUST have a `[featureName]_forbidden.md` file listing
what is explicitly NOT allowed in that specific feature.
The canonical read order for AI agents is:
1. `_features.md`
2. `_forbidden.md`
3. only then source files

### `_forbidden.md` Content Quality Standard

Every entry MUST be feature-specific and actionable. Generic entries like
"Do not bypass API interceptors" or "Follow best practices" are **forbidden in
the forbidden file itself** — they add zero value. Every entry must name the
specific file, hook, or pattern to use instead. Minimum 5 entries for any
feature with CRUD operations.

❌ **BAD (generic, useless):**
```
- NEVER bypass API interceptors
- NEVER mix logic with UI
- NEVER use bad state management
```

✅ **GOOD (specific, actionable):**
```markdown
# members — Forbidden Patterns

- NEVER import from any other feature folder (frontend_admin/members/, frontend_trainer/members/, etc.) — zero cross-feature imports, Rule 28
- NEVER call the HTTP client directly — always use members.api.ts which goes through the central network client
- NEVER store API response data in members.store.ts — the TanStack Query cache is the single source of truth for server data
- NEVER execute delete/suspend actions on single tap — always show the centralized confirmation bottom sheet first (Rule 31)
- NEVER add a new dependency without checking approved-dependencies.md first (Rule 22)
- NEVER hardcode hex colors, dp values, or font sizes — use design tokens from MOBILE_UI_UX_DESIGN.md only (Rule 3)
- NEVER log auth tokens, phone numbers, payment amounts, or full API response bodies — sanitize before any log call (Rule 6)
- NEVER display raw phone numbers or payment amounts in list/card views — use maskSensitiveData() (Rule 30)
```

---

## Rule 30 — Sensitive Data Masking in UI

Any field displaying sensitive personal or financial data MUST be masked by
default in list views, card components, and summary screens:

- Phone numbers: `98****2310` (show first 2 + last 4 digits)
- Payment amounts in bulk lists: masked or summarized, not itemized per record
- National IDs, account numbers: show last 4 digits only

Full values are visible ONLY in dedicated detail/profile screens where the user
has explicitly navigated to view a single record.

Implementation: create ONE central `maskSensitiveData(value, type)` utility in
`src/core/utils/maskSensitiveData.ts`. No component may implement its own masking
logic inline — always import from this central utility.

Never log masked or unmasked sensitive values — sanitize before any log call or
crash-report breadcrumb (Rule 6 and Rule 23).

---

## Rule 31 — Double Verification for Destructive and Financial Actions

On mobile, accidental taps on destructive actions are more likely than on desktop
(small touch targets, no hover/right-click interaction). This makes double-verification
more critical on mobile, not less.

**Any action that does any of the following MUST show a confirmation bottom sheet
or dialog BEFORE executing:**
- Deletes a record (member, expense, plan, etc.)
- Suspends or deactivates a user or gym
- Marks a payment, invoice, or payroll as paid/processed
- Triggers any irreversible financial mutation

Rules:
- Never execute on a single tap — always require explicit confirmation.
- The confirmation message must clearly state what will happen and whether it is
  reversible. Do not soften destructive messages.
- Use ONE centralized confirmation module (e.g. a `useConfirm()` hook backed by
  a shared `ConfirmBottomSheet` component) — Using React Native's native `Alert.alert()` for destructive or financial confirmations is STRICTLY FORBIDDEN in feature code. Every destructive/financial action MUST use the centralized `useConfirm()` hook backed by `ConfirmBottomSheet` (`@gorhom/bottom-sheet`).
- The confirm button must show a loading state while the mutation is in flight
  and be disabled to prevent double-submission.

---

## Rule 32 — Pessimistic UI Updates and Search Debouncing

### Pessimistic UI for Financial and Destructive Mutations

For any mutation involving money or irreversible operations (delete, suspend,
payment, payroll processing):
- The action button MUST transition to a disabled loading state immediately on tap.
- The UI (list, store, cache) MUST only update AFTER receiving a `2xx` response.
- Optimistic updates (updating the UI before server confirmation) are **completely
  forbidden** for these action types.
- On error: restore the previous UI state, show the backend `message` field in a
  toast or inline error — never a hardcoded string.

Pessimistic UI is the mandatory default for ALL mutations. If optimistic updates are used for non-destructive, non-financial mutations, the hook MUST implement `onError` rollback AND MUST reconcile the cache with the authoritative server response on `onSuccess`. Optimistic updates are STRICTLY FORBIDDEN for any financial or destructive mutation.

### Search and Filter Input Debouncing

Any search input or filter control that triggers an API call MUST be debounced
with a minimum **300ms** delay before firing the request. Mobile keyboards fire
onChange on every keystroke — without debouncing, every character typed sends a
separate API request, causing performance degradation and potential rate limiting.

Implementation: use a shared `useDebounce(value, delay)` hook in
`src/core/hooks/useDebounce.ts`. No feature may implement its own debounce logic
inline — always import from this central hook.

---

## Workflow Checklist — What to Verify After AI Writes Code

1. Read the feature's `_features.md` and then `_forbidden.md` before giving the AI any files.
2. Identify the exact layer (UI? Hook? API? Schema? State?) and pass only those files.
3. After the AI writes code, verify:
   - All styles use design tokens — no raw hex/dp values? (Rule 3)
   - State placed per Server/Client matrix? (Rule 4)
   - Pessimistic UI on financial/destructive mutations? (Rule 32)
   - Forms using library + schema validator? (Rule 5)
   - API calls through central client, typed verb names? (Rule 7)
   - Search/filter inputs debounced at 300ms? (Rule 32)
   - Lists virtualized for >20 items? (Rule 8)
   - User messages from `response.message`, never hardcoded? (Rule 7)
   - Auth tokens in hardware-backed secure storage only? (Rule 6)
   - Sensitive data masked in list/card views? (Rule 30)
   - Destructive/financial actions use confirmation bottom sheet? (Rule 31)
   - Co-located tests exist for new hooks and components? (Rule 17)
   - Crash reporting wired for new critical paths? (Rule 23)
   - Is any new dependency on the approved list? (Rule 22)
   - `_features.md` updated with non-generic content? (Rule 24)
   - All interactive elements have accessible labels + 44/48dp targets? (Rule 25)
   - Any cross-feature imports? (Rule 28)
   - `_forbidden.md` current and specific? (Rule 29)
4. Run CI gates: lint, type check, test pyramid, SCA scan, secrets scan.
5. For auth, payment, storage, or tenant-routing changes: ensure CODEOWNERS human review.

---

## Rule 33 — Canonical `PaginationMeta` Shape

Every paginated API response MUST include a `meta` field typed as `PaginationMeta`.
No feature may invent its own pagination shape — one canonical type, used everywhere.

Define once in `src/core/types/pagination.types.ts`:

```typescript
// src/core/types/pagination.types.ts
export interface PaginationMeta {
  total: number;       // total records matching the query
  page: number;        // current page (1-based)
  limit: number;       // records per page
  totalPages: number;  // Math.ceil(total / limit)
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

The `ApiResponse<T>` envelope (Rule 7) already includes `meta?: PaginationMeta`.
Every paginated hook/controller reads `response.meta` — never re-derives pagination
state from array length or local counters.

```typescript
// ❌ BAD — inventing a local pagination shape
const [total, setTotal] = useState(0);
const hasMore = data.length < total;

// ✅ GOOD — reading canonical meta
const { data } = useMembers(params);
const hasNextPage = data?.meta?.hasNextPage ?? false;
```

Cross-reference: Rule 7 (`ApiResponse.meta`).

---

## Rule 34 — Enum-Driven Status Fields (No Magic Strings)

Every status, type, or category field on a mobile type/model MUST be a TypeScript
enum or a `const` object with `as const` — never a raw string literal scattered
across components and API calls.

Define enums in the feature's `*.types.ts` file:

```typescript
// ❌ BAD — magic strings everywhere
if (member.status === 'active') { ... }
if (member.status === 'suspended') { ... }

// ✅ GOOD — enum-driven, refactor-safe, matches the exact API wire values
// defined by the supplied feature/API contract.
export enum MemberStatus {
  ACTIVE    = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED   = 'EXPIRED',
  PENDING   = 'PENDING',
}

if (member.status === MemberStatus.ACTIVE) { ... }
```

Rules:
- Enum values MUST exactly match the API wire values defined by the supplied feature/API contract. If the feature API contract changes enum values, mobile type/schema/tests must update in the same change.
- Never use numeric enums for API-bound fields — string enums survive serialization.
- Filter dropdowns, badge colors, and conditional rendering all branch on the enum,
  never on a raw string.
- If the supplied API contract adds a new status, the TypeScript compiler surfaces every
  unhandled case — this is the point.

Cross-reference: Rule 7 and the feature API contract.

---

## Rule 35 — Route / Navigation Constants File (No Hardcoded Route Strings)

Every navigation route name or path MUST be defined as a typed constant in ONE
central file: `src/core/navigation/routes.ts`. No screen, hook, or component may
contain a hardcoded route string literal.

```typescript
// src/core/navigation/routes.ts
export const ROUTES = {
  MEMBERS: {
    LIST:   'MembersListScreen',
    DETAIL: 'MembersDetailScreen',
    ADD:    'MembersAddScreen',
  },
  ATTENDANCE: {
    LIST:   'AttendanceListScreen',
    DETAIL: 'AttendanceDetailScreen',
  },
} as const;

export type RootStackParamList = {
  [ROUTES.MEMBERS.LIST]:   undefined;
  [ROUTES.MEMBERS.DETAIL]: { memberId: string };
  [ROUTES.MEMBERS.ADD]:    undefined;
};
```

```typescript
// ❌ BAD — hardcoded string in a component
navigation.navigate('MembersDetailScreen', { memberId: id });

// ✅ GOOD — typed constant
navigation.navigate(ROUTES.MEMBERS.DETAIL, { memberId: id });
```

Consequence of violation: a renamed screen breaks navigation silently at runtime
with no TypeScript error. The constants file makes renames a compiler error.

Cross-reference: Rule 2 (navigation), Rule 28 (zero cross-feature imports — routes
constants are a `core/` primitive, not a feature file).

---

## Rule 36 — React Native / TypeScript: `import type` Mandate

Any import that brings in ONLY a TypeScript type, interface, or enum (no runtime
value) MUST use `import type`. This is enforced by ESLint (`@typescript-eslint/consistent-type-imports`).

## Rule 37 — Currency and Number Formatting Utility

All generic numeric and percentage formatting MUST go through the central zero-business formatter utility at src/core/utils/formatters.ts.
Do not use raw `.toFixed()` or inline `new Intl.NumberFormat` anywhere in JSX/components.

```typescript
/**
 * Formats a generic number according to the specified locale.
 *
 * @param value - The number to format.
 * @param locale - The active locale string (e.g., 'en', 'hi').
 * @returns The formatted number string.
 */
export function formatNumber(value: number | null | undefined, locale: string): string {
  if (value == null) return displayValue(value);
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a number as a percentage.
 *
 * @param value - The decimal or percentage value.
 * @param locale - The active locale string.
 * @returns The formatted percentage string.
 */
export function formatPercent(value: number | null | undefined, locale: string): string {
  if (value == null) return displayValue(value);
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
```

Rule 63 supersedes the currency portion of Rule 37. Currency formatting is feature-local. Rule 37 remains authoritative only for generic number and percentage formatting.

## Rule 38 — En-Dash Fallback for Null / Empty Data

Any field that may be `null`, `undefined`, or an empty string MUST render an
en-dash (`—`) rather than blank space, `"N/A"`, `"null"`, or `undefined`.

Define ONE central utility in `src/core/utils/formatters.ts`:

```typescript
export function displayValue(
  value: string | number | null | undefined,
  fallback = '—',
): string {
  if (value == null || value === '') return fallback;
  return String(value);
}
```

```typescript
// ❌ BAD — blank cell, "null" text, or conditional clutter
<Text>{member.email || ''}</Text>
<Text>{member.phone ?? 'N/A'}</Text>

// ✅ GOOD — consistent, scannable UI
<Text>{displayValue(member.email)}</Text>
<Text>{displayValue(member.phone)}</Text>
```

Applies to: detail screens, list cards, table cells, summary rows, PDF/export
previews. Every data-display component uses `displayValue()` — no exceptions.

Cross-reference: Rule 63.
Currency values that may be null MUST follow the documented Rule 63 null-value
handling and must never render blank or `"N/A"`.

---

## Rule 39 — Button Loading Width Stability

When a button transitions to a loading state, its width MUST NOT change.
Replacing button text with a spinner that has different dimensions causes layout
shift — on mobile this is especially jarring because it can shift adjacent
touch targets.

```typescript
// ❌ BAD — width collapses to spinner size
{isLoading ? <ActivityIndicator /> : <Text>Save Member</Text>}

// ✅ GOOD — fixed minimum width, content swaps in place
<TouchableOpacity
  style={[styles.button, { minWidth: tokens.layout.buttonMinWidth }]}
  disabled={isLoading}
>
  {isLoading
    ? <ActivityIndicator color={tokens.color.onPrimary} size="small" />
    : <Text style={styles.buttonText}>Save Member</Text>
  }
</TouchableOpacity>
```

Rules:
- Set `minWidth` on the button container using a design token or a value derived
  from the label's measured width — never a magic number.
- The button MUST be `disabled` while loading to prevent double-submission
  (Rule 31 and Rule 32 already mandate this for destructive actions — this rule
  extends it to ALL async-submit buttons).
- React Native: wrap `TouchableOpacity/Pressable` in a `View` with a fixed width,
  or apply `minWidth` via style.

Cross-reference: Rule 31 (loading state on confirm button).

---

## Rule 40 — Toast / Snackbar Deduplication

`showToast()` is the ONLY toast entry point.

`showToast()` MUST enforce semantic deduplication.
Passing a deduplication key to the toast library is not sufficient unless
the central adapter demonstrably suppresses or refreshes an already-visible
toast with the same semantic key.

```typescript
/**
 * Displays a global toast message safely handling semantic deduplication.
 *
 * @param message - The text to display.
 * @param type - The semantic level (e.g. 'error', 'success').
 * @param dedupKey - A unique string representing the action intent.
 */
const activeToasts = new Set<string>();

export function showToast(message: string, type: 'error' | 'success', dedupKey?: string) {
  if (dedupKey) {
    if (activeToasts.has(dedupKey)) return;
    activeToasts.add(dedupKey);
  }

  Toast.show({
    type,
    text1: message,
    onHide: () => {
      if (dedupKey) activeToasts.delete(dedupKey);
    }
  });
}

// ❌ BAD: Stacking 5 duplicate network error toasts
showToast(response.message, 'error');

// ✅ GOOD: Passing a stable semantic identity
showToast(
  response.message,
  'error',
  toastKey('members', 'suspend', memberId, response.errorCode)
);
```

## Rule 41 — Unsaved Changes Guard for Multi-Step Forms

Any screen containing a form with user-entered data MUST warn the user before
navigating away with unsaved changes. On mobile, the back gesture/button is the
primary exit path — this guard is critical.

Implement as ONE shared hook: `src/core/hooks/useUnsavedChangesGuard.ts`

```typescript
// src/core/hooks/useUnsavedChangesGuard.ts
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useUnsavedChangesGuard(isDirty: boolean) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!isDirty) return;
      e.preventDefault();
      // Show confirmation dialog — use the centralized useConfirm() (Rule 31)
      // If confirmed, dispatch e.data.action to proceed
    });
    return unsubscribe;
  // navigation: current navigator; isDirty: enables/disables unsaved-change interception
    }, [navigation, isDirty]);
}
```

```typescript
// ❌ BAD — no guard; user loses data on back swipe
function MembersAddScreen() { ... }

// ✅ GOOD — guard wired to form dirty state via hook
function useMemberForm() {
  const form = useForm();
  return { form, isDirty: form.formState.isDirty };
}

function MembersAddScreen() {
  const { isDirty } = useMemberForm();
  useUnsavedChangesGuard(isDirty);
  // ...
}
```

Rules:
- The guard MUST cover every supported exit path, using the navigator-specific event/mechanism required for stack back, swipe-back, tab changes, etc.
- For multi-step forms, the guard MUST activate whenever the form contains
  unsaved value changes.
- React Hook Form `isDirty` represents changes relative to the configured default
  values; merely focusing or touching a field does not necessarily mean the form
  is dirty.

Cross-reference: Rule 31 (centralized confirmation), Rule 5 (forms).

---

## Rule 42 — `useEffect` Dependency Audit Comment

Every `useEffect` MUST include a one-line comment
explaining WHY each dependency is listed — or explicitly why the array is empty.

```typescript
// ❌ BAD — silent dependency array; future AI/developer cannot reason about it
useEffect(() => {
  fetchMemberById(memberId);
}, [memberId]);

// ✅ GOOD — intent is explicit
useEffect(() => {
  fetchMemberById(memberId);
  // memberId: re-fetch whenever the target member changes (e.g. deep-link navigation)
}, [memberId]);

// ✅ GOOD — empty array is also documented
useEffect(() => {
  analytics.trackScreenView('MembersListScreen');
  // intentionally empty: fire once on mount only — screen-view event, not reactive
}, []);
```

Why this rule exists: AI agents editing a `useEffect` without understanding its
dependency intent routinely introduce stale-closure bugs or infinite re-render
loops. The comment is the contract that prevents this.

Consequence of violation: the next AI edit to this file will silently break the
effect's reactive behavior — this is one of the most common AI-introduced bugs
in React Native codebases.

Cross-reference: Rule 24 (AI context documentation principle applied at code level).

---

## Rule 43 — JSDoc Mandate on All Hooks and Utility Functions

Every custom hook and every exported utility function MUST have a JSDoc comment
block. No exceptions for "obviously named" functions — the JSDoc is for AI agents
reading the file in isolation, not for humans who already know the codebase.

```typescript
// ❌ BAD — no documentation; AI must guess intent and parameters
export function useMembers(params: MemberListParams) { ... }

// ✅ GOOD — full JSDoc; AI can use this hook correctly without reading its body
/**
 * Fetches the paginated member list for the current branch.
 *
 * @param params - Filter and pagination params: { page, limit, search, status }
 * @returns TanStack Query result with `data.data: Member[]` and `data.meta: PaginationMeta`
 *
 * Cache key: ['members', 'list', params] — invalidated on createMember / deleteMember.
 * Do NOT pass the full Member object through navigation after selecting — pass memberId
 * and use fetchMemberById in the detail screen (Rule 2).
 */
export function useMembers(params: MemberListParams) { ... }
```

Minimum JSDoc fields for hooks: `@param`, `@returns`, cache key (if server state),
and any non-obvious side effects or constraints.

Minimum JSDoc fields for utilities: `@param`, `@returns`, and one example if the
output format is non-obvious (e.g. `formatNumber(150000, 'en-IN') → "1,50,000"`).

Cross-reference: Rule 24 (documentation quality standard), Rule 43 applies at the
function level what Rule 24 applies at the feature level.

---

## Rule 44 — `RESPONSIBILITY:` + `FLOW:` Comment Mandate on Every File

Every executable .ts / .tsx source file in a feature folder (every screen, navigator, component, hook, API, query_keys, store, schema, type, url_config, util, and mock file) MUST begin with a two-line structured comment block at the very top of the file (before any imports):

```typescript
// RESPONSIBILITY: Renders a single member card in the list. Displays masked phone,
//   membership status badge, and expiry date. Tap navigates to MembersDetailScreen.
//   No API calls. No business logic. Presentational only.
//
// FLOW: MembersListScreen → FlatList renderItem → MembersMemberCard (this file)
//   → tap → navigation.navigate(ROUTES.MEMBERS.DETAIL, { memberId })
```

Format rules:
- `RESPONSIBILITY:` — one to three sentences. Must state what the file does AND
  what it explicitly does NOT do (no API calls, no business logic, etc.).
- `FLOW:` — the data/navigation path that leads to this file and out of it.
  For hooks: the call chain. For API files: the request/response path.
- These comments are the first thing an AI reads when a file is dropped into a
  prompt — they eliminate the need to read the entire file to understand context.

```typescript
// ❌ BAD — no header; AI must read 150 lines to understand the file's role
import React from 'react';
...

// ✅ GOOD — AI understands the file's role in 2 seconds
// RESPONSIBILITY: Central data-fetching hook for the members list. Wraps TanStack
//   Query's useQuery. Handles pagination, search, and status filtering. Does NOT
//   manage UI state (filter panel open/close lives in useMembersFilters.ts).
//
// FLOW: MembersListScreen → useMembers(params) → members.api.ts → fetchMembers()
//   → GET /api/v1/{role}/members → ApiResponse<Member[]> + PaginationMeta
import { useQuery } from '@tanstack/react-query';
...
```

Cross-reference: Rule 24 (feature-level documentation), Rule 43 (JSDoc on functions).

---

## Rule 45 — Network State Model (TanStack Query Native Status — No Parallel Boolean Flags)

For TanStack Query requests, MUST use TanStack Query v5 native typed status (`isPending`, `isFetching`, `isError`, `data`) and MUST NOT wrap them in a parallel `NetworkState<T>` discriminated union. Creating a parallel async enum for server state managed by TanStack Query is **FORBIDDEN** — it duplicates state ownership and causes cache inconsistency.

`NetworkState<T>` is ONLY permitted for **non-TanStack-Query local async operations** (e.g., device hardware access, file system operations, Bluetooth, camera — operations that cannot use TanStack Query).

```typescript
// ❌ FORBIDDEN — parallel NetworkState<T> wrapping TanStack Query server state
const [state, setState] = useState<NetworkState<Member[]>>({ status: 'loading' });
useEffect(() => {
  fetchMembers().then(data => setState({ status: 'success', data }));
}, []);

// ✅ REQUIRED — use TanStack Query v5 native status directly
const { data, isPending, isError, refetch } = useManagerMembers(params);

if (isPending) return <ManagerMembersListSkeleton />;
if (isError) return <ManagerMembersErrorFallback onRetry={refetch} />;
if (!data?.data?.length) return <ManagerMembersEmptyState />;
return <ManagerMembersList members={data.data} />;
```

**For non-Query local async (device operations only):**
```typescript
export type NetworkState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; errorCode?: string };
// Use ONLY for: camera, Bluetooth, file system, biometrics — NOT for API calls
```

## Rule 46 — Background Task / Scheduled Job Documentation

Any background task, scheduled job, periodic sync, or push-notification handler
that runs outside the main UI thread MUST be documented in the feature's
`_features.md` under a dedicated `## Background Tasks` section.

Required documentation per task:

```markdown
## Background Tasks

| Task | Trigger | Frequency | What it does | Failure behavior |
|---|---|---|---|---|
| MembershipExpirySync | App foreground resume | On resume if >1 h since last sync | Fetches expiring memberships, updates local cache | Silent fail — logs to Sentry, retries on next resume |
| PushNotificationHandler | FCM/APNs push received | On push | Parses payload, navigates to relevant screen via ROUTES constants | Falls back to notification tray if app is backgrounded |
```

Rules:
- Background tasks that write to local storage MUST document which storage keys
  they touch (cross-reference Rule 6).
- Background tasks that call the network MUST go through the central network
  client (Rule 7) — never a raw `fetch()` call in a background handler.
- Any task that can run while the app is in the background (not just foregrounded)
  must be noted explicitly — these have different lifecycle constraints on iOS vs Android.

Cross-reference: Rule 7 (API layer), Rule 6 (secure storage), Rule 24 (_features.md documentation).

---

## Rule 47 — API Call Timeout Policy

Every API request MUST execute with a timeout defined by `TIMEOUT_CONFIG`. The default timeout is inherited automatically unless a category-specific override applies. Silent hangs on mobile are especially harmful because the user has limited visibility into network activity and request cancellation.

Define once in `src/core/network/networkClient.ts`:

```typescript
// src/core/network/networkClient.ts
export const TIMEOUT_CONFIG = {
  DEFAULT:    10_000,   // 10 s — standard reads
  UPLOAD:     30_000,   // 30 s — file/image uploads
  REPORT:     20_000,   // 20 s — report generation / export endpoints
  AUTH:        8_000,   //  8 s — login/refresh — fail fast
} as const;

// Applied at the HTTP client level — every request inherits DEFAULT
// unless the specific call overrides it:
const client = networkClient.create({ timeout: TIMEOUT_CONFIG.DEFAULT });
```

```typescript
// ❌ BAD — no timeout; hangs indefinitely on poor mobile networks
const response = await networkClient.get(MEMBERS_URLS.LIST);

// ✅ GOOD — explicit timeout per call category
const response = await client.get(MEMBERS_URLS.LIST);                          // inherits DEFAULT
const response = await client.post('/reports/export', dto,
  { timeout: TIMEOUT_CONFIG.REPORT });                                          // explicit override
```

On timeout: surface `showToast(t('COMMON.REQUEST_TIMED_OUT'), 'error')`
(Rule 40) — never a blank screen or silent failure.

Cross-reference: Rule 7 (API layer), Rule 40 (toast utility).

---

## Rule 48 — Structured Validation Error Handling Shape

When the API returns the canonical validation error response (statusCode `400`;
a `422` is only valid if an explicitly approved API contract requires it), the
response MUST be parsed into a structured shape and mapped to individual form
fields — never displayed as a raw string dump.

The canonical mobile API validation-error envelope:

```typescript
// Shape returned by backend on 400 validation failure
{
  success: false,
  message: 'Validation failed',
  error: 'VALIDATION_ERROR',
  errorCode: 'VALIDATION.DTO.FAILED',
  statusCode: 400,
  validationErrors: [
    { field: 'email',  message: 'Email is already registered' },
    { field: 'phone',  message: 'Phone number is invalid' },
  ]
}
```

Mobile handling — map to form fields via React Hook Form's `setError`:

```typescript
// src/core/utils/handleValidationErrors.ts
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import type { ApiResponse } from '../types/api.types';

export function handleValidationErrors<T extends FieldValues>(
  response: ApiResponse<null>,
  setError: UseFormSetError<T>,
): void {
  response.validationErrors?.forEach(({ field, message }) => {
    setError(field as Path<T>, { type: 'server', message });
  });
}
```

```typescript
// ❌ BAD — raw error string shown in a toast; user doesn't know which field failed
showToast(response.message, 'error');

// ✅ GOOD — field-level errors mapped directly onto the form
const onSubmit = async (dto: CreateMemberDto) => {
  const response = await createMember(dto);
  if (!response.success) {
    handleValidationErrors(response, setError);   // fields light up inline
    return;
  }
  // success path
};
```

Cross-reference: Rule 5 (forms), Rule 40 (toast for non-field errors).

---

## Rule 49 — Stable Key Prop for List Items (No Index Keys)

Every list rendered with a mapped array or a virtualized list component MUST use
a stable, unique entity ID as the item key — never the array index.

```typescript
// ❌ BAD — index key causes wrong items to re-render on insert/delete/reorder
members.map((member, index) => (
  <MembersMemberCard key={index} member={member} />
))

// ✅ GOOD — stable UUID key; React/RN reconciles correctly
members.map((member) => (
  <MembersMemberCard key={member.id} member={member} />
))
```



Consequence of violation: inserting or deleting a list item causes every
subsequent item to re-render (React) or lose component state. For
financial lists this can cause visible flicker and incorrect loading states.

Rule: if an entity has no stable ID from the backend, that is a backend contract
bug — fix the API, do not paper over it with an index key.

Cross-reference: Rule 8 (list rendering performance), Rule 33 (PaginationMeta —
paginated lists always have entity IDs).

---

## Rule 50 — Copy-to-Clipboard for Permitted Record Identifiers

Exception:
Identifiers classified as sensitive under Rule 56 MUST NOT receive a copy affordance, even when displayed on a detail screen.

Any screen displaying a record ID, transaction reference, invoice number, or
other identifier that a user may need to share or reference MUST provide a
one-tap copy-to-clipboard affordance. Users on mobile cannot select and copy
text from a non-input element without explicit support.

```typescript
// src/core/utils/copyToClipboard.ts
import Clipboard from '@react-native-clipboard/clipboard';

export async function copyToClipboard(
  value: string,
  successMessage: string,
): Promise<void> {
  await Clipboard.setString(value);
  showToast(successMessage, 'success');
}
```

```typescript
// ❌ BAD — ID displayed as plain text; user cannot copy it on mobile
<Text>{member.id}</Text>

// ✅ GOOD — tap to copy with feedback
<TouchableOpacity onPress={() => copyToClipboard(
  member.id,
  t('COMMON.COPIED_TO_CLIPBOARD', { label: t('MEMBERS.MEMBER_ID') }),
)}>
  <Text>{member.id}</Text>
  <CopyIcon size={tokens.icon.sm} />
</TouchableOpacity>
```

Applies to: member IDs, transaction IDs, invoice numbers, payment references,
gym branch codes, and any other identifier shown in a detail screen.

Cross-reference: Rule 40 (toast feedback), Rule 30 (sensitive data masking —
copy gives the full unmasked value, which is intentional in detail screens only).

---

## Rule 51 — Empty State Component Per Entity List

Every list screen MUST have a dedicated, named empty-state component. A blank
screen or a generic "No data" text is not acceptable.

```
// ❌ BAD — inline conditional with generic text
{members.length === 0 && <Text>No members found.</Text>}

// ✅ GOOD — dedicated component with context-aware content
{members.length === 0 && <MembersEmptyState />}
```

Every empty-state component MUST include:
1. A contextual icon or illustration (from the approved icon set — Rule 10).
2. A specific message explaining WHY the list is empty (e.g. "No members match
   your current filters" vs "No members have been added yet").
3. A primary CTA where applicable (e.g. "Add Member" button for an empty
   unfiltered list; "Clear Filters" for an empty filtered list).

Naming convention: `[Feature]EmptyState.tsx` or `[Feature][Entity]EmptyState.tsx` — e.g.
`MembersEmptyState.tsx`, `AttendanceEmptyState.tsx`.

The empty-state component is listed in the feature's `_features.md` under
"Loading, Empty, and Error States" (Rule 24 template).

Cross-reference: Rule 1 (module-prefixed naming), Rule 24 (_features.md template).

---

## Rule 52 — Theme Token Enforcement

The file `MOBILE_UI_UX_DESIGN.md` acts as the single source of truth for the codebase's theme implementation. There is no separate contract file. 

The React Native application's theme module MUST exactly implement the complete token values for:
- colors
- status colors
- payment colors
- spacing
- typography
- line-height
- letter-spacing
- radius
- icons
- icon stroke
- touch targets
- motion
- opacity
- shadow/elevation
- z-index/layering
- skeleton tokens

Any raw values or tokens missing from the code's theme configuration that are present in `MOBILE_UI_UX_DESIGN.md` will cause CI/Design validation failure.

## Rule 52A — [featureName]_theme_contract.md Documentation

Every feature folder MUST contain a `members_theme_contract.md` (or equivalent for that feature name) file at the feature root.
This file lists ONLY the design tokens that THIS specific feature consumes — no values, just the token names.

Purpose: When copying a feature module into a new project, this file tells the target project's theme implementor exactly which tokens must exist.

```markdown
# members — Theme Contract

## Color Tokens Used
- `primary`, `on-primary` — FAB and action buttons
- `destructive`, `on-destructive` — delete confirmation button
- `card`, `border` — member card surface and dividers
- `foreground`, `muted` — name text and secondary info
- `status-success-bg`, `status-success-text` — active badge
- `status-danger-bg`, `status-danger-text` — expired badge
- `skeleton-base`, `skeleton-highlight` — list loading skeleton

## Spacing Tokens Used
- `space-3`, `space-4`, `space-5` — card internal padding

## Typography Tokens Used
- `body`, `body-sm`, `caption`, `heading-sm`

## Motion Tokens Used
- `duration-base` — card press animation

## Z-Index Tokens Used
- `z-bottom-sheet` — delete confirmation sheet
```

AI agents writing styled components for a feature MUST check this file to verify all tokens they intend to use are already listed. New tokens must be added to `MOBILE_UI_UX_DESIGN.md` first (Rule 52), then listed here.

## Rule 53 — Idempotency for ALL API Mutations

Every mutating API call (POST, PUT, PATCH, DELETE) MUST generate an `Idempotency-Key` at the moment of user intent.

### A. The Required Contract

1. **API Signature:** The mutation API client MUST require an `idempotencyKey: string` parameter.
2. **HTTP Header:** The HTTP client MUST always attach `headers: { 'Idempotency-Key': idempotencyKey }`.
3. **Lifecycle:** Generate exactly once per user intent. Reuse the same key for retries. Generate a new key only for a new user intent. Never generate a new key on retry.

```typescript
// features/frontend_manager/billing/api/billing.api.ts
export interface ProcessPaymentRequest {
  memberId: string;
  amountMinor: number;
  paymentMethodId: string;
  idempotencyKey: string;
}

export async function processPaymentApi(
  req: ProcessPaymentRequest
): Promise<ProcessPaymentResponse> {
  return await networkClient.post(PAYMENT_URLS.PROCESS, {
    memberId: req.memberId,
    amountMinor: req.amountMinor,
    paymentMethodId: req.paymentMethodId,
  }, {
    headers: {
      'Idempotency-Key': req.idempotencyKey,
    }
  });
}
```

### B. Double Verification for Financial / Irreversible Actions (Extending Rule 31)

Financial mutations require the strict double-verification flow in addition to the generic idempotency key.

## Rule 54 — Single-Flight Token Refresh

401 Unauthorized token-refresh operations MUST be "single-flight". If 10 concurrent API requests fail with 401, they must not trigger 10 simultaneous refresh calls.

Rules:
- Only one refresh operation may be active at a time.
- Concurrent 401 requests must await the same shared refresh promise.
- After the refresh succeeds, the queued requests retry exactly once with the new token.
- If the refresh fails, clear the session and force a single logout operation.

---

## Rule 55 — Trusted Tenant Context for `x-tenant-id`

A feature module MUST NOT freely choose, guess, or derive the `x-tenant-id` header from untrusted local state or route parameters.

Rules:
- The `x-tenant-id` comes ONLY from the authenticated, trusted tenant context (e.g., the global session state set upon secure login or authorized tenant switch).
- The central network client automatically attaches this header to all outgoing requests.
- Feature modules never manually pass a tenant ID to API endpoints unless explicitly acting as a global administrator switching tenants.

---

## Rule 56 — Enterprise Security & Robustness

The mobile architecture MUST enforce the following security and robustness constraints globally:

- **Offline Cache Security**: Any persisted server state containing sensitive PII MUST use encrypted storage or explicitly exclude the data from OS-level backups.
- **Network Retry Policy**: Failed requests (timeout/5xx) must use exponential backoff with jitter. Financial or destructive mutations MUST NOT blind auto-retry; they require explicit user confirmation.
- **Request Cancellation**: All requests initiated by a screen/hook must accept an `AbortSignal`, and navigation/unmount must cancel stale in-flight requests. Navigating away from a loading screen (e.g., search, detail, or upload) MUST cancel the stale request.
- **Deep-Link Authorization**: Matching a route is not enough. Deep-link resolution MUST re-evaluate auth status, role, tenant, and resource authorization before rendering the target screen.
- **Notification Payload Validation**: Treat all push notification payloads as untrusted user input. Validate the payload against a schema before triggering any navigation or side effects.
- **Clipboard Policy**: Sensitive IDs, credentials, reset tokens, OTPs, and full Aadhaar/bank identifiers MUST be excluded from copy-to-clipboard functionality.

---

## Updated Workflow Checklist — What to Verify After AI Writes Code

> Replaces the original checklist at the end of Rule 32. All prior items retained;
> new items for Rules 33–66 appended, including Rule 58A.

1. Read the feature's `_features.md` and then `_forbidden.md` before giving the AI any files.
2. Identify the exact layer (UI? Hook? API? Schema? State?) and pass only those files.
3. After the AI writes code, verify:
   - All styles use design tokens — no raw hex/dp values? (Rule 3)
   - State placed per Server/Client matrix? (Rule 4)
   - Pessimistic UI on financial/destructive mutations? (Rule 32)
   - Forms using library + schema validator? (Rule 5)
   - API calls through central client, typed verb names? (Rule 7)
   - Search/filter inputs debounced at 300ms? (Rule 32)
   - Lists virtualized for >20 items? (Rule 8)
   - User messages from `response.message`, never hardcoded? (Rule 7)
   - Auth tokens in hardware-backed secure storage only? (Rule 6)
   - Sensitive data masked in list/card views? (Rule 30)
   - Destructive/financial actions use confirmation bottom sheet? (Rule 31)
   - Co-located tests exist for new hooks and components? (Rule 17)
   - Crash reporting wired for new critical paths? (Rule 23)
   - Is any new dependency on the approved list? (Rule 22)
   - `_features.md` updated with non-generic content, including Dependency Manifest and Feature Lifecycle Contract? (Rule 24)
   - All interactive elements have accessible labels + 44/48dp targets? (Rule 25)
   - Any cross-feature imports? (Rule 28)
   - `_forbidden.md` current and specific? (Rule 29)
   - Paginated responses use canonical `PaginationMeta` shape? (Rule 33)
   - Status/type fields use enums — no magic strings? (Rule 34)
   - Navigation calls use `ROUTES` constants — no hardcoded strings? (Rule 35)
   - Type-only imports use `import type`? (Rule 36)
   - Currency/numbers formatted via `formatCurrency()` / `formatNumber()`? (Rule 37)
   - Null/empty fields render `displayValue()` en-dash fallback? (Rule 38)
   - Async buttons have `minWidth` — no layout shift on loading? (Rule 39)
   - Toasts go through `showToast()` — no direct library calls? (Rule 40)
   - Multi-step forms have `useUnsavedChangesGuard` wired? (Rule 41)
   - Every `useEffect` dependency has an explanatory comment? (Rule 42)
   - All hooks and utilities have JSDoc blocks? (Rule 43)
   - Every file has `RESPONSIBILITY:` + `FLOW:` header comment? (Rule 44)
   - Async state: TanStack Query v5 native `isPending`/`isError` used directly — zero parallel `NetworkState<T>` wrappers on server state? (Rule 45)
   - Background tasks documented in `_features.md`? (Rule 46)
   - API calls have explicit timeouts from `TIMEOUT_CONFIG`? (Rule 47)
   - 400 validation errors mapped to form fields via `handleValidationErrors()`? (422 only if explicitly approved by API contract) (Rule 48)
   - List items keyed by entity ID — no index keys? (Rule 49)
   - Permitted record identifiers have copy-to-clipboard affordance? (Rule 50)
   - Every list screen has a dedicated `EmptyState` component? (Rule 51)
   - New tokens added to `MOBILE_UI_UX_DESIGN.md` before implementation? (Rule 52)
   - `[featureName]_theme_contract.md` updated with any newly used tokens? (Rule 52A)
   - `members.url_config.ts` exists in `config/` sub-folder — no hardcoded URLs in `*.api.ts`? (Rule 7B)
   - Query keys use the canonical factory from `members.query_keys.ts`? (Rule 7C)
   - Mutations use dedicated mutation hooks — no inline `useMutation` in screens/components? (Rule 7C)
   - Every POST/PATCH/PUT/DELETE mutation uses a required stable Idempotency-Key; the same key is reused on retry and a new key is generated only for a new user intent? (Rule 53)
   - Token refresh is single-flight? (Rule 54)
   - x-tenant-id derived from secure context only? (Rule 55)
   - Enterprise security constraints respected? (Rule 56)
   - Exact import path casing matches the file on disk — CI/Linux compatible? (Rule 57)
   - WebSocket instantiated only through centralized `WebSocketContext` / `SocketProvider`? (Rule 58)
   - App foreground resume triggers the exact notification-recovery endpoint from the feature API contract? (Rule 58A)
   - Role-masked fields typed as optional in interfaces/schemas; UI handles `undefined` gracefully? (Rule 59)
   - Every dedicated mutation hook invalidates affected TanStack Query keys inside `useMutation({ onSuccess })` per Rule 60? (Rule 60)
   - All client-authored/static user-visible strings use `t('namespace.KEY')` — no hardcoded UI text in components; backend-supplied `response.message` values are displayed as supplied by the API and are NOT passed through `t()` (Rule 61)
   - Locale files named `[featureName]_{lang}.json` and co-located in feature `_locales/`? (Rule 61)
   - `Accept-Language` header attached automatically by central network client? (Rule 61)
   - Feature flags accessed via `useFeatureFlag()` — no raw build/env reads in components? (Rule 62)
   - Currency formatting is feature-local `formatCurrency.ts`; approved currency metadata used; unknown codes throw? (Rule 63)
   - Tenant data export triggers async backend call + `202 Accepted` toast — no in-app download? (Rule 64)
   - Every interactive control and critical state indicator has a deterministic `testID` in `[module]-[component]-[action/state]` format? (Rule 65)
   - Every custom hook, complex component, and state store has an exhaustive JSDoc / docstring? (Rule 66)
4. Run CI gates: lint (`eslint-plugin-boundaries`, `consistent-type-imports`), type check, test pyramid, SCA scan, secrets scan, hard-write-boundary diff check.
5. For auth, payment, storage, or tenant-routing changes: ensure CODEOWNERS human review.

### Sub-Module `_features.md` Files

The module root MUST contain exactly ONE authoritative `[role_module]_features.md` that covers ALL screens, flows, and sub-features of the module. Creating additional `_features.md` files inside sub-folders is FORBIDDEN — it violates Root Quarantine and fragments the AI repair context. All sub-screen documentation MUST be sections within the single root `_features.md`.

### Documentation Freshness Rule

Every time a component is added, an API endpoint changes, a new screen is added, or a user flow changes, the `_features.md` for that feature MUST be updated in the same commit. Stale documentation is worse than no documentation because it actively misleads future AI agents.

## Rule 57 — Strict Case Sensitivity for File Names and Imports (Linux/CI Compatibility)
All imports and file paths MUST exactly match the casing of the actual file on disk. While development often happens on Windows/macOS (which have case-insensitive file systems), production deployments and CI pipelines typically run on Linux (which has a strict case-sensitive file system).
- **Rule:** A mismatch between import case (e.g., `trainer_url_config`) and file case (e.g., `Trainer_url_config.ts`) will cause the build to fail in CI/CD.
- **Enforcement:** Always double-check that the casing of module prefixes and filenames in imports matches exactly. If you rename a file, ensure the git index catches the case change (e.g., using `git mv`).
- ❌ **BAD:** File is `UserComponent.tsx`, imported as `import UserComponent from './userComponent'`.
- ✅ **GOOD:** File is `UserComponent.tsx`, imported as `import UserComponent from './UserComponent'`.

## Rule 58 — WebSockets & Real-Time Communication
* **The Rule:** WebSockets must never be instantiated directly via `new WebSocket()` or `io()` inside UI components.
* **Implementation:** Always use a centralized `WebSocketContext` or `SocketProvider` to manage connection lifecycles (connect, disconnect, reconnect). Feature modules must consume WebSockets via dedicated custom hooks (e.g., `useSocketEvent('NOTIFICATION_RECEIVED', callback)`). This guarantees that event listeners are correctly cleaned up on component unmount and avoids memory leaks.

## Rule 58A — Notification & WebSocket Recovery

### The Problem
If the user's app is closed or loses internet connection when a server notification event is emitted, the event is lost.

### The Rule
1. **Real-time:** Listen to WebSocket events (e.g., `notification.received`) and update the UI (bell icon, toast) immediately if the app is open.
2. **Offline Recovery:** Whenever the application mounts or comes to the foreground, it MUST call the exact notification-recovery endpoint defined by the supplied feature API contract. The AI MUST NOT invent, shorten, or substitute the endpoint path.

   Canonical project pattern: `GET /api/v1/{role}/notifications`

   Do not rely 100% on WebSocket delivery for critical notifications.

## Rule 59 — Role-Based Field Masking & Optional Types
* **The Rule:** The backend strictly masks sensitive data fields (like revenue) based on the user's role before transmitting the response.
* **Implementation:** Frontend TypeScript interfaces and Zod schemas MUST mark these potentially masked fields as optional (`?`). UI components consuming this data must implement graceful fallback behavior (e.g., hiding a specific chart or displaying a generic placeholder) if a field is `undefined`. The frontend must never crash due to a missing role-restricted field.

## Rule 60 — Strict Cache Invalidation Strategy
* **The Rule:** TanStack Query (React Query) server state must always remain perfectly synchronized with the backend data.
* **Implementation:** Every dedicated mutation hook (`useCreateMember.ts`, `useDeleteMember.ts`, etc.) MUST invalidate affected queries inside `onSuccess` within the `useMutation` call. This is the canonical pattern — `onSuccess` inside `useMutation` is **REQUIRED** (not banned) for cache invalidation. The ban applies ONLY to `onSuccess` inside `useQuery`.

```typescript
// ✅ REQUIRED — onSuccess inside useMutation for cache invalidation
export function useDeleteManagerMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteManagerMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MANAGER_MEMBERS_QUERY_KEYS.lists() });
    },
  });
}

// ❌ FORBIDDEN — onSuccess inside useQuery
const { data } = useQuery({
  queryKey: MANAGER_MEMBERS_QUERY_KEYS.list(filters),
  queryFn: () => fetchManagerMembers(filters),
  onSuccess: (data) => { /* BANNED in TanStack Query v5 */ },
});
```

## Rule 61 — Internationalization (i18n) & Localization

The mobile frontend uses a co-located locale file architecture. The active launch languages are `en` and `hi`.

### Module-Co-located Locales
Each feature module owns its own translation keys.

### Locale File Naming Convention
Locale files MUST follow: `[featureName]_{lang}.json`
- ✅ **GOOD:** `members_en.json`, `members_hi.json`
- ❌ **BAD:** `en.json`, `translation.json`, `index.json`

The `_locales/` folder inside each feature MUST contain ONLY locale files for that feature.
Locale files are grouped by feature, NOT by language.
Do NOT create `src/locales/en/` or any global language folder.

```json
// src/features/frontend_manager/manager_members/_locales/members_en.json
{
  "members": {
    "PAGE_TITLE": "Members",
    "ADD_MEMBER": "Add Member"
  }
}
```

### Generated Resources
Merged locale resources are generated under `src/i18n/generated/`:
```typescript
import en from './generated/en';
import hi from './generated/hi';
```

### Component Usage
```typescript
const { t } = useTranslation();
t('members.PAGE_TITLE'); // MUST use t('NAMESPACE.KEY')
```

### Network Client Header
`src/core/network/networkClient.ts` remains the only network transport and must automatically add the `Accept-Language` header from the active locale state.

## Rule 62 — Centralized Feature Flags

Components must not read raw environment/build values.
Build config goes through the central mobile config module.
Runtime feature flags are accessed through `useFeatureFlag()`.

```typescript
// ❌ BAD: reading build/config values directly inside a feature component
if (readBuildConfig().enableFeature) { ... }

// ✅ GOOD:
const isNewBillingEnabled = useFeatureFlag('NEW_BILLING_UI');
if (isNewBillingEnabled) { ... }
```

## Rule 63 — Multi-Currency Monetary Amounts

Rule 63 supersedes the currency portion of Rule 37. Currency formatting is **feature-local** (Strict WET — never in `src/core/`).
Currency formatting MUST be feature-local (`[feature]/utils/[module]FormatCurrency.ts`, e.g., `managerMembersFormatCurrency.ts`). Rule 63 internally handles nulls by returning `—`; `displayValue()` (Rule 38) is NOT called for currency values.

Only currencies present in the project's approved currency metadata are supported. Unsupported currency codes MUST fail validation. Never silently default an unknown currency to divisor 100.

> ⛔ **AI AGENTS: NEVER import `currencyMetadata` from `@/core/config/currencyMetadata` or any global path. The metadata MUST be self-contained inside the feature-local formatter file. This is a Strict WET requirement — duplicate it per feature.**

```typescript
// currencyMetadata is self-contained inside this file \u2014 no external @/core import allowed
const currencyMetadata: Record<string, { divisor: number }> = {
  INR: { divisor: 100 }, USD: { divisor: 100 }, EUR: { divisor: 100 },
  // extend per project approved currencies only
};

/**
 * Formats a monetary amount from minor units into a localized currency string.
 *
 * @param amountMinor - The amount in minor units (e.g., cents).
 * @param currency - The 3-letter currency code (e.g., 'USD', 'INR').
 * @param locale - The active locale string (e.g., 'en', 'hi').
 * @returns The formatted currency string.
 * @throws If the currency is not in the approved metadata.
 */
export function formatCurrency(
  amountMinor: number | null | undefined,
  currency: string,
  locale: string,
): string {
  if (amountMinor == null) return '—';
  const meta = currencyMetadata[currency];
  if (!meta) throw new Error(`Unsupported currency: ${currency}`);
  
  const divisor = meta.divisor;
  const majorValue = amountMinor / divisor;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(majorValue);
}
```

## Rule 64 — Tenant Data Export & Offboarding UX

### The Rule
Data exports take minutes to process. Mobile operating systems are not designed to easily download and extract massive ZIP files of business CSVs. Therefore, the mobile app MUST handle the export trigger strictly as an asynchronous background request that emails the file to the user.

### UI Placement
The export functionality MUST live in a dedicated section: **Admin Settings -> Data Export & Offboarding**. 
- **Role Constraint:** This UI MUST only be available in the **Superadmin** (or top-level Gym Admin) mobile dashboard. Never add export buttons to manager, trainer, or member interfaces.

### Interaction Flow
1. **Button:** Display a clear `[ Request Full Data Export ]` button.
2. **Action:** When clicked, call the exact export endpoint defined by the supplied feature API contract. The AI MUST NOT invent or shorten the endpoint path.
   Canonical project pattern: `POST /api/v1/superadmin/export-data`
3. **Feedback:** Do NOT show a continuous loading spinner. Since the API returns `202 Accepted` immediately, show a success toast/alert: 
   *"Export started. A secure download link will be sent to your email within a few minutes."*
4. **Format Expectation:** The UI MUST explicitly inform the user that their data will be sent via email as a ZIP file containing Excel (CSV) files, which are best viewed on a computer.
5. **Real-time Completion Feedback:** The mobile dashboard MUST listen for a WebSocket event (e.g., `export.completed`) or poll a status endpoint. When received, update the UI to confirm: *"Your data export is ready and the email has been sent."*

> **AI AGENT NOTE:** Never attempt to download, parse, or open the `.zip` file directly within the mobile app's file system or using a Webview. The mobile app's ONLY responsibility is to hit the export endpoint and display a confirmation message indicating that an email is on the way.





## AI Introspection & Agentic Compatibility Rules

### Rule 65 — AI-Testable UI (Mandatory `testID`)

Every interactive React Native control and every critical state indicator MUST
have a deterministic `testID`.

Canonical format:

`testID="[module]-[component]-[action/state]"`

Examples:

`members-addform-submit`
`billing-invoice-status-paid`

Gesture-driven surfaces MUST expose a `testID` on the view that receives
the gesture interaction.

### Rule 66 — Component-Level AI Docstrings (JSDoc / Doc)
* **The Problem:** The `_features.md` file provides module-level context, but AI agents also need granular, file-level context when editing a specific controller, hook, or widget.
* **The Rule:** Every custom hook, complex React Native component, and State Store MUST have an exhaustive docstring block directly above its declaration.
* **What to include:** Explain the business intent, state dependencies, and explicit edge cases. Example: `/** ... */ Manages local wizard state for Member Creation. @edge-case Resets to step 1 if the API throws 409 Conflict.`


---

## Rule 67 — Bounded Execution, Chunking, and RBG System (MANDATORY FOR ALL MOBILE AUDIT/REPAIR TASKS)

This rule governs HOW mobile audit and repair work is executed. It does NOT reduce or weaken any architecture rule, design rule, test requirement, or documentation requirement.

### 67A — Context-Limit Chunking Strategy

> ⚠️ LARGE REPOSITORY REALITY CHECK

For mobile feature folders where the total file count or token size may exceed a single LLM context window, the following chunking strategy MUST be applied:

**Do NOT abandon zero-sampling.** Instead, process the scope in bounded work units.

Chunking rules:

1. **Feature ZIP first:** Extract and freeze the full requirement baseline (from `_features.md`, API contract, and UI/UX design) before inspecting any implementation files.
2. **Per-layer chunks:** Process each layer of a feature (screens → hooks → API → state → tests → docs) as a separate bounded work unit. Complete + checkpoint before moving to the next.
3. **Never mix requirement reading with repair** in the same bounded unit — this causes context pollution and hallucination.
4. **Checkpoint after every work unit** (see Section 67C). The checkpoint must record which requirements have been satisfied so far.
5. **Stage 3 re-audit runs in chunks too** — re-audit each previously completed work unit, not the entire scope in one pass.
6. **If a work unit cannot fit in context:** split it by file type layer (e.g., screens + components in one pass, hooks + API in next pass for the same feature). Never split a single file across passes.

The zero-sampling requirement is NOT weakened. Every authored artifact MUST still be inspected — chunking only controls *when* each artifact is inspected, not *whether*.

---

### 67B — Repair Batch Group (RBG) System (MANDATORY FOR AUDIT+REPAIR MODE)

#### THE PROBLEM THIS SOLVES

After a full audit, the repair phase MUST NOT apply fixes randomly from any batch.
Random repair causes:
- partial fixes that break dependent mobile flows;
- context loss mid-repair;
- incomplete API contracts;
- wasted turns;
- the AI never finishing.

#### REPAIR BATCH GROUP DEFINITION

After the full audit is complete and all findings are recorded, the AI MUST group all repair work into **Repair Batch Groups (RBGs)** before executing a single fix.

A Repair Batch Group is a set of 3–4 audit batches whose findings are repaired together in one controlled execution turn.

#### RBG SIZING RULE

```text
IF total audit batches ≤ 6
  → Group into RBGs of 3 batches each

IF total audit batches 7–12
  → Group into RBGs of 3–4 batches each

IF total audit batches > 12
  → Group into RBGs of 4 batches each

MAXIMUM ABSOLUTE CEILING: No single RBG may contain findings from more than 4 audit batches.
MINIMUM: No single RBG may contain fewer than 2 audit batches unless it is the final RBG.
```

#### RBG PRIORITY ORDER

RBGs MUST be ordered by repair dependency, not by batch number:

```text
RBG 1 — P0 Critical fixes (architecture blockers, broken flows, security, Rule 0B violations)
RBG 2 — P1 High fixes (state/API, forms, navigation, functional closure)
RBG 3 — P2 Medium fixes (design tokens, loading/error states, tests, Rule 24 docs)
RBG 4 — P3 Low fixes (naming, comments, tooling)
RBG N — Final re-audit + packaging
```

If a P0 fix from Batch 7 and a P0 fix from Batch 2 are related (e.g., same entity/mutation), they MUST be in the same RBG.
Do NOT split dependent fixes across RBGs.

#### RBG PLAN — MANDATORY BEFORE ANY REPAIR BEGINS

Before executing any repair, the AI MUST publish the complete RBG Plan:

```text
╔══════════════════════════════════════════════════════════╗
║        MOBILE REPAIR BATCH GROUP PLAN                   ║
╚══════════════════════════════════════════════════════════╝

TOTAL AUDIT BATCHES:     [N]
TOTAL FINDINGS:          [N]
TOTAL RBGs:              [N]

┌─────────────────────────────────────────────────────┐
│ RBG 1 — Audit Batches [X, Y, Z]                     │
│ Findings: [N]  │  Severity: P0/P1                   │
│ Focus: [brief description of what is being fixed]   │
├─────────────────────────────────────────────────────┤
│ RBG 2 — Audit Batches [A, B, C]                     │
│ Findings: [N]  │  Severity: P1/P2                   │
│ Focus: [brief description]                          │
├─────────────────────────────────────────────────────┤
│ RBG 3 — Audit Batches [D, E, F]                     │
│ Findings: [N]  │  Severity: P2/P3                   │
│ Focus: [brief description]                          │
└─────────────────────────────────────────────────────┘

RBG GROUPING RATIONALE:
[Why these batches are grouped together — dependency order]

Reply "Begin RBG 1" to start controlled repair execution.
Or reply "Adjust" to change the grouping.
```

Do NOT start any repair until the user approves the RBG Plan.

#### RBG EXECUTION RULES

1. **PRIOR RBG DEPENDENCY PRE-CHECK (MANDATORY for RBG N where N > 1):** Before executing any fix in RBG N, verify that every artifact from previous RBGs that the current RBG depends on is actually in place. If a prior RBG fix is missing or incomplete → repair it BEFORE starting the current RBG and record as `PRIOR_RBG_FIX_INCOMPLETE`. This is a targeted dependency check only — not a full re-audit of all previous RBGs.
2. Execute ALL findings from the current RBG before moving to the next RBG.
3. After completing each RBG, checkpoint and display the RBG Completion Dashboard.
4. Do NOT start the next RBG until the user replies "continue" or "Begin RBG N+1".
5. Within an RBG, apply fixes in dependency order (architecture → state → UI → tests → docs).
6. Never apply a fix from RBG 3 while RBG 1 is still in progress.

#### RBG CHECKPOINT TEMPLATE

After completing each RBG, display:

```text
╔══════════════════════════════════════════════════════════════╗
║         🔧 MOBILE RBG CHECKPOINT 🔧                         ║
╠══════════════════════════════════════════════════════════════╣
║ RBG JUST COMPLETED:  RBG [N] — Audit Batches [X, Y, Z]      ║
║ FINDINGS FIXED:      [N] fixes applied                       ║
║ FILES CHANGED:       [N] files                               ║
║ ISSUES FIXED:        P0:[N] P1:[N] P2:[N] P3:[N]            ║
║ CUMULATIVE FIXED:    P0:[N] P1:[N] P2:[N] P3:[N]            ║
╠══════════════════════════════════════════════════════════════╣
║ REMAINING RBGs:                                              ║
║   RBG [N+1]: Batches [A, B, C] — [N] findings               ║
║   RBG [N+2]: Batches [D, E, F] — [N] findings               ║
╠══════════════════════════════════════════════════════════════╣
║ VERIFICATION STATUS:                                         ║
║   TypeScript:  [PASS / FAIL / NOT_EXECUTED]                  ║
║   Lint:        [PASS / FAIL / NOT_EXECUTED]                  ║
║   Tests:       [PASS / FAIL / NOT_EXECUTED]                  ║
╠══════════════════════════════════════════════════════════════╣
║ ACTION REQUIRED:                                             ║
║ Reply "continue" to proceed to RBG [N+1].                    ║
║ OR reply "Begin RBG [N+1]" to start the next group.          ║
╚══════════════════════════════════════════════════════════════╝
```

#### RBG ANTI-RANDOM-FIX RULE (NON-NEGOTIABLE)

The AI MUST NOT:
- Pick fixes randomly from any batch;
- Apply a P3 fix before all P0 fixes in the same RBG are done;
- Skip to a later RBG because an earlier RBG has a hard fix;
- Mix findings from different RBGs in the same execution turn;
- Claim an RBG is complete when any finding in it remains unresolved.

If a finding in the current RBG is BLOCKED (external decision required), document it explicitly and continue with the remaining unblocked findings in the same RBG.

> ⛔ **RBG HOST/RUNTIME UNBLOCKING RULE (NON-NEGOTIABLE):**
> Findings classified as `HOST_RUNTIME_BLOCKED_VERIFICATION` are NOT BLOCKED. The AI MUST write the complete source-level fix (screens, components, hooks, stores, styles, mocks, tests, docs) in the current RBG, document the verification commands under `DEFERRED_TO_HOST_RUNTIME`, and continue through all remaining RBG findings. Missing runtime/host capability (no Metro bundler, no simulator/device, no Maestro runner) is NEVER an excuse to mark an RBG finding blocked or pause the repair sequence.
> **MODULAR MONOLITH NOTE:** Host application root files (`package.json`, root `tsconfig.json`, `app.json`, root navigation container) are host responsibilities and NOT part of the module scope. Their absence MUST NOT be marked as an RBG blocker (`BLOCKED_BY_SUPPLIED_SCOPE`). Only genuine external product decisions (`EXTERNAL_PRODUCT_DECISION_BLOCKED`) or missing intra-module files may remain blocked.


#### RBG STATE IN progress.json

Add to the existing `progress.json` structure:

```json
{
  "rbg_plan_published": false,
  "rbg_plan_approved": false,
  "total_rbgs": 0,
  "current_rbg": null,
  "completed_rbgs": [],
  "remaining_rbgs": [],
  "rbg_findings_fixed": 0,
  "rbg_findings_remaining": 0
}
```

---

### 67C — Mandatory Bounded Execution + Persistent Checkpoint Workflow

Execution MUST be performed through bounded, resumable work units.

This section modifies EXECUTION CONTROL ONLY. It MUST NOT reduce or weaken any mobile architecture rule, design rule, test requirement, or documentation requirement.

> ⛔ **SOURCE-LEVEL WORK UNIT UNBLOCKING RULE:**
> A work unit whose source-level code fixes (screens, components, hooks, stores, styles, mocks, tests, docs) are fully written, implemented, and statically inspected within the supplied scope is **COMPLETED** for source repair. If dynamic mobile test execution cannot be run due to absence of a live device/simulator, that verification step is recorded as `DEFERRED_TO_HOST_RUNTIME`, but the work unit itself is NOT blocked and MUST NOT be stalled.
> **MODULAR MONOLITH BOUNDARY:** Host application root files (`package.json`, root `tsconfig.json`, `app.json`, root navigation container) are intentionally host-owned and NOT part of the module's scope. Their absence MUST NEVER be marked as `BLOCKED` or `BLOCKED_BY_SUPPLIED_SCOPE`. Only missing intra-module files or external product decisions may be flagged, and the AI MUST NOT halt to demand host files from the user.


Execution flow:

```text
REQUIREMENT BASELINE
        ↓
WORK-UNIT PLAN
        ↓
BOUNDED EXECUTION
        ↓
LOCAL VERIFICATION
        ↓
CHECKPOINT
        ↓
SAFE STOP
        ↓
USER REPLIES "continue"
        ↓
READ CHECKPOINT
        ↓
FIRST UNVERIFIED WORK UNIT
        ↓
CONTINUE
        ↓
...
        ↓
FULL FINAL RE-AUDIT
        ↓
FINAL CHECKLIST
        ↓
FINAL PACKAGING
        ↓
FINAL ZIP
```

#### Execution-State Location

Execution state MUST remain outside the supplied mobile feature source scope.

Use:

```text
/mnt/data/.ai_execution_state/[SAFE_TASK_ID]/ (Linux/Mac)
%LOCALAPPDATA%/.ai_execution_state/[SAFE_TASK_ID]/ (Windows)
```

Required control files:

```text
progress.json
work-units.json
checkpoint-log.md
```

These files are NOT mobile business artifacts. Do NOT move them into the feature module. Do NOT include them in the final mobile ZIP unless explicitly required.

#### Checkpoint Dashboard (Normal)

After completing and verifying a work unit, persist the checkpoint and display:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOBILE CHECKPOINT PROGRESS DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK:
[role / feature]

MODE:
[CREATE / AUDIT + REPAIR]

CHECKPOINT:
#[checkpoint_sequence]

━━━━━━━━ EXECUTION ━━━━━━━━

WORK UNITS:
[completed] / [total]
Completion: [percentage]%

Current: [WU-ID] — [title]
Next:    [WU-ID] — [title]

━━━━━━━━ REQUIREMENTS ━━━━━━━━

Verified: [verified] / [total]
Coverage: [percentage]%

━━━━━━━━ ISSUES ━━━━━━━━

Discovered: [total]
Fixed:      [completed]
Remaining:  [remaining]

━━━━━━━━ VERIFICATION ━━━━━━━━

TypeScript:       [status]
Lint:             [status]
Tests:            [status]
Design Tokens:    [status]
Functional Flows: [status]
Final Re-Audit:   [status]

━━━━━━━━ DELIVERY STATE ━━━━━━━━

Execution State:
[IN_PROGRESS / PAUSED_MANUAL_STOP / RECOVERY_REQUIRED / BLOCKED / COMPLETE]

Delivery State:
[NOT_READY / READY_FOR_FINAL_REAUDIT / READY_FOR_PACKAGING / READY_FOR_DELIVERY]

━━━━━━━━ USER ACTION ━━━━━━━━

Reply `continue` to resume from the first unverified or incomplete work unit.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Resume

When the user replies `continue`, the AI MUST:

1. Read `progress.json`;
2. Read `work-units.json`;
3. Validate checkpoint;
4. Inspect filesystem;
5. Compare checkpoint against filesystem;
6. Find first unverified or incomplete work unit;
7. Reuse already-verified work;
8. Continue from that point;
9. Persist the next checkpoint.

Do NOT restart from zero merely because the previous response was interrupted.

#### Audit Completeness Protection

Checkpointing MUST NOT become permission to:
- sample files;
- skip architecture rules;
- skip design token checks;
- skip test requirements;
- skip documentation requirements;
- skip functional closure verification.

The final result MUST still satisfy the complete applicable mobile architecture rules (Rules 0A–66) and the supplied `MOBILE_UI_UX_DESIGN.md`.

---

## MOBILE DELIVERY FREEZE GATE

> ⛔ **HARD STOP — ALL 14 SOURCE-LEVEL GATES BELOW MUST BE REPAIRED WITH PROOF.**
> **Failing or skipping ANY single source-level gate = REPAIR immediately.**
>
> ⛔ **DELIVERY MANDATE (NEVER WITHHOLD THE REPAIR ZIP):**
> When all fixable source-level code within the supplied mobile scope is complete, the AI **MUST ALWAYS PACKAGE AND DELIVER THE ZIP**.
> Host-dependent verification steps (`DEFERRED_TO_HOST_RUNTIME`), host infrastructure files (`OUTSIDE_SUPPLIED_SCOPE`), and external product decisions (`EXTERNAL_PRODUCT_DECISION_BLOCKED`) MUST be documented in `RE_AUDIT_CHECKLIST_RESULT.md` and `INTEGRATION_GUIDE.md`, but MUST NEVER trigger `BLOCKED_DELIVERY` or prevent packaging/delivering the repaired ZIP.

| Gate # | Gate Description | Verification Directive | Consequence of Failure |
|---|---|---|---|
| **Gate 1** | No Critical Findings Open | Verify zero broken mobile user flows, wrong resource identity, or data integrity issues | **STOP.** Broken flow = REJECTED DELIVERY |
| **Gate 2** | No Major Architecture Violations | Verify state ownership, zero cross-feature imports via Rule 28, strict feature naming, Rule 0A.3 1:1 primary navigation to feature folder mapping | **STOP.** Sibling import = REJECTED DELIVERY |
| **Gate 3** | Design Token Mapping Verified | Theme module mapping verified — all semantic tokens produce valid StyleSheet values; zero raw colors or hardcoded dp | **STOP.** Unstyled or broken component in dark/light mode |
| **Gate 4** | Zero Hardcoded Colors or Insets | Grep for hex `#`, `rgb(`, raw sizes without `// design-exception: <reason>` | **STOP.** Hardcoded style = REJECTED DELIVERY |
| **Gate 5** | Hardware-Backed Secure Storage Only | Verify auth tokens, refresh tokens, and biometric keys use `react-native-keychain` / Keystore. Zero tokens in `AsyncStorage` | **STOP.** Insecure storage = CRITICAL SECURITY VULNERABILITY |
| **Gate 6** | Centralized URL Config Present | `config/[featureName].url_config.ts` present, exports all routes/APIs with real paths (zero placeholders) | **STOP.** Missing config = REJECTED DELIVERY |
| **Gate 7** | Feature Map Non-Generic | `[featureName]_features.md` complete with all 18 mandatory sections (no TBDs or boilerplate) | **STOP.** Generic doc = INCOMPLETE MODULE |
| **Gate 8** | TanStack Query & Hook Architecture | Query keys registered in `[featureName].query_keys.ts` with resource identity; screens NOT calling `useMutation` directly; cache invalidation via `useMutation({ onSuccess: () => queryClient.invalidateQueries(...) })` per Rule 60 | **STOP.** Broken server state / crash |
| **Gate 9** | Form Architecture Compliance | React Hook Form + Zod validator class/schema; zero Yup/Joi; controlled inputs | **STOP.** Broken form validation |
| **Gate 10** | Screen Thinness Ceilings Enforced | All screens in `screens/` ≤ **80 lines**; composition only; zero business logic or direct API calls | **STOP.** Monolithic screen = ARCHITECTURE FAILURE |
| **Gate 11** | Scope Integrity Verified | Changed-file list produced — strictly target feature files changed (`features/frontend_{role}/{module}/**`) | **STOP.** Scope leak = REJECTED DELIVERY |
| **Gate 12** | Multi-Tenancy Enforced | Verify `x-tenant-id` derived from trusted session context, never from route params or client payload | **STOP.** Cross-tenant data vulnerability |
| **Gate 13** | Complete Async States | Verify loading skeletons (`[Feature]Skeleton.tsx`), empty states (`[Feature]EmptyState.tsx`), and error fallbacks implemented | **STOP.** Blank screen on async fetch |
| **Gate 14** | Consolidated Integration Guide & Re-Audit Included | `INTEGRATION_GUIDE.md` (consolidating changelog, navigation route registry, host integration steps, and verification commands), `RE_AUDIT_CHECKLIST_RESULT.md`, and Maestro E2E test suite present inside ZIP root | **STOP.** Missing deliverable = REJECTED DELIVERY |

> ⛔ **If ANY source-level code gate fails: STATUS = `REPAIR_REQUIRED`. Fix the source code. Once all source-level code fixes are written, package and deliver the ZIP with deferred/out-of-scope items explicitly documented.**
>
> ⛔ **NOTE ON OFFLINE VERIFICATION & MAESTRO TEST RUNS:**
> Gate 14 and DoD Gate 5 require the Maestro YAML test suite files (`mobile_e2e/`) to be fully authored, structured, and included in the ZIP. If the local environment lacks a mobile device/emulator or Maestro runner, the YAML files are verified statically as PASS, and dynamic execution is recorded as `DEFERRED_TO_HOST_RUNTIME`. Device/runner absence MUST NOT trigger `BLOCKED_DELIVERY` or block delivery when the YAML test suite is fully authored and present.


---

## DEFINITION OF DONE — Mobile Architecture Release Checklist

> ⛔ **HARD STOP — ALL ITEMS BELOW ARE MANDATORY INVARIANTS FOR PRODUCTION RELEASE.**
> **Every item MUST be verified against actual code with file and line evidence. Record `NON_COMPLIANT` for any failure.**

### 1. Architecture & Isolation Gate
- [ ] **AI Portability:** Feature folder alone provides complete context for understanding, mocking, testing, and repairing the feature. — *STOP if sibling business files are required.*
- [ ] **Zero Cross-Feature Imports:** Zero imports from sibling feature modules (Rule 28). — *STOP if `import ... from '../sibling'` found.*
- [ ] **Screen Thinness:** All screen files in `screens/` ≤ 80 lines; compose components only; zero business logic. — *STOP if screen exceeds 80 lines.*
- [ ] **Feature Documentation Trio:** `[featureName]_features.md`, `[featureName]_forbidden.md`, and `[featureName]_theme_contract.md` present and populated. — *STOP if any documentation artifact is missing.*
- [ ] **URL Config Centralization:** `config/[featureName].url_config.ts` present and consumed by all API call sites. — *STOP if raw endpoint strings exist in code.*

### 2. State & Data Contract Gate
- [ ] **Server State via TanStack Query:** Server data managed through TanStack Query; query keys registered in `[featureName].query_keys.ts`. — *STOP if API data duplicated in Zustand.*
- [ ] **Client UI State via Feature-Scoped Store:** Module-scoped Zustand store for shared client UI state; hard ceiling 180 lines. — *STOP if single global store used.*
- [ ] **Pessimistic UI Updates:** Destructive and financial mutations wait for authoritative server response before updating UI (Rule 32). — *STOP if premature optimistic update.*
- [ ] **MSW / Mock Completeness (Rule 7A):** MSW handlers and fixtures cover 100% of UI fields, card fields, KPI metrics, chart series, and filters. — *STOP if empty card fields.*

### 3. Security & Safety Gate
- [ ] **Hardware Secure Storage:** Auth tokens and sensitive credentials stored in iOS Keychain / Android Keystore via `react-native-keychain`. — *STOP if tokens in AsyncStorage.*
- [ ] **Double Verification (Rule 31):** Delete, terminate, suspend, or financial triggers require confirmation bottom sheet (`useConfirmSheet`). — *STOP if single-tap delete exists.*
- [ ] **PII & Financial Masking (Rule 30):** Phone numbers, national IDs, and account numbers masked in list/card views via `maskSensitiveData()`. — *STOP if raw PII in list.*
- [ ] **Mutational Idempotency (Rule 53):** All mutating API calls (POST/PATCH/PUT/DELETE) require `idempotencyKey` and inject `Idempotency-Key` header. — *STOP if missing idempotency key.*

### 4. Error Handling & Feedback Gate
- [ ] **Backend-Driven Messages:** User-facing success and error messages display `response.message`. Localized fallback strings used for network failures. — *STOP if raw JS error shown.*
- [ ] **Structured Validation Mapping (Rule 48):** 400 validation error dictionaries mapped directly to form fields via `handleValidationErrors()`. — *STOP if generic error toast replaces field errors.*
- [ ] **Toast Deduplication (Rule 40):** Stable `toastId` passed to all emitted toasts. Identical error notifications do not stack. — *STOP if duplicate toasts flood screen.*

### 5. Testing & Verification Gate
- [ ] **Behavioral Testing Proof (Rule 17):** Unit/component tests verify real user actions (tap -> submit -> visible state update). Element existence checks alone are REJECTED. — *STOP if tests are superficial.*
- [ ] **Coverage Standards:** Custom hooks tested at ≥80% branch coverage; utilities tested at ≥90% branch coverage. — *STOP if coverage below threshold.*
- [ ] **Maestro E2E Tests:** Critical mobile CRUD and auth flows covered in YAML-based Maestro test suite (`mobile_e2e/`). — *STOP if E2E missing for critical flows.*

### 6. Performance & UX Gate
- [ ] **Virtualized Lists (Rule 8):** Any list rendering >20 items uses `FlatList` or `@shopify/flash-list` with `React.memo` item renderers. Never `ScrollView` wrapping `.map()`. — *STOP if mapped ScrollView used.*
- [ ] **Search & Filter Debounce:** Search inputs debounced ≥300ms before triggering API/query calls. — *STOP if API flooded on every keystroke.*
- [ ] **Button Loading Stability (Rule 39):** Submit buttons have explicit `minWidth` to prevent layout shift during loading state. — *STOP if button shrinks on submit.*

### 7. Native Platform Conventions Gate
- [ ] **Navigation Conventions:** Native stack swipe-back on iOS and Android hardware back button handler wired correctly. — *STOP if Android back button breaks.*
- [ ] **Safe Area Insets:** Screen roots use `<SafeAreaView>` from `react-native-safe-area-context` or `useSafeAreaInsets()`. Zero hardcoded padding offsets. — *STOP if content clips notch.*
- [ ] **Native Pickers & Bottom Sheets:** Platform-native date/time pickers and `@gorhom/bottom-sheet` used for contextual selection. — *STOP if custom web dropdown used.*
- [ ] **Haptic Feedback (Rule 11):** Haptic feedback paired with switches, form completions, and destructive actions. — *STOP if significant action lacks haptic.*

### 8. Localization Gate
- [ ] **Zero Hardcoded Strings (Rule 61):** All user-facing text uses `t('namespace.KEY')`. Backend `response.message` displayed directly. — *STOP if hardcoded English string in JSX.*
- [ ] **Locale-Aware Currency (Rule 37, 63):** Currency formatted via feature-local `formatCurrency()` using integer minor units. Division in JSX forbidden. — *STOP if raw minor units rendered.*
- [ ] **En-Dash Nullable Fallback (Rule 38):** All nullable/optional fields rendered via `displayValue()`. Zero blank cells or raw "N/A". — *STOP if raw null renders blank.*
