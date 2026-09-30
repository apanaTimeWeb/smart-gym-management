# PublicLanding — Feature Map

## Module Purpose
`src/app/frontend_public/landing/` is the unauthenticated public GymSmart marketing/conversion module. It owns only the documented landing surface: Hero, About, BMI, Plans, Trainers, Services, Schedule, Gallery, Booking, Transformations, Testimonials, Contact, Footer, public navigation, and newsletter mail-client handoff. Authenticated ERP business logic is outside the module.

## Module Structure
```text
frontend_public/
└── landing/
    ├── landing_components/
    │   ├── PublicLandingMain/PublicPublicLandingMain.tsx
    │   ├── PublicLandingQueryProvider/PublicPublicLandingQueryProvider.tsx
    │   ├── PublicLandingNavbar/PublicPublicLandingNavbar.tsx + usePublicPublicLandingNavbar.ts
    │   ├── PublicLandingHero/PublicPublicLandingHero.tsx
    │   ├── PublicLandingAbout/PublicPublicLandingAbout.tsx
    │   ├── PublicLandingBmiCalc/PublicPublicLandingBmiCalc.tsx + usePublicLandingBmi.ts
    │   ├── PublicLandingPlans/PublicPublicLandingPlans.tsx
    │   ├── PublicLandingTrainers/PublicPublicLandingTrainers.tsx
    │   ├── PublicLandingServices/PublicPublicLandingServices.tsx
    │   ├── PublicLandingSchedule/PublicPublicLandingSchedule.tsx
    │   ├── PublicLandingGallery/PublicPublicLandingGallery.tsx
    │   ├── PublicLandingBooking/PublicPublicLandingBooking.tsx + usePublicPublicLandingBookingForm.ts
    │   ├── PublicLandingTransformations/PublicPublicLandingTransformations.tsx
    │   ├── PublicLandingTestimonials/PublicPublicLandingTestimonials.tsx
    │   ├── PublicLandingContact/PublicPublicLandingContact.tsx + usePublicPublicLandingContactForm.ts
    │   ├── PublicLandingFooter/PublicPublicLandingFooter.tsx + usePublicLandingNewsletter.ts
    │   └── PublicLandingOfflineNotice/PublicPublicLandingOfflineNotice.tsx
    ├── landing_constants/       # static UI/business configuration only
    ├── landing_hooks/           # module hooks not owned by one section
    ├── landing_api/             # API boundary only
    ├── landing_schemas/         # Zod contracts
    ├── landing_types/           # domain/API/UI types
    ├── landing_utils/           # pure format/date/BMI utilities
    ├── landing_mocks/           # MSW handlers + mutable mock state
    ├── _locales/en.json + hi.json
    ├── landing_url_config.ts
    ├── landing_theme_contract.md
    ├── landing_forbidden.md
    ├── landing_features.md
    ├── page.tsx / layout.tsx / loading.tsx / error.tsx / not-found.tsx
    └── PublicLandingStyles.css
```

## User Flows
1. Visitor loads `/landing` → public sections render → nav/CTA anchor → target section is visible.
2. BMI → enter height/weight → Calculate → result/category or validation error → change input and recalculate.
3. Booking → select type + fill 4 fields → client validation → POST `/api/landing/bookings` with UTC date + one idempotency key → backend message success OR safe error → retry same intent or start-new.
4. Contact → fill 3 fields → client validation → POST `/api/landing/contact` with one idempotency key → backend message success OR safe error → retry same intent or start-new.
5. Newsletter → enter email → Zod validation → opens the configured mail client. No API subscription is invented because no endpoint is documented.
6. Mobile navigation → hamburger → focus-trapped drawer → anchor/login click or backdrop/Escape close → focus restoration.

## Data & State Architecture
- Server/API state: TanStack Query mutation state only; there are no supplied PublicLanding GET/read endpoints, so no artificial cache invalidation query is invented.
- Local component state: BMI inputs/result, navbar scroll/menu state, newsletter email/error.
- Form state: React Hook Form with Zod resolver.
- URL state: public section anchors and login paths are centralized in `landing_url_config.ts`.
- Context: none owned by PublicLanding.

## API Contract
Canonical envelope: `success`, `message`, `data`, optional `meta`, `error`, `errorCode`, `statusCode`, `validationErrors`. Booking uses `/api/landing/bookings`; Contact uses `/api/landing/contact`. The source feature document contained an older inventory entry for `/landing/booking`; the detailed API contract is authoritative and is recorded as a `SOURCE_CONFLICT` in the audit report.

## UI Data Requirements
All static marketing content lives in responsibility-specific `landing_constants/*Constants.ts`. No backend records are embedded into JSX. Booking/contact backend response data is currently `null` by contract; backend `message` is surfaced after Zod envelope validation. Pricing is stored as minor units and formatted at render time by `formatPublicLandingCurrency()`.

## Permissions / Security
Public landing is unauthenticated and has no documented role matrix. ERP login destinations are navigation exits into the authenticated application and no frontend authorization claim is made here. No password, financial mutation, export/offboarding, or tenant-admin data is handled in this module.

## Loading / Empty / Error / Offline
- Route loading: structural semantic skeleton.
- Error boundary: branded route-level `error.tsx` with `reset()`.
- Not found: branded `not-found.tsx` with return link.
- Booking/contact: inline validation + backend error + retry; entered values remain intact on failure.
- Offline: non-blocking localized warning; new network submissions are disabled without destroying user input.
- Empty data sections: not applicable to static marketing configuration; the documented timetable is static content.

## Edge Cases / AI Warnings
1. Never replace `/api/landing/bookings` with the historical `/landing/booking` inventory typo.
2. Never move PublicLanding business content into a global shared-business folder.
3. Do not invent newsletter subscription API behavior.
4. Do not generate a new idempotency key for a retry.
5. Do not expose raw transport errors.
6. Do not use raw theme colors in JSX.

## Approved External Dependencies
`@/lib/api` and `@/components/ThemeToggle` are approved infrastructure. Third-party/framework packages are limited to those explicitly required by the existing module contracts. The global app must provide semantic Tailwind tokens, theme provider, route progress, i18n wiring, and the MSW bootstrap where applicable.

## Component Responsibility Map
Each component file contains one primary component. Complex browser/form logic is adjacent in hooks. No sibling feature module is imported.

## Architecture Compliance
The final audit report contains the complete source-driven rule coverage matrix and records `PASS`, `PARTIAL`, `FAIL`, `NOT VERIFIED`, `BLOCKED`, or `NOT APPLICABLE` per applicable rule.
