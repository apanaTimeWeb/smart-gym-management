# Smart Gym 360 — Trainer Module Deep Audit + V2 Repair Report

## DOCUMENT DISCOVERED
- `web_frontend_development_instruction.md` — development architecture / engineering contract.
- `web_global_design.md` — global design-system contract.
- `Pasted markdown.md` — deep audit + repair + handoff protocol.

## TARGET MODULE
`trainer/`

## Scope
Yeh execution sirf supplied `trainer/` frontend scope par focused hai. Backend implementation ko modify ya judge nahi kiya gaya. Downstream route references ko sirf interface-level contract ke liye consider kiya gaya.

## Execution Status
**V2 ARCHIVE-LEVEL REPAIR COMPLETE — RUNTIME VERIFICATION NOT VERIFIED**

Archive me required parent-app configuration/dependencies nahi hain, isliye source-level verification complete ki gayi hai, lekin Next.js runtime/browser verification claim nahi kiya gaya.

---

# BEFORE REPAIR SCORE: 7.4/10

Yeh is V2 execution ka baseline hai: supplied `trainer.zip` ki actual pre-V2 state. Main V1 report ke 7.9/10 ko blindly reuse nahi kar raha; baseline ko remaining source-level defects ke saath recalculate kiya gaya.

# AFTER REPAIR SCORE: 8.3/10 — NOT FULLY VERIFIED

**Improvement: +0.9/10**

Score high hone ke bawajood 9/10+ nahi diya gaya kyunki runtime, browser, build, test execution, CI/security, hydration aur global bootstrap checks supplied archive me available nahi hain.

## Category Scorecard

| Category | Before | After | Main reason |
|---|---:|---:|---|
| Architecture | 7.8 | 8.8 | Feature boundary stable hai; V2 ne remaining contract/ownership gaps tighten kiye. |
| Modularity | 8.0 | 9.0 | Remaining inline prop contracts aur responsibility consistency harden hui. |
| State Management | 7.8 | 8.2 | TanStack Query / module UI state separation preserved; runtime state behavior still unverified. |
| API Boundary | 8.0 | 8.8 | Canonical `ApiResponse<T>`, module URL configs, validation boundary aur mutation headers strengthened. |
| Forms | 7.7 | 8.6 | RHF + Zod structure retained; dirty-state/runtime verification remains external. |
| Tables | 7.5 | 8.5 | Action accessibility and control wiring hardened; browser table behavior not executed here. |
| UI Interaction & Buttons | 7.5 | 8.6 | 204 interactive controls now have source-level focus-visible coverage; no static no-op signature found. |
| End-to-End User Flows | 6.8 | 7.4 | Critical specs preserved, but Playwright execution unavailable. |
| Functional Mock/Demo | 7.8 | 8.5 | Mock-first API paths and mutation support retained/strengthened. |
| Accessibility | 7.5 | 8.7 | Focus-visible gaps closed at source level and semantic foreground/background handling improved. |
| Responsive Design | 7.3 | 8.2 | Mobile patterns preserved; 375/768/1280 browser verification unavailable. |
| Design System | 7.6 | 8.4 | Semantic opacity violations removed; charts now honor light/dark mode at source level. |
| Loading/Error | 7.8 | 8.5 | Structural loading/error patterns remain present and modular. |
| Mock/MSW | 8.0 | 8.6 | Complete module-owned contract path retained; runtime MSW bootstrap unavailable. |
| Testing | 6.8 | 7.5 | Test corpus remains, API tests updated for V2 mutation contracts; test execution unavailable. |
| Security Frontend | 7.8 | 8.4 | Idempotency, safe dialog patterns, semantic data handling strengthened. |
| Documentation | 7.5 | 8.7 | Feature docs cleaned; V2 verification/change manifests added. |
| CI/Tooling | 4.0 | 4.5 | Parent config still absent, so mechanical gates remain NOT VERIFIED. |
| AI-Friendliness | 8.0 | 9.0 | Module ownership, explicit contracts, comments, docs, type boundaries and change-scope artifacts are strong. |

---

# 1. TARGET INVENTORY

- Trainer routes: **11** `page.tsx` files.
- TypeScript/TSX files: **364**.
- Test/spec files: **36**.
- Feature maps: **16**.
- Forbidden docs: **16**.
- Theme contracts: **16**.
- Actionable controls statically discovered: **204**.
- Controls missing `focus-visible:` after V2: **0**.
- Static no-op handler signatures: **0**.
- Syntax parse errors: **0**.

---

# 2. MASTER FINDINGS TABLE

| ID | Priority | Area | Route/Feature | Issue | Current State | Required State | V2 Status | Verification |
|---|---|---|---|---|---|---|---|---|
| TR-V2-001 | P1 | Design System | `progress-tracking`, `dashboard` | ApexCharts theme was hardcoded to dark mode | `theme.mode = 'dark'` | Theme must follow document-level light/dark state | FIXED | Static source PASS; browser theme toggle NOT VERIFIED |
| TR-V2-002 | P1 | Accessibility | Trainer interactive surface | Multiple controls lacked explicit `focus-visible` styling | 103 controls lacked source-level coverage in pre-V2 archive | All interactive controls must expose explicit focus-visible state | FIXED | Static AST scan: 0 missing |
| TR-V2-003 | P1 | Design System | `attendance` | Solid warning backgrounds used foreground pairing that did not follow warning semantic mapping | `bg-warning text-on-primary` | Prefer `bg-warning-bg text-warning` for warning badges/actions | FIXED | Static source PASS |
| TR-V2-004 | P1 | Mutation Safety | `workout` | Create mutation test used old API signature without idempotency key | `createWorkout(dto)` | Same user intent must carry stable `Idempotency-Key` | FIXED | Static source + updated test contract PASS; Vitest NOT VERIFIED |
| TR-V2-005 | P1 | Mutation Safety | `schedule` | Leave request test used old signature without idempotency key | `requestLeave(dto)` | Request must carry stable `Idempotency-Key` | FIXED | Static source + updated test contract PASS; Vitest NOT VERIFIED |
| TR-V2-006 | P2 | Modularity | `progress-tracking` | One production component lacked the mandatory responsibility comment | Missing comment in `TrainerProgressComparisonDelta.tsx` | Every non-framework component declares exact responsibility | FIXED | Static source PASS |
| TR-V2-007 | P2 | API Contract | `trainer_utils`, `members`, `sessions`, `profile` | Some response schemas bypassed the canonical envelope helper | Multiple direct `success/message/data` schemas | One canonical `ApiResponse<T>` validation path | FIXED | Direct envelope declarations reduced to helper implementation only |
| TR-V2-008 | P2 | URL Isolation | Trainer role | Root URL config naming/casing could break canonical imports | `Trainer_url_config.ts` vs lower-case imports | Canonical `trainer_url_config.ts` | FIXED | Source import scan PASS |

---

# 3. DETAILED ISSUES

## TR-V2-001 — P1 — ApexCharts Light/Dark Theme Was Static

### 1. What is happening now
`TrainerProgressChart` aur `TrainerDashboardGoalTrendChart` ApexCharts ko use karte the, lekin chart theme hardcoded dark mode par tha.

### 2. Exact location
- `progress-tracking/progress-tracking_components/TrainerProgressChart/TrainerProgressChart.tsx`
- `dashboard/dashboard_components/TrainerDashboardGoalTrendChart/TrainerDashboardGoalTrendChart.tsx`

### 3. Evidence / Proof
Pre-V2 implementation me `theme: { mode: 'dark' }` aur tooltip theme bhi dark fixed tha.

### 4. Documentation requirement
`web_global_design.md` §11 — Dark/Light mode must remain centrally theme-controlled.

### 5. Current vs required
**CURRENT:** Chart mode fixed dark.

**REQUIRED:** Chart mode should follow the active `.dark` theme state.

### 6. Why this is a problem
- UX risk: Light mode me chart controls/tooltip inconsistent ho sakte the.
- Design-system risk: centralized theme switching ka contract break hota tha.

### 7. What the final state must be
Both ApexCharts consumers active document theme observe karein aur `light` / `dark` mode accordingly pass karein.

### 8. Exact repair approach
1. Theme state observe kiya.
2. `MutationObserver` se document theme changes track kiye.
3. ApexCharts `theme.mode` aur tooltip theme ko dynamic banaya.

### 9. What NOT to do
- Hardcoded `dark` mode wapas mat lagana.
- JSX me raw chart colors add mat karna.

### 10. Verification
Static source scan PASS. Actual browser theme toggle **NOT VERIFIED**.

### 11. DONE condition
Done only when chart light mode aur dark mode dono me actual browser runtime me visually render ho aur tooltip/labels readable rahen.

---

## TR-V2-002 — P1 — Interactive Controls Lacked Explicit Focus-Visible Coverage

### 1. What is happening now
Supplied V2 baseline me 204 interactive controls me se 103 ke opening element/class contract par explicit `focus-visible:` state nahi tha.

### 2. Exact location
Trainer ke multiple feature components, especially profile, attendance, workout, members, sessions, library, progress aur shared controls.

### 3. Evidence / Proof
TypeScript AST scan: **pre-V2 103 controls without `focus-visible:`**.

### 4. Documentation requirement
`web_global_design.md` §13 accessibility rules — interactive elements must explicitly define focus-visible states.

### 5. Current vs required
**CURRENT:** Kuch controls browser-default focus ya incomplete focus behavior par depend kar rahe the.

**REQUIRED:** Every actionable `button`, link/input/select/textarea control ko explicit focus-visible treatment chahiye.

### 6. Why this is a problem
Keyboard accessibility aur dark-mode focus visibility affected hoti hai.

### 7. What the final state must be
Source-level AST verification me **0 missing focus-visible controls**.

### 8. Exact repair approach
1. Affected interactive elements inventory kiye.
2. Semantic focus-ring utility sequence add ki.
3. Existing business behavior ko change kiye bina class contracts harden kiye.

### 9. What NOT to do
- Focus rings remove mat karna.
- `outline-none` ke bina replacement mat chhodna.

### 10. Verification
AST scan PASS: **204/204 interactive controls covered**.

### 11. DONE condition
Done only when keyboard tab-through browser runtime me every actionable control par visible focus indicator show kare.

---

## TR-V2-003 — P1 — Warning Semantic Background Pairing

### 1. What is happening now
Attendance toolbar aur calendar me warning semantic solid background ko primary foreground token ke saath pair kiya gaya tha.

### 2. Exact location
- `attendance/attendance_components/TrainerAttendanceToolbar/TrainerAttendanceToolbar.tsx`
- `attendance/attendance_components/TrainerMyAttendanceCalendar/TrainerMyAttendanceCalendar.tsx`

### 3. Evidence / Proof
Pre-V2 occurrences: `bg-warning text-on-primary`.

### 4. Documentation requirement
`web_global_design.md` §1A exact semantic token mapping + solid/subtle contrast rule.

### 5. Current vs required
**CURRENT:** Warning surface used `text-on-primary`.

**REQUIRED:** Warning state ke liye subtle semantic variant ya explicit warning foreground use hona chahiye.

### 6. Why this is a problem
Theme portability aur contrast contract inconsistent ho sakta tha.

### 7. What the final state must be
Warning badge/action surfaces `bg-warning-bg text-warning` jaise semantic pairing use karein.

### 8. Exact repair approach
Warning usages ko semantic subtle variant me convert kiya; primary text color ko `text-on-primary` se replace kiya jahan necessary tha.

### 9. What NOT to do
- `bg-warning text-white` ya `text-on-primary` blindly mat use karna.
- `/10` style semantic opacity mat add karna.

### 10. Verification
Static source PASS.

### 11. DONE condition
Done only when warning states semantic warning tokens ke saath render karein and no forbidden semantic opacity modifier remains.

---

## TR-V2-004 — P1 — Workout Create Mutation Test Contract

### 1. What is happening now
Workout create API V2 me `Idempotency-Key` accept kar raha tha, but co-located API test old call signature use kar raha tha.

### 2. Exact location
`workout/workout_tests/TrainerWorkoutApiBehavior.test.ts`

### 3. Evidence / Proof
Pre-V2 test call: `workoutApi.createWorkout(dto)`.

### 4. Documentation requirement
Frontend Rule 83 — financial/irreversible/non-duplicable mutations must attach a stable `Idempotency-Key`.

### 5. Current vs required
**CURRENT:** Test API contract outdated.

**REQUIRED:** Test must prove header is forwarded.

### 6. Why this is a problem
Contract drift test suite me hidden reh sakta tha.

### 7. What the final state must be
Test passes a stable test key and asserts `'Idempotency-Key'` header.

### 8. Exact repair approach
API behavior test me deterministic test key add kiya aur header assertion add ki.

### 9. What NOT to do
- Retry par new random key assert/use mat karna.
- API key test ko remove karke sirf response message assert mat rakhna.

### 10. Verification
Static test-source PASS; Vitest execution NOT VERIFIED.

### 11. DONE condition
Done only when Vitest execution confirms the header is forwarded and the mutation flow succeeds through the expected API contract.

---

## TR-V2-005 — P1 — Schedule Leave Mutation Test Contract

### 1. What is happening now
Schedule leave mutation code idempotency support rakhta tha, lekin API behavior test old signature use kar raha tha.

### 2. Exact location
`schedule/schedule_tests/TrainerScheduleApiBehavior.test.ts`

### 3. Evidence / Proof
Pre-V2 test call `requestLeave(dto)` tha.

### 4. Documentation requirement
Frontend Rule 83.

### 5. Current vs required
**CURRENT:** Idempotency header test contract absent.

**REQUIRED:** Stable key + forwarded header assertion.

### 6. Why this is a problem
Test/API mismatch mutation safety regression hide kar sakta tha.

### 7. What the final state must be
Leave request test deterministic key pass kare aur header assert kare.

### 8. Exact repair approach
Test update karke `schedule-leave-test-key` add kiya aur header assertion add ki.

### 9. What NOT to do
- Existing mutation code ko weaker optional path par revert mat karna.

### 10. Verification
Static source PASS; Vitest execution NOT VERIFIED.

### 11. DONE condition
Done only when the real test runner confirms the header and request flow.

---

## TR-V2-006 — P2 — Missing Component Responsibility Comment

### 1. What is happening now
Ek non-framework component mandatory responsibility declaration ke bina tha.

### 2. Exact location
`progress-tracking/progress-tracking_components/TrainerProgressComparisonDelta/TrainerProgressComparisonDelta.tsx`

### 3. Evidence / Proof
V2 source scan ne is component ko responsibility-comment exception ke bahar detect kiya.

### 4. Documentation requirement
Frontend Rule 38 — strict component responsibility contract.

### 5. Current vs required
**CURRENT:** No top responsibility contract.

**REQUIRED:** Exact rendering/orchestration responsibility comment.

### 6. Why this is a problem
AI context loading ke time file ka role immediately clear nahi hota.

### 7. What the final state must be
Top-level responsibility comment present.

### 8. Exact repair approach
Comment add kiya without changing component behavior.

### 9. What NOT to do
Responsibility comment me business/API ownership incorrectly claim mat karna.

### 10. Verification
Production component responsibility scan: **0 missing**.

### 11. DONE condition
Done only when future AI can identify file responsibility from the first lines.

---

## TR-V2-007 — P2 — Canonical API Response Envelope Alignment

### 1. What is happening now
Multiple feature schemas `success/message/data` envelope locally redefine kar rahe the instead of using the module's canonical response schema helper.

### 2. Exact location
- `trainer_utils/TrainerApiResponseSchema.ts`
- `members/members_types/TrainerMembers.schema.ts`
- `members/members_types/TrainerMembersProfileData.schema.ts`
- `sessions/sessions_types/TrainerSessionsTypes.ts`
- `profile/profile_types/TrainerProfileApiSchema.ts`

### 3. Evidence / Proof
Pre-V2 static scan me multiple direct envelope declarations mile. V2 source me direct declaration sirf helper implementation me remain hai.

### 4. Documentation requirement
Frontend Rule 59 — `ApiResponse<T>` single canonical response shape.

### 5. Current vs required
**CURRENT:** Repeated local envelope variants.

**REQUIRED:** One canonical envelope helper at API boundary.

### 6. Why this is a problem
Schema drift aur inconsistent null/error semantics ka risk.

### 7. What the final state must be
Feature schemas data-shape validate karein while common envelope contract one shared helper se validate ho.

### 8. Exact repair approach
Canonical `createTrainerApiResponseSchema()` establish kiya aur module schemas ko uske through parse karaya.

### 9. What NOT to do
Partial local `success/message/data` schema copy mat create karna.

### 10. Verification
Static source scan: direct envelope declaration count reduced to helper implementation only.

### 11. DONE condition
Done only when API boundary consistently validates the exact canonical response envelope at runtime.

---

## TR-V2-008 — P2 — Trainer Root URL Config Canonicalization

### 1. What is happening now
Root Trainer URL config ka filename casing aur import naming inconsistent tha.

### 2. Exact location
- Removed: `Trainer_url_config.ts`
- Final: `trainer_url_config.ts`
- Consumers: Trainer `not-found.tsx`, shell/layout, utilities, E2E.

### 3. Evidence / Proof
Changed-file manifest me explicit rename record hai; source import resolver check canonical lower-case target se resolve karta hai.

### 4. Documentation requirement
Frontend Rule 11 and absolute import/URL contract.

### 5. Current vs required
**CURRENT:** Filename casing inconsistent.

**REQUIRED:** Canonical `trainer_url_config.ts` and direct absolute imports.

### 6. Why this is a problem
Case-sensitive environments me build/import failure risk.

### 7. What the final state must be
One canonical root Trainer URL config file.

### 8. Exact repair approach
Filename normalize kiya aur consumers synchronize kiye.

### 9. What NOT to do
Duplicate old/new URL config files mat create karna.

### 10. Verification
Old file absent; canonical file present; source resolver PASS.

### 11. DONE condition
Done only when CI/build resolves imports identically on case-sensitive environments.

---

# 4. STATIC VERIFICATION

| Check | Result | Status |
|---|---:|---|
| TypeScript parser syntax errors | 0 | PASS |
| Explicit `any` type patterns | 0 | PASS |
| `@ts-ignore` / `@ts-nocheck` | 0 | PASS |
| `console.log/error/warn/debug/info` | 0 | PASS |
| Native `window.alert/confirm` | 0 | PASS |
| Relative imports | 0 | PASS |
| Arbitrary Tailwind values | 0 | PASS |
| Semantic background opacity modifiers | 0 | PASS |
| Raw hex in TSX | 0 | PASS |
| Raw rgba/rgb in TSX | 0 | PASS |
| Cross-feature business imports | 0 | PASS |
| Placeholder `TBD` docs | 0 | PASS |
| Size ceiling violations | 0 | PASS |
| Interactive controls without focus-visible | 0 / 204 | PASS |
| Static no-op handler signatures | 0 | PASS |
| Framework-reserved component responsibility exceptions | Accepted | PASS |
| Non-framework components missing responsibility comments | 0 | PASS |
| ApexCharts consumers | 3 | PASS |
| Custom `<svg>` source files | 0 | PASS / no inline chart SVG detected |

## Runtime Verification Boundary

**NOT VERIFIED — MUST BE RUN BY CODING AGENT**

Supplied archive me parent-app `package.json`, lockfile, Next.js config, strict `tsconfig`, Tailwind config, ESLint config, Vitest config, Playwright config aur CI/security configuration nahi mile. Isliye following checks source inspection se certify nahi kiye gaye:

- `npx tsc --noEmit`
- ESLint + Prettier + Tailwind linting
- Vitest execution
- Playwright browser flows
- Next production build
- MSW global bootstrap registration
- `nextjs-toploader` global registration
- hydration behavior
- 375/768/1280 responsive browser verification
- assistive-technology verification
- SCA / `npm audit`
- `gitleaks`
- CI branch protection / CODEOWNERS execution

---

# 5. COMPLETE UI / INTERACTION COVERAGE

### Interaction coverage
- Total actionable controls discovered: **204**.
- Static focus-visible gaps: **0**.
- Static no-op handler signatures: **0**.
- Runtime verified controls: **NOT VERIFIED**.

Important interpretation: `0 static no-op signatures` ka matlab yeh nahi hai ki har control browser me proven working hai. Browser/runtime execution parent app ke bina available nahi thi.

### Major flow surface covered by module structure
- Dashboard
- Attendance
- Earnings
- Library
- Members
- Notifications
- Profile
- Progress Tracking
- Schedule
- Sessions
- Workout

Har major feature ke liye existing route loading/error/not-found files, feature maps, mock/fixture areas aur co-located tests preserved/normalized hain.

---

# 6. FILE-BY-FILE V2 REPAIR MAP

| File | Current Responsibility | Problem | Final Responsibility | Required Action | Verification |
|---|---|---|---|---|---|
| `progress-tracking/progress-tracking_components/TrainerProgressChart/TrainerProgressChart.tsx` | Progress metric chart | Theme fixed dark | Theme-aware ApexCharts view | Observe document theme and pass light/dark mode | Static PASS; browser NOT VERIFIED |
| `dashboard/dashboard_components/TrainerDashboardGoalTrendChart/TrainerDashboardGoalTrendChart.tsx` | Goal trend chart | Theme fixed dark | Theme-aware ApexCharts view | Observe document theme and pass light/dark mode | Static PASS; browser NOT VERIFIED |
| `attendance/attendance_components/TrainerAttendanceToolbar/TrainerAttendanceToolbar.tsx` | Attendance toolbar | Warning semantic mismatch | Toolbar using semantic warning tokens | Change warning surface pairing | Static PASS |
| `attendance/attendance_components/TrainerMyAttendanceCalendar/TrainerMyAttendanceCalendar.tsx` | Attendance calendar | Warning/primary foreground mismatch | Calendar semantic badge/legend styling | Use semantic warning/primary foreground tokens | Static PASS |
| `workout/workout_tests/TrainerWorkoutApiBehavior.test.ts` | Workout API regression test | Old mutation signature | Idempotency-aware mutation contract test | Pass stable key + assert header | Static PASS; Vitest NOT VERIFIED |
| `schedule/schedule_tests/TrainerScheduleApiBehavior.test.ts` | Schedule API regression test | Old leave signature | Idempotency-aware leave contract test | Pass stable key + assert header | Static PASS; Vitest NOT VERIFIED |
| `progress-tracking/progress-tracking_components/TrainerProgressComparisonDelta/TrainerProgressComparisonDelta.tsx` | Comparison delta view | Missing responsibility comment | Explicit AI-readable view responsibility | Add top responsibility comment | Static PASS |
| `trainer_utils/TrainerApiResponseSchema.ts` | Canonical API envelope validation | Local envelope drift existed in consumers | Single reusable envelope validation helper | Keep common shape centralized | Static PASS |
| `trainer_url_config.ts` | Trainer role route registry | Filename casing mismatch | Canonical Trainer URL registry | Rename and synchronize imports | Static PASS |

---

# 7. ARCHITECTURE RULES TO PRESERVE

1. Feature module is the default AI repair boundary.
2. Feature business logic must stay feature-owned.
3. No sibling business feature imports.
4. TanStack Query owns server state.
5. Zustand/local state owns UI state according to module rules.
6. API responses cross a Zod validation boundary.
7. Module API calls consume module URL config.
8. Non-duplicable mutations reuse the same idempotency key across retries.
9. Business mocks/fixtures remain inside the owning feature.
10. Global UI primitives stay zero-business.
11. Every non-framework component keeps its responsibility contract.
12. Every important interaction must have meaningful test coverage.

---

# 8. THINGS THE CODING AGENT MUST NOT BREAK

- Trainer feature isolation and module write boundary.
- Existing `TanStack Query` query-key namespaces.
- Feature-owned MSW fixture/handler ownership.
- Backend-driven messages.
- Module URL configs.
- `displayValue()` nullable-data fallback.
- Currency/number formatting utilities.
- Destructive confirmation flows.
- Stable idempotency key per mutation intent.
- Mobile table/action behavior.
- Theme semantic classes and no-opacity-on-semantic-background rule.
- ApexCharts light/dark theme synchronization.
- Existing downstream child flows inside Trainer features.
- Existing route files and module error/loading/not-found paths.

---

# 9. PHASE-WISE EXECUTION PLAN

## Phase 1 — Architecture blockers
**Why:** Ownership and API boundary issues must be stable before UI refinements.

**Completion gate:** zero cross-feature business imports, canonical URL config, canonical API envelope.

## Phase 2 — State/API cleanup
**Why:** UI behavior depends on stable server/client state boundaries.

**Completion gate:** Query keys and mutation variables preserve ownership and idempotency.

## Phase 3 — Forms
**Why:** Forms depend on stable API mutation contracts.

**Completion gate:** RHF + Zod + dirty-state + loading/retry behavior remains intact.

## Phase 4 — Tables and interactions
**Why:** User-action coverage is the primary functional risk surface.

**Completion gate:** source-level interactive inventory has no missing focus-visible coverage or static no-op signatures.

## Phase 5 — Loading/error/empty
**Why:** Every data section needs all asynchronous states.

**Completion gate:** route/section loading/error/empty paths remain present.

## Phase 6 — Accessibility/responsive
**Why:** Interaction correctness is not complete without keyboard/touch support.

**Completion gate:** source-level focus-visible scan is zero-gap; browser verification remains mandatory.

## Phase 7 — Design-system cleanup
**Why:** Final UI contract should be semantic and theme-portable.

**Completion gate:** no arbitrary Tailwind, raw colors, or semantic opacity modifiers in Trainer TSX.

## Phase 8 — Tests
**Why:** Regression proof must follow implementation.

**Completion gate:** Vitest/Playwright execution passes in parent app.

## Phase 9 — Documentation
**Why:** AI portability requires documentation synchronized with actual code.

**Completion gate:** feature maps, forbidden docs, theme contracts and changed-file manifests are current.

## Phase 10 — Tooling/security
**Why:** Mechanical gates prevent future regressions.

**Completion gate:** parent app CI runs typecheck, lint, tests, build, SCA, secret scan, E2E and CODEOWNERS.

## Phase 11 — Final verification
**Why:** The final audit must cover the complete module, not only edited files.

**Completion gate:** all runtime checks PASS and no required category remains NOT VERIFIED.

---

# 10. CHANGE SCOPE

Compared with supplied `trainer.zip`:

- Added: **5** files.
- Removed: **1** file.
- Renamed: **1** file pair (the rename is represented inside the added/removed counts).
- Modified: **88** files.
- Total touched paths: **94**.

### Added
- `earnings/earnings_types/TrainerEarningsEmptyStateProps.ts`
- `sessions/sessions_types/TrainerSessionsEmptyStateProps.ts`
- `trainer_url_config.ts`
- `workout/workout_types/TrainerWorkoutEmptyStateProps.ts`

### Removed
- `Trainer_url_config.ts`

### Renamed
- `Trainer_url_config.ts` → `trainer_url_config.ts`

### Scope classification
All changes remain inside `trainer/**`. No unrelated role/business module was modified.

---

# 11. REGRESSION COMPARISON

**ADDED:**
- Explicit empty-state prop contract files for `earnings`, `sessions`, and `workout`.
- Canonical `trainer_url_config.ts` filename.
- `TRAINER_STATIC_VERIFICATION_V2.json` plus synchronized audit/change artifacts.

**CHANGED:**
- API envelope normalization.
- Mutation idempotency contracts/tests.
- Accessibility focus-visible coverage.
- Semantic warning/foreground token usage.
- ApexCharts theme synchronization.
- Component responsibility metadata.

**REMOVED:**
- `Trainer_url_config.ts` old-case filename.

**REGRESSED:**
- No static regression detected.

**UNINTENTIONALLY CHANGED:**
- No unrelated module change detected by changed-path scope scan.

Runtime regression status remains **NOT VERIFIED**.

---

# 12. DOCUMENTATION CONSISTENCY

Existing feature maps, forbidden docs aur theme contracts remain present under module-owned locations. Placeholder-doc scan: **0**.

V2 added:
- `TRAINER_STATIC_VERIFICATION_V2.json`
- `TRAINER_CHANGED_FILES.txt`
- Updated `TRAINER_FINAL_REPAIR_REPORT.md`
- Updated `TRAINER_REPAIR_STATUS.md`

---

# 13. FINAL ACCEPTANCE CRITERIA

- [x] Trainer scope only; no backend changes.
- [x] No explicit `any` pattern in production TS/TSX.
- [x] No native browser alert/confirm.
- [x] No relative imports.
- [x] No raw hex/rgb in TSX.
- [x] No arbitrary Tailwind values detected.
- [x] No semantic background opacity modifiers detected.
- [x] No cross-feature business imports detected.
- [x] No component exceeds configured file size ceilings.
- [x] Canonical root Trainer URL config is present.
- [x] Canonical API response helper is the only direct common envelope declaration.
- [x] Interactive controls have source-level `focus-visible` coverage.
- [x] Workout and schedule mutation tests reflect idempotency-key contracts.
- [x] ApexCharts consumers are theme-aware at source level.
- [x] No static no-op handler signatures detected.
- [ ] Parent-app `tsc --noEmit` — NOT VERIFIED.
- [ ] ESLint/Prettier/Tailwind tooling — NOT VERIFIED.
- [ ] Vitest execution — NOT VERIFIED.
- [ ] Playwright E2E — NOT VERIFIED.
- [ ] Next.js production build — NOT VERIFIED.
- [ ] MSW global registration — NOT VERIFIED.
- [ ] Browser responsive + keyboard + screen reader verification — NOT VERIFIED.
- [ ] Security/SCA/gitleaks — NOT VERIFIED.

---

# READY-TO-GIVE-TO-VSCODE-AI

## Target Module
`trainer/`

## Goal
Trainer role ka frontend module supplied development/design contracts ke according preserve aur complete karna hai. V2 source-level repair already applied hai; next AI ko parent application context me runtime verification complete karni hai, regressions fix karni hain aur source contracts ko weaken nahi karna hai.

## Priority 0 Work
- None remaining at source/archive level.
- Parent-app runtime/security verification is still mandatory before production certification.

## Priority 1 Work
1. Run parent-app typecheck/lint/tests/build.
2. Run Playwright critical Trainer flows.
3. Verify theme switching, keyboard navigation, responsive widths and MSW bootstrap.
4. Verify idempotency-key reuse across actual retry paths.

## Priority 2/3 Work
- Address only runtime findings discovered by the parent-app verification.
- Do not introduce unrelated refactors.

## File-by-File Actions
`TrainerProgressChart.tsx` → theme-aware ApexCharts already implemented → run browser light/dark verification.

`TrainerDashboardGoalTrendChart.tsx` → theme-aware ApexCharts already implemented → run browser light/dark verification.

`TrainerAttendanceToolbar.tsx` → warning semantic pairing repaired → run visual/accessibility verification.

`TrainerMyAttendanceCalendar.tsx` → warning/primary semantic pairing repaired → run mobile/tablet/desktop verification.

`TrainerWorkoutApiBehavior.test.ts` → idempotency header assertion added → execute Vitest.

`TrainerScheduleApiBehavior.test.ts` → idempotency header assertion added → execute Vitest.

`TrainerProgressComparisonDelta.tsx` → responsibility comment added → no further structural change required unless runtime issue appears.

`TrainerApiResponseSchema.ts` + consumer schemas → canonical response envelope path → execute tests and typecheck.

`trainer_url_config.ts` → canonical URL registry → execute build on case-sensitive environment.

## Architecture Rules to Preserve
- Feature module is the AI repair boundary.
- No sibling business feature imports.
- No global business abstraction for convenience.
- TanStack Query remains the server-state source of truth.
- Module UI state remains local/module-scoped.
- API response validation stays at the API boundary.
- Feature-specific mock data remains inside feature module.
- All mutation idempotency keys are generated once per user intent and reused on retries.
- Semantic theme classes only; no raw hex/RGB or semantic background opacity modifiers.

## Things the Agent Must Not Do
- Do not reopen the old `Trainer_url_config.ts` naming split.
- Do not restore direct response envelope schemas in individual modules.
- Do not remove focus-visible states.
- Do not replace ApexCharts with another chart library.
- Do not add Recharts or Chart.js.
- Do not move Trainer business logic into global `src/components/ui/`.
- Do not add fake business fallback data to components/hooks.
- Do not create a new idempotency key for the same retry intent.
- Do not modify sibling roles/features to make Trainer pass.

## Testing Requirements
At minimum, prove:
- Trainer route loading/error/not-found behavior.
- Search/filter/sort/pagination flows where documented.
- Empty/error/retry behavior.
- All critical create/update/delete/attendance/leave/session flows.
- Type-to-confirm and destructive safeguards where applicable.
- Theme switch behavior for charts and semantic UI.
- Keyboard tab-through and focus restoration for dialogs/drawers.
- Responsive behavior at approximately 375px, 768px and 1280px+.
- Runtime MSW flows in development/test mode.

## Documentation Updates
- Update each affected module `_features.md` only when runtime verification reveals a contract change.
- Keep `TRAINER_FINAL_REPAIR_REPORT.md`, `TRAINER_STATIC_VERIFICATION_V2.json` and `TRAINER_CHANGED_FILES.txt` synchronized after any new change.

## Final Acceptance Criteria
- No undocumented cross-module business imports remain.
- No production Trainer source contains explicit `any`, TS suppression, raw color literals or native dialogs.
- All critical mutation APIs carry the documented idempotency contract.
- All non-trivial forms use the documented RHF + Zod architecture.
- All important tables and controls are runtime-proven interactive.
- Loading/empty/error/retry states are runtime-proven.
- Module-owned mocks prove critical frontend flows.
- Typecheck passes.
- Lint passes.
- Tests pass.
- Production build passes.
- Security checks pass.
- Browser responsive/accessibility checks pass.
- Documentation matches implementation.
- No final score is reported as fully verified while any required runtime category remains NOT VERIFIED.

---

# Final Status

**TRAINER V2 SOURCE/ARCHIVE REPAIR COMPLETE.**

**RUNTIME / PARENT-APPLICATION VERIFICATION: NOT VERIFIED.**

Use `TRAINER_STATIC_VERIFICATION_V2.json` for machine-readable source evidence and `TRAINER_CHANGED_FILES.txt` for exact change scope.
