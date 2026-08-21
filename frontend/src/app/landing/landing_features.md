# Landing Module — Feature Documentation

## Overview
The public-facing marketing page for GymSmart gym management platform.
A single-page scroll experience with 15 section components, a BMI calculator, a booking form,
and a contact form. Fully static/mocked — no backend API calls.

---

## Architecture

### State Management
- **React Context** (`LandingContext`) via `LandingProvider` — the single state container.
- All state lives in `useLandingLogic.ts` (custom hook) — zero logic in component files.
- Context value is strictly memoized with `useMemo` + all handlers with `useCallback` (Rule 15).

### Theme Independence
- CSS custom properties defined in `landing.css` under `.landing-module` scope.
- Gradient classes for service/trainer/stat cards defined statically in `landing.css` (not in JSX).
- **Never** use dynamic Tailwind class strings or arbitrary hex values (see `landing_forbidden.md`).

### Data
- ALL hardcoded UI data lives in `landing_utils/LandingSharedConstants.ts` (Rule 3).
- When backend APIs are ready, replace each exported constant with an API call — zero UI changes.

---

## Directory Structure

```
landing/
├── page.tsx                          # Server Component — renders LandingMain
├── layout.tsx                        # Thin layout wrapper (no styles)
├── loading.tsx                       # Skeleton hero + navbar loader (animate-pulse)
├── error.tsx                         # Error boundary with Retry button
├── landing.css                       # Module-scoped CSS: tokens, gradients, animations
├── landing_url_config.ts             # All page routes + anchor IDs (PAGES + ANCHORS)
├── landing_forbidden.md              # Forbidden anti-patterns (read before touching this module)
├── landing_features.md               # This file
├── landing_theme_contract.md         # Theme CSS variables
│
├── landing_api/                      # Centralized API fetchers
│
├── landing_types/
│   └── landing_types.ts              # BmiResult, LandingContextType interfaces
│
├── landing_utils/
│   └── LandingSharedConstants.ts     # STATS, SERVICES, TRAINERS, ABOUT_STATS_CARDS,
│                                     # ABOUT_FEATURES, TRANSFORMATIONS, TESTIMONIALS,
│                                     # PLANS, SCHEDULE, EMPTY_BOOKING_FORM, EMPTY_CONTACT_FORM
│
├── landing_context/
│   ├── LandingContext.tsx            # LandingProvider + useLandingContext() hook
│   └── useLandingLogic.ts            # All state (navbar, BMI, booking, contact) + handlers
│
└── landing_components/
    ├── LandingMain/
    │   └── LandingMain.tsx           # Root orchestrator — imports CSS, wraps LandingProvider,
    │                                 # assembles all 15 sections in scroll order
    ├── LandingNavbar/
    │   └── LandingNavbar.tsx         # Fixed top nav: logo, links, CTA buttons, mobile menu
    ├── LandingHero/
    │   └── LandingHero.tsx           # Full-page hero with headline, 3 CTA buttons, STATS strip
    ├── LandingAbout/
    │   └── LandingAbout.tsx          # Mission text + ABOUT_FEATURES checklist + ABOUT_STATS_CARDS grid
    ├── LandingBmiCalc/
    │   └── LandingBmiCalc.tsx        # BMI calculator: height/weight form + result panel (colorClass)
    ├── LandingPlans/
    │   └── LandingPlans.tsx          # 5-plan membership card grid with badges
    ├── LandingServices/
    │   └── LandingServices.tsx       # 9-service card grid (icons with CSS gradient classes)
    ├── LandingTrainers/
    │   └── LandingTrainers.tsx       # 4-trainer card grid (avatar with CSS gradient classes)
    ├── LandingSchedule/
    │   └── LandingSchedule.tsx       # Horizontally scrollable class timetable (4×7 grid)
    ├── LandingGallery/
    │   └── LandingGallery.tsx        # 3-image facility gallery with hover-reveal labels (id="gallery")
    ├── LandingBooking/
    │   └── LandingBooking.tsx        # Booking form: trial/membership/class radio + 3 fields
    ├── LandingTransformations/
    │   └── LandingTransformations.tsx # Before/after weight cards with review quotes (id="transformations")
    ├── LandingTestimonials/
    │   └── LandingTestimonials.tsx   # Aggregate rating card + 4 member review cards
    ├── LandingContact/
    │   └── LandingContact.tsx        # Contact info panel + message form
    └── LandingFooter/
        └── LandingFooter.tsx         # Brand column, quick links, programs, newsletter
```

---

## Section → Anchor ID Mapping

| Section               | `id` attribute       | `LandingUrlConfig.ANCHORS` key |
|-----------------------|----------------------|-------------------------------|
| LandingHero           | `#home`              | `HOME`                        |
| LandingAbout          | `#about`             | `ABOUT`                       |
| LandingBmiCalc        | `#bmi`               | *(no anchor in navbar)*       |
| LandingPlans          | `#plans`             | `PLANS`                       |
| LandingServices       | `#services`          | `SERVICES`                    |
| LandingTrainers       | `#trainers`          | `TRAINERS`                    |
| LandingSchedule       | `#schedule`          | `SCHEDULE`                    |
| LandingGallery        | `#gallery`           | `GALLERY`                     |
| LandingBooking        | `#booking`           | `BOOKING`                     |
| LandingTransformations| `#transformations`   | `TRANSFORMATIONS`             |
| LandingTestimonials   | `#testimonials`      | `TESTIMONIALS`                |
| LandingContact        | `#contact`           | `CONTACT`                     |

---

## Compliance Status

| Rule | Status | Notes |
|------|--------|-------|
| Rule 1 — Micro-modularization | ✅ | 15 isolated section components |
| Rule 2 — Descriptive naming | ✅ | All files descriptively named |
| Rule 3 — Centralized data | ✅ | All data in LandingSharedConstants.ts |
| Rule 4 — No inline colors | ✅ | Gradient classes in landing.css |
| Rule 5 — State management | ✅ | React Context + useMemo |
| Rule 6 — Logic/UI separation | ✅ | useLandingLogic.ts |
| Rule 7 — Type isolation | ✅ | landing_types/landing_types.ts |
| Rule 9 — loading.tsx + error.tsx | ✅ | Both present |
| Rule 10 — Absolute imports | ✅ | No relative paths |
| Rule 11 — URL config | ✅ | landing_url_config.ts |
| Rule 15 — Memoization | ✅ | useMemo + useCallback |
| Rule 18 — a11y / aria-labels | ✅ | Icon buttons have aria-label |
| Rule 26 — Skeleton loaders | ✅ | loading.tsx uses animate-pulse |
| Rule 27 — No any | ✅ | Strict TypeScript |
| Rule 32 — No barrel files | ✅ | Direct imports only |
| Rule 33 — Next/Image | ✅ | Navbar logo + Gallery images |
| Rule 36 — No arbitrary Tailwind | ✅ | No [#hex] or [px] values |
| Rule 37 — JSDoc | ✅ | useLandingLogic has JSDoc |
| Rule 38 — RESPONSIBILITY comment | ✅ | All files, after "use client" |
| Rule 39 — Data flow comments | ✅ | Context and hook files |
