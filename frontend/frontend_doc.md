
# Final Consolidated Improvement Documentation  
## AI-First Frontend Development Rules + Global Design System

Maine dono uploaded documents ko combine karke analysis kiya hai:  
1. **`frontend_development_instruction.md`**  
2. **`global_design_system.md`**

Base architecture kaafi strong hai—especially modular isolation, Next.js boundaries, MSW, strict CI/security gates, API contracts, and UI consistency. Lekin production-grade AI frontend workflow ke liye kuch missing policies aur kuch conflicts clear karne zaroori hain.

## Final Current Rating: **8.2 / 10**

| Area | Rating | Status |
|---|---:|---|
| AI-friendly architecture | 9.2/10 | Strong |
| Module isolation | 9/10 | Strong |
| Next.js architecture | 8.5/10 | Strong, needs server-state clarification |
| UI / design system | 8.8/10 | Strong |
| Security and CI controls | 8.5/10 | Strong |
| Testing architecture | 3/10 | Critical missing area |
| Form architecture | 5/10 | UI exists, engineering rules missing |
| State/data fetching policy | 6.5/10 | Needs exact boundaries |
| Environment configuration | 3/10 | Critical missing |
| Observability / monitoring | 4/10 | Missing |

After implementing the recommendations below, expected rating: **9.3 / 10**.

---

# A. Existing Rules That Should Stay As They Are

These are already excellent and should **not be removed**:

- **Rule 1:** Micro-modularization and module-prefixed folders  
- **Rule 7:** Type isolation and `import type` discipline  
- **Rule 8:** Server vs Client Component boundaries  
- **Rule 9:** `loading.tsx`, `error.tsx`, and `not-found.tsx`  
- **Rule 13:** AI feature-map documentation  
- **Rule 14:** Backend-driven success/error messages  
- **Rule 15:** Debounced search and server-side filtering/pagination  
- **Rule 60:** Strict TypeScript configuration  
- **Rule 62:** Standardized `ApiResponse<T>` contract  
- **Rule 65:** Mechanical enforcement using ESLint, Husky, lint-staged, type-checking  
- **Rule 66:** Dependency-addition guardrail  
- **Rule 67:** No cross-module imports / portable-folder rule  
- **Rule 78:** SCA + secret scanning in CI  
- **Rule 79:** MSW stub-first development  
- **Rule 80:** CODEOWNERS human review for security-sensitive UI  
- Global design rules for accessibility, focus states, tooltips, tables, modals, formatting, print styles, z-index, and destructive confirmation UX.

---

# B. Mandatory Updates to Existing Rules

---

## 1. Update Rule 1 — Add File-Type-Specific Limits

### Exact position
Add this immediately after the current **“File Size Ceiling”** paragraph in Rule 1.

### Add

```md
### Extended File Size Ceilings

The component size limit alone is insufficient. AI agents also lose context in large hooks, stores, schemas, and utility files.

- React Component (`.tsx`): maximum 300 lines
- Custom Hook (`use*.ts`): maximum 150 lines
- Utility / formatter (`*.utils.ts`): maximum 120 lines
- Zustand Store (`*.store.ts`): maximum 180 lines
- Zod Schema / type file (`*.types.ts`, `*.schema.ts`): maximum 200 lines
- API service file (`*.api.ts`): maximum 200 lines

If a file exceeds its limit:
- Split by feature responsibility, not randomly by line count.
- Do not create generic dumping folders such as `helpers/`, `common/`, or `misc/`.
- Keep extracted files inside the same feature folder wherever possible.
```

### Why
Current rule only limits `.tsx` files. In real AI-generated projects, large hooks and utility files become the next source of hallucination, duplicated logic, and difficult debugging.

---

## 2. Update Rule 7 — Strong TypeScript and Runtime Validation

### Exact position
Add after the existing `import type` section in Rule 7.

### Add

```md
### TypeScript Strictness and Runtime Contract Validation

The project MUST enforce the following `tsconfig.json` settings:

{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUncheckedIndexedAccess": true,
  "verbatimModuleSyntax": true
}

Rules:
- `any` is strictly forbidden. Use `unknown` and narrow it safely.
- `@ts-ignore` and `@ts-nocheck` are forbidden.
- All API response payloads must be validated at the API boundary using Zod before application code consumes them.
- Prefer backend-generated OpenAPI types where an OpenAPI/Swagger contract exists.
- Generated API types must remain separate from domain/UI types.

Recommended structure:
[moduleName]_types/
  api.generated.ts
  [moduleName].schema.ts
  [moduleName].types.ts
```

### Why
`ApiResponse<T>` provides compile-time typing, but TypeScript cannot validate real backend data at runtime. Zod prevents malformed API payloads from silently breaking the UI.

---

## 3. Update Rule 8 — Clarify Server Component and Client Data Rules

### Exact position
Add after the current Rule 8 explanation.

### Add

```md
### Server Data vs Client Data Rule

Use Server Components for:
- Initial page-level data required to render the route.
- Secure server-only operations.
- SEO-relevant content.
- Reading server-only environment variables.

Use Client Components for:
- Forms, filters, live search, table interactions, modals, dropdowns, charts, and browser APIs.
- Client-side mutation workflows.
- WebSocket-driven UI updates.

Do not duplicate the same endpoint fetch in both `page.tsx` and a client hook without an explicit hydration strategy.

If initial server data is passed into a Client Component:
- Document the query key.
- Hydrate/cache it through the approved server-state library.
- Avoid maintaining an unrelated duplicate local state copy.
```

### Why
Current rule correctly promotes Server Components, but it does not define how page-level initial server data should interact with client-side cache, refetches, filters, and mutations.

---

## 4. Update Rule 9 — Add Granular Error Boundaries and Monitoring

### Exact position
Add after the existing `error.tsx` bullet in Rule 9.

### Add

```md
### Granular Error Boundary and Error Reporting Rules

Route-level `error.tsx` is mandatory but not enough.

Every independently loaded or independently fetched UI section must be wrapped in a section-level Error Boundary where failure should not crash the entire route.

Examples:
- Dashboard chart
- Analytics widget
- Data table
- Payment summary panel
- WebSocket activity feed

Requirements:
- Use a standard shared `ErrorBoundary` implementation.
- Display a module-specific fallback matching the global design system.
- Provide a Retry action where retrying is meaningful.
- Never expose raw stack traces, backend errors, tokens, or internal error details to users.
- Log caught errors to the approved monitoring provider with:
  - route
  - module name
  - user ID if safely available
  - error digest / request ID
  - timestamp

Error fallback hierarchy:
1. Component/section boundary
2. Module-level boundary
3. Route-level `error.tsx`
4. Global application boundary
```

### Why
A dashboard chart failing should not blank out the full page. This creates graceful degradation and gives support teams proper diagnostics.

---

## 5. Update Rule 13 — Replace Vague Feature Map Requirement With a Template

### Exact position
Add immediately after Rule 13’s current checklist.

### Add

```md
### Mandatory `[moduleName]_features.md` Template

Every module feature map MUST use this minimum structure:

# [Module Name] Feature Map

## Module Purpose
Brief business explanation of what this module does.

## Directory Structure
Explain each module-prefixed folder and its responsibility.

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|

## Data and State Architecture
- Server-state query keys:
- Zustand stores:
- Context providers:
- Local-storage keys:
- MSW handler file:

## API Contract
List all endpoint builders and expected response types.

## Permissions and Security
Document protected actions, roles, and CODEOWNERS paths.

## Loading, Empty, Error States
Document corresponding components/files for each main feature.

## Edge Cases / AI Warnings
List known product constraints, destructive actions, and common regression risks.

## Rule Compliance Checklist
- [ ] Rule 1: Micro-modularization
- [ ] Rule 7: Type isolation
- [ ] Rule 8: Server/client boundary
- [ ] Rule 9: Loading/error/not-found handling
- [ ] Rule 14: Backend-driven messages
- [ ] Rule 15A: Tests present
- [ ] Rule 79: MSW handler present where needed
```

### Why
Current instruction says “exhaustive list,” but AI agents need a fixed schema; otherwise every module documentation file will be inconsistent.

---

## 6. Update Rule 15 — Expand Performance Architecture

### Exact position
Append these points after existing debounce and server-side pagination/filtering bullets.

### Add

```md
### Additional Performance Requirements

- Use `next/image` for all content images. Raw `<img>` tags are forbidden unless there is a documented technical exception.
- Above-the-fold images must have explicit dimensions and appropriate priority behavior.
- Heavy charts, editors, maps, PDF viewers, and rich media components must use dynamic import/code splitting.
- Every asynchronous data section must show a skeleton matching its final layout.
- Use a spinner only for short button-level loading states.
- Do not apply `React.memo`, `useMemo`, or `useCallback` blindly.
  - Use `React.memo` only for frequently re-rendering presentational children.
  - Use `useMemo` only for measurably expensive calculations.
  - Use `useCallback` only when necessary for memoized child props or dependency stability.
- Bundle impact must be checked for large dependency additions or major feature releases.
- Avoid importing full libraries where tree-shakable or lighter alternatives exist.
```

### Why
The original performance rule is good for API traffic but incomplete for rendering, images, hydration, bundle size, and perceived loading UX.

---

## 7. Update Rule 61 — Improve Browser Storage Policy

### Exact position
Replace the existing short Rule 61 text with the following expanded version.

### Replace with

```md
61. No Direct Browser Storage Access in Components

Never call `window.localStorage`, `sessionStorage`, or `document.cookie` directly inside React components.

Use approved isolated hooks/services:
- `useLocalStorage` for non-sensitive persisted UI preferences.
- Secure HTTP-only cookies for authentication/session tokens.
- Never store access tokens, refresh tokens, passwords, payment data, or permission grants in localStorage.

All storage keys must:
- Be defined in a centralized constants file.
- Be namespaced by application and module.
- Have a documented schema/version where persisted object data is used.

Example:
APP_MODULE_FILTERS_V1
APP_DASHBOARD_LAYOUT_V1
```

### Why
The current rule prevents direct access but does not distinguish safe preference storage from sensitive security data.

---

## 8. Update Rule 65 — Expand Tooling Gates

### Exact position
Append after the current Rule 65 text.

### Add

```md
### Required CI Quality Gates

Every pull request must run:

1. Type Check
   - `tsc --noEmit`

2. Lint and Formatting
   - ESLint
   - Tailwind class validation
   - Prettier formatting check

3. Tests
   - Unit and component tests
   - Coverage threshold validation

4. Build
   - Production build must succeed

5. Security
   - Dependency vulnerability scan
   - Secret detection scan

6. E2E Tests
   - Mandatory for authentication, billing, permissions, destructive actions, and critical CRUD flows.

No PR may merge if a required gate fails.
```

### Why
Rule 65 mentions “tests,” but currently no testing framework, coverage expectation, or E2E policy exists.

---

# C. New Rules to Add

---

## NEW RULE 15A — Mandatory Testing Strategy

### Exact position
Insert directly after Rule 15 and before Rule 16.

```md
15A. Mandatory Testing Architecture

AI-generated code is not considered complete until the required tests exist.

Approved stack:
- Unit tests: Vitest
- React component tests: React Testing Library
- E2E tests: Playwright
- API/network mocking: MSW

Co-location rule:
- `MemberTable.tsx` → `MemberTable.test.tsx`
- `useMembers.ts` → `useMembers.test.ts`
- `member.utils.ts` → `member.utils.test.ts`

Minimum expectations:
- Utilities: 90% branch coverage
- Custom hooks: 80% coverage
- Core components: interaction tests for loading, success, empty, error, and disabled states
- Critical journeys: Playwright E2E coverage

Mandatory E2E flows:
- Login/logout/session expiry
- Permission-denied states
- Create/edit/delete workflows
- Type-to-confirm destructive action flows
- Billing or payment workflows
- Important table filtering, pagination, and export workflows

Testing rules:
- Test user-visible behavior, not internal implementation details.
- Do not use snapshots for dynamic, complex UI as a substitute for assertions.
- Reuse Rule 79 MSW handlers in unit/component tests.
- A bug fix must include a regression test if reasonably testable.
```

### Why
This is the largest gap in the current frontend documentation. Without test policy, AI can generate code that compiles but breaks workflows, permissions, forms, and edge cases.

---

## NEW RULE 15B — Form Engineering Architecture

### Exact position
Insert immediately after Rule 15A.

```md
15B. Form Management, Validation, and Submission Architecture

All non-trivial forms MUST use:
- React Hook Form
- Zod
- `@hookform/resolvers`

Form structure:
[Feature]Form/
  [Feature]Form.tsx
  use[Feature]Form.ts
  [feature].form.schema.ts
  [Feature]Form.test.tsx

Responsibilities:
- Form component: layout and field composition only.
- Custom form hook: form setup, submit orchestration, mutation state.
- Zod schema: validation and typed input/output contract.
- API layer: request/response communication only.

Validation rules:
- Validate client-side for immediate UX.
- Backend remains the final authority for validation.
- Display field validation errors inline below fields.
- Display backend response `message` for server-level errors as per Rule 14.
- Never show raw API error objects to users.

Submission rules:
- Disable submit button while the request is pending.
- Prevent duplicate submission.
- Reset only after confirmed successful response.
- Preserve entered data after failed requests unless product requirements say otherwise.
- All destructive form actions must follow the global Type-to-Confirm design rule.

File upload rules:
- Validate MIME type, extension, and max file size before upload.
- Show upload progress where supported.
- Never trust client validation alone; backend validation remains mandatory.
```

### Why
The global design system defines form visuals, but engineering rules for validation, submissions, API failures, controlled/uncontrolled inputs, and file uploads were missing.

---

## NEW RULE 15C — Server-State and Client-State Management

### Exact position
Insert after Rule 15B.

```md
15C. State Management Decision Matrix

State must be placed according to its ownership and lifecycle.

1. Server State — TanStack Query / React Query
Use for:
- API responses
- Loading/error states from APIs
- Caching
- Pagination
- Background refetching
- Mutations and invalidation

Rules:
- Backend data MUST NOT be stored as the primary source of truth in Zustand or Context.
- Every query key must be namespaced by module:
  `['members', 'list', filters]`
  `['members', 'detail', memberId]`
- After mutations, invalidate or update the relevant query cache intentionally.
- Do not refetch the whole application after a small mutation.

2. Zustand — Module-Level Shared Client State
Use for:
- Active filter UI state
- Selected rows
- Table column preferences
- Multi-step wizard progress
- Local draft state shared by multiple client components

Rules:
- Stores should remain module-scoped.
- Avoid one giant global store.
- Do not put API response data into a Zustand store unless there is a documented offline/realtime requirement.

3. React Context
Use only for stable cross-tree concerns:
- Theme
- Locale
- Auth session shell
- App-wide feature flags

4. Local State
Use `useState` or `useReducer` for component-private UI state:
- Modal open/close
- Input visibility
- Hover/focus state
- Local tab selection

Before creating a new global state container, document why local state, props, URL parameters, or React Query cannot solve the need.
```

### Why
The documentation mentions Context/Zustand but lacks a strict server-state policy. This is one of the most common causes of stale UI data and difficult AI-generated bugs.

---

## NEW RULE 15D — Environment Variables and Configuration

### Exact position
Insert after Rule 15C.

```md
15D. Environment Variable and Runtime Configuration Management

Required files:
- `.env.example` — committed; contains every required key with empty/sample values.
- `.env.local` — local secrets; never committed.
- `.env.development` — non-secret development configuration where needed.
- `.env.production` — non-secret production configuration where platform policy permits.

Rules:
- Variables prefixed with `NEXT_PUBLIC_` are public browser-visible values.
- Never place secrets, private API keys, database URLs, token signing keys, or payment secrets in `NEXT_PUBLIC_` variables.
- Do not access `process.env` directly from arbitrary components/hooks.
- Validate environment variables in one central configuration module using Zod.
- Fail fast at startup if required configuration is missing or malformed.
- Document every environment variable in `.env.example`.

Recommended structure:
src/config/env.ts
src/config/app-config.ts
```

### Why
There is security scanning for accidental secrets, but there is no formal policy preventing secret exposure or handling missing runtime configuration.

---

## NEW RULE 15E — Observability and Product Diagnostics

### Exact position
Insert after Rule 15D.

```md
15E. Frontend Observability and Diagnostics

Production frontend errors must be observable without exposing sensitive information to users.

Requirements:
- Integrate an approved error-monitoring solution.
- Capture route, module, anonymized user/session context where allowed, request ID, and error digest.
- Never send passwords, tokens, full payment data, or sensitive personal data in logs.
- Use structured frontend events for critical business workflows:
  - login failure
  - payment failure
  - failed export
  - destructive action failure
  - repeated API error
- Use `console.log` only in local development where allowed by Rule 65; it must not remain in production code.
- Define an owner and alert policy for critical failures.
```

### Why
`error.tsx` helps users recover, but production teams also need visibility into what failed and where.

---

## NEW RULE 81 — CI/CD Merge Policy

### Exact position
Insert after current Rule 80.

```md
81. CI/CD Merge Policy and Branch Protection

Every pull request must pass the following pipeline before merge:

1. Quality
   - ESLint
   - Prettier check
   - Tailwind linting
   - TypeScript type check

2. Security
   - Dependency vulnerability scan
   - Secret scan
   - License/compliance scan if required by the organization

3. Tests
   - Vitest unit/component tests
   - Coverage thresholds
   - Playwright E2E tests for applicable critical flows

4. Build
   - Production Next.js build
   - Bundle analysis for major changes

5. Review
   - Mandatory CODEOWNERS approval for auth, permissions, billing, payment, and security-sensitive paths.
   - AI-generated PR descriptions must list files changed, tests run, risk areas, and rollback impact.

Branch protection requirements:
- No direct push to `main`.
- No merge with failing checks.
- No bypass for CODEOWNERS on security-sensitive files.
- Require at least one human approval for all AI-generated changes.
```

### Why
Rule 78 and Rule 80 are strong individually, but there should be one final rule that defines exactly what blocks merge.

---

# D. Global Design System Improvements

The global design system is visually detailed and strong. These are the main missing additions.

---

## Add to Global Design System Section 5c — Form Layout

### Exact position
At the end of **Section 5c. Form Layout**.

```md
### Form Interaction States

Every form field must explicitly support:
- Default
- Hover
- Focus-visible
- Filled
- Validation error
- Validation success where meaningful
- Disabled
- Read-only
- Loading/submitting

Accessibility requirements:
- Every input must have a programmatically associated `<label>`.
- Error text must be connected through `aria-describedby`.
- Invalid fields must expose `aria-invalid="true"`.
- Required fields must be marked semantically, not only through color.
- Error messages must be announced accessibly where appropriate.
```

### Why
Current visual spec is good, but it needs semantic accessibility behavior—not only styling.

---

## Add to Global Design System Section 5b — Tables

### Exact position
After the existing table empty-state rules.

```md
### Table Accessibility and Interaction Rules

- Tables must preserve semantic HTML structure: `table`, `thead`, `tbody`, `th`, `td`.
- Sortable headers must expose current sorting state through accessible labels.
- Row-click navigation must not prevent keyboard users from reaching inline actions.
- Row actions must be keyboard accessible.
- On mobile, choose one documented pattern:
  1. Horizontal scroll with frozen primary identifier, or
  2. Convert each record into an accessible card layout.
- Never hide essential financial, status, or permission information solely because of viewport size.
```

### Why
Enterprise tables are a major interaction surface; row click, sorting, responsive layout, and keyboard access must be standardized.

---

## Add to Global Design System Section 13 — Accessibility

### Exact position
After current WCAG focus-ring rule.

```md
4. Keyboard Navigation and Screen Reader Requirements

- All interactive UI must be usable using keyboard only.
- Dialogs must trap focus, autofocus an appropriate element, and restore focus to the trigger on close.
- Escape must close dismissible dialogs, popovers, and menus.
- Icon-only buttons must have accessible labels.
- Status colors must never be the only way to communicate meaning.
- Respect `prefers-reduced-motion` for non-essential animation.
- Minimum contrast must meet WCAG AA requirements.
```

### Why
Focus rings are only one part of accessibility. Dialog focus management, icon labels, contrast, motion, and keyboard interaction are essential.

---

## Add New Global Design System Section 23 — Responsive and Mobile Policy

### Exact position
Add after current Section 22.

```md
## 23. RESPONSIVE AND MOBILE INTERACTION POLICY

- Define standard breakpoints centrally and do not introduce arbitrary one-off breakpoints.
- Desktop-first ERP layouts must remain fully usable at tablet widths.
- Sidebars must collapse into a controlled drawer on smaller screens.
- Minimum interactive touch target: 44 × 44px where practical.
- Dense data tables must use the approved mobile table strategy.
- Sticky action bars must not obscure form fields or mobile browser controls.
- Test core workflows at mobile, tablet, and desktop widths before merge.
```

### Why
The design system defines individual components but needs a global responsive behavior policy.

---

## Add New Global Design System Section 24 — Empty, Loading, Error, and Permission States

### Exact position
Add after Section 23.

```md
## 24. ASYNC UI STATE SYSTEM

Every data-driven feature must define all of the following:

1. Loading State
   - Use layout-matching skeletons.
   - Avoid full-page spinners except for very short transitional actions.

2. Empty State
   - Explain why the list is empty.
   - Offer a contextual action where the user has permission to create/import data.

3. Error State
   - Use a concise user-safe explanation.
   - Provide Retry when appropriate.
   - Never expose raw technical errors.

4. Permission-Denied State
   - Explain that access is restricted.
   - Do not show disabled destructive controls without explanation.
   - Provide a clear next step, such as contacting an administrator, where suitable.

5. Offline/Connection State
   - Show a non-blocking connection indicator for realtime/network-dependent features.
```

### Why
The frontend architecture mentions loading and errors, but the design system should define their visual and UX standards consistently.

---

# E. Rules to Remove, Merge, or Correct

| Existing area | Action | Reason |
|---|---|---|
| Rule 64: “Merged with Rule 7” | Remove the numbered placeholder or renumber rules cleanly | A visible empty rule confuses humans and AI agents. |
| Hardcoded preset/mock reference in Rule 13 | Update | Rule 79 prohibits hardcoded mock data in components/hooks; feature map should document MSW handlers, not endorse local hardcoded mock APIs. |
| “Fetch initial data securely” in Rule 8 | Clarify | Server Components can fetch securely, but not all page data should always be fetched server-side. Add Rule 15C policy. |
| `npm audit --audit-level=high` as the only SCA method | Update | Keep it as baseline, but allow an approved SCA tool because `npm audit` alone may create noise or miss organization-specific policy needs. |
| Generic “tests” inside Rule 65 | Move/expand | Keep Rule 65 as enforcement; detailed test practices should reside in new Rule 15A. |
| Directly prescribing a specific monitoring vendor | Keep vendor-neutral | Use “approved monitoring provider,” so architecture does not become locked to Sentry/LogRocket unnecessarily. |
| Direct raw `<img>` ban without exception | Update wording | Make `next/image` default/mandatory, but permit documented exceptions for third-party controlled markup, emails, SVG assets, or technically incompatible external content. |

---

# F. Final Recommended Implementation Priority

## Phase 1 — Critical, Do First

1. **Add Rule 15A: Testing Strategy**
2. **Add Rule 15B: Form Architecture**
3. **Add Rule 15C: Server vs Client State Policy**
4. **Add Rule 15D: Environment Variable Policy**
5. **Expand Rule 65 + add Rule 81 CI/CD merge policy**
6. **Expand Rule 9 for monitoring and section-level error boundaries**

These changes remove the highest-risk gaps in AI-generated frontend code.

---

## Phase 2 — High Impact

1. Update Rule 1 file limits for hooks/utils/stores.
2. Add Zod runtime validation to Rule 7.
3. Improve Rule 13 with a mandatory module feature-map template.
4. Expand Rule 15 for image optimization, code splitting, skeletons, and bundle checks.
5. Add async UI-state standards to the design system.

---

## Phase 3 — Quality and Scale

1. Improve mobile/responsive design standards.
2. Add deep keyboard and screen-reader requirements.
3. Standardize frontend observability.
4. Formalize visual regression testing for the design system.
5. Add Storybook or equivalent component documentation policy if the component library grows.

---

# Final Verdict

Your current documentation is already above average because it does not just focus on “writing clean code”; it actively designs for **AI isolation, prevention of hallucinated cross-module changes, strict security gates, and enterprise UX consistency**.

The major missing pillars are:

- **Testing**
- **Form engineering**
- **Server-state vs client-state ownership**
- **Environment safety**
- **Observability**
- **Clear CI merge enforcement**
- **Complete accessibility interaction behavior**

Once these changes are added, the documentation becomes a strong **AI-first, enterprise frontend operating system**, not just a list of coding rules.# Final Consolidated Improvement Documentation  
## AI-First Frontend Development Rules + Global Design System

Maine dono uploaded documents ko combine karke analysis kiya hai:  
1. **`frontend_development_instruction.md`**  
2. **`global_design_system.md`**

Base architecture kaafi strong hai—especially modular isolation, Next.js boundaries, MSW, strict CI/security gates, API contracts, and UI consistency. Lekin production-grade AI frontend workflow ke liye kuch missing policies aur kuch conflicts clear karne zaroori hain.

## Final Current Rating: **8.2 / 10**

| Area | Rating | Status |
|---|---:|---|
| AI-friendly architecture | 9.2/10 | Strong |
| Module isolation | 9/10 | Strong |
| Next.js architecture | 8.5/10 | Strong, needs server-state clarification |
| UI / design system | 8.8/10 | Strong |
| Security and CI controls | 8.5/10 | Strong |
| Testing architecture | 3/10 | Critical missing area |
| Form architecture | 5/10 | UI exists, engineering rules missing |
| State/data fetching policy | 6.5/10 | Needs exact boundaries |
| Environment configuration | 3/10 | Critical missing |
| Observability / monitoring | 4/10 | Missing |

After implementing the recommendations below, expected rating: **9.3 / 10**.

---

# A. Existing Rules That Should Stay As They Are

These are already excellent and should **not be removed**:

- **Rule 1:** Micro-modularization and module-prefixed folders  
- **Rule 7:** Type isolation and `import type` discipline  
- **Rule 8:** Server vs Client Component boundaries  
- **Rule 9:** `loading.tsx`, `error.tsx`, and `not-found.tsx`  
- **Rule 13:** AI feature-map documentation  
- **Rule 14:** Backend-driven success/error messages  
- **Rule 15:** Debounced search and server-side filtering/pagination  
- **Rule 60:** Strict TypeScript configuration  
- **Rule 62:** Standardized `ApiResponse<T>` contract  
- **Rule 65:** Mechanical enforcement using ESLint, Husky, lint-staged, type-checking  
- **Rule 66:** Dependency-addition guardrail  
- **Rule 67:** No cross-module imports / portable-folder rule  
- **Rule 78:** SCA + secret scanning in CI  
- **Rule 79:** MSW stub-first development  
- **Rule 80:** CODEOWNERS human review for security-sensitive UI  
- Global design rules for accessibility, focus states, tooltips, tables, modals, formatting, print styles, z-index, and destructive confirmation UX.

---

# B. Mandatory Updates to Existing Rules

---

## 1. Update Rule 1 — Add File-Type-Specific Limits

### Exact position
Add this immediately after the current **“File Size Ceiling”** paragraph in Rule 1.

### Add

```md
### Extended File Size Ceilings

The component size limit alone is insufficient. AI agents also lose context in large hooks, stores, schemas, and utility files.

- React Component (`.tsx`): maximum 300 lines
- Custom Hook (`use*.ts`): maximum 150 lines
- Utility / formatter (`*.utils.ts`): maximum 120 lines
- Zustand Store (`*.store.ts`): maximum 180 lines
- Zod Schema / type file (`*.types.ts`, `*.schema.ts`): maximum 200 lines
- API service file (`*.api.ts`): maximum 200 lines

If a file exceeds its limit:
- Split by feature responsibility, not randomly by line count.
- Do not create generic dumping folders such as `helpers/`, `common/`, or `misc/`.
- Keep extracted files inside the same feature folder wherever possible.
```

### Why
Current rule only limits `.tsx` files. In real AI-generated projects, large hooks and utility files become the next source of hallucination, duplicated logic, and difficult debugging.

---

## 2. Update Rule 7 — Strong TypeScript and Runtime Validation

### Exact position
Add after the existing `import type` section in Rule 7.

### Add

```md
### TypeScript Strictness and Runtime Contract Validation

The project MUST enforce the following `tsconfig.json` settings:

{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUncheckedIndexedAccess": true,
  "verbatimModuleSyntax": true
}

Rules:
- `any` is strictly forbidden. Use `unknown` and narrow it safely.
- `@ts-ignore` and `@ts-nocheck` are forbidden.
- All API response payloads must be validated at the API boundary using Zod before application code consumes them.
- Prefer backend-generated OpenAPI types where an OpenAPI/Swagger contract exists.
- Generated API types must remain separate from domain/UI types.

Recommended structure:
[moduleName]_types/
  api.generated.ts
  [moduleName].schema.ts
  [moduleName].types.ts
```

### Why
`ApiResponse<T>` provides compile-time typing, but TypeScript cannot validate real backend data at runtime. Zod prevents malformed API payloads from silently breaking the UI.

---

## 3. Update Rule 8 — Clarify Server Component and Client Data Rules

### Exact position
Add after the current Rule 8 explanation.

### Add

```md
### Server Data vs Client Data Rule

Use Server Components for:
- Initial page-level data required to render the route.
- Secure server-only operations.
- SEO-relevant content.
- Reading server-only environment variables.

Use Client Components for:
- Forms, filters, live search, table interactions, modals, dropdowns, charts, and browser APIs.
- Client-side mutation workflows.
- WebSocket-driven UI updates.

Do not duplicate the same endpoint fetch in both `page.tsx` and a client hook without an explicit hydration strategy.

If initial server data is passed into a Client Component:
- Document the query key.
- Hydrate/cache it through the approved server-state library.
- Avoid maintaining an unrelated duplicate local state copy.
```

### Why
Current rule correctly promotes Server Components, but it does not define how page-level initial server data should interact with client-side cache, refetches, filters, and mutations.

---

## 4. Update Rule 9 — Add Granular Error Boundaries and Monitoring

### Exact position
Add after the existing `error.tsx` bullet in Rule 9.

### Add

```md
### Granular Error Boundary and Error Reporting Rules

Route-level `error.tsx` is mandatory but not enough.

Every independently loaded or independently fetched UI section must be wrapped in a section-level Error Boundary where failure should not crash the entire route.

Examples:
- Dashboard chart
- Analytics widget
- Data table
- Payment summary panel
- WebSocket activity feed

Requirements:
- Use a standard shared `ErrorBoundary` implementation.
- Display a module-specific fallback matching the global design system.
- Provide a Retry action where retrying is meaningful.
- Never expose raw stack traces, backend errors, tokens, or internal error details to users.
- Log caught errors to the approved monitoring provider with:
  - route
  - module name
  - user ID if safely available
  - error digest / request ID
  - timestamp

Error fallback hierarchy:
1. Component/section boundary
2. Module-level boundary
3. Route-level `error.tsx`
4. Global application boundary
```

### Why
A dashboard chart failing should not blank out the full page. This creates graceful degradation and gives support teams proper diagnostics.

---

## 5. Update Rule 13 — Replace Vague Feature Map Requirement With a Template

### Exact position
Add immediately after Rule 13’s current checklist.

### Add

```md
### Mandatory `[moduleName]_features.md` Template

Every module feature map MUST use this minimum structure:

# [Module Name] Feature Map

## Module Purpose
Brief business explanation of what this module does.

## Directory Structure
Explain each module-prefixed folder and its responsibility.

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|

## Data and State Architecture
- Server-state query keys:
- Zustand stores:
- Context providers:
- Local-storage keys:
- MSW handler file:

## API Contract
List all endpoint builders and expected response types.

## Permissions and Security
Document protected actions, roles, and CODEOWNERS paths.

## Loading, Empty, Error States
Document corresponding components/files for each main feature.

## Edge Cases / AI Warnings
List known product constraints, destructive actions, and common regression risks.

## Rule Compliance Checklist
- [ ] Rule 1: Micro-modularization
- [ ] Rule 7: Type isolation
- [ ] Rule 8: Server/client boundary
- [ ] Rule 9: Loading/error/not-found handling
- [ ] Rule 14: Backend-driven messages
- [ ] Rule 15A: Tests present
- [ ] Rule 79: MSW handler present where needed
```

### Why
Current instruction says “exhaustive list,” but AI agents need a fixed schema; otherwise every module documentation file will be inconsistent.

---

## 6. Update Rule 15 — Expand Performance Architecture

### Exact position
Append these points after existing debounce and server-side pagination/filtering bullets.

### Add

```md
### Additional Performance Requirements

- Use `next/image` for all content images. Raw `<img>` tags are forbidden unless there is a documented technical exception.
- Above-the-fold images must have explicit dimensions and appropriate priority behavior.
- Heavy charts, editors, maps, PDF viewers, and rich media components must use dynamic import/code splitting.
- Every asynchronous data section must show a skeleton matching its final layout.
- Use a spinner only for short button-level loading states.
- Do not apply `React.memo`, `useMemo`, or `useCallback` blindly.
  - Use `React.memo` only for frequently re-rendering presentational children.
  - Use `useMemo` only for measurably expensive calculations.
  - Use `useCallback` only when necessary for memoized child props or dependency stability.
- Bundle impact must be checked for large dependency additions or major feature releases.
- Avoid importing full libraries where tree-shakable or lighter alternatives exist.
```

### Why
The original performance rule is good for API traffic but incomplete for rendering, images, hydration, bundle size, and perceived loading UX.

---

## 7. Update Rule 61 — Improve Browser Storage Policy

### Exact position
Replace the existing short Rule 61 text with the following expanded version.

### Replace with

```md
61. No Direct Browser Storage Access in Components

Never call `window.localStorage`, `sessionStorage`, or `document.cookie` directly inside React components.

Use approved isolated hooks/services:
- `useLocalStorage` for non-sensitive persisted UI preferences.
- Secure HTTP-only cookies for authentication/session tokens.
- Never store access tokens, refresh tokens, passwords, payment data, or permission grants in localStorage.

All storage keys must:
- Be defined in a centralized constants file.
- Be namespaced by application and module.
- Have a documented schema/version where persisted object data is used.

Example:
APP_MODULE_FILTERS_V1
APP_DASHBOARD_LAYOUT_V1
```

### Why
The current rule prevents direct access but does not distinguish safe preference storage from sensitive security data.

---

## 8. Update Rule 65 — Expand Tooling Gates

### Exact position
Append after the current Rule 65 text.

### Add

```md
### Required CI Quality Gates

Every pull request must run:

1. Type Check
   - `tsc --noEmit`

2. Lint and Formatting
   - ESLint
   - Tailwind class validation
   - Prettier formatting check

3. Tests
   - Unit and component tests
   - Coverage threshold validation

4. Build
   - Production build must succeed

5. Security
   - Dependency vulnerability scan
   - Secret detection scan

6. E2E Tests
   - Mandatory for authentication, billing, permissions, destructive actions, and critical CRUD flows.

No PR may merge if a required gate fails.
```

### Why
Rule 65 mentions “tests,” but currently no testing framework, coverage expectation, or E2E policy exists.

---

# C. New Rules to Add

---

## NEW RULE 15A — Mandatory Testing Strategy

### Exact position
Insert directly after Rule 15 and before Rule 16.

```md
15A. Mandatory Testing Architecture

AI-generated code is not considered complete until the required tests exist.

Approved stack:
- Unit tests: Vitest
- React component tests: React Testing Library
- E2E tests: Playwright
- API/network mocking: MSW

Co-location rule:
- `MemberTable.tsx` → `MemberTable.test.tsx`
- `useMembers.ts` → `useMembers.test.ts`
- `member.utils.ts` → `member.utils.test.ts`

Minimum expectations:
- Utilities: 90% branch coverage
- Custom hooks: 80% coverage
- Core components: interaction tests for loading, success, empty, error, and disabled states
- Critical journeys: Playwright E2E coverage

Mandatory E2E flows:
- Login/logout/session expiry
- Permission-denied states
- Create/edit/delete workflows
- Type-to-confirm destructive action flows
- Billing or payment workflows
- Important table filtering, pagination, and export workflows

Testing rules:
- Test user-visible behavior, not internal implementation details.
- Do not use snapshots for dynamic, complex UI as a substitute for assertions.
- Reuse Rule 79 MSW handlers in unit/component tests.
- A bug fix must include a regression test if reasonably testable.
```

### Why
This is the largest gap in the current frontend documentation. Without test policy, AI can generate code that compiles but breaks workflows, permissions, forms, and edge cases.

---

## NEW RULE 15B — Form Engineering Architecture

### Exact position
Insert immediately after Rule 15A.

```md
15B. Form Management, Validation, and Submission Architecture

All non-trivial forms MUST use:
- React Hook Form
- Zod
- `@hookform/resolvers`

Form structure:
[Feature]Form/
  [Feature]Form.tsx
  use[Feature]Form.ts
  [feature].form.schema.ts
  [Feature]Form.test.tsx

Responsibilities:
- Form component: layout and field composition only.
- Custom form hook: form setup, submit orchestration, mutation state.
- Zod schema: validation and typed input/output contract.
- API layer: request/response communication only.

Validation rules:
- Validate client-side for immediate UX.
- Backend remains the final authority for validation.
- Display field validation errors inline below fields.
- Display backend response `message` for server-level errors as per Rule 14.
- Never show raw API error objects to users.

Submission rules:
- Disable submit button while the request is pending.
- Prevent duplicate submission.
- Reset only after confirmed successful response.
- Preserve entered data after failed requests unless product requirements say otherwise.
- All destructive form actions must follow the global Type-to-Confirm design rule.

File upload rules:
- Validate MIME type, extension, and max file size before upload.
- Show upload progress where supported.
- Never trust client validation alone; backend validation remains mandatory.
```

### Why
The global design system defines form visuals, but engineering rules for validation, submissions, API failures, controlled/uncontrolled inputs, and file uploads were missing.

---

## NEW RULE 15C — Server-State and Client-State Management

### Exact position
Insert after Rule 15B.

```md
15C. State Management Decision Matrix

State must be placed according to its ownership and lifecycle.

1. Server State — TanStack Query / React Query
Use for:
- API responses
- Loading/error states from APIs
- Caching
- Pagination
- Background refetching
- Mutations and invalidation

Rules:
- Backend data MUST NOT be stored as the primary source of truth in Zustand or Context.
- Every query key must be namespaced by module:
  `['members', 'list', filters]`
  `['members', 'detail', memberId]`
- After mutations, invalidate or update the relevant query cache intentionally.
- Do not refetch the whole application after a small mutation.

2. Zustand — Module-Level Shared Client State
Use for:
- Active filter UI state
- Selected rows
- Table column preferences
- Multi-step wizard progress
- Local draft state shared by multiple client components

Rules:
- Stores should remain module-scoped.
- Avoid one giant global store.
- Do not put API response data into a Zustand store unless there is a documented offline/realtime requirement.

3. React Context
Use only for stable cross-tree concerns:
- Theme
- Locale
- Auth session shell
- App-wide feature flags

4. Local State
Use `useState` or `useReducer` for component-private UI state:
- Modal open/close
- Input visibility
- Hover/focus state
- Local tab selection

Before creating a new global state container, document why local state, props, URL parameters, or React Query cannot solve the need.
```

### Why
The documentation mentions Context/Zustand but lacks a strict server-state policy. This is one of the most common causes of stale UI data and difficult AI-generated bugs.

---

## NEW RULE 15D — Environment Variables and Configuration

### Exact position
Insert after Rule 15C.

```md
15D. Environment Variable and Runtime Configuration Management

Required files:
- `.env.example` — committed; contains every required key with empty/sample values.
- `.env.local` — local secrets; never committed.
- `.env.development` — non-secret development configuration where needed.
- `.env.production` — non-secret production configuration where platform policy permits.

Rules:
- Variables prefixed with `NEXT_PUBLIC_` are public browser-visible values.
- Never place secrets, private API keys, database URLs, token signing keys, or payment secrets in `NEXT_PUBLIC_` variables.
- Do not access `process.env` directly from arbitrary components/hooks.
- Validate environment variables in one central configuration module using Zod.
- Fail fast at startup if required configuration is missing or malformed.
- Document every environment variable in `.env.example`.

Recommended structure:
src/config/env.ts
src/config/app-config.ts
```

### Why
There is security scanning for accidental secrets, but there is no formal policy preventing secret exposure or handling missing runtime configuration.

---

## NEW RULE 15E — Observability and Product Diagnostics

### Exact position
Insert after Rule 15D.

```md
15E. Frontend Observability and Diagnostics

Production frontend errors must be observable without exposing sensitive information to users.

Requirements:
- Integrate an approved error-monitoring solution.
- Capture route, module, anonymized user/session context where allowed, request ID, and error digest.
- Never send passwords, tokens, full payment data, or sensitive personal data in logs.
- Use structured frontend events for critical business workflows:
  - login failure
  - payment failure
  - failed export
  - destructive action failure
  - repeated API error
- Use `console.log` only in local development where allowed by Rule 65; it must not remain in production code.
- Define an owner and alert policy for critical failures.
```

### Why
`error.tsx` helps users recover, but production teams also need visibility into what failed and where.

---

## NEW RULE 81 — CI/CD Merge Policy

### Exact position
Insert after current Rule 80.

```md
81. CI/CD Merge Policy and Branch Protection

Every pull request must pass the following pipeline before merge:

1. Quality
   - ESLint
   - Prettier check
   - Tailwind linting
   - TypeScript type check

2. Security
   - Dependency vulnerability scan
   - Secret scan
   - License/compliance scan if required by the organization

3. Tests
   - Vitest unit/component tests
   - Coverage thresholds
   - Playwright E2E tests for applicable critical flows

4. Build
   - Production Next.js build
   - Bundle analysis for major changes

5. Review
   - Mandatory CODEOWNERS approval for auth, permissions, billing, payment, and security-sensitive paths.
   - AI-generated PR descriptions must list files changed, tests run, risk areas, and rollback impact.

Branch protection requirements:
- No direct push to `main`.
- No merge with failing checks.
- No bypass for CODEOWNERS on security-sensitive files.
- Require at least one human approval for all AI-generated changes.
```

### Why
Rule 78 and Rule 80 are strong individually, but there should be one final rule that defines exactly what blocks merge.

---

# D. Global Design System Improvements

The global design system is visually detailed and strong. These are the main missing additions.

---

## Add to Global Design System Section 5c — Form Layout

### Exact position
At the end of **Section 5c. Form Layout**.

```md
### Form Interaction States

Every form field must explicitly support:
- Default
- Hover
- Focus-visible
- Filled
- Validation error
- Validation success where meaningful
- Disabled
- Read-only
- Loading/submitting

Accessibility requirements:
- Every input must have a programmatically associated `<label>`.
- Error text must be connected through `aria-describedby`.
- Invalid fields must expose `aria-invalid="true"`.
- Required fields must be marked semantically, not only through color.
- Error messages must be announced accessibly where appropriate.
```

### Why
Current visual spec is good, but it needs semantic accessibility behavior—not only styling.

---

## Add to Global Design System Section 5b — Tables

### Exact position
After the existing table empty-state rules.

```md
### Table Accessibility and Interaction Rules

- Tables must preserve semantic HTML structure: `table`, `thead`, `tbody`, `th`, `td`.
- Sortable headers must expose current sorting state through accessible labels.
- Row-click navigation must not prevent keyboard users from reaching inline actions.
- Row actions must be keyboard accessible.
- On mobile, choose one documented pattern:
  1. Horizontal scroll with frozen primary identifier, or
  2. Convert each record into an accessible card layout.
- Never hide essential financial, status, or permission information solely because of viewport size.
```

### Why
Enterprise tables are a major interaction surface; row click, sorting, responsive layout, and keyboard access must be standardized.

---

## Add to Global Design System Section 13 — Accessibility

### Exact position
After current WCAG focus-ring rule.

```md
4. Keyboard Navigation and Screen Reader Requirements

- All interactive UI must be usable using keyboard only.
- Dialogs must trap focus, autofocus an appropriate element, and restore focus to the trigger on close.
- Escape must close dismissible dialogs, popovers, and menus.
- Icon-only buttons must have accessible labels.
- Status colors must never be the only way to communicate meaning.
- Respect `prefers-reduced-motion` for non-essential animation.
- Minimum contrast must meet WCAG AA requirements.
```

### Why
Focus rings are only one part of accessibility. Dialog focus management, icon labels, contrast, motion, and keyboard interaction are essential.

---

## Add New Global Design System Section 23 — Responsive and Mobile Policy

### Exact position
Add after current Section 22.

```md
## 23. RESPONSIVE AND MOBILE INTERACTION POLICY

- Define standard breakpoints centrally and do not introduce arbitrary one-off breakpoints.
- Desktop-first ERP layouts must remain fully usable at tablet widths.
- Sidebars must collapse into a controlled drawer on smaller screens.
- Minimum interactive touch target: 44 × 44px where practical.
- Dense data tables must use the approved mobile table strategy.
- Sticky action bars must not obscure form fields or mobile browser controls.
- Test core workflows at mobile, tablet, and desktop widths before merge.
```

### Why
The design system defines individual components but needs a global responsive behavior policy.

---

## Add New Global Design System Section 24 — Empty, Loading, Error, and Permission States

### Exact position
Add after Section 23.

```md
## 24. ASYNC UI STATE SYSTEM

Every data-driven feature must define all of the following:

1. Loading State
   - Use layout-matching skeletons.
   - Avoid full-page spinners except for very short transitional actions.

2. Empty State
   - Explain why the list is empty.
   - Offer a contextual action where the user has permission to create/import data.

3. Error State
   - Use a concise user-safe explanation.
   - Provide Retry when appropriate.
   - Never expose raw technical errors.

4. Permission-Denied State
   - Explain that access is restricted.
   - Do not show disabled destructive controls without explanation.
   - Provide a clear next step, such as contacting an administrator, where suitable.

5. Offline/Connection State
   - Show a non-blocking connection indicator for realtime/network-dependent features.
```

### Why
The frontend architecture mentions loading and errors, but the design system should define their visual and UX standards consistently.

---

# E. Rules to Remove, Merge, or Correct

| Existing area | Action | Reason |
|---|---|---|
| Rule 64: “Merged with Rule 7” | Remove the numbered placeholder or renumber rules cleanly | A visible empty rule confuses humans and AI agents. |
| Hardcoded preset/mock reference in Rule 13 | Update | Rule 79 prohibits hardcoded mock data in components/hooks; feature map should document MSW handlers, not endorse local hardcoded mock APIs. |
| “Fetch initial data securely” in Rule 8 | Clarify | Server Components can fetch securely, but not all page data should always be fetched server-side. Add Rule 15C policy. |
| `npm audit --audit-level=high` as the only SCA method | Update | Keep it as baseline, but allow an approved SCA tool because `npm audit` alone may create noise or miss organization-specific policy needs. |
| Generic “tests” inside Rule 65 | Move/expand | Keep Rule 65 as enforcement; detailed test practices should reside in new Rule 15A. |
| Directly prescribing a specific monitoring vendor | Keep vendor-neutral | Use “approved monitoring provider,” so architecture does not become locked to Sentry/LogRocket unnecessarily. |
| Direct raw `<img>` ban without exception | Update wording | Make `next/image` default/mandatory, but permit documented exceptions for third-party controlled markup, emails, SVG assets, or technically incompatible external content. |

---

# F. Final Recommended Implementation Priority

## Phase 1 — Critical, Do First

1. **Add Rule 15A: Testing Strategy**
2. **Add Rule 15B: Form Architecture**
3. **Add Rule 15C: Server vs Client State Policy**
4. **Add Rule 15D: Environment Variable Policy**
5. **Expand Rule 65 + add Rule 81 CI/CD merge policy**
6. **Expand Rule 9 for monitoring and section-level error boundaries**

These changes remove the highest-risk gaps in AI-generated frontend code.

---

## Phase 2 — High Impact

1. Update Rule 1 file limits for hooks/utils/stores.
2. Add Zod runtime validation to Rule 7.
3. Improve Rule 13 with a mandatory module feature-map template.
4. Expand Rule 15 for image optimization, code splitting, skeletons, and bundle checks.
5. Add async UI-state standards to the design system.

---

## Phase 3 — Quality and Scale

1. Improve mobile/responsive design standards.
2. Add deep keyboard and screen-reader requirements.
3. Standardize frontend observability.
4. Formalize visual regression testing for the design system.
5. Add Storybook or equivalent component documentation policy if the component library grows.

---

# Final Verdict

Your current documentation is already above average because it does not just focus on “writing clean code”; it actively designs for **AI isolation, prevention of hallucinated cross-module changes, strict security gates, and enterprise UX consistency**.

The major missing pillars are:

- **Testing**
- **Form engineering**
- **Server-state vs client-state ownership**
- **Environment safety**
- **Observability**
- **Clear CI merge enforcement**
- **Complete accessibility interaction behavior**

Once these changes are added, the documentation becomes a strong **AI-first, enterprise frontend operating system**, not just a list of coding rules.
