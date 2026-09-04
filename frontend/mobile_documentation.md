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

## Rule 1 — Micro-Modularization (One Feature = One Self-Contained Folder)

- One component/widget = one file. If a file's UI logic exceeds ~150 lines, split it.
- One file = one responsibility — never mix data-fetching, business logic, and
  presentation in the same file.
- Every feature lives ENTIRELY inside its own feature folder (e.g.
  `features/orders/` or `lib/features/orders/` for Dart/Flutter conventions).
  That folder holds: UI components, hooks/controllers, validation schemas, types/models,
  the feature's API-access layer, and its own context file (Rule 24). Nothing
  feature-specific should exist outside this folder.
- Screens/route entry points are THIN — they compose feature components only.
  No business logic, no direct API calls, no non-trivial state inside a screen file.

Standard shape (apply this structure regardless of framework, adapting file
extensions to the language in use):



features/orders/ components/ (or widgets/ in Flutter) hooks/ (or controllers/ / providers/) schemas/ (validation rules — Zod for RN, or equivalent validators for Flutter) types/ (or models/) api/ (all network calls for this feature only) state/ (feature-scoped state container, only if shared across components) tests/ orders_features.md (MANDATORY — see Rule 24)




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

- Every color, spacing value, font size, radius, and shadow used in the app MUST
  come from the single design-token source defined in `mobile_global_design.md`.
  No raw hex codes, no arbitrary pixel/dp values typed directly into a component.
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

Exactly two categories of state exist. Do not invent a third ad-hoc pattern.

| State Type | Category | Rule |
|---|---|---|
| Anything from an API (lists, details, counts, status) | **Server state** | Managed by a caching/data-fetching layer with built-in loading/error/stale-tracking (e.g. TanStack Query for React Native bare-metal; Riverpod's `AsyncNotifier` or a repository+cache pattern for Flutter). Never duplicated into a separate "client" state container. |
| UI-only state shared across 2+ components in one feature | **Client state (shared)** | A lightweight, feature-scoped state container (e.g. Zustand for RN; a `Provider`/`Bloc`/`Riverpod` scoped to the feature for Flutter). One container per feature — never one giant global store. |
| UI-only state used by exactly one component | **Client state (local)** | Local component state (`useState`/`useReducer` equivalent, or `StatefulWidget` local fields). |
| Data that must survive app restart offline | **Persisted server state** | Only when explicitly required — server-state cache persisted to local storage. Must be documented in the feature's `_features.md` (Rule 24), including conflict-resolution strategy. |

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
  instance, one place where auth headers and tenant/org headers are attached.
  No feature creates its own separate HTTP client.
- Every response is normalized into ONE shared response shape across the
  entire app: a success flag, a data payload, and a structured error object
  (code, message, optional field-level errors). Every feature's API layer
  returns this shape — never raw, un-normalized responses.
- User-facing error messages come from the backend's error message field
  (backend-driven), never hardcoded strings duplicated across screens. If the
  backend doesn't localize, resolve through one central error-code-to-message
  mapping file — not per-screen fallback strings.
- Authentication expiry (401) is handled by ONE centralized
  logout/token-refresh flow — never handled ad-hoc inside individual screens.

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
  `mobile_global_design.md` — never arbitrary numeric values per usage.

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

- **Unit tests:** pure logic, validators, utility functions — fast, no
  framework rendering involved.
- **Component/widget tests:** every non-trivial component/widget in a feature
  folder has a matching test in that folder's `tests/` directory (Jest +
  Testing Library for RN; Flutter's built-in widget-test framework).
- **Integration tests:** critical user flows tested end-to-end within the app
  process (RN's integration-test tooling; Flutter's `integration_test`
  package).
- **E2E tests (real device/simulator):** pick ONE tool project-wide for
  black-box, full-app-flow testing (e.g. Maestro or a comparable YAML/script-
  driven E2E runner works across both RN and Flutter) and document the choice
  once — do not mix multiple E2E tools in the same repo.
- Native modules (camera, biometrics, secure storage, notifications) are
  mocked at the test boundary — unit and component tests never touch a real
  native API.
- No feature is considered complete without its core logic/component tests
  passing — tracked in that feature's `_features.md` checklist.

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

> Note: as of 2025, hosted all-in-one mobile DevOps platforms bundled with
> some frameworks' managed toolchains have been retired industry-wide for
> non-managed projects. The current enterprise-standard approach separates
> concerns explicitly:

- **CI (every pull request):** format check, static analysis/lint, run the
  full test pyramid (Rule 17), produce an unsigned development build. Must
  NOT have access to production signing secrets.
- **CD (on release tag / manual approval):** restore signing credentials from
  protected secrets, produce a signed release artifact (Android App
  Bundle / iOS IPA), upload to the store's internal/beta testing track.
- Use a general-purpose CI orchestrator (GitHub Actions, Azure Pipelines,
  Bitrise, or Codemagic) paired with a dedicated mobile release-automation
  tool (fastlane is the current industry standard for both Android and iOS
  signing + store upload) — do not rely on a single vendor's bundled
  build+test+distribute+analytics stack; treat each capability (build, test,
  distribute, monitor) as independently replaceable.
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
  (see Rule 24) — never push an OTA update to 100% of users immediately.

## Rule 22 — Security Scanning & Dependency Guardrails

- CI runs, on every push: (a) a software-composition-analysis (SCA)
  dependency vulnerability scan, (b) a secret-scanning check. Both must pass
  before merge.
- Code ownership rules require mandatory review on: the central network
  client, the central storage module, the central permissions module, the
  central config module, and any native build/signing configuration file.
- No new dependency is added without confirming current-architecture
  compatibility (Rule 0/14) AND passing a vulnerability scan.

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

**This is the most important rule for how the codebase is worked on by AI
agents or new engineers.**

Every feature folder MUST contain a file named `[featureName]_features.md`.
This file is the single source of truth for that feature — anyone (human or
AI) given ONLY this file plus the feature's code must be able to fully
understand, modify, or debug it without reading any other part of the
codebase.

Required sections in every `_features.md`:

- **Purpose** — what the feature does, which screens/users use it.
- **Screens & Routes** — every entry point into this feature.
- **Data Flow** — API endpoints consumed, server-state cache keys used and
  what invalidates them, any shared client-state container used here and by
  whom else.
- **State Decisions** — what lives in server state vs shared client state vs
  local state, and why (per Rule 4).
- **Offline Behavior** — explicit "yes, with [strategy]" or "no offline
  requirement."
- **Platform-Specific Notes** — any iOS/Android divergence and why.
- **Permissions Used** — which native permissions, requested via which
  central-module function.
- **Feature-Specific Dependencies** — anything beyond the approved base set,
  and why.
- **Rule Compliance Checklist** — one line per rule in this document (0
  through 27), checked off only when genuinely true, not assumed.
- **Known Issues / Tech Debt** — anything intentionally deferred, with a
  reason and tracking reference.

**Rule for AI agents/engineers:** before modifying a feature, read its
`_features.md` in full first. If it's missing or no longer matches the code,
updating it is part of the same change — a feature is never "done" while its
context file is stale.

## Rule 25 — Accessibility

- Every interactive element exposes an accessible role/label — no exceptions
  for "obviously self-explanatory" icons or buttons.
- Minimum touch target: 44×44pt (iOS) / 48×48dp (Android) — enforced via the
  shared minimum-touch-target token in `mobile_global_design.md`, not
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

