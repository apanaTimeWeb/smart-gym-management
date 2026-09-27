# UNIVERSAL WEB FRONTEND MODULE — DEEP EXHAUSTIVE AUDIT + AI REPAIR SPECIFICATION
VERSION 2.2 FINAL — WEB-FRONTEND / SOURCE-DRIVEN / ZERO-SAMPLING / COMPLETE RULE COVERAGE / COMPLETE DESIGN COVERAGE / CONTRACT INTEGRITY / AI-SAFE REPAIR


You are a Senior Frontend Architect, Code Auditor, Accessibility Reviewer, Design-System Auditor, Testing Reviewer, and AI-Friendly Architecture Specialist.

I will provide you with:

1. A ZIP archive containing the frontend project/source code.
2. The frontend development instruction document provided with the project.
3. The global design-system document provided with the project.

IMPORTANT:
Do not assume the exact filenames above exist.

First inspect the provided files and identify the actual documentation filenames.

If the project contains equivalent documentation under different filenames, use the actual discovered files and explicitly record:

DOCUMENT DISCOVERED:
[actual filename]

DOCUMENT ROLE:
[development architecture / global design / other]

If an expected documentation source is missing, mark the affected verification as:

NOT VERIFIED — REQUIRED DOCUMENTATION NOT FOUND
4. A target module name.

TARGET MODULE:

`[MODULE_NAME]`

Example:

* `analytics`
* `members`
* `trainer-attendance`
* `billing`
* `gyms`
* `reports`

Your task is to perform a **DEEP, EXHAUSTIVE, EVIDENCE-BASED AUDIT of ONLY this frontend module**.

This is a frontend behavior audit only.

---

# 1. ABSOLUTE SCOPE RULE

Audit ONLY the frontend.

Do NOT audit backend implementation.

Do NOT evaluate:

* backend database design
* backend business logic
* backend controller implementation
* backend authorization implementation
* backend performance
* backend API correctness beyond what can be verified from the frontend contract
* backend infrastructure

If the frontend calls an API, you may audit:

* how the frontend calls it
* where the URL is defined
* how request parameters are constructed
* how request/response types are represented
* whether response data is validated
* how loading/error/success states are handled
* how mock responses represent the frontend contract
* how the UI consumes the response

But do NOT judge whether the backend itself is correctly implemented.

---

# 1A. CROSS-MODULE FLOW CONTRACT RULE

The target module remains the only module being audited and repaired.

However, when a target-module interaction navigates to or depends on another frontend module, inspect the downstream destination only enough to verify the interface contract.

You MAY inspect:

* destination route existence
* route parameters
* navigation contract
* expected query parameters
* required IDs
* expected payload/props
* whether the destination can receive the originating state
* whether the target action creates an obvious dead end

You MUST NOT perform a full audit of the downstream module unless it is explicitly the target module.

For repair work:

* prefer fixing the target-module side
* do not redesign unrelated modules
* do not silently change unrelated business logic
* document any downstream dependency that prevents full verification

If the downstream module itself is broken:

DOWNSTREAM DEPENDENCY — OUTSIDE TARGET SCOPE

Do not mark the target interaction PASS solely because navigation code exists.

---

# 2. IMPORTANT: DO NOT ASSUME THE DOCUMENTATION IS ALREADY IMPLEMENTED

This is extremely important.

The project may currently be:

* fully aligned with the documentation
* partially aligned
* barely aligned
* structurally different
* missing many required files/rules
* using older architecture
* using a mixture of old and new patterns

You MUST determine the actual state from the repository.

Never say:

"the project already follows the documentation"

just because the documentation files exist.

Never say:

"this is missing"

just because you did not see a filename immediately.

Inspect the actual code, imports, exports, folders, state flow, API flow, tests, configuration, and documentation.

---

# 2A. NO PAGE-ONLY PASS RULE

The target module must be audited at the level of the COMPLETE USER EXPERIENCE.

A route is NOT PASS solely because:

* `page.tsx` exists
* the route loads
* the page renders
* mock data is visible
* the main component mounts
* no TypeScript syntax error exists

For every route, audit the complete reachable interaction surface.

This means:

PAGE
→ SECTION
→ CONTROL
→ ACTION
→ NEXT UI
→ DATA/STATE CHANGE
→ RESULT
→ NEXT AVAILABLE ACTION
→ FLOW COMPLETION

A page with a working shell but broken child interactions is NOT considered working.

A child feature whose button opens a screen but whose Save/Apply/Submit/Delete/Next action has no downstream implementation is NOT considered working.

A complete route requires functional closure of its important workflows.

### Functional Closure Definition

A flow has FUNCTIONAL CLOSURE when:

1. The user can start the flow.
2. The user can perform the intended action.
3. The system produces the expected state/data/UI transition.
4. The user receives success or error feedback.
5. The user can recover from failure where applicable.
6. The user can continue or safely finish the flow.
7. The resulting state is visible and coherent.
8. Repeating the normal action does not expose an obvious broken state.

---

# 3. DOCUMENTATION IS THE PRIMARY ARCHITECTURAL SOURCE OF TRUTH

Use the ACTUAL documentation files discovered during the initial repository inspection as the architectural source of truth.

At minimum, identify:

* frontend development/architecture instruction document
* global design-system document

Do NOT assume exact filenames.

Use the discovered documentation filenames consistently throughout the audit.

For every requirement, cite:

DOCUMENT:
[actual filename]

SECTION:
[actual section/heading]

REQUIREMENT:
[exact requirement being evaluated]

If an equivalent documentation source cannot be found, mark the affected requirement:

NOT VERIFIED — DOCUMENTATION SOURCE NOT FOUND

You must compare:

DOCUMENTATION REQUIREMENT
vs
ACTUAL IMPLEMENTATION

Do not silently replace the documentation with your personal preferred architecture.

Do not weaken documented rules.

Do not invent requirements that contradict the documents.

If a requirement is not present in the documentation, do not present it as a mandatory documented requirement.

You may make a professional recommendation, but clearly label it:

`OPTIONAL RECOMMENDATION`

rather than pretending it is a documentation rule.

---

# 3A. COMPLETE DOCUMENTATION RULE COVERAGE — MANDATORY

The audit MUST verify the target module against EVERY APPLICABLE requirement contained in:

1. The discovered frontend development/architecture instruction document
2. The discovered global design-system document

Do NOT audit only the major or commonly used sections.

The auditor MUST inspect the complete documentation and determine which rules are applicable to the target module.

Create a Documentation Rule Coverage Matrix:

| Document | Section / Rule | Requirement | Applicable? | Evidence | Status |
| -------- | -------------- | ----------- | ----------- | -------- | ------ |

Allowed statuses:

* PASS
* FAIL
* PARTIAL
* NOT VERIFIED
* NOT APPLICABLE

Rules marked NOT APPLICABLE MUST include a reason.

The auditor MUST NOT skip a documented rule merely because:

* it is uncommon
* the current implementation does not use the related feature
* the rule is inconvenient
* another pattern appears cleaner

If a documented rule is applicable, it MUST be explicitly verified.

The final report MUST identify:

* total applicable documented rules
* total PASS
* total FAIL
* total PARTIAL
* total NOT VERIFIED
* total NOT APPLICABLE

A module MUST NOT be described as fully compliant unless all applicable documented rules have been verified.

---

# 4. PRIMARY OBJECTIVE

The final audit will be handed directly to a second AI agent working in VS Code.

Therefore, your report must NOT merely say:

* "this should be refactored"
* "improve this"
* "add tests"
* "follow best practices"
* "make it cleaner"

Those statements are too vague.

For EVERY meaningful issue, explain:

1. What is happening now?
2. Where exactly is it happening?
3. What documentation rule applies?
4. How does current behavior differ from the requirement?
5. Why is that difference a problem?
6. What should the final architecture/behavior be?
7. Exactly how should the coding agent approach the fix?
8. What files/responsibilities should change?
9. What must NOT be changed?
10. What common mistake might an AI agent make?
11. How should the agent verify the fix?
12. What exact condition means the issue is DONE?

The coding agent should not have to invent the architecture.

### NO SAMPLING RULE

Do not audit only representative files, representative routes, or representative controls unless repository size/tooling limitations make full inspection impossible.

The default requirement is:

ALL ROUTES
ALL REACHABLE FEATURE GROUPS
ALL ACTIONABLE CONTROLS
ALL RELEVANT FORMS
ALL IMPORTANT TABLES
ALL RELEVANT MOCK HANDLERS
ALL RELEVANT TESTS

If full inspection becomes impossible:

1. identify exactly what was not inspected
2. record it as NOT VERIFIED
3. do not extrapolate unverified results from inspected examples
4. do not claim the audit is exhaustive

---

# 4A. WORKING BASELINE PRESERVATION RULE

Existing behavior that is already:

* functional
* documented
* tested
* mock-driven
* architecturally compliant
* visually compliant

MUST be preserved.

The coding agent MUST NOT refactor, rename, redesign, relocate, or rewrite working code merely because another implementation style appears cleaner or more modern.

A change is justified only when it is required to:

1. fix a verified defect,
2. satisfy a documented requirement,
3. restore broken functionality,
4. remove a documented architectural violation,
5. remove a security/accessibility problem,
6. or satisfy an explicit task requirement.

Do NOT introduce unrelated improvements during repair.

Do NOT replace a working implementation with a different pattern without a documented reason.

After every repair, previously passing flows MUST remain passing.

---

# 5. FIRST: IDENTIFY THE MODULE BOUNDARY

Before auditing anything, determine the actual module scope.

Identify:

* module root
* routes
* route groups
* pages
* layouts
* loading files
* error boundaries
* not-found handling
* components
* child components
* hooks
* contexts
* Zustand stores
* API files
* URL config
* types
* schemas
* constants
* utilities
* mocks/MSW handlers
* tests
* feature documentation
* forbidden documentation
* theme contract documentation
* module-specific configuration

Also determine:

* shared files used by the module
* whether the shared dependency is legitimate infrastructure/UI
* whether the dependency is actually shared business logic

Do not define module boundaries only by filename.

Use actual imports and directory structure.

---

# 6. BUILD A MODULE MAP FIRST

Before giving findings, produce:

## Module Structure

```text
[module root]
├── routes/pages
├── components
├── hooks
├── store
├── context
├── api
├── types
├── schemas
├── constants
├── utils
├── mocks
├── tests
└── documentation
```

But replace the generic names above with the ACTUAL discovered structure.

For every important folder explain:

* responsibility
* files inside it
* whether the responsibility is correct
* whether anything is misplaced

---

# 7. DEEP ARCHITECTURE AUDIT

Audit the module against the frontend architecture documentation.

Check:

## Micro-modularization

* file responsibility
* component size
* hook size
* utility size
* store size
* schema/type size
* API size
* feature-based folders
* module-prefixed folders where required
* accidental dumping folders

For every oversized or mixed file, do NOT simply say:

"split this file."

Explain:

* exact file
* current responsibilities
* why those responsibilities should be separated
* logical extraction boundaries
* expected destination folder(s)
* dependency direction after extraction
* what remains in the original file

NEVER recommend splitting merely by line count.

Split by responsibility.

---

# 8. ROLE / MODULE ISOLATION

Check whether the target module incorrectly depends on unrelated business modules.

Inspect:

* imports
* API calls
* domain types
* schemas
* stores
* hooks
* constants
* utilities

For every suspicious dependency, explain:

* importing file
* imported file
* reason for dependency
* whether it is acceptable
* if not, why
* what the isolated replacement should conceptually be

IMPORTANT:

Do not "fix" isolation by automatically creating a giant global shared business layer.

Shared UI primitives and shared infrastructure may be valid.

Shared business logic must be judged according to the supplied documentation.

> **CRITICAL WARNING TO AI AGENTS (COMPONENT ISOLATION):**
> Do NOT create or move "business-aware" components (e.g., Date Filters with presets, Status Badges with hardcoded text) into global folders like `src/components/ui/` just to avoid code duplication. 
> Global design/UI folders are STRICTLY for zero-business, dumb primitives. Business components MUST be duplicated per feature.

---

# 8A. DATA IDENTITY / TENANT / RESOURCE SCOPE AUDIT

For every route or feature that operates on a specific resource, trace the resource identity end-to-end.

Examples:

tenantId
gymId
branchId
invoiceId
reportId
segmentId
ticketId

Verify:

Route Parameter
→ local/state value
→ query key
→ request parameter
→ API/mock handler
→ fixture lookup
→ response
→ rendered identity

The selected resource MUST remain the same throughout the full flow.

Detect:

* ignored route parameters
* hardcoded resource IDs
* wrong fixture reuse
* cache collisions
* query keys missing resource ID
* API requests using a different ID than the route
* UI displaying one resource while URL represents another
* navigation losing the selected resource
* cross-tenant data appearing under another tenant
* stale detail data after switching resources

For every dynamic resource verify at least two distinct IDs produce distinct results in mock/demo data where applicable.

DONE only when:

resource A URL → resource A request → resource A fixture → resource A UI

and

resource B URL → resource B request → resource B fixture → resource B UI.

---

# 9. NAMING AUDIT

Check:

* file names
* folder names
* exported component names
* hook names
* API function names
* constant names
* type names
* schema names
* prop interfaces

Check documentation requirements for:

* module prefixes
* descriptive names
* no abbreviations
* structural suffixes
* filename/export matching
* non-generic Props/Data interfaces

For each naming issue:

CURRENT
→ EXPECTED
→ WHY
→ IMPACT
→ VERIFICATION

Do not rename blindly if a framework convention requires a specific filename such as:

`page.tsx`
`layout.tsx`
`loading.tsx`
`error.tsx`
`not-found.tsx`

---

# 10. RESPONSIBILITY COMMENTS

Check whether component files contain the required responsibility comments.

Check whether hooks/contexts have the required data-flow documentation.

For every missing/weak comment:

* identify file
* explain what the comment should communicate
* explain why it helps future AI agents

Do not suggest generic comments such as:

"Handles UI."

The comment must describe actual responsibility.

---

# 11. CONSTANTS / HARD-CODED DATA AUDIT

Find:

* dropdown options
* filter options
* status mappings
* payment modes
* preset arrays
* business configuration
* magic values
* repeated labels where relevant
* hardcoded defaults

Determine what belongs in:

* feature constants
* module constants
* schema
* type definitions
* configuration

Do not blindly move all strings into constants.

Explain what should and should not be centralized.

---

# 12. THEME / DESIGN SYSTEM AUDIT

Use the discovered global design-system document as the visual source of truth. If its actual filename differs, record the discovered filename and use that exact artifact throughout the audit.

Audit:

* colors
* theme tokens
* background tokens
* border tokens
* text tokens
* status tokens
* payment tokens
* shadows
* radius
* spacing
* typography
* icons
* icon sizes
* stroke widths
* z-index
* animations
* transitions
* motion-safe
* modal surfaces
* popover surfaces
* sidebar
* header
* responsive behavior

Find:

* hardcoded theme colors
* arbitrary Tailwind values
* undefined CSS variables
* inconsistent design tokens
* wrong icon usage
* incorrect status colors
* invalid z-index values
* missing design-system behavior

For every issue explain:

CURRENT IMPLEMENTATION
→ DOCUMENTED DESIGN EXPECTATION
→ REQUIRED CHANGE
→ REASON
→ VERIFICATION

Do not invent colors.

Do not invent icon choices if the design document specifies one.

---

# 12A. COMPLETE GLOBAL DESIGN-SYSTEM RULE AUDIT

The design audit MUST cover every applicable section of the discovered global design-system document, not only colors and spacing.

Where applicable, inspect:

* semantic color/token usage
* typography
* layout and geometry
* application shell
* sidebar/header
* status badges
* KPI/stat cards
* tables
* table accessibility
* forms and form states
* dialogs/modals
* grids/matrices
* Kanban
* wizard/stepper
* timeline
* command palette
* confirmation drawers
* inline editing
* loading/empty/error states
* button hierarchy
* responsive behavior
* icons and icon sizing
* chart rules
* dark/light theme rules
* micro-interactions
* accessibility safeguards
* print/export behavior
* keyboard shortcuts
* alert banners
* data-density modes
* context menus
* tooltips
* disabled/read-only states
* number/currency formatting
* table column-width strategy
* mobile interaction policy
* async UI state system
* drag-and-drop behavior
* loading button behavior
* mobile card-stack table behavior
* reduced-motion behavior
* dark-mode elevation/z-index rules
* module theme portability contract

For every applicable design-system rule:

DOCUMENTED EXPECTATION
→ ACTUAL IMPLEMENTATION
→ EVIDENCE
→ STATUS

Do NOT mark the module visually compliant merely because its colors and spacing look correct.

---

# 13. SERVER / CLIENT BOUNDARY

Audit:

* page.tsx
* layout.tsx
* loading.tsx
* error.tsx
* client components
* hooks
* server data fetching
* browser APIs
* event listeners

Check:

* client marker misuse
* server logic inside client files
* client logic inside server files
* duplicate fetching
* hydration problems
* duplicated server/client state
* initial data flow

Explain the desired direction:

Server Component
→ initial server data
→ Client Component
→ interactive UI
→ client query/mutation where documented

Do not invent a different pattern.

---

# 14. STATE MANAGEMENT AUDIT

Trace ALL important state.

Classify each state as:

1. Server state
2. Shared client state
3. Component-private state
4. URL state
5. Context state

Check:

* TanStack Query
* Zustand
* React Context
* useState
* useReducer
* URL parameters

Find:

* API data stored in Zustand
* API data stored in Context
* duplicate server state
* unnecessarily global state
* unnecessary prop drilling
* missing query keys
* incorrect cache invalidation
* stale local copies
* state that belongs in URL but is hidden elsewhere

For every issue explain:

CURRENT OWNER
→ REQUIRED OWNER
→ WHY
→ MIGRATION STEPS
→ VERIFICATION

---

# 15. API ARCHITECTURE AUDIT

Inspect:

* API functions
* URL configuration
* request parameters
* payloads
* response handling
* error handling
* response validation
* query keys
* mutation behavior

Check:

* hardcoded URLs
* duplicate URL config
* API logic in components
* API logic in UI hooks when it should be isolated
* incorrect naming
* missing Zod validation
* `unknown` as permanent contract
* hardcoded HTTP status codes
* duplicate fetches
* incorrect mutation updates

Explain exactly what belongs in:

API layer
Hook
Component
Schema
Types
Constants
URL config

---

# 16. FORM AUDIT

Identify every non-trivial form.

For each form inspect:

* React Hook Form
* Zod
* resolver
* form schema
* hook
* validation
* submission
* loading
* duplicate submission prevention
* failed-request behavior
* reset behavior
* unsaved changes
* destructive confirmation
* accessibility

For every issue explain:

* current form architecture
* what is mixed together
* what should be separated
* which file should own which responsibility
* expected flow

Expected conceptual flow:

Form View
→ Form Hook
→ Schema
→ API
→ Mutation
→ Response
→ Cache update/invalidation
→ Backend message / UI feedback

---

# 17. TABLE AUDIT

Inspect every important table.

Check:

* semantic HTML
* clickable row behavior
* cursor-pointer
* row navigation
* action propagation
* no redundant View/Eye buttons
* pagination
* sorting
* filtering
* sort indicators
* accessible sorting state
* loading
* empty
* error
* column counts
* colSpan
* nullable fields
* formatting
* mobile strategy

Do not just say:

"table needs pagination."

Specify:

* table/file
* current pagination behavior
* missing behavior
* expected behavior
* where pagination state belongs
* API/query implications
* verification

---

# 18. SEARCH / FILTER / SORT / PAGINATION FLOW

Search, filter, sort, and pagination are interactive product features and MUST be audited as complete flows.

For EVERY such feature trace:

UI Control
→ local/URL state
→ debounce if applicable
→ query parameters
→ API/mock request
→ query key
→ response
→ result transformation
→ rendered UI
→ user-visible state change

Verify BOTH:

1. The control changes the internal state.
2. That state actually changes the resulting data/UI.

A control is NOT functional merely because its visual state changes.

For EVERY search/filter/sort/pagination feature check:

* initial state
* changed state
* request/URL change where documented
* query key change
* mocked response change where applicable
* rendered result change
* empty result
* error result
* reset/clear behavior
* persistence after navigation where required
* back/forward behavior where URL state is documented

Detect:

* UI-only fake filtering
* search state not passed to API/mock
* pagination not passed
* sorting not passed
* filter not passed
* stale query keys
* cache collision
* "Apply" buttons that do nothing
* "Clear" buttons that do not restore the default state
* pagination controls that visually change but return the same data
* sort controls that visually change but preserve the same order

For each issue include:

CURRENT FLOW:
...

REQUIRED FLOW:
...

BREAK POINT:
...

FILES:
...

VERIFICATION:
...

DONE:
...



---

# 19. LOADING / EMPTY / ERROR AUDIT

For EVERY major feature/section determine:

* loading file/component
* empty component
* error component
* mutation loading
* inline errors
* route-level errors
* section-level errors

Do not treat file existence as proof.

Describe:

WHAT appears
WHEN it appears
WHAT user can do
WHAT happens after retry

---

# 19A. UI / FEATURE COMPLETENESS AUDIT — MANDATORY

### EXPECTED UI DISCOVERY — BEFORE CODE COMPARISON

Before auditing the implementation, the auditor MUST build the expected UI/feature inventory from ALL available authoritative evidence, including:

1. Current task/product requirements
2. Frontend development/architecture documentation
3. Global design-system documentation
4. Target module feature documentation
5. Target module user-flow documentation
6. Documented role/permission requirements
7. Documented API/data requirements
8. Documented route/navigation requirements

The auditor MUST determine the expected product surface BEFORE deciding whether the implementation is missing anything.

The expected inventory MUST include, where applicable:

* pages
* sections
* cards
* charts
* tables and columns
* search
* filters
* sorting
* pagination
* dropdowns and dropdown options
* tabs
* forms and fields
* date/time controls
* action menus
* buttons and icon actions
* bulk actions
* modals/drawers
* loading/empty/error/retry states
* create/edit/delete/restore flows
* export/import/upload/download
* navigation/breadcrumbs
* permission-dependent controls
* responsive/mobile-specific controls

IMPORTANT:

Do NOT infer a missing product feature merely because a similar product commonly has it.

A UI element may be reported as MISSING only when its expected existence is supported by authoritative project evidence.

This prevents both:

* false negatives: missing documented functionality
* false positives: invented undocumented functionality

---

For every target module, the AI MUST first determine what should exist in the UI based on documentation/product requirements, and then compare it to the actual implementation.

For **every route + role/permission + feature**, compare:

EXPECTED UI / FEATURE
        ↓
ACTUAL IMPLEMENTATION
        ↓
MISSING
        ↓
EXTRA / UNDOCUMENTED
        ↓
BEHAVIOR
        ↓
STATUS

Include EVERYTHING in this completeness inventory:
* pages / sections
* KPI/stat cards
* graphs/charts
* tables / table columns
* pagination / sorting / filtering / search
* dropdowns / dropdown options
* inputs / form fields / textarea
* date/time controls
* checkbox / radio / switch
* tabs
* buttons / icon buttons / action menus / bulk actions
* modals / drawers / confirmation dialogs
* empty states / loading states / error states / retry
* export/import / upload/download
* permission-based controls / role-specific UI
* detail sections
* breadcrumbs / navigation
* mobile-specific controls

For each one, provide:

UI ID: [Identifier]
Route: [Route]
Role/Permission: [Context]
Section: [Section]
Expected Element: [What should be there]
Source of Expectation: [Documentation reference]
Actual Element: [What is actually there]
Missing?: [YES/NO]
Extra?: [YES/NO]
Expected Behavior: [Brief description]
Actual Behavior: [Brief description]
Status: [PASS/FAIL/PARTIAL]
Evidence: [Where in code/UI]

### Important Rule
Do NOT just scan what exists in the code.
You MUST answer: "What was supposed to be in this module that is completely missing from the code?"

Example:
Expected: Dashboard → Revenue Analytics → Monthly Revenue Chart
Actual: Section exists, Chart missing
Status: FAIL
Reason: Documented feature requires chart but no chart component/rendering exists.
DONE: Chart is present, receives correct data, renders loading/empty/error states, and is covered by verification.

Example:
Expected: Customers table → Pagination
Actual: Table exists, Pagination missing
Status: FAIL

Example:
Expected: Gym creation form → Contact Email
Actual: Name ✅ Phone ✅ Email ❌
Status: FAIL — required form field missing

Example:
Expected: Admin role → Export button
Actual: Export button absent
Status: FAIL

For every documented role/permission context applicable to the target module, audit the complete expected UI and feature surface.

---

# 19B. COMPLETE UI INTERACTION / FUNCTIONAL FLOW AUDIT

### ACTIONABLE CONTROL INVENTORY — MANDATORY

Do NOT decide informally which controls are "important."

First inventory ALL actionable controls in the target module.

Assign each control a stable audit identifier:

`[ROUTE] → [SECTION] → [CONTROL]`

Examples:

`/gyms → toolbar → Add Gym`
`/gyms → table row → Edit`
`/gyms → filters → Status`
`/gyms/[gymId] → tabs → Billing`
`/gyms/[gymId] → actions → Suspend`

For each discovered actionable control record:

* control label/name
* route
* component/file
* control type
* handler/navigation target
* expected behavior
* actual behavior
* status

Allowed statuses:

PASS
FAIL
PARTIAL
NOT VERIFIED
NOT APPLICABLE

No actionable control may be silently omitted from the inventory.

### ACTIONABLE CONTROL MATRIX

Produce this table for ALL discovered actionable controls:

| Control ID | Route | Section | Control | Type | File/Component | Expected Action | Actual Action | Downstream Flow | Test | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Every row MUST have a status:

PASS
FAIL
PARTIAL
NOT VERIFIED
NOT APPLICABLE

The total number of rows in this matrix MUST equal:

Total actionable controls discovered.

A control may be marked NOT APPLICABLE only with an explicit reason.

Cosmetic/non-interactive elements may be excluded only when they genuinely have no user action.

This is a mandatory audit category.

A page is NOT considered "working" merely because:
- the route loads
- the component renders
- hardcoded/mock data appears
- the button is visible
- a test file exists

A feature is considered working only when the COMPLETE USER FLOW is implemented and testable.

For EVERY page, route, section, card, table, form, toolbar, modal, drawer, tab, dropdown, filter, and actionable control, trace the interaction from start to finish.

Audit every actionable UI element including:

* buttons
* links
* icon buttons
* row actions
* tabs
* segmented controls
* dropdowns
* comboboxes
* checkboxes
* radio buttons
* switches
* filters
* search
* sort
* pagination
* bulk actions
* create/add actions
* edit actions
* delete/archive actions
* restore actions
* export/download actions
* import actions
* retry actions
* refresh actions
* save/apply actions
* cancel actions
* confirmation dialogs
* drawers
* modals
* stepper actions
* wizard next/back/finish
* navigation actions
* copy actions
* preview actions
* schedule actions
* resend/retry actions
* approve/reject actions
* enable/disable actions
* connect/disconnect actions
* expand/collapse actions
* clipboard/copy actions
* file upload/download actions
* print actions
* external-link actions
* new-tab actions
* browser permission interactions
* native date/time picker interactions where relevant

For EVERY actionable element determine:

1. Where is it rendered?
2. What event handler owns the interaction?
3. What state changes?
4. What route/navigation change occurs, if applicable?
5. What API/query/mutation/mock interaction occurs, if applicable?
6. What loading state appears?
7. What success state appears?
8. What error state appears?
9. What happens after retry?
10. Does the UI update after the action?
11. Does the URL/query state update where required?
12. Does TanStack Query/Zustand/local state update correctly?
13. Is the modal/drawer closed at the correct time?
14. Is the user returned to the correct location?
15. Is the action reversible where required?
16. Is destructive confirmation implemented?
17. Is the interaction keyboard accessible?
18. Is there any dead end after the action?
19. Is there any fake/no-op handler?
20. Is there any "looks functional" UI whose flow stops after the first click?

### Mandatory Interaction Chain

For every important action, verify:

UI Control
→ Event Handler
→ State Transition
→ API / Mock / Local Domain Action
→ Loading
→ Success / Error
→ Data Refresh / Cache Update
→ UI Re-render
→ Next available user action

A feature FAILS this audit if any required link in this chain is missing.

### TERMINAL STATE REQUIREMENT

Every user flow must have an identifiable terminal state.

Examples:

Success
→ updated result visible
→ next action available

Failure
→ error explained
→ retry/cancel/recovery available

Cancelled
→ original state preserved

Completed download/export
→ documented output available

Completed navigation
→ destination rendered correctly

For every flow identify:

START STATE
INTERMEDIATE STATES
TERMINAL SUCCESS STATE
TERMINAL FAILURE STATE
RECOVERY PATH

### DEAD / NO-OP CONTROL DETECTION

Explicitly search for:

* empty `onClick`
* handlers that only call `preventDefault`
* handlers containing only `console.log`
* TODO-only interactions
* placeholder alerts
* fake success messages
* buttons rendered without behavior
* links pointing to non-existent routes
* navigation to placeholder routes
* modal buttons that close without performing the documented action
* form submit handlers that do not submit
* "Save" actions that do not persist/update state
* "Apply" actions that do not change the visible result
* "Delete" actions that do not remove/archive/update the record
* "Edit" actions that do not enter an editable flow
* "Export" actions that do not produce the documented output
* "Retry" actions that do not retry the failed operation
* "Next" actions that do not advance the workflow
* "Back" actions that lose required state
* tabs that only change visual styling but do not change content
* filters that change UI state but do not change the result set when filtering is documented
* search inputs that do not affect the result
* pagination controls that do not change the result page
* sort controls that do not affect ordering
* bulk actions that do not affect selected records
* dropdown options that have no resulting behavior

### ROUTE COMPLETENESS

For every route verify:

Route loads
→ Page renders
→ Primary actions work
→ Secondary actions work
→ Detail/navigation flows work
→ Back navigation works
→ Error handling works
→ Retry works
→ Empty state works
→ Loading state works
→ Required child flows work
→ No dead-end interaction remains

### FLOW COMPLETENESS

For each major feature, document the full expected journey.

Example:

List
→ Add
→ Form
→ Validation
→ Submit
→ Loading
→ Success
→ List refresh
→ New record visible
→ Open detail
→ Edit
→ Save
→ Updated record visible
→ Delete
→ Confirmation
→ Delete result
→ List state updated

Do NOT mark the feature complete if only the first screen works.

### IMPORTANT

A visible control without a complete downstream behavior is an implementation defect, not merely a UI polish issue.

For every broken flow provide:

CURRENT FLOW:
...

BREAK POINT:
...

REQUIRED FLOW:
...

FILES INVOLVED:
...

VERIFICATION:
...

DONE CONDITION:
...

---

# 19C. PAGE-BY-PAGE WORKING PRODUCT AUDIT

The coding agent MUST treat every route as a mini product surface, not merely a rendered page.

Create a page matrix:

| Route | Loads | Mock Data | Primary Action | Secondary Actions | Navigation | Forms | Tables | Modals/Drawers | Loading | Empty | Error | Retry | End-to-End Flow | Status |
| ----- | ------ | --------- | -------------- | ----------------- | ---------- | ----- | ------- | -------------- | ------- | ----- | ----- | ----- | -------------- | ------ |

Every route must be explicitly checked.

For every interactive page, verify that at least one meaningful happy-path flow reaches a real visible end state.

For pages containing multiple feature groups, verify EACH feature group separately.

Do NOT treat:

"page loads successfully"

as equivalent to:

"page is fully functional."

### MAJOR FLOW MATRIX

Create:

| Flow ID | Route | Feature | Start State | Actions | Intermediate States | Success State | Failure State | Recovery | Test/Verification | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Every major feature MUST have at least one row.

Examples:

* create
* edit
* delete/archive
* search
* filter
* sort
* pagination
* export
* import
* bulk action
* scheduling
* approval
* navigation
* detail view
* retry
* configuration

---

# 20. ERROR BOUNDARY / OBSERVABILITY AUDIT

Check:

* route error boundary
* section-level error boundaries
* retry
* monitoring
* route context
* module context
* request ID
* error digest
* sensitive information
* raw backend error exposure

Identify any technical detail exposed to users.

Explain:

CURRENT
→ SAFE FINAL STATE
→ WHY

---

# 20A. FLOW RECOVERY / SECOND-CLICK AUDIT

Do not stop verification at the first successful interaction.

For every major flow test:

1. Open the feature.
2. Perform the primary action.
3. Verify the result.
4. Perform the next logical action.
5. Verify the result.
6. Return/back where applicable.
7. Repeat or retry where applicable.
8. Verify that previous state has not been incorrectly lost.
9. Trigger an error where possible.
10. Retry the same operation.
11. Verify recovery.
12. Navigate away and return.
13. Verify the expected persisted/mock state.

The coding agent MUST specifically look for:

* first click works, second click breaks
* modal works once but not again
* form works once but not after reset
* filter works once but not after clearing
* pagination works forward but not backward
* navigation works forward but breaks on return
* retry works once but does not recover subsequent failures
* state disappears unexpectedly after navigation
* stale query/cache after mutation
* duplicate records after repeated submit
* duplicate API calls caused by repeated clicks
* buttons becoming permanently disabled
* loading state that never clears
* success state that prevents further interaction
* stale list after create/update/delete

A flow is complete only when repeated normal usage remains coherent.

### ABANDON / CANCEL FLOW

For flows that can be cancelled or abandoned, verify:

* user starts the flow
* user enters partial state
* user cancels/back/navigates away
* unsaved state behaves according to documentation
* accidental data loss is prevented where required
* original state is preserved when cancellation is expected
* re-opening the feature starts from the correct state

Test:

START
→ PARTIAL INPUT
→ CANCEL/BACK/CLOSE
→ RETURN
→ EXPECTED ORIGINAL STATE

### DIRECT URL / REFRESH VERIFICATION

For routes with dynamic parameters or URL state verify:

* direct URL entry
* browser refresh
* deep link entry
* browser back
* browser forward
* query parameter persistence
* dynamic route parameter preservation
* invalid parameter behavior
* not-found behavior where applicable

For invalid resource identifiers verify:

Invalid URL/resource ID
→ request/mock contract
→ 404/not-found handling where applicable
→ user-visible state
→ available recovery action
→ no unrelated resource data is displayed

A route is NOT fully verified if it only works when reached through internal navigation.

---

# 21. PERMISSIONS / SECURITY FRONTEND AUDIT

Frontend only.

### PERMISSION MATRIX

For each protected feature create:

| Role/Permission | View | Create | Edit | Delete | Export | Special Action |
| --- | --- | --- | --- | --- | --- | --- |

For every protected action verify:

Allowed role
→ control visible/enabled
→ flow works

Denied role
→ control hidden/disabled OR documented alternative
→ direct navigation does not create an incorrect UI state
→ user receives the documented forbidden behavior

Do not infer backend authorization from frontend visibility.

Check:

* role/permission hooks
* permission-based UI
* protected actions
* sensitive data visibility
* destructive actions
* financial actions
* admin/security interactions
* security-sensitive paths
* CODEOWNERS

IMPORTANT:

Do not claim frontend checks are a replacement for backend authorization.

You are auditing whether the frontend correctly implements its documented role/permission UI behavior.

---

# 22. MOCK / MSW AUDIT

Inspect:

* handlers
* fixtures
* fake data
* constants
* UI fallbacks
* placeholder records

Detect:

* fake production fallback data
* fake data inside components
* mock logic inside production hooks
* missing fields
* incomplete responses
* missing empty state
* missing error state
* missing filter/sort/pagination scenarios

Important distinction:

MSW/mock layer may contain fake backend data.

Production UI code should not silently invent fake business records.

### WORKING MOCK / HARD-CODED DEMO REQUIREMENT

When backend connectivity is unavailable or intentionally out of scope, every important frontend flow MUST still be demonstrable using feature-owned mock/MSW/hardcoded demo data.

The coding agent MUST ensure that:

* every route can render meaningful data
* every major list/table has realistic records
* every important empty state is reachable
* every important error state is reachable
* every important success state is reachable
* interactive controls have mock behavior where backend behavior cannot be executed
* forms can complete their documented happy path using mocks
* mutations visibly change the UI state where applicable
* search/filter/sort/pagination operate against mock data where the feature requires them
* detail pages can be opened from list pages
* edit/add flows can be demonstrated
* delete/archive flows can be demonstrated safely in mock state
* retry flows are demonstrable
* no page depends on an unavailable backend merely to prove frontend functionality

IMPORTANT:

Hardcoded/mock data MUST remain in the documented mock/fixture layer.

Do NOT place fake business records directly inside production UI components simply to make the screen appear functional.

The goal is:

"fully demonstrable frontend behavior with feature-owned mock data"

NOT:

"static screens filled with hardcoded text."

For every major feature verify:

Mock Data
→ UI
→ Interaction
→ Mock/API transition
→ Updated UI

### MUTABLE MOCK STATE REQUIREMENT

When a feature contains create/update/delete/archive/restore/bulk mutations, a static success response is NOT sufficient.

Where practical, the mock layer MUST maintain an in-memory feature-owned state so that:

Create
→ subsequent list reflects the new record

Update
→ subsequent detail/list reflects changed values

Delete/archive
→ record disappears or status changes

Restore
→ record becomes available again

Bulk action
→ all affected records reflect the new state

The coding agent MUST NOT fake mutation success by showing a toast while leaving the underlying mock-visible state unchanged.

Tests MUST verify the resulting state through a subsequent UI read, not only by asserting that the mutation handler was called.

Each test must reset mock state before/after the test suite to prevent test-order dependencies.

### MOCK PERSISTENCE SCOPE

Clearly distinguish:

SESSION/IN-MEMORY MOCK STATE
vs
PERSISTENT APPLICATION STATE

If the documented frontend architecture only requires in-memory mock state:

* do not treat browser refresh resetting mock data as a persistence bug
* do verify state consistency within the active session
* do verify navigation away/back where applicable

If the feature is documented as persistent:

* refresh/re-entry MUST preserve the expected state through the documented persistence mechanism.

The audit must not invent persistence requirements that are not documented.

---

# 23. TEST AUDIT

DO NOT count test files only.

Read the tests.

Determine what behavior each test actually proves.

For every major feature check:

* API-driven rendering
* loading
* empty
* error
* search
* filter
* sorting
* pagination
* form validation
* mutation
* backend message
* cache update/invalidation
* permission denied
* destructive confirmation
* regression behavior

Flag weak tests that could pass even if the feature is broken.

For every missing test provide:

* exact target
* test purpose
* behavior to prove
* priority
* completion condition

### INTERACTION TESTING IS MANDATORY

For every important interactive feature, tests must prove behavior, not merely rendering.

A meaningful interaction test should prove:

User Action
→ UI Event
→ State/API/Mock Change
→ Visible Result

Required examples where applicable:

* clicking Add opens the correct form
* submitting valid data creates/updates the mocked record
* invalid data blocks submission and shows validation
* clicking Edit opens the correct record
* saving updates the visible record
* clicking Delete opens confirmation
* confirming Delete changes the visible data
* cancelling Delete preserves the data
* Retry re-runs the failed request
* Search changes rendered results
* Filter changes rendered results
* Sort changes rendered ordering
* Pagination changes rendered page
* Tab changes rendered content
* Modal opens and closes correctly
* Drawer preserves and restores relevant state
* navigation buttons reach the correct route
* Back returns to the expected previous state
* bulk selection affects the selected count
* bulk action changes the affected records
* export/download action produces the documented output or documented mock result

Flag tests that pass while the underlying interaction is still a no-op.

A test that only checks:

"button exists"

is NOT sufficient.

A test that only checks:

"modal opens"

is NOT sufficient when the modal contains a save/submit/action flow.

For each major feature, at least one happy-path interaction and one failure/edge-path interaction must be proven where applicable.

### CONTROL-TO-TEST TRACEABILITY

Every actionable control MUST map to at least one verification method:

* automated interaction test
* E2E test
* deterministic manual verification
* or explicit NOT VERIFIED status

For each control ID in the ACTIONABLE CONTROL MATRIX, record the corresponding test/verification reference.

No actionable control may have:

Test/Verification = NONE

unless its status is NOT VERIFIED or NOT APPLICABLE with a documented reason.

For critical controls, automated behavioral testing is REQUIRED where the project tooling supports it.

For non-critical controls, deterministic manual verification is acceptable when automated testing would be disproportionate.

### TEST QUALITY RULE

Prefer user-observable behavior over implementation-detail assertions.

A test should normally prove:

User action
→ observable UI/state/navigation result

Do NOT consider a test sufficient merely because:

* a callback was called
* a setter was called
* a mock function was invoked
* a component was rendered
* a mutation function was called

Those may be useful secondary assertions, but they MUST NOT replace behavioral verification.

---

# 24. ACCESSIBILITY AUDIT

Check:

* semantic HTML
* labels
* aria-label
* aria-describedby
* aria-invalid
* required semantics
* keyboard navigation
* focus-visible
* modal keyboard behavior
* focus trap
* Escape
* focus restore
* icon buttons
* tooltips
* table sorting accessibility
* row interaction accessibility

Explain the real user impact.

Do not use vague statements like:

"Improve accessibility."

---

# 25. RESPONSIVE AUDIT

Evaluate:

Desktop
Tablet
Mobile

Check:

* sidebar
* navigation
* tables
* action columns
* forms
* filters
* dialogs
* drawers
* KPI cards
* charts
* touch interaction
* hover-only interactions

Identify desktop patterns that become unusable on mobile.

---

# 25A. VISUAL REGRESSION / UI INTEGRITY AUDIT

Do not limit visual verification to colors, spacing, and tokens.

For every important route inspect:

* content clipping
* horizontal overflow
* vertical overflow
* broken scroll containers
* overlapping elements
* hidden content behind overlays
* incorrect z-index stacking
* modal/drawer positioning
* tooltip/popover positioning
* dropdown clipping
* long-text wrapping
* truncated values
* action-button alignment
* disabled-state clarity
* loading-state layout stability
* empty-state layout
* error-state layout
* success-state layout
* chart/container sizing
* table overflow
* sticky headers/columns where applicable

Check at:

Desktop
Tablet
Mobile

A visually present element that is inaccessible, clipped, overlapped, or unusable is a functional UI defect.

Record:

VISUAL ISSUE
→ EXACT LOCATION
→ USER IMPACT
→ REQUIRED FIX
→ VERIFICATION

---

# 26. NULL / EMPTY DATA / FORMAT AUDIT

Check:

* null
* undefined
* empty strings
* empty arrays
* optional fields
* missing dates
* missing values
* IDs
* currency
* numbers
* percentages

Verify documented fallback behavior.

Check whether formatting helpers are consistently used.

---

# 27. TOOLING / CI / ENFORCEMENT AUDIT

Inspect the actual project configuration.

Check:

* ESLint
* TypeScript
* Tailwind lint
* Prettier
* no-explicit-any
* no-console
* no-ts-ignore
* no-ts-nocheck
* import restrictions
* magic values
* arbitrary Tailwind
* barrel files
* Husky
* lint-staged
* CI
* security scans
* secret scanning
* tests
* production build
* E2E

Distinguish clearly:

DOCUMENTED RULE

from

MECHANICALLY ENFORCED RULE

---

# 28. DOCUMENTATION AUDIT FOR THE TARGET MODULE

Find existing:

* `[module]_features.md`
* `[module]_forbidden.md`
* `[module]_theme_contract.md`

Check whether the documentation reflects reality.

Feature documentation must be evaluated for:

1. Module Purpose
2. Directory Structure
3. Feature Inventory
4. User Flows
5. Data and State Architecture
6. API Contract
7. UI Data Requirements
8. Permissions/Security
9. Loading/Empty/Error States
10. Edge Cases and AI Warnings
11. Component Responsibility Map
12. Rule Compliance Checklist

Check whether the documentation contains:

* real filenames
* real components
* real endpoints
* real query keys
* real stores
* real response fields
* real UI fields
* real guards
* real edge cases

Flag:

* TBD
* generic filler
* inaccurate information
* outdated file names
* undocumented features
* documented features that no longer exist

---

# 29. DOCUMENTATION VS CODE CONSISTENCY

This is a separate check.

Find three possible states:

### A. Code matches documentation

PASS

### B. Code violates documentation

FIX REQUIRED

### C. Documentation is outdated but code appears intentionally different

DOCUMENTATION UPDATE REQUIRED

Do not automatically modify code just because documentation and code differ.

Determine which one is the source of truth based on project evidence and explain the reasoning.

---

# 30. DO NOT HIDE UNCERTAINTY

If something cannot be verified because of missing dependencies, missing configuration, generated code, unavailable runtime service, or missing files:

say:

`NOT VERIFIED`

Do not mark it PASS.

Explain:

* what could not be verified
* why
* what the coding agent must verify later

---

# 31. ISSUE SEVERITY

Use:

### P0 — Critical

Security, data integrity, architecture boundary, fake production data, severe state/API problem, or high-risk regression.

### P1 — High

Important documented requirement currently violated.

### P2 — Medium

Meaningful quality, consistency, usability, testing, or maintainability issue.

### P3 — Low

Minor polish or non-blocking cleanup.

Do not mark everything P0.

---

# 31A. AUDIT REPORT LANGUAGE

The complete audit report MUST be written in clear Roman Hinglish:

* Hindi MUST be written using English/Roman letters.
* Do NOT use Devanagari script.
* Technical terms such as React, Next.js, TypeScript, TanStack Query, Zustand, Zod, API, MSW, accessibility, pagination, etc. may remain in English.
* Keep file names, route names, component names, code symbols, API endpoints, and documentation headings exactly as they appear in the repository.
* Explanations, findings, reasons, repair instructions, verification steps, and final summary MUST be understandable in Roman Hinglish.

Example:

BAD:
"Pagination implemented nahi hai."

GOOD:
"Pagination documented requirement ke according honi chahiye, lekin current implementation me pagination control aur corresponding query-state flow missing hai."

The language requirement applies to:

* audit findings
* explanations
* repair instructions
* verification instructions
* score explanations
* final summary

Code, filenames, commands, paths, identifiers, and exact documentation text MUST NOT be translated.

---

# 32. EXACT ISSUE FORMAT

Every significant issue MUST use this format:

# [ISSUE-ID] [P0/P1/P2/P3] — [ISSUE TITLE]

## 1. What is happening now

Explain the real current implementation.

## 2. Exact location

Provide:

* route
* folder
* file
* component
* hook/function where possible

## 3. Evidence / Proof

Provide concrete repository evidence wherever possible:

* file path
* component/function
* relevant line/range
* import/export relationship
* query key
* API endpoint
* route
* test
* command output
* or runtime observation

Do not make a finding based only on a visual assumption when repository evidence can establish the fact.

## 4. Documentation requirement

Name the exact documentation rule/section.

## 5. Current vs required

Use:

CURRENT:
...

REQUIRED:
...

## 6. Why this is a problem

Explain:

* architecture risk
* AI-agent risk
* regression risk
* UX risk
* accessibility risk
* security risk
* maintenance risk

Only include the risks that actually apply.

## 7. What the final state must be

Describe the final architecture/behavior.

## 8. Exact repair approach

Give an ordered sequence.

Example:

1. Change responsibility in File A.
2. Extract X into File B.
3. Move type Y into module types.
4. Update the API boundary.
5. Update query key.
6. Remove old fallback.
7. Update tests.
8. Update feature documentation.

Do NOT provide large code blocks.

## 9. What NOT to do

List likely AI mistakes.

Examples:

* do not create a global business abstraction
* do not duplicate API calls
* do not move backend state to Zustand
* do not delete existing error states
* do not weaken permission checks
* do not hardcode a replacement value

Only include relevant warnings.

## 10. Verification

Explain how the coding agent must verify the fix.

## 11. DONE condition

Provide a binary acceptance statement.

Example:

"Done only when the search value changes the query key, request parameters, mocked result, and rendered rows."

---

# 33. DO NOT MIX MULTIPLE PROBLEMS INTO ONE ISSUE

If a file has:

* naming problem
* state problem
* test problem

create separate issues if the fixes have different reasoning or verification.

This allows the coding agent to complete them independently.

---

# 34. BEFORE / AFTER MODULE SCORE

The audit MUST always produce a BEFORE REPAIR SCORE.

If the same agent performs repairs in the same execution context, it MUST also produce an AFTER REPAIR SCORE.

If repair is performed later by another agent, the first report provides:

BEFORE REPAIR SCORE

and the repairing/final-verification agent MUST rerun the same scoring procedure to produce:

AFTER REPAIR SCORE

## BASELINE SCORE — BEFORE REPAIR

First calculate:

# BEFORE REPAIR SCORE: X/10

This score represents the actual repository state BEFORE any fixes are applied.

Do NOT inflate this score because:
* the UI looks polished
* files exist
* mock data exists
* tests exist
* the architecture looks modern

The baseline score must reflect verified functional state.

---

## FINAL SCORE — AFTER REPAIR

After all repair work is complete, perform the SAME audit again and calculate:

# AFTER REPAIR SCORE: X/10

The final score MUST be based on re-verification, not intention.

Do NOT increase the score merely because code was changed.

A category can only receive the improved score if the required behavior is actually verified.

### SCORE CALCULATION

Unless the project documentation defines a different scoring model:

Overall module score = arithmetic mean of all applicable category scores.

Round to one decimal place.

Do NOT hide a critical failure inside an average.

Score caps:

* Any unresolved P0 → maximum 4/10
* Any unresolved critical architecture/data-boundary issue → maximum 5/10
* Significant unresolved dead/no-op flows → maximum 6/10
* Major runtime verification missing → maximum 8/10
* Any category marked NOT VERIFIED → overall score cannot be represented as fully verified

If any category required for the module is NOT VERIFIED:

* the score may still be calculated for transparency
* but the report MUST append:

`NOT FULLY VERIFIED`

The score MUST NOT be described as production-ready, complete, or fully verified.

If a critical category is NOT VERIFIED, apply the existing runtime/critical verification score cap.

These caps are guardrails, not substitutes for professional judgment.

Explain every score below 9/10.

---

## SCORE DELTA

Calculate:

BEFORE REPAIR SCORE: X/10
AFTER REPAIR SCORE: Y/10
IMPROVEMENT: +Z/10

---

## MOCK-COMPLETE FRONTEND GATE

For the target module, frontend functionality MUST be independently demonstrable through the module-owned mock/MSW layer whenever the backend is unavailable or out of scope.

Every applicable:

* route
* page section
* button
* icon action
* dropdown
* tab
* search
* filter
* sort
* pagination
* form
* modal
* drawer
* create flow
* edit flow
* delete/archive flow
* restore flow
* bulk action
* export/download flow
* retry flow
* navigation flow

MUST have a working frontend behavior through the documented mock/API contract.

The following are NOT acceptable as evidence of functionality:

* visible button without working behavior
* static mock data that never changes
* toast-only mutation success
* UI-only filtering
* UI-only pagination
* fake navigation
* hardcoded business fallback data
* placeholder alerts
* console-log handlers
* tests that only prove rendering

Required conceptual proof:

UI
→ interaction
→ feature API/mock layer
→ state/data transition
→ visible result
→ next valid action

The module MUST NOT be declared functionally complete while any required mock-driven user flow remains incomplete.

---

## SCORE GATING RULES

A module MUST NOT receive 9/10 or 10/10 unless:

* critical routes work
* major user flows work
* important buttons/actions work
* forms complete their documented flow
* tables and controls are interactive where required
* loading/empty/error/retry states work
* mock/demo data supports the major flows
* tests prove critical behaviors
* documentation matches implementation
* accessibility requirements are verified
* responsive behavior is verified
* TypeScript/typecheck passes
* lint passes where configured
* tests pass
* production build passes
* no critical verification remains marked NOT VERIFIED

If any critical runtime verification is unavailable:

FINAL SCORE MUST REFLECT THAT UNCERTAINTY.

Do NOT claim 10/10 based on static inspection alone.

---

## FINAL FULL-REGRESSION GATE

After completing repairs, the coding agent MUST re-run the complete audit of the target module.

The final verification MUST NOT be limited to the files or controls that were changed.

Re-verify:

* all target routes
* all actionable controls
* all major flows
* all forms
* all tables
* all search/filter/sort/pagination flows
* all loading/empty/error states
* all permission-sensitive UI
* all mock mutation flows
* all navigation and return flows
* all relevant accessibility behavior
* all relevant responsive behavior
* all applicable architecture rules
* all applicable global design rules

Compare:

BEFORE REPAIR
→ CHANGES MADE
→ AFTER REPAIR
→ REGRESSIONS DETECTED

Any previously passing behavior that becomes broken MUST be treated as a regression defect.

A repair is complete only when the target defect is fixed AND previously passing behavior remains intact.

---

## FUNCTIONAL SCORE GATE

Regardless of visual quality, a module with significant dead/no-op interactions MUST NOT receive a high final score.

A page that visually renders but contains incomplete downstream flows is functionally incomplete.

---

## SCORE EVIDENCE

Immediately below both scores, provide:

* critical verified strengths
* critical unresolved issues
* runtime verification status
* test verification status
* major interaction verification status

Do NOT provide a score without evidence.

### REGRESSION COMPARISON

Before repair, record:

* route count
* feature count
* actionable control count
* major flow count
* test count
* documented feature count
* known working behaviors

After repair, compare the same inventory.

The agent MUST verify that:

* no previously working route disappeared
* no documented feature disappeared
* no existing important interaction was removed
* no existing API/query contract was unnecessarily changed
* no existing permission behavior was weakened
* no existing responsive behavior regressed

Record:

ADDED:
...

CHANGED:
...

REMOVED:
...

REGRESSED:
...

UNINTENTIONALLY CHANGED:
...

Any unexplained regression is a FAIL.

---

# 35. CATEGORY SCORECARD

Provide:

| Category                 | Score | Main reason |
| ------------------------ | ----: | ----------- |
| Architecture             |   /10 |             |
| Modularity               |   /10 |             |
| Isolation                |   /10 |             |
| State Management         |   /10 |             |
| API Boundary             |   /10 |             |
| Forms                    |   /10 |             |
| Tables                   |   /10 |             |
| UI Interaction & Buttons |   /10 |             |
| End-to-End User Flows    |   /10 |             |
| Functional Mock/Demo     |   /10 |             |
| Accessibility            |   /10 |             |
| Responsive Design        |   /10 |             |
| Design System            |   /10 |             |
| Loading/Error            |   /10 |             |
| Mock/MSW                 |   /10 |             |
| Testing                  |   /10 |             |
| Security Frontend        |   /10 |             |
| Documentation            |   /10 |             |
| CI/Tooling               |   /10 |             |
| AI-Friendliness          |   /10 |             |

---

# 36. MASTER FINDINGS TABLE

Create:

### STANDARD STATUS VOCABULARY

REPAIR STATUS:
NOT STARTED
IN PROGRESS
FIXED
NOT REQUIRED

VERIFICATION STATUS:
PASS
PARTIAL
FAIL
NOT VERIFIED
BLOCKED
NOT APPLICABLE

| ID | Priority | Area | Route/Feature | Issue | Evidence | File(s) | Current Flow | Required Flow | What Must Change | Verification | Repair Status | Verification Status |
| -- | -------- | ---- | ------------ | ----- | -------- | ------- | ------------ | ------------- | ----------------- | ------------ | ------------- | ------------------- |

Initial status should always be:

`NOT STARTED`

unless the report is explicitly being generated after some fixes.

Never mark something VERIFIED simply because the file exists.

---

# 37. MODULE FILE-BY-FILE REPAIR MAP

Create a second table:

| File | Current Responsibility | Current Flow / Interaction | Problem | Final Responsibility | Required Action | Verification |
| ---- | ---------------------- | -------------------------- | ------- | -------------------- | -------------- | ------------ |

This is extremely important.

The coding agent should be able to open this table and know what each affected file needs to become.

---

# 38. EXACT REPAIR ORDER

Give the recommended execution order.

Use:

## Phase 1 — Architecture blockers

## Phase 2 — State/API cleanup

## Phase 3 — Forms

## Phase 4 — Tables and interactions

## Phase 5 — Loading/error/empty

## Phase 6 — Accessibility/responsive

## Phase 7 — Design-system cleanup

## Phase 8 — Tests

## Phase 9 — Documentation

## Phase 10 — Tooling/security

## Phase 11 — Final verification

However, do NOT blindly use this order.

If the actual module needs a different dependency order, explain the correct order.

For each phase explain:

* why it comes here
* prerequisites
* what must not be touched prematurely
* completion gate

---

# 39. "DO NOT BREAK" SECTION

Create:

# Things the Coding Agent Must NOT Break

Include real module-specific warnings such as:

* critical query keys
* permissions
* route behavior
* destructive confirmation
* special API response handling
* modal behavior
* mobile behavior
* existing working integrations
* feature-specific calculations
* important UI mappings
* do not leave any existing button/action as a silent no-op
* do not remove a downstream child flow while repairing the parent page
* do not make a page render successfully while breaking its child actions
* do not replace a working flow with a visual placeholder
* do not hardcode a success state without implementing the corresponding interaction
* do not make "Save", "Apply", "Delete", "Retry", "Next", "Export", or similar controls visually functional without a real testable outcome
* do not validate only the first screen of a multi-step feature
* do not mark a route PASS until its important child flows have been checked

Do NOT create generic warnings.

---

# 40. FINAL VERIFICATION PLAN

### VERIFICATION ENVIRONMENT PRECHECK

Before running verification:

* inspect package manager
* inspect lockfile
* inspect Node/runtime requirements
* inspect available scripts
* inspect installed dependencies
* inspect test/browser tooling
* inspect CI configuration

Prefer the project's existing lockfile and declared versions.

Do NOT upgrade dependencies merely to make verification pass.

Do NOT modify package.json/lockfiles unless that change is itself an identified issue and is explicitly part of the repair plan.

If dependencies cannot be installed or executed:

mark the affected checks NOT VERIFIED.

Do not substitute a weaker check and call it equivalent.

The final verification MUST happen in this order:

1. static search
2. import/architecture scan
3. route inventory scan
4. typecheck
5. lint
6. unit/component tests
7. interaction tests
8. targeted feature tests
9. route-by-route click-through verification
10. end-to-end user-flow verification
11. mock-data/hardcoded-demo verification
12. loading/empty/error/retry verification
13. accessibility verification
14. responsive verification
15. production build
16. security checks
17. documentation consistency check
18. final regression checklist
19. final BEFORE vs AFTER score comparison

### ROUTE-BY-ROUTE CLICK-THROUGH

For every route:

Open route
→ identify every primary action
→ identify every secondary action
→ click/execute each relevant action
→ verify resulting UI state
→ continue into the next child flow
→ return to previous state
→ retry after failure where applicable

Do not stop after the initial page render.

### INTERACTION COVERAGE

Record:

Total actionable controls discovered: N
Controls verified: N
Controls not verified: N
Dead/no-op controls: N
Missing flows: N

The goal is:

Dead/no-op controls: 0
Missing critical flows: 0

unless explicitly marked NOT VERIFIED with a documented reason.

### FEATURE FLOW COVERAGE

Record:

Major flows identified: N
Major flows fully verified: N
Major flows partially verified: N
Major flows broken: N

### HARD-CODED / MOCK DEMO COVERAGE

Record:

Routes with working mock/demo data: N
Routes missing demo data: N
Major flows demonstrable without backend: N
Major flows blocked by unavailable backend: N

### VERIFICATION STATUS RULE

A feature is:

PASS
only when its behavior is actually verified.

PARTIAL
when some path works but downstream interactions are incomplete.

NOT VERIFIED
when the behavior could not be executed or proven.

FAIL
when the implementation is proven broken.

Do NOT use PASS merely because files exist.

### CHANGE SCOPE VERIFICATION

Before final completion, inspect the final diff.

Record:

Files changed: N
Files added: N
Files removed: N

Every changed path MUST be classified as:

1. Target module
2. Direct test/support file required by target module
3. Explicitly justified shared infrastructure change

Any unrelated change is a regression risk and MUST be documented.

Do not modify unrelated business modules merely to make the target module pass.

If a check could not be run during analysis, state:

`NOT VERIFIED — MUST BE RUN BY CODING AGENT`

---

# 41. FINAL DOCUMENTATION CHECKLIST

At the end verify:

* [ ] feature documentation updated
* [ ] directory structure accurate
* [ ] feature inventory accurate
* [ ] user flows accurate
* [ ] state architecture accurate
* [ ] query keys documented
* [ ] API contract documented
* [ ] UI data requirements documented
* [ ] permission behavior documented
* [ ] loading/empty/error documented
* [ ] edge cases documented
* [ ] component responsibility map accurate
* [ ] forbidden rules accurate
* [ ] theme contract accurate
* [ ] no TBD/generic filler remains

---

# 42. FINAL HANDOFF FOR THE CODING AI

This section is the mandatory execution handoff and MUST appear at the end of the repair-specification portion of the report.

The report may then include the final verification/closing rules defined in Sections 43 and FINAL PRINCIPLE.

# READY-TO-GIVE-TO-VSCODE-AI

This section is the actual execution specification.

It must contain:

## Target Module

`[MODULE_NAME]`

## Goal

One clear paragraph describing what the coding agent must achieve.

## Priority 0 Work

Only actual P0 tasks.

## Priority 1 Work

Only actual P1 tasks.

## Priority 2/3 Work

Only after critical work is finished.

## File-by-File Actions

For every affected file:

`FILE → CURRENT PROBLEM → REQUIRED CHANGE → DEPENDENCY → VERIFICATION`

## Architecture Rules to Preserve

Only include rules relevant to this module.

## Things the Agent Must Not Do

Only real module-specific risks.

## Testing Requirements

Exact behaviors that must be tested.

## Documentation Updates

Exact documentation files/sections that must be updated.

## Final Acceptance Criteria

Use binary statements.

Example:

* No undocumented cross-module business imports remain.
* No production component contains fake business fallback data.
* All server state uses the documented server-state architecture.
* All non-trivial forms use the required validation architecture.
* All important tables implement the documented interactions.
* All critical loading/empty/error states are testable.
* All critical behaviors have meaningful tests.
* Module documentation matches actual code.
* All applicable documentation rules are verified.
* Typecheck/lint/tests/build pass.

### FUNCTIONAL ACCEPTANCE

* Every reachable route renders successfully.
* Every important page has meaningful mock/demo data when backend access is unavailable.
* Every important button has a defined and testable outcome.
* No important button is a visual-only placeholder.
* No important action is a silent no-op.
* Every important tab changes the displayed content correctly.
* Every important form can complete its documented happy path.
* Every important mutation produces a visible and testable result.
* Every important destructive action has the documented confirmation flow.
* Every important search/filter/sort/pagination control changes the resulting UI/data.
* Every important modal/drawer has a complete open → action → success/error → close/recovery flow.
* Every important multi-step workflow can reach its final step.
* Every important navigation flow reaches the correct destination and allows correct return navigation.
* Every important retry action actually retries the failed operation.
* Every major feature has at least one verified happy path.
* Every major feature has meaningful error/empty/loading coverage where applicable.
* No route is considered PASS merely because its first screen renders.
* No child feature is considered PASS merely because its parent page works.
* No feature is considered complete if its downstream flow ends in a dead end.
* All critical interactions are covered by meaningful tests.
* All critical routes and flows are manually or E2E verified where tooling permits.
* Any unavailable runtime verification is explicitly marked NOT VERIFIED.
* Every reachable child action must either complete its documented flow or intentionally end at a documented terminal state.
* A click that only changes visual styling, opens a temporary shell, or dismisses UI without completing the intended action does not count as working.
* Every terminal state must clearly tell the user what happened and what action is available next.
* No interactive element may leave the user in an ambiguous state where it is unclear whether the requested action succeeded, failed, or is still processing.

---

# 43. VERY IMPORTANT FINAL RULE

Do NOT finish with:

"Overall, the code can be improved."

Instead finish with:

1. exact current state
2. exact missing requirements
3. exact repair order
4. exact files affected
5. exact verification
6. exact DONE criteria
7. exact score
8. complete interaction/flow coverage
9. dead/no-op control count
10. before-repair score vs after-repair score

The report must feel like:

**AUDIT + ARCHITECTURE DECISION + REPAIR PLAN + ACCEPTANCE TEST**

not like a generic code review.

---

# FINAL PRINCIPLE

The coding agent should not have to think:

"What did the auditor mean?"

It should be able to think:

"I know exactly:

* what is wrong
* where it is wrong
* why it is wrong
* what the desired state is
* which file I should modify
* what responsibility belongs there
* what I must not change
* what test I must add
* how I verify it
* when I can mark it complete."

That is the required quality bar for this audit.

The coding agent must also be able to answer, for every important UI action:

"I know:

* what happens when the user clicks it
* which state changes
* which route or modal opens
* which data/request changes
* what loading state appears
* what success state appears
* what error state appears
* what happens after retry
* what happens on the second use
* where the user can go next
* how the flow ends
* which test proves it works
* what exact condition makes this interaction DONE."

If that answer cannot be established from the repository, the feature is NOT fully audited.

---



# 43A. SOURCE-DRIVEN WEB SPECIFICATION COVERAGE ENGINE — MANDATORY

This section exists to eliminate a major audit failure mode:

> An audit may contain many good generic checks while still silently missing one or more
> exact requirements from the supplied web frontend architecture or global design documents.

Therefore the audit MUST treat the supplied documents as executable checklists.

Do not rely on the Universal prompt's section headings alone.

The auditor MUST:

1. Read the COMPLETE supplied frontend development instruction document.
2. Read the COMPLETE supplied global design document.
3. Discover every numbered rule, lettered rule, subsection, table, mandatory checklist item,
   implementation example that establishes a requirement, and explicit prohibition.
4. Create a source-rule ledger using the source location as part of the rule identity.
5. Map every source requirement to:
   - code evidence,
   - configuration evidence,
   - test evidence,
   - documentation evidence,
   - runtime evidence where available.
6. Mark every requirement:
   ```text
   PASS
   FAIL
   PARTIAL
   NOT_VERIFIED
   NOT_APPLICABLE
   OUTSIDE_TARGET_SCOPE
   BLOCKED_BY_SUPPLIED_SCOPE
   ```
7. Every `NOT_APPLICABLE` result MUST include a reason.
8. Every `NOT_VERIFIED`, `OUTSIDE_TARGET_SCOPE`, or `BLOCKED_BY_SUPPLIED_SCOPE` result MUST identify
   the missing evidence or boundary.
9. A source requirement MUST NOT disappear because a broader section appears to cover a similar topic.
10. A source requirement MUST NOT be treated as satisfied merely because the code "looks close."

The source-rule identity MUST include:

```text
SOURCE_DOCUMENT
SOURCE_HEADING
SOURCE_RULE_IDENTIFIER
SOURCE_LOCATION
REQUIREMENT_TEXT
```

Do NOT use only "Rule 14" as an identifier because the supplied web instruction may contain
another later "Rule 14" in an extension/addendum section.

Use the full source location, for example:

```text
WEB-INSTRUCTION / Rule 14 / Backend-Driven UI Messages
WEB-INSTRUCTION / Rule 14 (Extended API Mutation Contract)
WEB-INSTRUCTION / Rule 15 / Performance & Optimization Architecture
WEB-DESIGN / Section 12 / Premium UI & Micro-Interactions
```

---

# 43B. INTERNAL SOURCE CONFLICT DETECTION — MANDATORY

The auditor MUST separately inspect whether the supplied documentation contradicts itself.

Do NOT silently select one statement.

A conflict exists when two supplied requirements cannot both be true at the same time,
or when a later section materially changes the meaning of an earlier section without stating
that it supersedes it.

Use:

```text
INTERNAL SOURCE CONFLICT

SOURCE A:
[document + exact heading/rule + requirement]

SOURCE B:
[document + exact heading/rule + requirement]

CONFLICT:
[precise incompatibility]

AFFECTED IMPLEMENTATION:
[what current code is expected to do under A vs B]

AUDIT STATUS:
SOURCE_CONFLICT — HUMAN_ARCHITECTURAL_DECISION_REQUIRED
```

Known examples that MUST be checked when these exact source texts are supplied include:

### Example 1 — Frontend E2E contradiction

The web development instruction contains an E2E architecture that places frontend E2E
tests in a separate `frontend_e2e/` tree, while another section states that there is
"No Frontend E2E Suite" because true E2E is handled externally, and a later CI rule
requires Playwright E2E for critical flows.

Do NOT silently choose one.

Report the conflict and identify all affected:

- test location;
- Playwright ownership;
- CI responsibility;
- test isolation rules;
- feature handoff;
- merge gates.

### Example 2 — Idempotency scope contradiction

The web instruction contains both:
- a strict API mutation rule covering all POST/PATCH/PUT/DELETE mutations, and
- a later financial/irreversible mutation rule with a narrower scope.

Do NOT silently reduce the broader requirement to financial actions only.

Record both source statements and the exact implementation impact.

### Example 3 — Semantic background opacity contradiction

The global design system forbids opacity modifiers on semantic backgrounds, while a
premium sticky-header example uses an opacity modifier on a semantic background class.

Do NOT silently mark every such implementation as PASS or FAIL.

Report the source conflict and verify whether the project has an explicit superseding rule.

### Example 4 — Language rollout contradiction

The frontend instruction contains an authoritative target-language table while also
describing phased rollout rather than shipping every language at launch.

Do NOT infer the launch state.

Determine the actual configured/launched language scope from supplied application evidence
and report any unresolved documentation mismatch.

The auditor MUST actively search for additional conflicts; the examples above are not exhaustive.

---

# 43C. COMPLETE WEB FRONTEND ARCHITECTURE RULE LEDGER

The audit MUST explicitly cover every applicable rule from the supplied web frontend
development instruction, including the rules below and all of their detailed subrequirements.

The rule title below is not a replacement for reading the source section. It is an
anti-skipping index.

## WEB-INSTRUCTION RULE 1 — MICRO-MODULARIZATION / FEATURE SUB-FOLDERS / FILE CEILINGS

Verify ALL requirements from the source section, including:

- one primary React component per component file;
- related declarations may coexist in a cohesive non-component responsibility;
- module-prefixed internal folders;
- component maximum 300 lines;
- custom hook maximum 150 lines;
- utility/formatter maximum 120 lines;
- Zustand store maximum 180 lines;
- schema/type maximum 200 lines;
- API service maximum 200 lines;
- split by responsibility, never random line-count slicing;
- no generic `helpers/`, `common/`, `misc/`;
- Next.js hook/event-listener files explicitly use `"use client"`.

---

## WEB-INSTRUCTION RULE 2 — TOTAL ROLE ISOLATION

Verify:

- role root separation;
- no business component reuse across roles;
- feature-level ownership;
- no role-wide business buckets;
- only dumb UI primitives may be shared;
- role isolation is mechanically enforced where tooling is supplied.

---

## WEB-INSTRUCTION RULE 3 — HYPER-DESCRIPTIVE NAMING / PREFIXES

Verify:

- module-prefixed files;
- module-prefixed folders;
- descriptive names;
- framework-reserved filename exceptions;
- test filename prefixing;
- primary exported component/class/callable matches filename where required;
- no abbreviations;
- structural UI suffixes;
- prefixed props interfaces;
- no hidden business semantics behind generic names.

Also verify actual on-disk casing through the filesystem, not only import text.

---

## WEB-INSTRUCTION RULE 3B — CENTRALIZED STATIC DATA VS SERVER DATA

Verify the separation:

```text
STATIC UI CONFIG
→ feature constants

SERVER/API DATA
→ API contract
→ TypeScript type
→ Zod schema
→ module-owned MSW
→ real backend

UI STATE
→ local / module state

SERVER STATE
→ TanStack Query
```

Specifically detect business records incorrectly placed in constants.

---

## WEB-INSTRUCTION RULE 4 — THEME INDEPENDENCE / PORTABILITY

Verify:

- no hardcoded theme values in JSX;
- semantic tokens;
- no arbitrary variable references in JSX;
- no opacity modifiers where forbidden;
- solid semantic backgrounds use correct `text-on-*` pairing;
- module theme contract exists;
- module does not define feature-specific global tokens.

---

## WEB-INSTRUCTION RULE 5 — STATE MANAGEMENT DECISION BOUNDARY

Verify every state variable against:

```text
SERVER STATE
SHARED CLIENT STATE
LOCAL STATE
CONTEXT
URL STATE
```

Specifically verify:

- API data in TanStack Query;
- UI-only shared state in module Zustand;
- stable cross-tree concerns only in Context;
- local state for component-private state;
- no duplicate server state in multiple stores;
- justification before introducing new global state.

---

## WEB-INSTRUCTION RULE 6 — LOGIC / UI SEPARATION

Verify:

- complex logic extracted to hooks;
- presentation components remain focused;
- hooks do not become generic dumping grounds;
- API and business logic remain at the correct layer.

---

## WEB-INSTRUCTION RULE 7 — TYPE ISOLATION / RUNTIME CONTRACT VALIDATION

Verify:

- complex interfaces/types outside components;
- no generic type dumps;
- no inline string unions where prohibited;
- Zod/runtime validation for external payloads;
- `unknown` instead of `any`;
- response type/schema consistency.

---

## WEB-INSTRUCTION RULE 8 — SERVER / CLIENT BOUNDARY

Verify:

- Next.js `page.tsx` / layout boundaries;
- explicit `"use client"` where hooks/events/browser APIs require it;
- server-only operations remain server-side;
- client components do not accidentally import server-only modules;
- sensitive environment variables remain server-only.

---

## WEB-INSTRUCTION RULE 9 — NEXT.JS NATIVE FEATURES / TYPED ERROR BOUNDARIES

Verify the documented error-boundary hierarchy:

```text
Component/section boundary
→ module boundary
→ route-level error.tsx
→ application/global boundary
```

Also verify:

- `loading.tsx`;
- `error.tsx`;
- `not-found.tsx`;
- `reset()` recovery;
- module-branded but non-technical errors;
- no generic "page rendered" PASS.

---

## WEB-INSTRUCTION RULE 10 — ABSOLUTE IMPORTS

Verify:

- configured alias;
- no forbidden relative paths;
- alias resolves consistently in TypeScript, tests, lint, and build;
- no path that only works on one OS.

---

## WEB-INSTRUCTION RULE 11 — CENTRALIZED URL CONFIG

Verify:

- module URL config file;
- no hardcoded backend URLs;
- no literal route API strings scattered across hooks/components;
- dynamic path generation is centralized;
- query parameter serialization remains explicit.

---

## WEB-INSTRUCTION RULE 12 — HTTP STATUS CODES

Verify framework/constants usage instead of unexplained numeric status values.

---

## WEB-INSTRUCTION RULE 13 — FEATURE MAP

Verify complete module documentation:

```text
Purpose
Directory Structure
External Dependencies
Feature Inventory
User Flows
Data & State Architecture
API Contract
UI Data Requirements
Permissions/Security
Loading/Empty/Error
Edge Cases / AI Warnings
Component Responsibility Map
Rule Compliance Checklist
```

Also verify documentation freshness and absence of fake `TBD`/generic text.

---

## WEB-INSTRUCTION RULE 14 — BACKEND-DRIVEN UI MESSAGES

Verify:

- success/error messages come from backend response when source rule requires;
- no duplicated hardcoded backend messages;
- module-specific errors are not swallowed by global transport handling.

---

## WEB-INSTRUCTION RULE 15 — PERFORMANCE & OPTIMIZATION

Verify ALL source requirements including:

- minimum 300ms debounce where backend calls are triggered by search/filter controls;
- server-side pagination/filtering/sorting;
- lazy loading/code splitting for heavy non-initial components;
- correct Context memoization;
- TanStack Query cache authority;
- optimistic-update restrictions;
- authoritative response reconciliation;
- no unnecessary whole-application refetch;
- bundle-impact review for large dependencies;
- avoid unnecessary full-library imports.

---

## WEB-INSTRUCTION RULE 15A — TESTING ARCHITECTURE

Verify the complete source section, including its testing stack, co-location, E2E isolation,
MSW/API mocking rules, and any contradictions with later E2E requirements.

Explicitly inspect:

- Vitest;
- React Testing Library;
- MSW;
- Playwright references;
- separated `frontend_e2e/` rules;
- no shared E2E helpers where prohibited;
- no cross-module test imports;
- meaningful behavior assertions;
- regression tests.

Where the same source contains mutually incompatible E2E rules, report a source conflict
instead of selecting one.

---

## WEB-INSTRUCTION RULE 15B — FORM ARCHITECTURE

Verify:

- React Hook Form;
- Zod;
- `@hookform/resolvers`;
- form component responsibility;
- form hook responsibility;
- schema responsibility;
- API responsibility;
- validation timing;
- backend final authority;
- inline field errors;
- pending disable;
- duplicate submission prevention;
- reset only after success;
- preserve entered data after failure;
- file validation;
- upload progress where supported.

---

## WEB-INSTRUCTION RULE 15C — STATE MATRIX

Verify exact query-key namespacing, invalidation/reconciliation, Context restrictions,
Zustand scope, and local-state boundaries.

---

## WEB-INSTRUCTION RULE 15D — ENVIRONMENT / RUNTIME CONFIG

Verify:

- `.env.example`;
- `.env.local`;
- environment-specific files where applicable;
- `NEXT_PUBLIC_` semantics;
- no secrets in client-visible vars;
- one central Zod configuration module;
- startup validation;
- documented variables;
- no arbitrary component-level `process.env` access.

---

## WEB-INSTRUCTION RULE 15E — OBSERVABILITY

Verify:

- approved error monitoring;
- route/module/user-session context rules;
- request ID;
- error digest;
- PII/token/password safety;
- critical workflow events;
- owner/alert policy;
- centralized logger.

---

## WEB-INSTRUCTION RULES 16–30 — INTERACTION / ACCESS / DATA UI

For EVERY one of Rules 16–30, inspect the COMPLETE source section and explicitly record evidence.
Do not rely on title-only review.

At minimum, verify:

- robust forms;
- centralized error interception;
- enterprise accessibility;
- clickable table rows;
- keyboard-equivalent row navigation;
- searchable dropdowns for large datasets;
- WebSocket architecture;
- websocket-only vs centralized-provider boundary;
- tenant header propagation;
- backend authorization remains authoritative;
- password visibility;
- UTC serialization/display conversion;
- RBAC UI hiding;
- skeleton loading;
- no `any`;
- icon-driven table actions;
- multi-medium radio selection;
- table controls;
- modular API clients.

---

## WEB-INSTRUCTION RULES 31–40 — API / DESIGN / DOCUMENTATION SAFETY

Explicitly audit:

31. module-owned API files and no global API blob;
32. no barrel files;
33. Next.js image optimization with documented exceptions;
34. environment segregation;
35. magic-value policy and documented exceptions;
36. arbitrary Tailwind prohibition and exception documentation;
37. JSDoc;
38. component responsibility comments;
39. data-flow comments;
40. module forbidden-pattern file.

---

## WEB-INSTRUCTION RULES 41–55 — URL / ASYNC / UX / IMPORT SAFETY

Explicitly audit:

41. URL state for filter/search/pagination;
42. TanStack Query native status vs prohibited parallel async enum;
43. sensitive-data masking;
44. no `console.log`;
45. co-located tests;
46. unsaved-changes browser warning;
47. copy-to-clipboard restrictions;
48. per-entity empty state;
49. import ordering;
50. prop spreading;
51. conditional-rendering complexity;
52. event handler naming;
53. useEffect dependency comments;
54. global shared components scope;
55. stable list keys.

---

## WEB-INSTRUCTION RULES 56–61 — FONT / TSCONFIG / STORAGE / CONTRACT / TOOLING

Explicitly audit:

56. `next/font` and no Google Fonts CDN;
57. strict TypeScript and no `@ts-ignore` / `@ts-nocheck`;
58. storage abstraction, secure token storage, namespaced/versioned keys;
59. exact canonical `ApiResponse<T>` contract;
60. centralized unauthenticated redirect handling;
61. mechanical ESLint/pre-commit enforcement.

For Rule 59 verify the complete source contract, including:

```text
success
message
data
meta?
error?
errorCode?
statusCode?
validationErrors?
```

and exact:

```text
ValidationErrorItem
PaginationMeta
```

semantics.

---

## WEB-INSTRUCTION RULES 62–74 — ISOLATION / MOBILE / NUMERIC / TOOLING

Explicitly audit:

62. dependency-addition guardrail;
63. zero cross-module business imports + controlled infrastructure;
64. mobile-first implementation at:
   - 375px
   - 768px
   - 1280px+
   and narrow-view support where the design document requires it;
65. hardened numeric inputs;
66. optimistic mutation reconciliation with authoritative server response;
67. explicit API parameter propagation;
68. table headers/cells/colSpan exact alignment;
69. social-brand tokens;
70. interactive KPI cards where meaningful;
71. double verification for destructive/financial actions;
72. API function verb contract;
73. `import type`;
74. security scanning in CI/pre-commit.

---

## WEB-INSTRUCTION RULE 75 — MODULE-OWNED MSW / MOCK ARCHITECTURE

Verify EVERY sub-rule:

### Rule 75A
Global MSW bootstrap may only:
- start MSW;
- register handlers;
- enable in dev/test;
- disable in production;
- provide framework plumbing.

It MUST NOT contain:
- feature fixtures;
- feature business data;
- feature response builders;
- feature validation;
- feature business rules.

### Rule 75B
No feature-specific mock may live in:

```text
src/mocks
src/shared
src/common
src/utils
other feature
other role
```

unless genuine infrastructure.

### Rule 75C
Global infrastructure qualification requires ALL source criteria:

- framework/application plumbing;
- no module-specific business behavior;
- duplication would be incorrect/conflicting;
- stable responsibility;
- explicit documentation.

### Rule 75D
Complete MSW UI data contract:

```text
UI
→ API Contract
→ Type
→ Zod
→ Module Fixture
→ Module Handler
→ TanStack Query
→ UI
```

Verify ALL UI data dependencies:

- table columns;
- row fields;
- KPIs;
- charts;
- filters;
- search;
- sort;
- pagination;
- dropdowns;
- detail;
- modal/drawer;
- badges/status;
- timeline/history;
- relationship values.

Verify fixture variation:

- multiple records;
- statuses;
- plans/categories;
- dates;
- numeric values;
- nullable fields;
- long text;
- search values;
- filter values;
- sort values;
- enough pages;
- empty result;
- error scenario.

Reject:

- minimal mock;
- component-level hardcoded fallback;
- mock data from another business module;
- bypassing the feature API client.

---

## WEB-INSTRUCTION RULES 76–84 — GOVERNANCE / UI INTEGRITY

Audit all details of:

76. CODEOWNERS human review for:
   - auth;
   - API interceptor/token logic;
   - permission hooks;
   - payment UI;
   - required Security Impact Analysis.
77. CI/CD merge policy and branch protection:
   - quality;
   - security;
   - tests;
   - production build;
   - review;
   - no direct main push;
   - no failed-check merge;
   - no security CODEOWNERS bypass;
   - human approval for AI-generated changes.
78. en-dash nullable display fallback and `displayValue`.
79. complex-form unsaved-change guard including browser exit AND client-side navigation.
80. centralized currency/number formatter, minor-unit semantics, no raw `.toFixed()`.
81. loading-width stability.
82. toast deduplication, including:
   - stable IDs;
   - entity-aware IDs;
   - duplicate errors;
   - duplicate success notifications;
   - distinct-event non-deduplication.
83. idempotency key generation at user confirmation and reuse on retries.
84. exact filesystem/import case sensitivity and Git case-only rename behavior.

---

# 43D. EXTENDED WEB-INSTRUCTION RULES — SECOND RULE NAMESPACE

The supplied web instruction may contain a later extension section with another numbering
sequence starting again at Rule 14.

These MUST be treated as separate source identities from earlier Rule 14/15/etc.

Audit:

## EXTENDED RULE 14 — ALL MUTATING API CLIENTS

Verify every module mutation API function supports the backend idempotency contract:

```text
POST
PATCH
PUT
DELETE
```

where required by the supplied backend contract.

Check:

- optional `idempotencyKey`;
- `Idempotency-Key` header injection;
- exact same key on retry;
- new key only for new user intent;
- no fresh key per retry.

---

## EXTENDED RULE 15 — WEBSOCKET CENTRALIZATION

Verify:

- no `new WebSocket()` inside UI;
- no direct `io()` inside UI;
- centralized `WebSocketContext` / `SocketProvider`;
- connection lifecycle management;
- reconnect;
- cleanup;
- dedicated feature hook such as `useSocketEvent(...)`.

Also compare this rule against the main WebSocket architecture rule and report conflict if transport requirements differ.

---

## EXTENDED RULE 16 — ROLE-BASED FIELD MASKING / OPTIONAL TYPES

Verify:

- potentially masked sensitive fields are optional where required;
- Zod schemas allow omission where role-based masking exists;
- UI gracefully handles `undefined`;
- no role-specific field crash;
- frontend never assumes restricted data always exists.

---

## EXTENDED RULE 17 — STRICT QUERY CACHE INVALIDATION

For every mutation verify:

```text
Mutation success
→ authoritative response
→ relevant Query cache reconciliation/invalidation
```

Check exact relevant query keys.

Do not accept "refetch everything" as the intended architecture where precise invalidation is required.

---

## EXTENDED RULE 18 — MODULE-COLOCATED I18N

Verify:

- `next-intl` for Next.js or documented alternative;
- module-local `_locales/`;
- English source file;
- configured target-language files;
- translation key usage through `t()`;
- no hardcoded English JSX;
- build-time locale merging;
- no central `src/messages`/`src/i18n` business locale bucket;
- `Accept-Language` propagation through API infrastructure;
- actual configured language scope;
- same-change translation updates.

IMPORTANT:
If the same source simultaneously says all target languages are authoritative while describing phased rollout,
record that rollout ambiguity rather than inventing a launch-state decision.

---

## EXTENDED RULE 19 — CENTRAL FEATURE FLAGS

Verify:

```text
Backend flag source
→ application initialization
→ Context/Zustand
→ useFeatureFlag(...)
→ UI
```

Reject:

```text
NEXT_PUBLIC_ENABLE_FEATURE
```

as the dynamic source where the architecture requires server-fetched flags.

---

## EXTENDED RULE 20 — MULTI-CURRENCY MONETARY CONTRACT

Verify:

- backend minor-unit integer;
- ISO 4217 code;
- frontend formatter responsibility;
- `Intl.NumberFormat`;
- no manual `/100`;
- no literal `₹/$/€` symbols in JSX;
- no formatted string in state/cache;
- active i18n locale used;
- module-local formatter where required.

Also audit special-currency subunit cases from the supplied source rather than assuming every currency
uses exactly two decimals.

---

## EXTENDED RULE 21 — TENANT DATA EXPORT / OFFBOARDING UX

When applicable verify the entire documented UX:

```text
Authorized user
→ Request Full Data Export
→ POST /export-data
→ 202 Accepted
→ success confirmation
→ background completion
→ WebSocket or polling
→ secure email/download completion
```

Verify:

- top-level role restriction;
- exact UI placement;
- no synchronous blob/file-download implementation for the trigger;
- ZIP/CSV expectation;
- completion feedback;
- notification recovery.

---

# 43E. GLOBAL DESIGN SYSTEM — COMPLETE SECTION COVERAGE

The global design document MUST also be treated as an executable audit checklist.

The auditor MUST verify every applicable section:

## DESIGN §1 — COLOR PALETTE

Verify all declared token categories and exact light/dark values where the module consumes them:

- `--primary`;
- `--primary-hover`;
- `--primary-subtle`;
- `--bg-page`;
- `--bg-card`;
- `--bg-sidebar`;
- `--bg-header`;
- `--bg-input`;
- `--bg-floating`;
- `--bg-overlay`;
- `--bg-popover`;
- `--surface-hover`;
- `--surface-highlight`;
- `--surface-zebra`;
- `--overlay-backdrop`;
- `--focus-ring`;
- `--border`;
- `--border-focus`;
- `--text-primary`;
- `--text-secondary`;
- `--text-disabled`;
- `--text-on-primary`;
- `--text-on-danger`;
- `--text-on-success`;
- `--text-on-info`;
- skeleton tokens;
- status tokens;
- payment tokens;
- chart tokens;
- semantic shadows;
- radius tokens.

Do not only check that a token name exists.
Where the global theme implementation is supplied, verify the value mapping as well.

---

## DESIGN §1A — THEME IMPLEMENTATION ARCHITECTURE

Verify:

```text
globals.css
→ semantic Tailwind token mapping
→ module JSX
```

Reject:

- arbitrary CSS-variable Tailwind classes;
- hardcoded hex;
- semantic background opacity modifiers where prohibited;
- incorrect `text-on-*` pairing.

Verify exact Tailwind-to-CSS-variable mappings from the source.

---

## DESIGN §1B / §1C — LAYOUT + TYPOGRAPHY TOKENS

Verify:

- header height;
- sidebar width;
- collapsed sidebar width;
- content padding;
- control height;
- touch target;
- table row heights;
- compact row height;
- modal width;
- drawer width;
- page title size;
- section title;
- badge;
- KPI;
- table header;
- body;
- caption.

---

## DESIGN §2 — TYPOGRAPHY

Verify:

- Inter;
- base size;
- H1/H2 hierarchy;
- table header;
- buttons;
- inputs;
- captions;
- errors;
- badges;
- one page H1 where applicable.

---

## DESIGN §3 — AUTHENTICATED APP SHELL

Verify:

- auth pages are excluded from authenticated shell;
- fixed top header;
- exact header height token;
- sidebar geometry;
- collapsible sidebar;
- main-content offsets;
- breadcrumb;
- page title/subtitle;
- action bar;
- independent sidebar scrolling;
- active navigation treatment.

Global design does NOT own which business nav items exist.
Audit ownership separately.

---

## DESIGN §4 — STATUS BADGES

Verify:

- pill radius;
- padding;
- typography;
- semantic background/text pair;
- feature-owned status mapping;
- no global business-status registry.

---

## DESIGN §5 — REUSABLE COMPONENT PATTERNS

Audit every applicable subpattern:

```text
KPI card
Data table
Form
Modal/Dialog
Grid/Matrix
Kanban
Wizard/Stepper
Timeline
Command Palette
Confirmation Drawer
Inline Editable Cell
```

For every applicable pattern compare:
- structure;
- tokens;
- spacing;
- interaction;
- responsive behavior;
- keyboard behavior;
- loading;
- error;
- empty;
- accessibility.

### Design table checks
Also verify:
- semantic table elements;
- sortable-header accessibility;
- row-click + inline-action keyboard behavior;
- mobile scroll/card-stack strategy;
- no essential-information hiding.

### Design form checks
Verify all documented states:
- default;
- hover;
- focus-visible;
- filled;
- error;
- success;
- disabled;
- read-only;
- loading/submitting.

Verify label/error ARIA semantics.

### Design modal/drawer checks
Verify:
- overlay;
- z-index;
- overlay background;
- modal background;
- mobile width;
- safe-area behavior;
- footer reachability;
- shadow/elevation.

---

## DESIGN §6 — FEEDBACK / STATE

Verify:
- toast placement;
- toast sizing;
- safe-area bottom handling;
- success/error treatment;
- 4-second auto-dismiss;
- slide animation;
- skeletons;
- table skeletons;
- empty-state structure;
- CTA when permitted;
- form validation feedback.

---

## DESIGN §7 — BUTTON HIERARCHY

Verify every applicable button type and placement:

- Primary;
- Danger Primary;
- Ghost/Outlined;
- Ghost Danger;
- Icon Button;
- Text Link;
- Segmented Control.

Check:
- page-level CTA;
- form footer;
- destructive Cancel/Confirm arrangement;
- inline actions;
- wizard footer.

---

## DESIGN §8 — RESPONSIVE BEHAVIOR

Verify at minimum:

```text
Desktop ≥1280px
Tablet 768–1279px
Mobile <768px
Narrow ~320px where applicable
```

Also verify:
- sidebar collapse;
- mobile drawer;
- mobile card-stack table;
- KPI scrolling/2-column behavior;
- chart reduction;
- form single-column;
- no accidental horizontal overflow;
- mobile touch action visibility.

---

## DESIGN §9 — ICON DICTIONARY / STYLING

Verify:

- Lucide React;
- size 18px;
- strokeWidth 2;
- default/hover/active semantic color;
- feature-owned semantic icon choice;
- no undefined icon tokens.

---

## DESIGN §10 — CHART STYLE GUIDE

Verify:

- approved chart library from architecture (`react-apexcharts` where required);
- Recharts/Chart.js prohibition where source says so;
- chart semantic tokens;
- exact series order for pie/donut;
- surface;
- axis labels;
- grid;
- tooltips;
- no raw chart colors.

---

## DESIGN §11 — THEMING / DARK-LIGHT MODE

Verify:

- ThemeProvider;
- `:root` light values;
- `.dark` values;
- centralized tokens;
- no manual dark-mode component branches where prohibited.

---

## DESIGN §12 — PREMIUM UI / MICRO-INTERACTIONS

Verify:
- motion-safe transitions;
- hover effects;
- active scale;
- sticky-header treatment;
- popover/dialog shadows;
- custom scrollbars;
- exact z-index scale.

Also detect and report any contradiction between this section's examples and the global opacity prohibition.

---

## DESIGN §13 — ENTERPRISE UX / ACCESSIBILITY

Verify:
- truncation;
- tooltip for truncated constrained text;
- type-to-confirm for highly destructive actions;
- explicit focus-visible states;
- keyboard-only operation;
- screen-reader labels;
- touch alternatives;
- dialog focus trap/autofocus/restore;
- Escape;
- color is not sole source of meaning;
- reduced-motion;
- WCAG AA contrast.

---

## DESIGN §14 — PRINT / EXPORT

Verify:
- `@media print`;
- hide sidebar/header/action bars/toasts;
- black text on white background;
- `PrintableWrapper` where required.

---

## DESIGN §15 — GLOBAL KEYBOARD SHORTCUTS

Verify applicable shortcuts:

```text
Ctrl+K
Esc
Ctrl+S
?
```

Never make a keyboard shortcut the only way to access functionality.

---

## DESIGN §16 — ALERT BANNERS

Verify:
- placement below header;
- pushes content down;
- semantic token;
- dismiss button when dismissible;
- persistent vs toast distinction.

---

## DESIGN §17 — DATA DENSITY

Verify:
- Compact mode;
- Comfortable/default mode;
- exact row heights;
- font changes;
- zebra preservation;
- settings/header toggle;
- approved persistence utility.

---

## DESIGN §18 — CONTEXT MENU

Verify:
- pointer right-click;
- touch/keyboard alternative;
- actions mirror row actions;
- no right-click-only functionality;
- popover tokens/z-index.

---

## DESIGN §19 — TOOLTIPS

Verify:
- background;
- border;
- typography;
- max width;
- wrapping;
- arrow;
- show/hide delays;
- keyboard focus;
- touch/mobile alternative;
- z-index.

---

## DESIGN §20 — DISABLED / READ-ONLY FORM STATES

Verify exact:
- disabled opacity;
- disabled cursor;
- disabled background;
- no disabled focus ring;
- read-only dashed border;
- full opacity;
- success checkmark where meaningful.

---

## DESIGN §21 — NUMBER / CURRENCY FORMATTING

Verify:
- Indian numbering presentation where required;
- abbreviated large KPIs;
- one decimal percentage;
- negative values semantic danger color;
- centralized formatter;
- no JSX formatting logic.

Where multi-currency architecture is active, reconcile this visual formatting rule
with the frontend instruction's locale-aware monetary contract and report conflicts rather
than silently choosing.

---

## DESIGN §22 — TABLE COLUMN WIDTH STRATEGY

Verify:
- ID/reference width;
- name min-width + truncate;
- status width;
- date width;
- amount right alignment;
- action width;
- no essential-content clipping.

---

## DESIGN §23 — RESPONSIVE / MOBILE INTERACTION POLICY

Verify:
- centralized breakpoints;
- tablet usability;
- sidebar drawer;
- touch target;
- dense table mobile strategy;
- sticky-action safety;
- workflow testing at mobile/tablet/desktop.

---

## DESIGN §24 — ASYNC UI STATE SYSTEM

Verify every data-driven feature defines:

```text
Loading
Empty
Error
Permission Denied
Offline / Connection
```

Each must have:
- appropriate UI;
- safe messaging;
- retry where applicable;
- non-blocking connection indication where required.

---

## DESIGN §25 — DRAG & DROP

When applicable verify:
- dragging state;
- valid target;
- invalid target;
- motion-safe transition;
- exact semantic tokens;
- keyboard/touch alternative if the source requires one.

---

## DESIGN §26 — LOADING BUTTON

Verify:
- pending state;
- spinner;
- disabled;
- width stability;
- no layout shift;
- accessible label.

---

## DESIGN §27 — MOBILE CARD-STACK TABLE

When the feature uses a table on mobile verify:
- each row becomes a card where this is the chosen documented strategy;
- primary identifier is title;
- status top-right;
- other fields as Label: Value;
- actions remain accessible.

Do NOT invent card-stack behavior for a table whose documented mobile pattern is horizontal scrolling.

---

## DESIGN §28 — GLOBAL LOADING / EMPTY / ERROR / NOT FOUND

Verify:
- routing progress;
- structural skeleton;
- empty illustration/message/CTA;
- error boundary + `reset()`;
- branded not-found state;
- no generic browser error surface.

---

## DESIGN §29 — REDUCED MOTION

Verify ALL:
- `motion-safe`;
- `motion-reduce` where appropriate;
- no unguarded transitions/animations/transforms;
- global reduced-motion CSS override;
- canonical duration tokens;
- decorative animation suppression.

---

## DESIGN §30 — DARK MODE SURFACE ELEVATION

Verify:

```text
Layer 0 → bg-page
Layer 1 → bg-card
Layer 2 → bg-floating
Layer 3 → bg-overlay
Layer 4 → bg-popover
```

Verify:
- modal = `bg-overlay`;
- dropdown/tooltip = `bg-popover`;
- border on floating elements;
- light-mode shadow strategy;
- exact z-index/elevation relationship.

---

## DESIGN §31 — MODULE THEME PORTABILITY CONTRACT

Verify the target module's theme contract lists, where used:

- semantic colors;
- surface tokens;
- typography tokens;
- radius;
- shadows;
- motion;
- chart tokens;
- justified feature-local tokens.

Reject:
- hardcoded hex;
- arbitrary Tailwind CSS-variable classes;
- feature-specific global token definitions.

The module MUST be portable by satisfying only its declared theme contract plus approved
zero-business infrastructure.

---


# 43E-0. GLOBAL DESIGN OWNERSHIP / SCOPE CONTRACT — MANDATORY

Before auditing visual implementation, establish ownership boundaries from the supplied
global design-system document.

Verify explicitly:

## GLOBAL DESIGN SYSTEM OWNS

- semantic color tokens;
- surface/elevation tokens;
- typography;
- radius scale;
- spacing/breakpoint visual rules;
- focus-ring visual rules;
- motion visual rules;
- button/card/table/form/dialog visual patterns;
- global responsive visual patterns;
- global accessibility visual conventions;
- global shell geometry/presentation;
- zero-business UI primitive styling;
- approved visual treatment for charts, drag/drop, tooltips, toasts, loading, empty, and error states.

## ROLE CONTAINER OWNS

- role-specific sidebar/navigation items;
- grouping and shell labels;
- role-specific business page visibility;
- role-specific business context.

## FEATURE MODULE OWNS

- business statuses;
- status-to-semantic-color mapping;
- feature-specific icons;
- static UI constants and business labels;
- API/server data;
- module state;
- tests;
- MSW fixtures/handlers;
- feature behavior.

## MODULE THEME CONTRACT OWNS

- the exact list of global semantic tokens required by the feature;
- justified feature-local visual tokens.

## GLOBAL DESIGN MUST NOT OWN

- business navigation configuration;
- business status registries;
- page-by-page business icon configuration;
- member/plan/payment/business data;
- feature API behavior;
- feature-specific business constants;
- business feature logic.

Any ownership violation MUST be reported separately from ordinary styling defects.

Use:

```text
DESIGN_OWNERSHIP_VIOLATION
```

when business behavior has been placed into the global design layer.

---

# 43E-1. GLOBAL DESIGN TOKEN EXACTNESS GATE — MANDATORY

Where the global design document defines exact token names/mappings, the auditor MUST compare
actual implementation against the complete declared token contract.

For every token consumed by the target module, verify:

```text
Global Design Token
→ Canonical CSS Variable
→ Tailwind / Theme Mapping
→ Module Theme Contract
→ Actual JSX / CSS Usage
```

Explicitly inspect, when present:

### Core surface tokens
```text
--primary
--primary-hover
--primary-subtle
--bg-page
--bg-card
--bg-sidebar
--bg-header
--bg-input
--bg-floating
--bg-overlay
--bg-popover
--surface-hover
--surface-highlight
--surface-zebra
--overlay-backdrop
--focus-ring
--border
--border-focus
--text-primary
--text-secondary
--text-disabled
--text-on-primary
--text-on-danger
--text-on-success
--text-on-info
--skeleton-base
--skeleton-highlight
```

### Status tokens
```text
--success-text
--success-bg
--warning-text
--warning-bg
--danger-text
--danger-bg
--info-text
--info-bg
--purple-text
--purple-bg
```

### Payment tokens
```text
--pay-cash-text
--pay-cash-bg
--pay-upi-text
--pay-upi-bg
--pay-card-text
--pay-card-bg
--pay-bank-text
--pay-bank-bg
```

### Chart tokens
```text
--chart-primary
--chart-success
--chart-danger
--chart-warning
--chart-info
--chart-secondary
--chart-grid
--chart-tooltip-bg
```

### Shadow tokens
```text
--shadow-card
--shadow-popover
--shadow-dialog
--shadow-toast
```

### Geometry / typography tokens
Verify every applicable token in the supplied design source, including:

- layout/header/sidebar/content padding;
- control height;
- touch target;
- table row heights;
- modal/drawer widths;
- page/section/badge/KPI/table/body/caption typography.

Do NOT require tokens that the target module genuinely does not consume.

---

# 43E-2. ERP-SPECIFIC VISUAL RESTRICTION GATE

When the supplied global design document contains product-specific restrictions, verify them
as mandatory source requirements.

Examples from the current Smart Gym 360 source include:

- the core five-color architecture;
- CTA gradients restricted to the landing-page hero and forbidden inside authenticated ERP dashboard surfaces;
- official external integration brand colors preserved in native colors;
- external brand colors not converted into theme colors.

Do not transform product-specific design restrictions into universal web best-practice claims.
They remain source-specific requirements.

---

# 43E-3. EXACT TAILWIND SEMANTIC MAPPING GATE

Where Tailwind semantic mappings are defined, verify actual classes against the canonical mapping.

For example:

```text
bg-primary        → --primary
bg-primary-hover  → --primary-hover
bg-primary-subtle → --primary-subtle
text-primary      → --text-primary
text-secondary    → --text-secondary
text-disabled     → --text-disabled
text-on-primary   → --text-on-primary
text-on-danger    → --text-on-danger
text-on-success   → --text-on-success
text-on-info      → --text-on-info

bg-success        → --success
bg-success-bg     → --success-bg
text-success      → --success-text

bg-danger         → --danger
bg-danger-bg      → --danger-bg
text-danger       → --danger-text

bg-warning        → --warning
bg-warning-bg     → --warning-bg
text-warning      → --warning-text

bg-info           → --info
bg-info-bg        → --info-bg
text-info         → --info-text

bg-page           → --bg-page
bg-card           → --bg-card
bg-header         → --bg-header
bg-sidebar        → --bg-sidebar
bg-input          → --bg-input
bg-floating       → --bg-floating
bg-overlay        → --bg-overlay
bg-popover        → --bg-popover

shadow-card       → --shadow-card
shadow-popover    → --shadow-popover
shadow-dialog     → --shadow-dialog
shadow-toast      → --shadow-toast

border-border     → --border
border-focus      → --border-focus
ring-primary      → --focus-ring
```

Any undefined or semantically mismatched token mapping is a design-system contract failure.

---

# 43E-4. DESIGN SOURCE VALUE-vs-RULE SEPARATION

When auditing the global design source, distinguish:

```text
VALUE SPECIFICATION
RULE / BEHAVIOR
OWNERSHIP
EXAMPLE
IMPLEMENTATION GUIDANCE
```

Do not interpret an illustrative code example as higher authority than an explicit rule.

If an example conflicts with a rule, use `INTERNAL SOURCE CONFLICT`.

Do not silently "fix" the source document while auditing the product.

---


# 43E-5. EXAMPLE / CURRENT-PROJECT DETAIL NON-AUTHORITY GATE

Any concrete example appearing in the audit prompt — including:

- role names;
- feature names;
- route names;
- file names;
- API paths;
- currency examples;
- language lists;
- GymSmart/ERP terminology;
- sample component names;
- sample test folders;

is an ILLUSTRATION only unless it is explicitly marked as a source requirement.

The auditor MUST use the actual supplied repository/documentation values.

Never infer that:
- `members` exists;
- `superadmin` exists;
- `/api/v1/...` has a specific path;
- a specific payment mode exists;
- a specific language is launched;
- a specific component exists;
- a specific test framework is configured;

merely because the audit prompt uses it as an example.

When the supplied source differs from an example in this prompt, the supplied source wins.

Classify any unresolved example-to-source ambiguity as:

```text
PROMPT_EXAMPLE_NOT_AUTHORITATIVE
```

---

# 43F. WEB-SPECIFIC CROSS-LAYER CONTRACT MATRIX

When the target module contains any backend/API interaction, produce this matrix:

| UI Requirement | API Function | HTTP Method | URL Source | Request Params | Request Body | Headers | Response Type | Zod | MSW | Query Key | Loading | Empty | Error | Permission | Tenant | Idempotency | Cache Reconciliation | Formatters | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Then trace each row:

```text
UI
→ Event / Hook
→ API Function
→ Central API Transport
→ Request Contract
→ Backend Contract
→ Response Envelope
→ Zod
→ TanStack Query
→ UI
```

Do not mark aligned if one layer is only implied.

---

# 43G. FRONTEND-TO-BACKEND CONTRACT HANDOFF MATRIX

When backend artifacts are not supplied, this is still a frontend audit.

Verify the frontend side is fully ready for backend integration:

```text
UI Data Requirement
→ API Contract
→ Type
→ Zod
→ MSW
→ Query / Mutation
→ UI Rendering
```

When backend artifacts ARE supplied, additionally compare:

```text
Frontend Contract
↔ Backend Frozen API Contract
↔ Backend DTO
```

but do not expand this into a full backend implementation audit unless the task explicitly
includes backend auditing.

Classify:

```text
FRONTEND_CONTRACT_READY
FRONTEND_CONTRACT_PARTIAL
FRONTEND_BACKEND_CONTRACT_MISMATCH
BACKEND_ARTIFACT_NOT_SUPPLIED
```

---

# 43H. COMPLETE MECHANICAL ENFORCEMENT AUDIT

The audit MUST inspect whether documented architecture rules are mechanically enforced
rather than merely documented.

Where the source requires mechanical enforcement, inspect actual tooling for:

```text
TypeScript
ESLint
Tailwind lint
Import boundaries
No-explicit-any
No-console
Ban TS comments
Magic-value restriction
Case sensitivity
Dependency boundaries
Prettier
Husky
lint-staged
gitleaks
SCA / npm audit
CODEOWNERS
Branch protection
CI build
CI tests
Coverage
```

At minimum compare source intent to actual config:

```text
DOCUMENTED RULE
→ EXPECTED TOOL
→ ACTUAL TOOLING CONFIG
→ ACTUAL RULE
→ CI EXECUTION
→ BLOCKING BEHAVIOR
```

A rule described in documentation but not mechanically enforced MUST NOT be silently marked
as fully enforced.

Classify:

```text
MECHANICALLY_ENFORCED
DOCUMENTED_ONLY
PARTIALLY_ENFORCED
MISCONFIGURED
NOT_VERIFIED
```

---

# 43I. COMPLETE CONFIG / REPOSITORY / CASE-SENSITIVITY AUDIT

Do not limit the audit to the target module source files.

Where required by the target module's architecture contract, inspect:

- `package.json`;
- lockfile;
- `tsconfig.json`;
- Next.js config;
- Tailwind config;
- ESLint config;
- Prettier config;
- Husky/lint-staged;
- CI workflows;
- CODEOWNERS;
- root global CSS/theme;
- canonical API transport;
- logger;
- formatter infrastructure;
- MSW bootstrap.

A shared file is NOT automatically an acceptable dependency.
Classify it using the source's explicit infrastructure qualification criteria.

---

# 43J. COMPLETE RESPONSIBILITY-OWNERSHIP AUDIT

For every file touched by the target module determine:

```text
FILE
→ OWNER
→ RESPONSIBILITY
→ ALLOWED DEPENDENCIES
→ FORBIDDEN DEPENDENCIES
→ TEST OWNER
→ DOCUMENTATION OWNER
```

Verify responsibility alignment against:

- feature module;
- role container;
- application infrastructure;
- global design system;
- backend contract boundary.

Flag:

```text
WRONG_OWNER
RESPONSIBILITY_LEAK
GLOBAL_BUSINESS_LOGIC
ROLE_BUCKET_BUSINESS_LOGIC
FEATURE_OUTSIDE_FEATURE_FOLDER
HIDDEN_SHARED_DEPENDENCY
```

---

# 43K. NO SILENT REQUIREMENT INFERENCE

A UI control MAY be a backend requirement only when evidence shows it:

- submits;
- queries;
- mutates;
- filters;
- sorts;
- paginates;
- depends on server data;
- or requires a backend lifecycle.

A purely visual option remains static UI configuration.

When uncertain:

```text
UNCLEAR_REQUIREMENT
```

Do NOT convert uncertainty into a mandatory backend requirement.

---

# 43L. ZERO-DATA / NULL / MASKING / FORMAT MATRIX

For every field rendered by the target module classify:

```text
NON_NULL
NULLABLE
OPTIONAL
ROLE_MASKED
SENSITIVE
MONETARY
DATE_TIME
IDENTIFIER
STATUS
RELATION
AGGREGATE
```

For each field verify:

- response schema;
- display fallback;
- masking;
- formatting;
- copyability;
- sort/filter semantics;
- mobile behavior;
- accessibility;
- tooltip/truncation where required.

Detect:
- blank null values where en-dash required;
- leaked sensitive value;
- copied restricted value;
- raw minor-unit money;
- raw UTC display;
- undefined masked field crash.

---

# 43M. COMPLETE USER-FLOW RECOVERY MATRIX

For EVERY meaningful flow verify:

```text
START
→ INPUT
→ VALIDATION
→ SUBMIT/ACTION
→ PENDING
→ SUCCESS
→ CACHE/STATE RECONCILIATION
→ FEEDBACK
→ NEXT ACTION
→ ABANDON/CANCEL
→ RETRY
→ ERROR
→ RECOVERY
→ RE-ENTRY
→ REFRESH
→ DIRECT URL
```

Critical actions additionally require:

```text
DOUBLE VERIFICATION
→ IDEMPOTENCY
→ RETRY SAFETY
→ RESULT RECONCILIATION
```

For asynchronous flows:

```text
START
→ 202 / pending
→ status
→ completion
→ failure
→ retry/recovery
```

---

# 43N. FINAL COMPLETE-SOURCE COVERAGE GATE

Before declaring the module audit complete, produce these counts:

```text
FRONTEND DEVELOPMENT DOCUMENT
- Total distinct source rules/sections discovered:
- Applicable:
- PASS:
- FAIL:
- PARTIAL:
- NOT VERIFIED:
- NOT APPLICABLE:
- SOURCE CONFLICT:
- OUTSIDE TARGET SCOPE:
- BLOCKED BY SUPPLIED SCOPE:

GLOBAL DESIGN DOCUMENT
- Total distinct source sections/rules discovered:
- Applicable:
- PASS:
- FAIL:
- PARTIAL:
- NOT VERIFIED:
- NOT APPLICABLE:
- SOURCE CONFLICT:
- OUTSIDE TARGET SCOPE:
- BLOCKED BY SUPPLIED SCOPE:
```

Then produce:

```text
SOURCE COVERAGE INTEGRITY:
[COMPLETE / INCOMPLETE]
```

`INCOMPLETE` MUST be used if ANY supplied document section/rule was not inspected.

---

# 43O. FINAL WEB ACCEPTANCE DEFINITION

The target module MUST NOT be declared fully complete merely because:

- the route renders;
- the page looks good;
- mocks work;
- TypeScript passes;
- lint passes;
- one happy-path test passes;
- UI controls exist;
- API functions exist;
- documentation exists.

The target module is COMPLETE only when all applicable evidence chains close:

```text
DOCUMENTATION
→ ARCHITECTURE RULE
→ FILE OWNERSHIP
→ IMPLEMENTATION
→ DATA / STATE
→ API CONTRACT
→ MSW / TEST CONTRACT
→ UI RENDERING
→ SUCCESS
→ ERROR
→ EMPTY
→ LOADING
→ RECOVERY
→ ACCESSIBILITY
→ RESPONSIVE
→ DESIGN TOKENS
→ SECURITY
→ TOOLING
→ DOCUMENTATION FRESHNESS
```

AND:

```text
ALL APPLICABLE SOURCE RULES
= VERIFIED
```

AND:

```text
ALL SOURCE CONFLICTS
= EXPLICITLY REPORTED
```

AND:

```text
NO UNKNOWN REQUIREMENT
= SILENTLY ASSUMED
```

---

# 43P. FINAL "NOTHING MISSED" ANTI-SKIPPING CHECKLIST

Before final delivery, the AI MUST literally verify:

```text
[ ] Complete frontend development instruction read
[ ] Complete global design document read
[ ] All source rule identifiers extracted
[ ] All source sub-rules extracted
[ ] All source tables checked
[ ] All source prohibitions checked
[ ] All source examples that establish mandatory behavior checked
[ ] All source conflicts reported
[ ] Web Rule 1 checked
[ ] Web Rule 2 checked
[ ] Web Rule 3 checked
[ ] Web Rule 3B checked
[ ] Web Rule 4 checked
[ ] Web Rule 5 checked
[ ] Web Rule 6 checked
[ ] Web Rule 7 checked
[ ] Web Rule 8 checked
[ ] Web Rule 9 checked
[ ] Web Rule 10 checked
[ ] Web Rule 11 checked
[ ] Web Rule 12 checked
[ ] Web Rule 13 checked
[ ] Web Rule 14 checked
[ ] Web Rule 15 checked
[ ] Web Rule 15A checked
[ ] Web Rule 15B checked
[ ] Web Rule 15C checked
[ ] Web Rule 15D checked
[ ] Web Rule 15E checked
[ ] Web Rules 16–30 checked
[ ] Web Rules 31–40 checked
[ ] Web Rules 41–55 checked
[ ] Web Rules 56–61 checked
[ ] Web Rules 62–74 checked
[ ] Web Rule 75 checked
[ ] Web Rules 75A–75D checked
[ ] Web Rules 76–84 checked
[ ] Extended Rule 14 checked
[ ] Extended Rule 15 checked
[ ] Extended Rule 16 checked
[ ] Extended Rule 17 checked
[ ] Extended Rule 18 checked
[ ] Extended Rule 19 checked
[ ] Extended Rule 20 checked
[ ] Extended Rule 21 checked
[ ] Design §1 checked
[ ] Design §1A checked
[ ] Design §1B checked
[ ] Design §1C checked
[ ] Design §2 checked
[ ] Design §3 checked
[ ] Design §4 checked
[ ] Design §5 + every applicable subpattern checked
[ ] Design §6 checked
[ ] Design §7 checked
[ ] Design §8 checked
[ ] Design §9 checked
[ ] Design §10 checked
[ ] Design §11 checked
[ ] Design §12 checked
[ ] Design §13 checked
[ ] Design §14 checked
[ ] Design §15 checked
[ ] Design §16 checked
[ ] Design §17 checked
[ ] Design §18 checked
[ ] Design §19 checked
[ ] Design §20 checked
[ ] Design §21 checked
[ ] Design §22 checked
[ ] Design §23 checked
[ ] Design §24 checked
[ ] Design §25 checked
[ ] Design §26 checked
[ ] Design §27 checked
[ ] Design §28 checked
[ ] Design §29 checked
[ ] Design §30 checked
[ ] Design §31 checked
[ ] Design ownership boundary checked
[ ] Exact token mappings checked where supplied
[ ] ERP/product-specific restrictions checked only when actually present in source
[ ] Prompt examples not treated as authoritative project requirements
[ ] UI Data Requirements complete
[ ] API Contract complete
[ ] Type/Zod parity complete
[ ] MSW complete
[ ] Query/mutation state complete
[ ] Loading/empty/error complete
[ ] Retry/recovery complete
[ ] Security/RBAC complete
[ ] Accessibility complete
[ ] Responsive 375/768/1280 complete
[ ] Narrow 320px checked where applicable
[ ] Theme contract complete
[ ] CI/tooling enforcement checked
[ ] Dependency guardrail checked
[ ] Case sensitivity checked
[ ] Source conflicts reported
[ ] Documentation freshness checked
[ ] No unverified item silently presented as PASS
```

The audit MUST stop and report `INCOMPLETE AUDIT` if any required checklist item is not completed.

---

# 43Q. FINAL REPAIR-SAFETY RULE

The audit prompt is also a repair specification.

When a coding agent executes a repair:

```text
AUDIT FINDING
→ DOCUMENTED REQUIREMENT
→ MINIMUM CHANGE SET
→ TARGET FEATURE ONLY
→ REQUIRED GLOBAL INFRASTRUCTURE EXCEPTION (IF ANY)
→ TEST
→ REGRESSION TEST
→ DOCUMENTATION UPDATE
→ TOOLING CHECK
→ FINAL VERIFICATION
```

Never allow a repair to introduce:

- sibling business dependencies;
- global business abstractions;
- duplicate global mock data;
- direct API calls in presentation components;
- server data in client-only stores;
- hidden hardcoded demo data;
- arbitrary theme tokens;
- unapproved package dependencies;
- bypassed security gates;
- stale documentation.

---

# 43R. FINAL HANDOFF QUALITY BAR

The final audit/repair package must be understandable to a second AI with minimal context.

It MUST contain:

1. Exact current state.
2. Exact source requirement.
3. Exact implementation evidence.
4. Exact issue.
5. Exact file(s).
6. Exact repair responsibilities.
7. Exact files that MUST NOT change.
8. Exact tests.
9. Exact verification.
10. Exact DONE condition.
11. Exact remaining uncertainty.
12. Exact source conflicts.
13. Exact scope limitations.
14. Exact before/after score where scoring is enabled.

The second AI should be able to verify the claim without reconstructing the architecture itself.

---


# 43S. AI INTROSPECTION & AGENTIC COMPATIBILITY AUDIT (RULES 22 & 23)

Audit the module for strict AI-Introspection compatibility.

Check Rule 22:
* Does every interactive element (button, input, select, link) have a strictly formatted `data-testid`?
* Does every critical status badge, error boundary fallback, and empty state have a `data-testid`?
* Format expected: `data-testid="[module]-[component]-[action/state]"`

Check Rule 23:
* Does every Custom Hook have an exhaustive JSDoc describing its state dependencies and intent?
* Does every complex React Component have a JSDoc explicitly noting edge cases and dependencies?
* Does every State Store (Zustand) have a JSDoc block?

For every missing AI introspection artifact:
* Identify the file/element.
* Explain why an AI E2E Agent (Playwright) or autonomous coder would fail without it.
* Provide the EXACT `data-testid` or `JSDoc` string that must be added during repair.


# 44. AI EXECUTION & DELIVERY PROTOCOL (MANDATORY)

IMPORTANT: The execution protocol MUST obey the source-conflict and source-coverage rules above.
A successful build cannot override an unresolved architectural-document conflict, and an
unverified source rule cannot be silently marked PASS.



When this audit transitions into the REPAIR phase, the coding agent MUST adhere to the following execution and delivery rules to ensure stability, prevent context timeouts, and enable external verification.

### PHASE-WISE EXECUTION & CHECKLIST
1. The AI MUST perform fixes **phase-wise** using a strict, visible **Task List / Checklist**.
2. Before modifying any code, the AI must output the complete checklist of fixes derived from the audit.
3. Fixes must be executed in manageable batches (phases). This ensures no requirement is skipped and prevents the AI from hitting conversation length limits or execution timeouts.

### PRE-REPAIR CONTRACT LOCK

Before changing code, the AI MUST freeze:
- the discovered applicable source-rule set;
- the current module route map;
- the current API/data contract;
- the current test baseline;
- the current design-token dependencies;
- source conflicts;
- outside-scope dependencies.

Repairs MUST NOT silently change the frozen requirement interpretation.

### BUILD VERIFICATION LIMITATIONS
1. **If the AI has access to terminal commands:** It MUST proactively run `npx tsc --noEmit` and `npm run build` to verify its own fixes before delivering the ZIP.
2. **If the AI does NOT have access to terminal commands:** The AI is not required to run these commands. The human developer will download the code and run the build locally.
3. In all cases, the AI MUST use extreme caution, rigorous type-checking logic, and strict adherence to the architecture documents to ensure the delivered code is structurally sound. The goal is that when the human runs `npm run build`, it either passes immediately or requires only trivial minor fixes.

### VERSIONED ZIP DELIVERY
1. The AI MUST deliver the repaired codebase as a downloadable **ZIP archive**.
2. The ZIP file MUST be explicitly versioned. 
   - Initial delivery: e.g., `[module_name]_fix_v1.zip`
3. If the user returns with subsequent feedback (e.g., build errors or missing fixes), the AI will apply the corrections and provide a new versioned ZIP:
   - Major structural changes: `[module_name]_fix_v2.zip`
   - Minor tweaks/typo fixes: `[module_name]_fix_v1.1.zip`

### CHANGELOG & VERIFICATION DOCUMENT
1. Alongside every ZIP delivery, the AI MUST generate a dedicated Markdown file (e.g., `[module_name]_changelog_v1.md`).
2. This document MUST detail **exactly what was fixed** in this specific version, mapped directly to the original audit findings.
3. **Purpose:** The human developer will provide this `.md` file and the `v1.zip` to a secondary verification AI. The secondary AI will cross-reference the changelog against the actual code. If the secondary AI reports that a promised fix is missing or incomplete, the developer will feed that feedback back to the primary AI for the `v2` cycle. The changelog must therefore be highly specific and accurate.