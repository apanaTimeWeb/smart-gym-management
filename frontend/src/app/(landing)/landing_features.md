# Landing Page Features & Architecture

## Overview
The Landing module (`app/(landing)`) is the public-facing promotional website for GymSmart. It serves to convert visitors into members by showcasing facilities, pricing, trainers, transformations, and handling incoming leads (via contact and booking forms).

## AI-Context Architecture
This massive ~800-line monolith has been refactored into a strictly AI-Friendly, micro-modularized structure following the exact same guidelines applied to the internal `(erp)` system.

### 1. `landing_components/`
The monolithic page has been sliced into 14 individual, single-responsibility UI components:
- `LandingNavbar.tsx`
- `LandingHero.tsx`
- `LandingAbout.tsx`
- `LandingBmiCalc.tsx`
- `LandingPlans.tsx`
- `LandingTrainers.tsx`
- `LandingServices.tsx`
- `LandingSchedule.tsx`
- `LandingGallery.tsx`
- `LandingBooking.tsx`
- `LandingTransformations.tsx`
- `LandingTestimonials.tsx`
- `LandingContact.tsx`
- `LandingFooter.tsx`

### 2. `landing_context/`
- `LandingContext.tsx`: Extracts and centralizes all the complex logic that was cluttering the UI:
  - Navbar scroll listeners and mobile menu toggles.
  - BMI Calculator mathematical logic and validation.
  - Asynchronous form submission logic for `Booking` and `Contact`.

### 3. `landing_utils/`
- `LandingSharedConstants.ts`: Extracts all 7 massive hardcoded mock data arrays (`STATS`, `SERVICES`, `TRAINERS`, `TRANSFORMATIONS`, `TESTIMONIALS`, `PLANS`, `SCHEDULE`) into a pure constants file to keep the UI components clean.

### 4. Root Files
- `page.tsx`: Acts simply as the structural stack, initializing the `LandingProvider` and sequentially rendering the 14 components.
- `landing.css`: Houses CSS variables specific to the landing page dark theme, ensuring compatibility with the global design system token structure.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features.
