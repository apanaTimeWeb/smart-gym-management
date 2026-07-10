# Landing Module - AI Context Documentation

This document serves as an architectural map for the `landing` module. It was generated to provide future AI assistants with a strict understanding of the module's boundaries, state management, and file structure.

## 📁 Directory Structure

```
landing/
├── error.tsx
├── landing.css
├── landing_components
│   ├── LandingAbout
│   │   └── LandingAbout.tsx
│   ├── LandingBmiCalc
│   │   └── LandingBmiCalc.tsx
│   ├── LandingBooking
│   │   └── LandingBooking.tsx
│   ├── LandingContact
│   │   └── LandingContact.tsx
│   ├── LandingFooter
│   │   └── LandingFooter.tsx
│   ├── LandingGallery
│   │   └── LandingGallery.tsx
│   ├── LandingHero
│   │   └── LandingHero.tsx
│   ├── LandingMain
│   │   └── LandingMain.tsx
│   ├── LandingNavbar
│   │   └── LandingNavbar.tsx
│   ├── LandingPlans
│   │   └── LandingPlans.tsx
│   ├── LandingSchedule
│   │   └── LandingSchedule.tsx
│   ├── LandingServices
│   │   └── LandingServices.tsx
│   ├── LandingTestimonials
│   │   └── LandingTestimonials.tsx
│   ├── LandingTrainers
│   │   └── LandingTrainers.tsx
│   └── LandingTransformations
│       └── LandingTransformations.tsx
├── landing_context
│   ├── LandingContext.tsx
│   └── useLandingLogic.ts
├── landing_features.md
├── landing_types
│   └── landing_types.ts
├── landing_utils
│   └── LandingSharedConstants.ts
├── layout.tsx
├── loading.tsx
└── page.tsx
```

## 🏗️ Architectural Rules & Guidelines

1. **Extreme Micro-Modularization:** 
   This module is heavily broken down into micro-components located in `landing_components/`. Each file must contain exactly ONE React component and handle ONE specific micro-functionality.

2. **Isolated State Management (No Prop-Drilling):**
   - The state is managed locally via React Context in `landing_context/LandingContext.tsx`.
   - The heavy logic (data fetching, calculations) is extracted into the custom hook `landing_context/useLandingLogic.ts`.

3. **Centralized Hardcoded Data:**
   - Any UI text, default arrays, dropdown options, or mock data MUST be placed in `landing_utils/LandingSharedConstants.ts`. 
   - Never hardcode these inside the `.tsx` view files.

4. **Types and Interfaces:**
   - All TypeScript interfaces and types are strictly isolated in `landing_types/landing_types.ts`.

5. **Theme Independence:**
   - **DO NOT** use inline Tailwind colors like `text-gray-800` or `bg-blue-500`.
   - Use CSS variables defined in `landing.css` mapping to the global design system (e.g. `var(--text-primary)`, `var(--landing-bg)`).

6. **Absolute Imports:**
   - Never use relative imports like `../../`. 
   - Always use absolute imports starting with `@/` (e.g., `@/app/erp/landing/landing_context/...`).

## 🤖 Instructions for AI
If you are asked to modify a feature, find the EXACT micro-component from the tree above. If modifying logic, edit the `use...Logic.ts` file. If adding data, edit the `...SharedConstants.ts` file. Do not hallucinate files outside this module's boundary.
