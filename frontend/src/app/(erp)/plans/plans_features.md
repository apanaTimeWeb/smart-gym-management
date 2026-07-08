# Plans Module Features & Architecture

## Overview
The Plans module (`app/(erp)/plans`) allows gym administrators to manage their subscription offerings. They can create, edit, and delete tiers (e.g., Basic, Gold, Premium), set 1/3/6/12-month pricing, and list features for each plan.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `plans_components/`
- `PlansMain/PlansMain.tsx`: The primary Client Component layout wrapper that initiates the `PlansProvider` and renders the content.
- `PlansToolbar/PlansToolbar.tsx`: Houses the top action bar displaying the count of active plans and the 'Create Plan' button.
- `PlansGrid/PlansGrid.tsx`: Displays the grid of membership plans. Each plan renders its 4 pricing tiers and a checklist of features. It also conditionally renders a 'Most Popular' banner on the second item in the list.
- `PlanModal/PlanModal.tsx`: A self-contained modal form for creating or editing a gym membership plan.

### 2. `plans_context/`
- `usePlansLogic.ts`: An isolated custom hook containing the React logic to fetch plans and handle modal form state.
- `PlansContext.tsx`: The single source of truth for the Plans UI state. It consumes `usePlansLogic` and distributes state without prop drilling.

### 3. `plans_types/`
- `plans_types.ts`: Contains TypeScript definitions like `PlansContextType`.

### 4. `plans_utils/`
- `PlansSharedConstants.ts`: Centralizes static data like the `TIERS` array, the empty state shape of the plan form, and a currency formatter function.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `PlansMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `plans.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--plans-bg-card`) ensuring theme independence.
