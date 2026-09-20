# Landing — Feature Map

## Module Purpose
The `landing` module is the public GymSmart marketing and conversion surface for visitors who are not yet inside the authenticated ERP. It presents the gym value proposition, plans, trainers, services, schedule, gallery, testimonials, transformations, and contact information. Visitors can navigate to any public section, calculate BMI locally, request a trial/membership/class booking, submit a contact message, and request newsletter information through their email client. Authenticated ERP business workflows, tenant administration, member management, billing operations, and backend authorization are strictly outside this module.

## Directory Structure

| Folder / File | Responsibility | Key Files |
|---|---|---|
| `landing_components/LandingMain/` | Composes the public landing page and provides the module-owned TanStack Query client | `LandingMain.tsx` |
| `landing_components/LandingQueryProvider/` | Owns the module-scoped TanStack Query provider used by client mutations | `LandingQueryProvider.tsx` |
| `landing_components/LandingNavbar/` | Public navigation, mobile drawer, scroll state, focus/keyboard behavior, theme toggle | `LandingNavbar.tsx`, `useLandingNavbar.ts`, `useLandingNavbar.test.ts` |
| `landing_components/LandingHero/` | Hero presentation, primary CTAs, hero image and stats | `LandingHero.tsx` |
| `landing_components/LandingAbout/` | About section and static trust/feature presentation | `LandingAbout.tsx` |
| `landing_components/LandingBmiCalc/` | BMI calculator UI, validation and result presentation | `LandingBmiCalc.tsx`, `useLandingBmi.ts`, `useLandingBmi.test.ts` |
| `landing_components/LandingPlans/` | Membership plan cards and plan CTA routing | `LandingPlans.tsx` |
| `landing_components/LandingTrainers/` | Trainer profile cards | `LandingTrainers.tsx` |
| `landing_components/LandingServices/` | Service/program cards with stable section IDs for deep links | `LandingServices.tsx` |
| `landing_components/LandingSchedule/` | Static weekly class schedule with mobile-friendly table behavior | `LandingSchedule.tsx` |
| `landing_components/LandingGallery/` | Optimized image gallery using `next/image` | `LandingGallery.tsx` |
| `landing_components/LandingBooking/` | Booking form view plus RHF/Zod/mutation orchestration | `LandingBooking.tsx`, `useLandingBookingForm.ts`, `LandingBookingForm.test.tsx` |
| `landing_components/LandingTransformations/` | Transformation story cards | `LandingTransformations.tsx` |
| `landing_components/LandingTestimonials/` | Testimonial cards and accessible rating presentation | `LandingTestimonials.tsx` |
| `landing_components/LandingContact/` | Contact details plus RHF/Zod contact form | `LandingContact.tsx`, `useLandingContactForm.ts`, `LandingContactForm.test.tsx` |
| `landing_components/LandingFooter/` | Footer navigation, external social links, mail-based newsletter request | `LandingFooter.tsx`, `useLandingNewsletter.ts`, `useLandingNewsletter.test.ts` |
| `landing_api/` | Module-owned HTTP calls and response validation boundary | `landing_api.ts`, `LandingApi.test.ts` |
| `landing_schemas/` | Runtime Zod contracts for API responses and form payloads | `LandingApiResponseSchema.ts`, `LandingBookingSchema.ts`, `LandingContactSchema.ts`, `LandingNewsletterSchema.ts` |
| `landing_types/` | Shared module TypeScript/domain types | `landing_types.ts` |
| `landing_utils/` | Pure formatting/date/BMI helpers and static configuration | `LandingBmiUtils.ts`, `LandingDateUtils.ts`, `LandingFormattingUtils.ts`, `LandingSharedConstants.ts` plus co-located tests |
| `landing_mocks/` | Feature-owned mutable MSW fixtures and handlers for frontend-first flows | `LandingMockFixtures.ts`, `LandingMockHandlers.ts` |
| `page.tsx` | Next.js route entry | `page.tsx` |
| `layout.tsx` | Next.js route-segment layout and stylesheet entry | `layout.tsx` |
| `loading.tsx` | Route-level landing skeleton | `loading.tsx` |
| `error.tsx` | Route-level module error boundary with retry | `error.tsx` |
| `landing.css` | Feature-local visual tokens for hero overlay, navbar surface, CTA shadow, and native social brand colors | `landing.css` |
| `landing_url_config.ts` | Single source for page anchors, backend endpoints, and external social destinations | `landing_url_config.ts` |
| `landing_features.md` | This feature map and AI context contract | `landing_features.md` |
| `landing_forbidden.md` | Explicit prohibited patterns for future repairs | `landing_forbidden.md` |
| `landing_theme_contract.md` | Exact global theme dependencies | `landing_theme_contract.md` |

## Approved External Dependencies

### Application Infrastructure
- `@/lib/api` — approved global HTTP transport; Landing owns request construction and response validation.
- `@/components/ThemeToggle` — approved zero-business/global theme control.
- `next/image`, `next/link`, `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`, `zod`, `date-fns`, `lucide-react`, `msw`, and `http-status-codes` — third-party/framework infrastructure.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

The module must remain portable without importing sibling business modules. `@/lib/api` and `@/components/ThemeToggle` are infrastructure dependencies only.

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Public Landing Surface | `/landing` | Browse all public marketing sections and CTA entry points | `LandingMain.tsx` plus section components | None | Implemented |
| Public Navigation | `/landing` | Jump to sections, open mobile drawer, change theme | `LandingNavbar.tsx` | None | Implemented |
| BMI Calculator | `/landing` | Enter height/weight and receive a categorized BMI result | `LandingBmiCalc.tsx`, `useLandingBmi.ts` | None | Implemented |
| Membership Plans | `/landing` | Compare plans and navigate to the booking flow | `LandingPlans.tsx` | None | Implemented |
| Services | `/landing` | Inspect individual service/program cards and deep-link to them | `LandingServices.tsx` | None | Implemented |
| Weekly Schedule | `/landing` | Review weekly class timetable across desktop/tablet/mobile | `LandingSchedule.tsx` | None | Implemented |
| Gallery | `/landing` | View optimized gym images | `LandingGallery.tsx` | None | Implemented |
| Booking Request | `/landing` | Choose booking type, date, contact details, submit and retry | `LandingBooking.tsx`, `useLandingBookingForm.ts` | `POST /landing/booking` | Implemented with module mocks |
| Transformations | `/landing` | Read transformation stories | `LandingTransformations.tsx` | None | Implemented |
| Testimonials | `/landing` | Read member testimonials and ratings | `LandingTestimonials.tsx` | None | Implemented |
| Contact Request | `/landing` | Submit name, email and message; retry after failure | `LandingContact.tsx`, `useLandingContactForm.ts` | `POST /landing/contact` | Implemented with module mocks |
| Newsletter Request | `/landing` | Request newsletter subscription through the configured email client | `LandingFooter.tsx`, `useLandingNewsletter.ts` | `mailto:` request | Implemented |
| External Social Navigation | `/landing` | Open official platform destinations | `LandingFooter.tsx` | External URLs from `landing_url_config.ts` | Implemented |

## User Flows & Interactions

### Flow 1: Navigate to a public section
1. User activates a desktop or mobile navigation item or page CTA.
2. `LandingNavbar.tsx` or the CTA uses `landing_url_config.ts` anchor values.
3. The browser moves to the corresponding section ID.
4. On mobile, the navigation drawer closes and focus is restored correctly.
5. The target section is visible and the visitor can continue to another action.

### Flow 2: Calculate BMI
1. User enters height and weight in the BMI calculator.
2. `useLandingBmi.ts` manages the input state and validation.
3. `calculateLandingBmi()` computes the value and applies the documented BMI interval boundaries.
4. Result category and numeric BMI appear in the same section.
5. User can edit the inputs and receive a new result without leaving the page.

### Flow 3: Submit a booking request
1. User chooses booking type, name, email, phone, and date.
2. `LandingBooking.tsx` renders the form; `useLandingBookingForm.ts` owns RHF state and mutation orchestration.
3. Zod validates the form; invalid fields remain visible with accessible inline errors.
4. Submit invokes `createLandingBooking()` through the module API client.
5. The API client serializes the date to UTC, validates the API response, and preserves the backend `message`.
6. On success, the success message is shown and the user can start another booking.
7. On failure, entered values remain available and Retry repeats the same submission.

### Flow 4: Submit contact / newsletter request
1. User enters name, email and message in the contact form or email address in the footer.
2. Contact submission follows the RHF → Zod → API → success/error flow above.
3. Newsletter request validates the email locally and opens the configured mail client; it does not claim a backend subscription because no subscription endpoint exists in the supplied module evidence.

## Data and State Architecture

- **Server state:** Booking and Contact mutation state is owned by TanStack Query through `useMutation` inside the two module-owned form hooks.
- **Shared client state:** None. No Zustand store is required by the current Landing surface.
- **Context providers:** None. The former broad `LandingContext` was removed so business state does not become cross-tree global state.
- **Component-private state:** BMI input state is owned by `useLandingBmi`; navbar menu/scroll state is owned by `useLandingNavbar`; newsletter input/submission state is owned by `useLandingNewsletter`; RHF owns booking/contact form state.
- **URL state:** Static public section navigation uses canonical hashes from `landing_url_config.ts`. No filterable/paginated list exists in the current Landing surface.
- **Local storage:** None.
- **MSW handler:** `landing_mocks/LandingMockHandlers.ts`.
- **MSW fixtures/state:** `landing_mocks/LandingMockFixtures.ts`.
- **Query provider:** `LandingQueryProvider.tsx` creates the module query client used by interactive forms.

## API Contract

The module uses the global `apiFetch` transport through `@/lib/api`. Responses are validated against `LandingNullApiResponseSchema` and follow the module's null-data response envelope.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `createLandingBooking(values)` | POST | `/api/landing/bookings` | `{ name, email, phone, date, type }` with `date` serialized to UTC ISO 8601 | `null` |
| `sendLandingContactMessage(values)` | POST | `/api/landing/contact` | `{ name, email, message }` | `null` |

The exact relative endpoints are centralized in `landing_url_config.ts`. No component owns backend URLs.

## UI Data Requirements

The Landing page is predominantly static marketing content; those values belong to `LandingSharedConstants.ts` and are not presented as server records.

| UI Element | Required Field(s) | Source | Nullable? | Mocked? |
|---|---|---|---|---|
| Hero stats | `LANDING_STATS[].value`, `LANDING_STATS[].label` | `LandingSharedConstants.ts` | No | No |
| Service cards | `LANDING_SERVICES[].id/title/description/icon` | `LandingSharedConstants.ts` | No | No |
| Trainer cards | `LANDING_TRAINERS[]` | `LandingSharedConstants.ts` | No | No |
| Plan cards | `LANDING_PLANS[].name/priceInr/oldPriceInr/duration/features` | `LandingSharedConstants.ts` | No | No |
| Schedule rows | `LANDING_SCHEDULE[]` + `LANDING_SCHEDULE_DAYS[]` | `LandingSharedConstants.ts` | No | No |
| Gallery | `LANDING_GALLERY_ITEMS[].src/alt/label` | `LandingSharedConstants.ts` | No | No |
| Booking form | `name/email/phone/date/type` | RHF values + `LandingBookingSchema` | No | Submitted through MSW |
| Contact form | `name/email/message` | RHF values + `LandingContactSchema` | No | Submitted through MSW |

The booking/contact response contract itself is `{ success, message, data: null, ... }`; UI success text is taken from `response.message` rather than invented component copy.

## Permissions and Security

- **Required role:** Public/unauthenticated visitor; the supplied archive does not contain application middleware/route protection, so production route protection status is NOT VERIFIED.
- **Destructive actions:** None in this public module.
- **Sensitive data:** Booking/contact fields are ordinary contact information. The current forms do not expose credentials, OTPs, reset tokens, or full financial identifiers. No copy affordance is provided for sensitive secrets.
- **Cross-role isolation:** Business Feature Dependencies: None. Role-Level Business Dependencies: None.
- **Backend authorization:** Not evaluated because this audit is frontend-only.
- **CODEOWNERS:** Not present in the supplied module archive; application-level review ownership is NOT VERIFIED.

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Route | `loading.tsx` — landing-specific skeleton using `bg-skeleton-base` and `bg-skeleton-highlight` | Not applicable to static public sections | `error.tsx` — branded safe fallback with Retry/reset |
| Booking form | Submit button uses button-level loading state while TanStack Query mutation is pending | Not applicable | Inline module-safe error message + Retry; entered data preserved |
| Contact form | Submit button uses button-level loading state while mutation is pending | Not applicable | Inline module-safe error message + Retry; entered data preserved |
| BMI | No network loading | Result area provides valid-input state without fake data | Invalid input is handled locally by form controls |

## Edge Cases and AI Warnings

- **Booking email must not be `.com`-restricted:** Accept legitimate email domains according to the Zod email rule; do not restore the previous restrictive pattern.
- **Booking date is local UI input but UTC at API boundary:** Use the module date serializer before sending to the API; do not serialize in JSX.
- **BMI interval boundaries are explicit:** `24.9`, `25`, `29.9`, and `30` must map according to `LandingBmiUtils.ts`; do not use overlapping or missing intervals.
- **No broad Landing Context:** Do not reintroduce Context for booking/contact/API data or mutation state. Keep state closest to its owner.
- **No fake newsletter subscription:** The archive does not contain a newsletter subscription API. The current behavior requests the visitor's email client through `mailto:` rather than claiming that a server-side subscription occurred.
- **Social destination limitation:** The supplied archive did not contain verified GymSmart profile handles. Social links therefore use official platform destinations; do not invent account-specific URLs.
- **Hero image availability:** `LandingHero.tsx` references `/gym-hero.jpg`. Asset availability outside this module archive is NOT VERIFIED and must be checked in the consuming Next.js application.
- **Module APIs own their contracts:** Do not bypass `landing_api/landing_api.ts` by calling `apiFetch` from a component or reading fixtures directly.
- **Mocks are business-data owners:** Do not move mutable mock records into JSX constants.
- **Do not add cross-module business imports:** The approved external allowlist above should remain the baseline for future repairs.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `LandingMain.tsx` | Composes all public landing sections and provides the module query client; no direct API calls. |
| `LandingQueryProvider.tsx` | Provides the module-scoped TanStack Query client required by interactive mutations. |
| `LandingNavbar.tsx` | Renders desktop/mobile navigation and delegates menu/scroll/focus behavior to `useLandingNavbar`. |
| `LandingHero.tsx` | Renders hero copy, CTA navigation, background image and headline stats. |
| `LandingAbout.tsx` | Renders static about content, trust stats and feature list. |
| `LandingBmiCalc.tsx` | Renders BMI inputs, submits local calculation, and displays accessible result feedback. |
| `LandingPlans.tsx` | Renders membership plan comparison cards and plan CTAs. |
| `LandingTrainers.tsx` | Renders trainer profile cards. |
| `LandingServices.tsx` | Renders service/program cards with stable section IDs. |
| `LandingSchedule.tsx` | Renders the weekly schedule table with mobile sticky identifier column. |
| `LandingGallery.tsx` | Renders optimized gallery images using `next/image`. |
| `LandingBooking.tsx` | Renders booking form fields and mutation feedback; no direct API transport. |
| `LandingTransformations.tsx` | Renders transformation stories. |
| `LandingTestimonials.tsx` | Renders accessible testimonial cards and rating indicators. |
| `LandingContact.tsx` | Renders contact details plus contact form; no direct API transport. |
| `LandingFooter.tsx` | Renders footer navigation, social destinations, ERP links and newsletter request UI. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — component and hook responsibilities are separated; remaining file sizes verified separately.
- [x] Rule 2: Total Role Isolation — no cross-role business imports in the module.
- [x] Rule 3: Hyper-descriptive naming — module-owned non-reserved files use the Landing prefix/semantic naming pattern.
- [x] Rule 4: Theme Independence — JSX uses semantic theme classes and local CSS variables only where justified.
- [x] Rule 5: Smart State Management — no broad business Context; form state is local/RHF and server mutations use TanStack Query.
- [x] Rule 6: Logic/UI Separation — BMI, Navbar, Booking, Contact, Newsletter logic is separated into hooks/utilities.
- [x] Rule 7: Type Isolation — shared types live under `landing_types/`; no complex component-local interfaces were retained.
- [x] Rule 8: Server/Client Boundary — route entry remains server; interactive sections are client components.
- [x] Rule 9: Loading/error/not-found — `loading.tsx` and `error.tsx` are present; a dedicated `not-found.tsx` is not required by any verified dynamic Landing route.
- [x] Rule 10: Absolute Imports — module imports use `@/` paths.
- [x] Rule 11: URL Configuration — page anchors, backend endpoints and external destinations are centralized.
- [x] Rule 12: HTTP Status Constants — mock handlers use `http-status-codes` constants.
- [x] Rule 14: Backend-Driven UI Messages — booking/contact success/error presentation comes from API result/error message.
- [x] Rule 15/15A/15B: Performance, tests and forms — interactive flows include RHF/Zod and behavior-oriented tests; project-wide CI remains outside this archive.
- [x] Rule 19: Clickable table rows — no user-browsable entity table exists in this public module; schedule table is informational.
- [x] Rule 23: Password toggle — not applicable; Landing contains no password field.
- [x] Rule 24: Date/Time Standardization — booking date serializes at API boundary.
- [x] Rule 25: RBAC — not applicable to public marketing surface; ERP links exit to the authenticated application.
- [x] Rule 26: Skeleton loaders — route loading uses semantic skeleton tokens.
- [x] Rule 27: No `any` — no explicit `any` usage remains.
- [x] Rule 30: Mandatory table controls — not applicable because schedule is a static informational timetable, not a user-browsable dataset.
- [x] Rule 32: No barrel files — no `index.ts`/`index.js` re-export files are present.
- [x] Rule 33: Media optimization — content images use `next/image`; hero image uses `next/image`.
- [x] Rule 35: Magic-value discipline — business/static configuration is centralized.
- [x] Rule 36: No arbitrary Tailwind — no arbitrary Tailwind values remain in module JSX.
- [x] Rule 37: JSDoc — custom hooks and pure transformation utilities are documented.
- [x] Rule 38/39: Responsibility and data-flow comments — component/hook responsibility comments are present.
- [x] Rule 40: Forbidden patterns document — maintained in `landing_forbidden.md`.
- [x] Rule 44: No `console.log` — none remains.
- [x] Rule 45: Co-located hook/utility tests — present for module hooks and pure utilities.
- [x] Rule 46: Unsaved changes — booking/contact forms register `beforeunload` while dirty.

## Project-Level Verification Limits

The supplied archive is a module slice rather than the complete Next.js repository. Therefore the following cannot be proven from this archive alone: production `tsconfig.json`, ESLint custom rules, Tailwind token mapping, global ThemeProvider, global MSW bootstrap, production asset existence, route registration outside `/landing`, CODEOWNERS, Husky/CI, and full Playwright/browser execution. These remain **NOT VERIFIED** rather than assumed compliant.
