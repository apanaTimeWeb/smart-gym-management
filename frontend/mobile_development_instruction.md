# Mobile Development Instructions — Framework-Agnostic (Enterprise / Industry Scale)

> Applies regardless of chosen stack (React Native bare-metal, Flutter, or native
> Swift/Kotlin). This document defines architectural discipline, not a specific
> library mandate — where a decision genuinely differs by framework, both paths
> are given explicitly. No managed/hosted vendor toolchain (e.g. Expo) is assumed.

## Rule 0 — Framework Decision (Made Once, Documented, Not Re-Litigated Per Feature)

Choose ONE framework for the whole app and record the decision + reasoning in
`/docs/decisions/framework-choice.md`. Use this criteria table to decide:

| Criteria | React Native (bare-metal) | Flutter | Native (Swift/Kotlin, separate codebases) |
|---|---|---|---|
| Team's existing skill (JS/TS vs Dart vs Swift/Kotlin) | Best if team is React/web-heavy | Best if team wants one language, no JS bridge overhead | Best if platform-specific perfection is the top priority |
| Code sharing across iOS/Android | High | Highest (one rendering engine, no platform widgets) | None — two full codebases |
| Native module / SDK availability | Good, growing | Good, growing, occasionally behind RN for very new SDKs | Best — always first-class |
| Long-term hiring pool | Large (JS ecosystem) | Growing, smaller than JS | Two separate specialist pools needed |
| Performance ceiling | Very good with New Architecture (Fabric/TurboModules) | Very good with Impeller rendering engine | Highest, but rarely the bottleneck in practice |

Whichever is chosen, mandate the framework's **current-generation architecture**
(e.g. RN's New Architecture — Fabric + TurboModules; Flutter's Impeller renderer)
— never start a new enterprise project on a legacy/deprecated engine.

## Rule 0A — Feature Module Is the AI Repair Boundary

```text
APPLICATION
  └── ROLE CONTAINER
        └── FEATURE MODULE
              └── SUB-FEATURE / USE CASE
```

AI Repair Boundary = FEATURE MODULE
Role Container = NOT the repair boundary

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

## Rule 0C — Change Scope Failure Condition

If an AI repair attempts to modify business logic in a sibling feature module to fulfill a requirement of the current feature module, the architecture gate FAILS. Feature isolation is absolute.

## Rule 1 — Micro-Modularization (One Feature = One Self-Contained Folder)

This is the most important structural rule. **One feature = one self-contained folder.**
If there is a bug in `members`, you drag ONLY the `features/members/` folder to the AI.
Everything the AI needs — components, hooks/controllers, schemas, types, API, state,
tests, and the context file — lives inside that single folder. Zero need to open any other folder.

- One component/widget = one file. One file = one responsibility — never mix
  data-fetching, business logic, and presentation in the same file.
- Every feature lives ENTIRELY inside its own feature folder. Nothing feature-specific
  exists outside it.
- Screens/route entry points are THIN — they compose feature components only.
  No business logic, no direct API calls, no non-trivial state inside a screen file.

### File Size Ceilings (AI Context Limits)

| File type | Maximum lines |
|---|---|
| Screen / Page entry point | **80 lines** |
| Component / Widget | **200 lines** |
| Custom Hook / Controller / Notifier | **150 lines** |
| Validation Schema / Validator class | **150 lines** |
| API service file | **150 lines** |
| State store / Provider / Bloc | **180 lines** |
| Type / Model file | **150 lines** |
| Utility / Formatter file | **120 lines** |

If a file exceeds its ceiling: split by **feature responsibility**, not randomly by line count.
Never create dumping folders named `helpers/`, `common/`, or `misc/`.
Keep all split files inside the **same feature folder**.

### Canonical Feature Folder Structure

Adapt file extensions to the framework (`*.ts`/`*.tsx` for React Native; `*.dart` for Flutter):

```
features/
└── members/                              ← entire feature lives here
    ├── screens/                          ← thin composition only
    │   ├── MembersListScreen.tsx         
    │   ├── MembersDetailScreen.tsx
    │   └── MembersAddScreen.tsx
    ├── components/                       (or widgets/ in Flutter)
    │   ├── MembersMemberCard.tsx         ← module-prefixed component
    │   ├── MembersMemberCard.test.tsx    ← co-located test
    │   ├── MembersMemberListItem.tsx
    │   └── MembersEmptyState.tsx
    ├── hooks/                            (or controllers/ / notifiers/ in Flutter)
    │   ├── useMembers.ts                 ← server-state data-fetching hook
    │   ├── useMembers.test.ts
    │   ├── useMembersFilters.ts          ← client-state UI filter hook
    │   └── useMembersFilters.test.ts
    ├── schemas/                          (or validators/ in Flutter)
    │   └── members.schema.ts             ← Zod schema / validator class
    ├── types/                            (or models/ in Flutter)
    │   └── members.types.ts              ← all interfaces, enums, type unions
    ├── api/
    │   └── members.api.ts                ← ALL network calls for this feature ONLY
    ├── state/                            ← only if UI state shared across 2+ components
    │   └── members.store.ts              ← Zustand (RN) / Riverpod provider (Flutter)
    ├── tests/                            ← integration-level tests (unit = co-located)
    │   └── members.integration.test.ts
    ├── members_features.md               ← MANDATORY — see Rule 24
    └── members_forbidden.md             ← MANDATORY — see Rule 29
```

### Hyper-Descriptive, Module-Prefixed Naming (AI Context Guarantee)

Every file name MUST make the feature identity immediately explicit. When you tag a file
in an AI prompt (e.g. `@MembersMemberCard.tsx`), the AI instantly knows which module
it belongs to — zero ambiguity, zero cross-module hallucination risk.

**Canonical filename grammar for the `members` feature:**

```
Components / Widgets (PascalCase, feature-prefixed):
  MembersMemberCard.tsx         ← feature prefix + entity + type
  MembersMemberListItem.tsx
  MembersEmptyState.tsx
  MembersListSkeleton.tsx

Hooks (camelCase with required `use` prefix + feature name):
  useMembers.ts                 ← `use` + feature name (NOT memberUse or membersHook)
  useMembersFilters.ts
  useMembersSearch.ts

API / Types / Schema / Store (dot-notation, feature-prefixed, lowercase):
  members.api.ts
  members.types.ts
  members.schema.ts
  members.store.ts

Integration tests:
  members.integration.test.ts

Mandatory documentation files:
  members_features.md
  members_forbidden.md
```

**Framework/architectural prefix exceptions (explicitly permitted):**
Framework-mandated prefixes (`use` for hooks), language-standard naming conventions,
and mandatory documentation filename formats are permitted exceptions to leading with
the bare feature name — provided the feature identity remains explicit and unambiguous
in the rest of the filename. The following are allowed:

| Pattern | Example | Why permitted |
|---|---|---|
| `use` prefix on hooks | `useMembers.ts` | React/RN framework convention; feature name follows immediately |
| dot-notation API/type files | `members.api.ts` | Feature name IS the prefix, separated by dot |
| `*.integration.test.ts` suffix | `members.integration.test.ts` | Test type suffix is structural, feature still prefixed |
| `*_features.md`, `*_forbidden.md` | `members_features.md` | Mandatory doc format — feature name leads |

**What is forbidden regardless:**
```
❌ BAD:  Card.tsx, hook.ts, api.ts, store.ts, types.ts
❌ BAD:  useData.ts, loadItems.ts, getData.ts   ← no feature identity
✅ GOOD: MembersMemberCard.tsx, useMembers.ts, members.api.ts
```

**AI warning:** Do NOT rename `useMembers.ts` to `membersUseHook.ts` or similar to
"fix" the prefix. `useMembers.ts` is the correct, compliant filename.

- **No abbreviations:** Never `Btn`, `Nav`, `Util`. Use `Button`, `Navigation`, `Utility`.
- **Suffix by type:** `...Card`, `...List`, `...Form`, `...Modal`, `...Sheet`, `...EmptyState`.
- **Exported name = filename:** `MembersMemberCard.tsx` must export `MembersMemberCard`.
  No default exports with a different name — this prevents AI hallucination.
- **Props interfaces prefixed:** `export interface MembersMemberCardProps` — never generic `Props`.

### Role Isolation (Mirror of Web Architecture)

Just as the web has isolated `/admin`, `/manager`, `/trainer` root folders, the mobile
app MUST follow the same pattern. A `MemberCard` in `admin/members/` is **never** imported
into `manager/members/`. Duplicate it — AI writes the code, so duplication cost is near
zero but isolation value is massive.

> **CRITICAL WARNING TO AI AGENTS:** 
> Do NOT attempt to "DRY up" business components by moving them to global folders like `src/components/ui/` or `widgets/common/`. 
> Components that contain domain-specific data/constants MUST be duplicated per feature, NEVER globalized. 
> Global folders are strictly for dumb, zero-business primitives (like raw Buttons, Inputs, Dialogs).

```
features/
├── admin/
│   └── members/      ← AdminMembers — completely isolated
├── manager/
│   └── members/      ← ManagerMembers — isolated, even if visually similar
└── trainer/
    └── members/      ← TrainerMembers — isolated
```




## Rule 2 — Navigation

- Navigation MUST be declarative and centrally configured — a single navigation
  graph/router definition, not ad-hoc imperative pushes scattered across files.
- Every route takes typed parameters — no passing full objects through navigation;
  pass IDs and re-fetch inside the destination screen (see Rule 4).
- Deep linking must resolve through the SAME central route definition used for
  in-app navigation — never a second, separately maintained linking map.
- Framework examples: React Navigation (React Native bare-metal) or go_router /
  Navigator 2.0 (Flutter) — either is acceptable as long as the rules above hold.
- Modals, bottom sheets, and nested tab/stack navigators must be defined once at
  the top of the navigation tree, not re-implemented per screen.

## Rule 3 — Styling & Design Tokens (No Magic Values, Anywhere)

- `mobile_global_design.md` serves as the design specification. However, every color, spacing value, font size, radius, and shadow used in the code MUST come from the executable token contract defined in `mobile_theme_contract.md`. No raw hex codes, no arbitrary pixel/dp values typed directly into a component.
- Implementation mechanism differs by framework but the discipline is identical:
  - React Native: a central theming module (e.g. NativeWind config, or a plain
    TypeScript theme object) that every component imports from.
  - Flutter: a central `ThemeData`/`ColorScheme` + custom `ThemeExtension`
    consumed via `Theme.of(context)` — never inline `Color(0xFF...)` literals.
- There is no hover state on touch devices — design and implement only
  press/active and disabled states, never hover-dependent interactions.
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
| Anything from an API (lists, details, counts, status) | **Server state** | Managed by a caching/data-fetching layer with built-in loading/error/stale-tracking (e.g. TanStack Query for React Native bare-metal; Riverpod's `AsyncNotifier` or a repository+cache pattern for Flutter). Never duplicated into a separate "client" state container. |
| UI-only state shared across 2+ components in one feature | **Client state (shared)** | A lightweight, feature-scoped state container (e.g. Zustand for RN; a `Provider`/`Bloc`/`Riverpod` scoped to the feature for Flutter). One container per feature — never one giant global store. |
| UI-only state used by exactly one component | **Client state (local)** | Local component state (`useState`/`useReducer` equivalent, or `StatefulWidget` local fields). |
| Data that must survive app restart offline | **Server state — persisted** | Only when explicitly required — server-state cache persisted to local storage. Must be documented in the feature's `_features.md` (Rule 24), including conflict-resolution strategy. Persistence does not make this a new category; it is still server state, stored locally. |

**Hard rule:** never copy API response data into the shared client-state
container "just in case." Components read server state directly through the
data-fetching layer, which handles request de-duplication and caching itself.

## Rule 5 — Forms & Validation

- All non-trivial forms use a form-management library + a schema-validation
  library, kept separate from each other (e.g. React Hook Form + Zod for RN;
  a form controller pattern + a validator class for Flutter).
- Validation schema/rules live in the feature's `schemas/` (or `validators/`)
  folder — never written inline inside the widget/component.
- Client-side validation messages are for immediate UX feedback only. The
  backend's validation response (see Rule 7) is the final source of truth for
  what's actually accepted — never assume client validation alone is sufficient.

## Rule 6 — Secure Storage & Credential Handling

There is no browser `localStorage`/cookies on mobile. Classify every piece of
stored data and route it accordingly:

| Data type | Storage requirement |
|---|---|
| Auth tokens (JWT, refresh token), biometric keys, any credential | Hardware-backed secure storage ONLY — iOS Keychain / Android Keystore, accessed via a secure-storage library (e.g. a Keychain-wrapper package for RN; `flutter_secure_storage` for Flutter). Never anywhere else. |
| App preferences, non-sensitive cached data | Fast key-value or embedded database storage (e.g. an MMKV-style store for RN; `shared_preferences`/`Hive`/`Isar` for Flutter). |
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
- User-facing error messages come from the backend's `message` field —
  never hardcoded strings duplicated across screens.
- Authentication expiry (401) is handled by ONE centralized
  logout/token-refresh interceptor — never ad-hoc inside individual screens.

**Typed API Verb Contract:** Every function in a feature's `*.api.ts` MUST follow
the same verb naming as Backend Rule 86 and Frontend Rule 72 — 1:1 symmetry:
- `fetchMembers(params)` — paginated list
- `fetchMemberById(id)` — single entity
- `createMember(dto)` — POST creation
- `updateMember(id, dto)` — PATCH/PUT update
- `deleteMember(id)` — DELETE
- `exportMembersReport(params)` — report/export

**Non-CRUD Domain Action Verbs:** For domain actions that are not standard CRUD operations,
use the **exact API endpoint operation/contract name** as defined by the external API specification. Mobile architecture MUST remain decoupled from internal backend service method names. If the backend renames an internal service class or method, the mobile API contract should not break.

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

This rule is the mobile equivalent of Web Rule 75A and Backend Rule 82A. It closes
the same gap on mobile: API/mock responses being incomplete while the UI silently
renders empty cards, lists, and charts.

### The Required Chain

For every data-consuming feature, the following chain MUST be fully aligned before
the feature is considered complete:

```text
UI Requirement
      ↓
Feature API Contract (_features.md § API Contract)
      ↓
Type / Model (*.types.ts / models/*.dart)
      ↓
Schema / Validator (Zod schema or validator class)
      ↓
Mock / Stub Response (test boundary mock or backend stub)
      ↓
Server-State Cache (TanStack Query / Riverpod AsyncNotifier)
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

### Mock / Stub Response Completeness

During the frontend-first development phase (before a real backend endpoint exists),
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

```dart
// ❌ Flutter — FORBIDDEN
final planName = member.planName ?? 'Basic Plan';
final revenue = stats.revenue ?? 125000;
```

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

### Backend Transition Rule

When the real backend endpoint becomes available:
- The UI MUST continue consuming the same API contract — no screen rewrites.
- The feature API client MUST remain the same unless the backend contract
  legitimately changes (see Backend Rule 67).
- Any contract change MUST update the corresponding Type/Model, Schema/Validator,
  mock response, `_features.md` API Contract, and tests in the same change.

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

## Rule 8 — Lists & Rendering Performance

- Any list rendering more than ~20 items MUST use a virtualization-aware list
  component (e.g. a high-performance list library for RN; `ListView.builder`
  for Flutter — never a naively-mapped, fully-rendered list of widgets).
- List item components must be render-stable (memoized in RN; using `const`
  constructors and stable keys in Flutter) to avoid unnecessary re-renders.

## Rule 9 — Images & Media Assets

- Use the framework's optimized image-loading mechanism exclusively — one that
  supports caching, placeholders, and format negotiation (a dedicated image
  library for RN rather than the bare core `Image`; Flutter's `Image` with a
  caching package like `cached_network_image`).
- Always specify explicit dimensions or aspect ratio for network images to
  prevent layout shift while loading.
- Bundled assets are referenced statically — never construct a dynamically
  computed asset path at runtime; bundlers cannot resolve those reliably.

## Rule 10 — Iconography

- Use ONE icon library/family for the entire app — never mix icon sets.
- Icon sizes and stroke/weight values must reference tokens from
  `mobile_theme_contract.md` — never arbitrary numeric values per usage.

## Rule 11 — Animations & Gestures

- Use the framework's high-performance animation system (a UI-thread-driven
  animation library for RN rather than the legacy JS-thread animation API;
  Flutter's native `AnimationController`/implicit animations).
- Use the framework's dedicated gesture-handling system for swipe/pan/pinch —
  never reconstruct gesture recognition manually from raw touch events.
- Respect the OS-level reduced-motion accessibility setting — skip or shorten
  non-essential animations when the user has that setting enabled.
- Centralize reusable animation presets (durations, easing curves, spring
  configs) in one shared module — never redefine the same values per screen.

## Rule 12 — Charts & Data Visualization

- Use a native-rendering charting library appropriate to the framework (Skia-
  or Canvas-based for RN; a Flutter-native charting package) — never a
  DOM/SVG/Canvas-web-only charting library, none of which render on mobile.
- Chart color palettes must pull from the design system's chart tokens — never
  hardcoded hex values per chart instance.

## Rule 13 — Platform-Specific Code

- Isolate genuinely divergent iOS/Android implementations into separate
  platform files (platform-suffix files in RN; conditional platform channels
  or separate implementation classes in Flutter) — not scattered inline
  platform checks throughout shared files.
- A trivial one-line platform difference (e.g. a shadow property) may remain
  inline; once a component accumulates three or more such checks, split it.
- Every platform-specific behavior (permission dialog wording, native UI
  quirks) must be noted in that feature's `_features.md` (Rule 24).

## Rule 14 — Permissions & Native Modules

- All permission requests (camera, location, notifications, media, contacts,
  biometrics) go through ONE central permissions module — no component or
  screen calls a native permission API directly.
- Before adding any new native dependency, verify it fully supports the
  framework's current-generation architecture (New Architecture for RN;
  current Flutter engine for Flutter plugins) — do not add a package flagged
  legacy-only without a documented, reviewed exception.
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

- **Unit tests:** Pure business logic, validators, formatters, and utility functions
  are co-located directly beside the source file they test.
- **Component/widget tests:** Every non-trivial component/widget MUST have its
  matching test file co-located directly beside the component/widget file it tests.
  The feature-level `tests/` directory is reserved ONLY for integration-level tests
  that exercise multiple feature files together.
- **Integration tests:** Live inside the feature's `tests/` directory and verify
  multi-file feature flows, API/mock integration, state coordination, and critical
  feature behavior.
- **E2E tests:** Live in the project-level E2E suite and verify complete user
  journeys through the real application (e.g. Maestro or a comparable YAML/script-
  driven E2E runner works across both RN and Flutter — choose ONE tool project-wide
  and document the choice; do not mix multiple E2E tools in the same repo).
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

- All secrets, base URLs, and feature flags are defined per build
  environment (dev/staging/production) through the framework's native build
  variant/flavor/scheme mechanism — never through a single shared config file
  edited manually before each release.
- No component or screen reads a raw environment variable or config file
  directly — always go through one central config-access module that
  validates presence/shape of required values at app startup, failing fast
  with a clear error rather than silently proceeding with `undefined`/`null`.
- Only genuinely public, non-sensitive values may ever end up in the shipped
  binary. Anything sensitive is fetched from a secured backend endpoint at
  runtime, never bundled into the client.

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
- Code ownership (`CODEOWNERS`) requires mandatory human review on: the central
  network client, the central storage module, the central permissions module,
  the central config module, any auth flow, and any native build/signing config.
- No new dependency is added without:
  1. Checking the `/docs/decisions/approved-dependencies.md` list first.
  2. Confirming current-generation architecture compatibility (Rule 0 / Rule 14).
  3. Passing a vulnerability scan.
  4. Adding a written justification for why no existing approved library suffices.

**AI Dependency-Addition Guardrail:** An AI agent CANNOT add a new dependency
(`npm install` / `pub add`) without first checking the approved-dependency list.
Before proposing a new library, the AI must explicitly explain why an existing
approved library (e.g. `react-native-keychain`, `zustand`, `react-hook-form`,
`zod`, `@tanstack/react-query`, `react-native-fast-image`, `date-fns`,
`react-native-reanimated`) does not suffice for the task.

## Rule 23 — Observability & Crash Reporting

- Crash reporting and JS/Dart exception tracking wired at app root, before
  any other initialization — use a framework-supported crash-reporting SDK
  (e.g. Sentry or Firebase Crashlytics both support RN and Flutter).
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
- Member IDs are UUIDs. Never use array index as a FlatList/ListView key.
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
- **Cache / query keys:** [e.g., `['members', 'list', filters]`, `['members', 'detail', memberId]`]
- **Feature-scoped store:** [e.g., `members.store.ts` — holds: selectedMemberId, isAddSheetOpen, filterStatus, searchQuery]
- **Local state decisions:** [e.g., "Detail screen tab selection is local useState — not shared"]
- **Persisted state (offline requirement):** Yes / No — if Yes, document cache strategy and invalidation triggers
- **Storage keys used:** ["None" or namespaced constants e.g. `MEMBERS_FILTER_PREFS_V1`] — if yes, document strategy
- Storage keys used (namespaced constants):

## API Contract
[REQUIRED: Every function in the feature's api file listed with exact HTTP method,
endpoint, request shape, and response type. "TBD" is not acceptable.]

All calls go through the central network client. Response envelope:
`{ success, message, data: T | null, meta?: PaginationMeta, error?: string, errorCode?: string, statusCode?: number, validationErrors?: ValidationErrorItem[] }`

| Function | Method | Endpoint | Request | Response data type |
|---|---|---|---|---|
| `fetchMembers(params)` | GET | `/api/v1/manager/members` | `{ page, limit, search, status }` | `Member[]` + PaginationMeta |
| `fetchMemberById(id)` | GET | `/api/v1/manager/members/:id` | — | `MemberDetail` |
| `createMember(dto)` | POST | `/api/v1/manager/members` | `CreateMemberDto` | `Member` |
| `updateMember(id, dto)` | PATCH | `/api/v1/manager/members/:id` | `UpdateMemberDto` | `Member` |
| `deleteMember(id)` | DELETE | `/api/v1/manager/members/:id` | — | `null` |

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
- [ ] Rule 1: Role isolation — zero cross-role imports (admin/manager/trainer isolated)
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
- [ ] Rule 37: Currency/numbers formatted via `formatCurrencyFromMinorUnits()` / `formatNumber()` — no inline `toFixed()`
- [ ] Rule 38: Null/empty fields use `displayValue()` — no blank cells or "N/A" strings
- [ ] Rule 39: Async-submit buttons have `minWidth` — no layout shift on loading state
- [ ] Rule 40: All toasts go through `showToast()` — no direct library calls
- [ ] Rule 41: Multi-step forms have `useUnsavedChangesGuard` wired to `isDirty`
- [ ] Rule 42: Every `useEffect` dependency array has an explanatory comment
- [ ] Rule 43: All hooks and exported utilities have JSDoc blocks
- [ ] Rule 44: Every file has `RESPONSIBILITY:` + `FLOW:` header comment
- [ ] Rule 45: Async state uses `NetworkState<T>` — no boolean `isLoading`/`isError` flag pairs
- [ ] Rule 46: Background tasks documented in `_features.md` `## Background Tasks` section
- [ ] Rule 47: All API calls have explicit timeouts from `TIMEOUT_CONFIG`
- [ ] Rule 48: 400 validation errors mapped to form fields via `handleValidationErrors()` (422 only if explicitly approved by API contract)
- [ ] Rule 49: List items keyed by entity ID — no array index keys
- [ ] Rule 50: Permitted record identifiers have copy-to-clipboard affordance in detail screens
- [ ] Rule 51: Every list screen has a dedicated named `EmptyState` component
- [ ] Rule 52: New design tokens added to `mobile_theme_contract.md` before implementation

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
  shared minimum-touch-target token in `mobile_theme_contract.md`, not
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
  - formatting primitives (`formatCurrency`, `formatNumber`, `displayValue`, `maskSensitiveData`)
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

Enforce mechanically via `eslint-plugin-boundaries` (React Native) or equivalent
static analysis / import linter (Flutter) so violations are caught in CI, not in
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

- NEVER import from any other feature folder (admin/members/, trainer/members/, etc.) — zero cross-feature imports, Rule 28
- NEVER call the HTTP client directly — always use members.api.ts which goes through the central network client
- NEVER store API response data in members.store.ts — the TanStack Query / Riverpod cache is the single source of truth for server data
- NEVER execute delete/suspend actions on single tap — always show the centralized confirmation bottom sheet first (Rule 31)
- NEVER add a new dependency without checking approved-dependencies.md first (Rule 22)
- NEVER hardcode hex colors, dp values, or font sizes — use design tokens from mobile_theme_contract.md only (Rule 3)
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
(small targets, no hover state, no right-click). This makes double-verification
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
  a shared `ConfirmBottomSheet` component) — never implement ad-hoc alert dialogs
  per screen. Native `Alert.alert()` is acceptable only as a fallback where a
  custom bottom sheet cannot be rendered.
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

For non-destructive mutations (e.g. updating a display name, adding a note),
optimistic updates are permitted but must be rolled back cleanly on error.

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

## Rule 33 — Canonical `PaginationMeta` Shape (Mobile Equivalent of Backend Rule 94 / Frontend Rule 59)

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

Cross-reference: Backend Rule 94, Frontend Rule 59, Mobile Rule 7.

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

// ✅ GOOD — enum-driven, refactor-safe, matches backend SCREAMING_SNAKE_CASE exactly
export enum MemberStatus {
  ACTIVE    = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED   = 'EXPIRED',
  PENDING   = 'PENDING',
}

if (member.status === MemberStatus.ACTIVE) { ... }
```

Rules:
- Enum values MUST exactly match backend API wire values (typically `SCREAMING_SNAKE_CASE`) — verified against the backend's enum definition (Backend Rule 95). If the backend contract changes, mobile type/schema/tests must update in the same change.
- Never use numeric enums for API-bound fields — string enums survive serialization.
- Filter dropdowns, badge colors, and conditional rendering all branch on the enum,
  never on a raw string.
- If the backend adds a new status, the TypeScript compiler surfaces every
  unhandled case — this is the point.

Cross-reference: Backend Rule 95, Frontend Rule 34 (status badge pattern).

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

## Rule 36A — React Native / TypeScript: `import type` Mandate

Any import that brings in ONLY a TypeScript type, interface, or enum (no runtime
value) MUST use `import type`. This is enforced by ESLint (`@typescript-eslint/consistent-type-imports`).

## Rule 36B — Flutter / Dart

Follow Dart's explicit import/export rules; no TypeScript `import type` rule applies.

```typescript
// ❌ BAD — runtime import for a type-only symbol
import { Member } from '../types/members.types';

// ✅ GOOD — erased at compile time, zero bundle impact
import type { Member } from '../types/members.types';
```

Why it matters on mobile: Metro bundler (React Native) and the Dart AOT compiler
(Flutter) both benefit from clear type-erasure boundaries. Mixing runtime and
type-only imports in the same statement obscures tree-shaking and increases the
risk of circular-dependency bugs.

Exception: enums used as runtime values (e.g. `MemberStatus.Active` in a
conditional) are runtime imports — `import type` is incorrect there. Use
`import type` only when the symbol is used exclusively as a type annotation.

Cross-reference: Frontend Rule 36 (same mandate on web).

---

## Rule 37 — Currency and Number Formatting Utility (Mobile Equivalent of Frontend Rule 80)

All monetary amounts, percentages, and large numbers displayed in the UI MUST be
formatted through ONE central utility. No UI component may call `toFixed()` / `toLocaleString()` directly. Central formatter utilities may use them internally where appropriate.

Define in `src/core/utils/formatters.ts`:

```typescript
// src/core/utils/formatters.ts
/**
 * API monetary values = minor units (e.g., paise, cents)
 * UI formatter converts minor units → display amount
 */
export function formatCurrencyFromMinorUnits(
  amountMinor: number | null | undefined,
  currency = 'INR',
): string {
  if (amountMinor == null || isNaN(amountMinor)) return '—';
  const factors: Record<string, number> = { INR: 100, USD: 100, JPY: 1 };
  const factor = factors[currency] || 100;
  const amount = amountMinor / factor;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return '—';
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return '—';
  return `${value.toFixed(1)}%`;
}
```

```typescript
// ❌ BAD — inline formatting
<Text>₹{member.fee.toFixed(2)}</Text>

// ✅ GOOD — central utility
<Text>{formatCurrencyFromMinorUnits(member.fee)}</Text>
```

Note: `Intl.NumberFormat` is available in Hermes (React Native ≥ 0.70) and Dart's
`intl` package. Confirm the runtime supports it before use; if not, use the `intl`
npm package as a polyfill.

Cross-reference: Frontend Rule 80, Rule 38 (en-dash fallback).

---

## Rule 38 — En-Dash Fallback for Null / Empty Data (Mobile Equivalent of Frontend Rule 78)

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

Cross-reference: Frontend Rule 78, Rule 37 (formatCurrency already returns `—`
for null amounts).

---

## Rule 39 — Button Loading Width Stability (Mobile Equivalent of Frontend Rule 81)

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
    ? <ActivityIndicator color={tokens.color.white} size="small" />
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
- Flutter equivalent: wrap `ElevatedButton` in a `SizedBox` with a fixed width,
  or use `ConstrainedBox` with `minWidth`.

Cross-reference: Frontend Rule 81, Rule 31 (loading state on confirm button).

---

## Rule 40 — Toast / Snackbar Deduplication (Mobile Equivalent of Frontend Rule 82)

The app MUST NOT show duplicate toast/snackbar messages when the same action is
triggered multiple times in rapid succession (e.g. double-tap, retry spam).

Implement through ONE central toast utility in `src/core/utils/toast.ts`:

```typescript
// src/core/utils/toast.ts

// Deduplication uses a SEMANTIC identity key, not the raw message string.
// Two different actions (e.g. payment failure for member A vs member B)
// that produce the same message text are DIFFERENT events and must NOT be collapsed.
//
// Build the key as: module + action + entityId + errorCode
// Fall back to a simple message hash ONLY when semantic context is unavailable.
//
// Example: toastKey('members', 'suspend', memberId, 'MEMBER.ALREADY_SUSPENDED')
//          → "members:suspend:abc-123:MEMBER.ALREADY_SUSPENDED"

const activeToasts = new Set<string>();

export function toastKey(
  module: string,
  action: string,
  entityId?: string,
  errorCode?: string,
): string {
  return [module, action, entityId ?? '', errorCode ?? ''].join(':');
}

export function showToast(
  message: string,
  type: 'success' | 'error' | 'info' = 'info',
  dedupKey?: string,   // semantic dedup key mandatory for actionable toasts
) {
  // Use semantic key if provided, else generate a deterministic string hash fallback
  const key = dedupKey ?? String(message.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0));
  if (activeToasts.has(key)) return;
  activeToasts.add(key);
  // call your toast library here (e.g. react-native-toast-message)
  const timeoutDuration = type === 'error' ? 5000 : 3000;
  Toast.show({ type, text1: message, visibilityTime: timeoutDuration });
  setTimeout(() => activeToasts.delete(key), timeoutDuration);
}
```

```typescript
// ❌ BAD — direct library call in a component; no deduplication
Toast.show({ type: 'error', text1: response.message });

// ✅ GOOD — central utility with deduplication
showToast(response.message, 'error');
```

Rules:
- No component or hook calls the toast library directly — always `showToast()`.
- For backend operations, toast messages MUST come from `response.message` (Rule 7). For purely local system feedback (e.g. "Copied to clipboard"), hardcoded system strings are acceptable.
- Success toasts auto-dismiss after 3 s; error toasts persist until dismissed or
  5 s, whichever comes first — configure once in the central utility.

Cross-reference: Frontend Rule 82, Rule 7 (messages from backend), Rule 31.

---

## Rule 41 — Unsaved Changes Guard for Multi-Step Forms (Mobile Equivalent of Frontend Rule 79)

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
  }, [navigation, isDirty]);
}
```

```typescript
// ❌ BAD — no guard; user loses data on back swipe
function MembersAddScreen() { ... }

// ✅ GOOD — guard wired to form dirty state
function MembersAddScreen() {
  const { formState: { isDirty } } = useForm();
  useUnsavedChangesGuard(isDirty);
  ...
}
```

Rules:
- The guard fires on hardware back button (Android), swipe-back gesture (iOS),
  and tab switches — all navigation exit paths.
- Multi-step wizard forms: `isDirty` is true from Step 1 onward once any field
  is touched — not just on the final step.
- Flutter equivalent: use `PopScope` (formerly `WillPopScope`) with an
  `onPopInvoked` callback that shows the confirmation dialog.

Cross-reference: Frontend Rule 79, Rule 31 (centralized confirmation), Rule 5 (forms).

---

## Rule 42 — `useEffect` Dependency Audit Comment

Every `useEffect` (or equivalent reactive side-effect in Flutter: `ref.listen`,
`StreamBuilder`, `didChangeDependencies`) MUST include a one-line comment
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
output format is non-obvious (e.g. `formatCurrencyFromMinorUnits(150000) → "₹1,500.00"`).

Cross-reference: Rule 24 (documentation quality standard), Rule 43 applies at the
function level what Rule 24 applies at the feature level.

---

## Rule 44 — `RESPONSIBILITY:` + `FLOW:` Comment Mandate on Every File

Every file in a feature folder (component, hook, API, store, schema) MUST begin
with a two-line structured comment block at the very top of the file (before any imports):

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
//   → GET /api/v1/manager/members → ApiResponse<Member[]> + PaginationMeta
import { useQuery } from '@tanstack/react-query';
...
```

Cross-reference: Rule 24 (feature-level documentation), Rule 43 (JSDoc on functions).

---

## Rule 45 — Network State Enum (No Boolean `isLoading` / `isError` Flags)

Network request state MUST be represented as a discriminated union or enum —
never as a combination of boolean flags (`isLoading`, `isError`, `isSuccess`).
Boolean flags allow impossible states (e.g. `isLoading: true` AND `isError: true`).

Define once in `src/core/types/network.types.ts`:

```typescript
// src/core/types/network.types.ts
export type NetworkState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error';   error: { message: string; code?: string; validationErrors?: ValidationErrorItem[] } };
```

```typescript
// ❌ BAD — boolean flags allow impossible states
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError]     = useState(false);
const [data, setData]           = useState(null);

// ✅ GOOD — one state variable, exhaustive switch, impossible states eliminated
const [state, setState] = useState<NetworkState<Member[]>>({ status: 'idle' });

switch (state.status) {
  case 'idle':    return <MembersEmptyState />;
  case 'loading': return <MembersListSkeleton />;
  case 'success': return <MembersList data={state.data} />;
  case 'error':   return <MembersErrorFallback message={state.error.message} />;
}
```

Note: TanStack Query already exposes `status` as a discriminated union
(`'pending' | 'error' | 'success'`). Use it directly — do not re-wrap in
additional boolean flags. The rule applies to any manually managed async state
outside of TanStack Query / Riverpod.

Cross-reference: Rule 4 (state management matrix), Rule 34 (enum-driven fields).

---

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

Cross-reference: Backend Rule 96 (scheduled job registry), Rule 7 (API layer),
Rule 6 (secure storage), Rule 24 (_features.md documentation).

---

## Rule 47 — API Call Timeout Policy

Every API request MUST execute with a timeout defined by `TIMEOUT_CONFIG`. The default timeout is inherited automatically unless a category-specific override applies. Silent hangs on mobile are worse
than on web — the user has no browser loading indicator and no way to cancel.

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
const client = axios.create({ timeout: TIMEOUT_CONFIG.DEFAULT });
```

```typescript
// ❌ BAD — no timeout; hangs indefinitely on poor mobile networks
const response = await axios.get('/api/v1/manager/members');

// ✅ GOOD — explicit timeout per call category
const response = await client.get('/api/v1/manager/members');                          // inherits DEFAULT
const response = await client.post('/reports/export', dto,
  { timeout: TIMEOUT_CONFIG.REPORT });                                          // explicit override
```

On timeout: surface `showToast('Request timed out. Please try again.', 'error')`
(Rule 40) — never a blank screen or silent failure.

Cross-reference: Backend Rule 97 (server-side timeout policy), Rule 7 (API layer),
Rule 40 (toast utility).

---

## Rule 48 — Structured Validation Error Handling Shape (Mobile Equivalent of Backend Rule 98)

When the backend returns the canonical validation error response (statusCode `400`;
a `422` is only valid if an explicitly approved API contract requires it), the
response MUST be parsed into a structured shape and mapped to individual form
fields — never displayed as a raw string dump.

The backend's canonical validation error envelope (Backend Rule 98):

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

Cross-reference: Backend Rule 98, Rule 5 (forms), Rule 40 (toast for non-field errors).

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

Flutter equivalent:

```dart
// ❌ BAD
ListView(children: members.asMap().entries.map((e) =>
  MemberCard(key: ValueKey(e.key), member: e.value)).toList())

// ✅ GOOD
ListView(children: members.map((m) =>
  MemberCard(key: ValueKey(m.id), member: m)).toList())
```

Consequence of violation: inserting or deleting a list item causes every
subsequent item to re-render (React) or lose widget state (Flutter). For
financial lists this can cause visible flicker and incorrect loading states.

Rule: if an entity has no stable ID from the backend, that is a backend contract
bug — fix the API, do not paper over it with an index key.

Cross-reference: Rule 8 (list rendering performance), Rule 33 (PaginationMeta —
paginated lists always have entity IDs).

---

## Rule 50 — Copy-to-Clipboard for Permitted Record Identifiers

Any screen displaying a record ID, transaction reference, invoice number, or
other identifier that a user may need to share or reference MUST provide a
one-tap copy-to-clipboard affordance. Users on mobile cannot select and copy
text from a non-input element without explicit support.

```typescript
// src/core/utils/copyToClipboard.ts
import Clipboard from '@react-native-clipboard/clipboard';

export async function copyToClipboard(value: string, label = 'Copied'): Promise<void> {
  await Clipboard.setString(value);
  showToast(`${label} copied to clipboard`, 'success');   // Rule 40
}
```

```typescript
// ❌ BAD — ID displayed as plain text; user cannot copy it on mobile
<Text>{member.id}</Text>

// ✅ GOOD — tap to copy with feedback
<TouchableOpacity onPress={() => copyToClipboard(member.id, 'Member ID')}>
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

## Rule 52 — Theme Contract File (`mobile_theme_contract.md`)

The mobile app MUST have a single `mobile_theme_contract.md` file at the project
root (alongside `mobile_global_design.md`) that documents every design token
category, its token names, and the exact values for light and dark variants.

This file is the equivalent of the web's `_theme_contract.md` — it is the
authoritative reference an AI uses when writing any styled component, ensuring
it never invents a token name or hardcodes a value.

Minimum required sections:

```markdown
# Mobile Theme Contract

## Color Tokens
| Token | Light value | Dark value | Usage |
|---|---|---|---|
| `background` | #FFFFFF | #0B0B0F | Screen background |
| `foreground` | #0B0B0F | #F5F5F7 | Primary text |
| `card` | #F8F8FA | #16161C | Card/surface background |
| `primary` | #4F46E5 | #6366F1 | Primary actions, active states |
| `destructive` | #DC2626 | #EF4444 | Errors, delete actions |
| `on-primary` | #FFFFFF | #FFFFFF | Text/icon on primary fill |
| `on-destructive` | #FFFFFF | #FFFFFF | Text/icon on destructive fill |
| `focus-ring` | #A16207 | #EAB308 | Input/keyboard focus ring |
| `status-success-text` | #064E3B | #22C55E | Success badge text |
| `status-success-bg` | #D1FAE5 | #064E3B | Success badge background |
| `skeleton-base` | #E5E5EA | #2A2A32 | Skeleton shimmer base |
| `skeleton-highlight` | #F5F5F7 | #3F3F46 | Skeleton shimmer highlight |

## Spacing Tokens
| Token | Value | Usage |
|---|---|---|
| `space-1` | 4dp | Tight gaps, icon padding |
| `space-2` | 8dp | Component internal padding |
| `space-4` | 16dp | Screen horizontal padding, card padding |
| `space-6` | 24dp | Section gaps |
| `space-7` | 32dp | Screen top padding |

## Typography Tokens
| Token | Size | Weight | Line height | Usage |
|---|---|---|---|---|
| `heading-lg` | 22 | 700 | 1.2× | Screen titles |
| `body` | 16 | 400 | 1.5× | Body copy, list items |
| `body-sm` | 14 | 400 | 1.5× | Body secondary |
| `caption` | 12 | 400 | 1.5× | Timestamps, secondary labels |

## Border Radius Tokens
## Shadow / Elevation Tokens
## Icon Size Tokens
## Touch Target Tokens (minimum 44pt / 48dp)
## Z-Index / Elevation Layer Tokens
## Motion / Duration Tokens
## Opacity Tokens
```

Rules:
- Every token in `mobile_theme_contract.md` MUST have a corresponding
  implementation in the framework's theme module (Rule 3).
- When a new token is needed, it is added to this file FIRST, then implemented —
  never the reverse.
- AI agents writing styled components MUST reference this file before choosing
  any color, spacing, or typography value.

Cross-reference: Rule 3 (design tokens), Rule 10 (icon tokens), Rule 25
(touch target tokens), web `_theme_contract.md` equivalent.

---

## Rule 53 — Idempotency for ALL API Mutations

The backend strictly enforces idempotency on **all** state-mutating endpoints (`POST`, `PATCH`, `PUT`, `DELETE`) via `@RequireIdempotencyKey()`. Omitting the header causes an immediate **HTTP 400** rejection. Therefore, every mobile API client function that performs a mutation MUST attach an `Idempotency-Key` header.

### 53A — General Mutations
Every mutating API client function MUST accept an optional `idempotencyKey?: string` parameter and inject it as a header:

```typescript
export const updateProfile = async (id: string, body: UpdateProfileDto, idempotencyKey?: string) =>
  apiFetch('/profile', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
  });
```

### 53B — Irreversible / Financial Mutations (Stricter Rules)
For financial or irreversible actions (payment, renewal, payroll, purchase), the key policy is stricter:

- Generate a `crypto.randomUUID()` **once**, at the moment the user confirms the action (e.g., in the confirmation bottom sheet).
- Store the key in a `useRef` — do NOT regenerate it on re-renders.
- On network timeout or 5xx failure, the app MUST retry with the **exact same key** — never a fresh one.
- Only generate a new key if the user explicitly cancels and re-opens the confirmation dialog (new user intent = new key).

> **AI NOTE:** Generating a fresh `randomUUID()` on every retry is a critical bug — the backend will process the request twice, creating duplicate payments or records. The key must survive retries.

---

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
- **Request Cancellation**: All data-fetching hooks and screen navigations must wire an AbortSignal. Navigating away from a loading screen (e.g., search, detail, or upload) MUST cancel the stale request.
- **Deep-Link Authorization**: Matching a route is not enough. Deep-link resolution MUST re-evaluate auth status, role, tenant, and resource authorization before rendering the target screen.
- **Notification Payload Validation**: Treat all push notification payloads as untrusted user input. Validate the payload against a schema before triggering any navigation or side effects.
- **Clipboard Policy**: Sensitive IDs, credentials, reset tokens, OTPs, and full Aadhaar/bank identifiers MUST be excluded from copy-to-clipboard functionality.

---

## Updated Workflow Checklist — What to Verify After AI Writes Code

> Replaces the original checklist at the end of Rule 32. All prior items retained;
> new items for Rules 33–52 appended.

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
   - Paginated responses use canonical `PaginationMeta` shape? (Rule 33)
   - Status/type fields use enums — no magic strings? (Rule 34)
   - Navigation calls use `ROUTES` constants — no hardcoded strings? (Rule 35)
   - Type-only imports use `import type`? (Rule 36)
   - Currency/numbers formatted via `formatCurrencyFromMinorUnits()` / `formatNumber()`? (Rule 37)
   - Null/empty fields render `displayValue()` en-dash fallback? (Rule 38)
   - Async buttons have `minWidth` — no layout shift on loading? (Rule 39)
   - Toasts go through `showToast()` — no direct library calls? (Rule 40)
   - Multi-step forms have `useUnsavedChangesGuard` wired? (Rule 41)
   - Every `useEffect` dependency has an explanatory comment? (Rule 42)
   - All hooks and utilities have JSDoc blocks? (Rule 43)
   - Every file has `RESPONSIBILITY:` + `FLOW:` header comment? (Rule 44)
   - Async state uses `NetworkState<T>` enum — no boolean flag pairs? (Rule 45)
   - Background tasks documented in `_features.md`? (Rule 46)
   - API calls have explicit timeouts from `TIMEOUT_CONFIG`? (Rule 47)
   - 400 validation errors mapped to form fields via `handleValidationErrors()`? (422 only if explicitly approved by API contract) (Rule 48)
   - List items keyed by entity ID — no index keys? (Rule 49)
   - Permitted record identifiers have copy-to-clipboard affordance? (Rule 50)
   - Every list screen has a dedicated `EmptyState` component? (Rule 51)
   - New tokens added to `mobile_theme_contract.md` before implementation? (Rule 52)
   - Irreversible mutations use stable Idempotency-Keys on retry? (Rule 53)
   - Token refresh is single-flight? (Rule 54)
   - x-tenant-id derived from secure context only? (Rule 55)
   - Enterprise security constraints respected? (Rule 56)
4. Run CI gates: lint (`eslint-plugin-boundaries`, `consistent-type-imports`), type check, test pyramid, SCA scan, secrets scan, hard-write-boundary diff check.
5. For auth, payment, storage, or tenant-routing changes: ensure CODEOWNERS human review.

## Rule 57 — Strict Case Sensitivity for File Names and Imports (Linux/CI Compatibility)
All imports and file paths MUST exactly match the casing of the actual file on disk. While development often happens on Windows/macOS (which have case-insensitive file systems), production deployments and CI pipelines typically run on Linux (which has a strict case-sensitive file system).
- **Rule:** A mismatch between import case (e.g., ` 	rainer_url_config `) and file case (e.g., `Trainer_url_config.ts`) will cause the build to fail in CI/CD.
- **Enforcement:** Always double-check that the casing of module prefixes and filenames in imports matches exactly. If you rename a file, ensure the git index catches the case change (e.g., using `git mv`).
- [?] **BAD:** File is `UserComponent.tsx`, imported as `import UserComponent from './userComponent'`.
- [?] **GOOD:** File is `UserComponent.tsx`, imported as `import UserComponent from './UserComponent'`.

## Rule 58 — WebSockets & Real-Time Communication
* **The Rule:** WebSockets must never be instantiated directly via `new WebSocket()` or `io()` inside UI components.
* **Implementation:** Always use a centralized `WebSocketContext` or `SocketProvider` to manage connection lifecycles (connect, disconnect, reconnect). Feature modules must consume WebSockets via dedicated custom hooks (e.g., `useSocketEvent('NOTIFICATION_RECEIVED', callback)`). This guarantees that event listeners are correctly cleaned up on component unmount and avoids memory leaks.

## Rule 59 — Role-Based Field Masking & Optional Types
* **The Rule:** The backend strictly masks sensitive data fields (like revenue) based on the user's role before transmitting the response.
* **Implementation:** Frontend TypeScript interfaces and Zod schemas MUST mark these potentially masked fields as optional (`?`). UI components consuming this data must implement graceful fallback behavior (e.g., hiding a specific chart or displaying a generic placeholder) if a field is `undefined`. The frontend must never crash due to a missing role-restricted field.

## Rule 60 — Strict Cache Invalidation Strategy
* **The Rule:** TanStack Query (React Query) server state must always remain perfectly synchronized with the backend data.
* **Implementation:** Every mutation hook (`useMutation`) MUST implement an `onSuccess` callback that calls `queryClient.invalidateQueries({ queryKey: [...] })` for any relevant queries affected by the mutation. Failing to invalidate queries will cause the UI to display stale, obsolete data after an update.

## Rule 61 — Internationalization (i18n) & Localization

### Strategy: Module-Co-located Locales + AI-Generated Translations (Zero External Cost)

The mobile app uses `react-i18next` with **co-located locale files inside each feature module folder** — NOT in a central `src/i18n/locales/` directory. This preserves **Extreme Isolation**: each feature module owns its own strings and can be moved, deleted, or versioned independently.

**Translations are written by the AI agent at the time it writes the module code.** No external API is needed. The AI already has full context of the Gym Management domain, making translations accurate and idiomatic — and faster than any external service.

### Stack
- **Library:** `react-i18next` + `i18next`
- **Locale detection:** `react-native-localize` (auto-detects device language)
- **Base language:** English (`en.json`) — written by AI agent when creating the module
- **Other languages:** Written by the AI agent in the same commit
- **Runtime cost:** Zero — all files are static JSON, bundled inside the app

### Module-Level File Structure
Each feature module owns its own `_locales/` folder:
```
src/features/
  admin/
    members/
      _locales/
        en.json   ← AI writes this when creating the module
        nl.json   ← AI translates this in the same commit
        fr.json
      components/
      hooks/
  trainer/
    schedule/
      _locales/
        en.json
        nl.json
scripts/
  merge-locales.ts   ← Merges all _locales into one bundle, run at build time
src/
  i18n/
    i18n.ts          ← i18next init file (loads merged bundle)
```

### `_locales/en.json` (Source of Truth per Module)
```json
{
  "MEMBERS": {
    "PAGE_TITLE": "Members",
    "ADD_MEMBER": "Add Member",
    "EMPTY_STATE": "No members found. Add your first member to get started."
  }
}
```

### AI Agent Translation Rule
When writing a new feature module, the AI MUST:
1. Create `_locales/en.json` with all English UI strings used in the module.
2. In the **same commit**, create `_locales/nl.json`, `_locales/fr.json`, etc. for all configured target languages using its own translation capability.
3. Translations must be **contextually correct** for a Gym Management SaaS — not literal.

```json
// _locales/nl.json — AI writes this, context-aware
{
  "MEMBERS": {
    "PAGE_TITLE": "Leden",
    "ADD_MEMBER": "Lid toevoegen",
    "EMPTY_STATE": "Geen leden gevonden. Voeg uw eerste lid toe om te beginnen."
  }
}
```

### Using Translations in Components
Always use `useTranslation` hook — **never** hardcode English strings in JSX/TSX:
```tsx
import { useTranslation } from 'react-i18next';

export const MembersScreen = () => {
  const { t } = useTranslation('MEMBERS');
  // ❌ BAD: <Text>Members</Text>
  // ✅ GOOD:
  return (
    <>
      <Text>{t('PAGE_TITLE')}</Text>
      <Button title={t('ADD_MEMBER')} />
    </>
  );
};
```

### `src/i18n/i18n.ts` (Initialization — loads merged bundle)
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
// Merged bundles are generated by scripts/merge-locales.ts at build time
import en from '../../public/locales/en.json';
import nl from '../../public/locales/nl.json';

const bestLang = RNLocalize.findBestAvailableLanguage(['en', 'nl', 'fr']) ?? { languageTag: 'en' };

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, nl: { translation: nl } },
  lng: bestLang.languageTag,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

### `scripts/merge-locales.ts` (Build-Time Merge Script)
```typescript
// Usage: npx ts-node scripts/merge-locales.ts
import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';

const OUTPUT_DIR = 'public/locales';
const merged: Record<string, Record<string, any>> = {};

for (const file of globSync('src/features/**/_locales/*.json')) {
  const lang = path.basename(file, '.json');
  const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
  merged[lang] = { ...merged[lang], ...content };
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (const [lang, data] of Object.entries(merged)) {
  fs.writeFileSync(`${OUTPUT_DIR}/${lang}.json`, JSON.stringify(data, null, 2));
  console.log(`✅ Merged ${lang}.json`);
}
```

### API Client: `Accept-Language` Header
```typescript
import i18n from '@/i18n/i18n';

export const apiFetch = (url: string, options?: RequestInit) =>
  fetch(url, {
    ...options,
    headers: { 'Accept-Language': i18n.language, ...options?.headers },
  });
```

### Developer Workflow
1. AI writes a new feature module and creates `_locales/en.json`.
2. AI, in the **same response**, creates all target-language `_locales/{lang}.json` files.
3. Run `npm run i18n:merge` (CI/build does this automatically).
4. Commit all `_locales/` files alongside the feature code.
5. **Never** put locale files in a central `src/i18n/locales/` folder.

### Configured Target Languages
This is the **authoritative list of languages** this project supports. There is no central config file — this instruction document IS the config. When an AI agent creates any new module, it MUST generate `_locales/` files for every language in this list.

| Code | Language | Region | Script | Priority |
|------|----------|--------|--------|----------|
| `en` | English | Global | Latin | **Base — always first** |
| `nl` | Dutch | Netherlands, Belgium | Latin | High |
| `fr` | French | France, Belgium, Canada | Latin | High |
| `de` | German | Germany, Austria, Switzerland | Latin | High |
| `hi` | Hindi | India (North) | Devanagari | High |
| `mr` | Marathi | Maharashtra, India | Devanagari | Medium |
| `ta` | Tamil | Tamil Nadu, Sri Lanka | Tamil | Medium |
| `te` | Telugu | Andhra Pradesh, Telangana | Telugu | Medium |
| `kn` | Kannada | Karnataka, India | Kannada | Medium |
| `bn` | Bengali | West Bengal, Bangladesh | Bengali | Medium |
| `gu` | Gujarati | Gujarat, India | Gujarati | Low |
| `ml` | Malayalam | Kerala, India | Malayalam | Low |
| `pa` | Punjabi | Punjab, India/Pakistan | Gurmukhi | Low |

> **Phased Rollout:** Do not ship all languages at launch. Start with `en` + `hi` (covers ~40% of India). Add `nl`, `fr`, `de` for European markets. Add remaining Indian regional languages as the product expands into those regions. Update this table when a new language is officially launched.

> **Indian Script Note (Mobile):** Indian script fonts (Devanagari, Tamil, Telugu, etc.) are bundled inside the APK/IPA. Use `react-native-localize` to detect the active script and load the correct font family from the app bundle. All Indian scripts are Left-to-Right (LTR) — no RTL layout changes are needed. Ensure fonts are declared in `react-native.config.js` and linked correctly for both iOS and Android.

> **AI AGENT NOTE:** Every UI string inside `<Text>` or component props MUST use `t('NAMESPACE.KEY')`. When creating a new feature module, you MUST create `_locales/en.json` AND all configured target-language files (e.g., `_locales/nl.json`) in the same response. Use your own translation capability — do NOT call any external API. Hardcoding English strings is a critical rule violation.

## Rule 62 — Centralized Feature Flags
* **The Rule:** Never use environment variables (e.g., `NEXT_PUBLIC_ENABLE_FEATURE`) directly in JSX logic to conditionally render UI elements.
* **Implementation:** Application feature flags must be fetched dynamically from the backend at initialization and stored in Context or Zustand. Features should be toggled via a dedicated custom hook (`useFeatureFlag('ENABLE_NEW_BILLING')`). This allows flags to be changed per-tenant or per-user dynamically without needing a frontend deployment.


## Rule 63 — Multi-Currency Monetary Amounts

### The Rule
The backend sends all monetary amounts as **integers in the smallest currency unit** (paise for INR, cents for USD/EUR) alongside an ISO 4217 currency code. The mobile app is solely responsible for formatting. Never hardcode a currency symbol or divide raw amounts manually.

### Canonical Formatting Utility
Create ONE shared utility per feature module. All currency display in that module MUST go through this function:
``````typescript
// utils/formatCurrency.ts (co-located inside the feature module)
/**
 * Formats a monetary amount from its smallest unit to a locale-aware display string.
 * @param amount  Integer in smallest unit (e.g., 9999 for ₹99.99)
 * @param currency ISO 4217 currency code (e.g., 'INR', 'USD', 'EUR')
 * @param locale  BCP 47 locale string (e.g., 'en-IN', 'nl-NL')
 */
export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-IN'
): string => {
  const subunitMap: Record<string, number> = {
    JPY: 1, KWD: 1000, BHD: 1000,
  };
  const divisor = subunitMap[currency] ?? 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: divisor === 1 ? 0 : 2,
  }).format(amount / divisor);
};

// Usage:
// formatCurrency(9999, 'INR', 'en-IN')  →  '₹99.99'
// formatCurrency(9999, 'EUR', 'nl-NL')  →  '€99,99'
// formatCurrency(100,  'JPY', 'ja-JP')  →  '¥100'
``````

### Rules
- ❌ Never do `amount / 100` inline inside a `<Text>` component.
- ❌ Never hardcode `₹`, `$`, or `€` symbols anywhere in JSX.
- ❌ Never store the formatted string in state or React Query cache — store the raw integer.
- ✅ Always derive the locale from the active i18n language (`i18n.language` from `react-i18next`).

``````tsx
// ❌ BAD
<Text>₹{plan.amount / 100}</Text>

// ✅ GOOD
import i18n from '@/i18n/i18n';
<Text>{formatCurrency(plan.amount, plan.currency, i18n.language)}</Text>
``````

> **AI AGENT NOTE:** Every time you display a monetary amount inside a `<Text>` component, use the module-local `formatCurrency()` utility. The raw integer from the API must never be rendered directly. The locale MUST come from `i18n.language` — never hardcode `'en-IN'`. No currency symbol may appear as a literal character anywhere in JSX.
