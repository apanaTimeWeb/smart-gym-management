Hey, I want you to deeply analyze the @[app/(app)/[MODULE_NAME]] folder and refactor it into an Enterprise-Grade, Highly Scalable, and strictly "AI-Friendly" architecture. 

Currently, no one writes code manually; AI writes it. Because of this, my primary goal is extreme isolation. Tomorrow, if I ask an AI to fix a specific bug, I should only need to provide ONE exact file to the AI, completely eliminating the risk of the AI hallucinating and breaking other working functionalities. However, the folder architecture must remain highly organized and visually logical so that human developers can easily navigate it without getting lost in a flat directory of 50+ files.

Please follow these strict architectural rules:

1. **Micro-Modularization & Feature-Based Sub-folders (Crucial)**: 
Break down all large or mixed files. Every file must contain only one React component and handle only one specific micro-functionality. **CRITICAL:** Do not dump all these micro-files into a single flat directory. Group them logically into cohesive sub-folders within the module. 
**IMPORTANT FOLDER NAMING:** Always prefix the main internal folders with the module name (e.g., use `[moduleName]_components/`, `[moduleName]_context/`, `[moduleName]_utils/` instead of generic names like `components/`). This ensures that when providing context to an AI (using `@`), the AI only loads the exact folder for this module, avoiding cross-module hallucinations. Inside these prefixed folders, group files logically (e.g., `[moduleName]_components/Header/`).
Next.js App Router uses Server Components by default, so you MUST explicitly include `"use client";` at the top of any file that uses hooks (`useState`, `useEffect`) or event listeners.

2. **Highly Descriptive, Self-Documenting Filenames**: 
Rename all components and files to be extremely descriptive based on exactly what they do (e.g., `[ModuleName]SearchFilter.tsx`, `[ModuleName]PaymentOptions.tsx`). Filename length doesn't matter; instant clarity for a new developer (or an AI context window) is the only priority.

3. **Backend-Ready Centralized Data (Single Source of Truth)**: 
Find all hardcoded UI data (dropdown options, filter lists, default preset arrays, payment modes, etc.) scattered across the UI components. Extract them into feature-specific constant files alongside their components (e.g., `HeaderConstants.ts` inside the `/Header` folder) or a module-level `[ModuleName]SharedConstants.ts` for data used across multiple sub-folders.
*Why?* Because tomorrow, this hardcoded data will be replaced by a Backend API call. By keeping it all in one file today, I will only have to change one file tomorrow to integrate the API, without touching the UI components. Derive your TypeScript types directly from these central arrays.

4. **Theme Independence (No Inline Colors)**: 
Remove all hardcoded Tailwind color utilities (like `text-primary`, `bg-card`) from the JSX. Replace them with custom CSS variables (e.g., `var(--[moduleName]-primary-bg)`) and define all these variables centrally in @[[MODULE_NAME].css]. This ensures that I can copy-paste this entire folder to another project and theme it entirely from one CSS file.

5. **Smart & Isolated State Management (Avoid Excessive Prop Drilling)**: 
Because the components will be heavily micro-modularized (Rule #1), avoid creating a massive web of prop drilling (passing data through 5 layers of components). If multiple micro-components need to share the same state, create a state store exclusively for this module (e.g., a local React Context `[ModuleName]Context.tsx` or a feature-sliced Zustand/Redux store placed strictly inside this module's folder). Do NOT bloat the global app state; keep the state architecture isolated to this feature. Since components are heavily micro-modularized, if you use React Context, you MUST implement proper memoization (`useMemo`, `useCallback`) to prevent massive re-render chains across the sub-folders.

6. **Separation of Logic and UI (Custom Hooks for Extreme Isolation)**: 
Do not mix complex React logic (`useEffect`, multi-step state calculations, data transformations) with JSX markup.
Extract all heavy logic into an adjacent custom hook file (e.g., `use[ComponentName].ts`). The actual `.tsx` file should act purely as a "View" layer that consumes the hook.
*Why?* If there is a bug in the calculation logic, you feed the AI only the `use...` file. It fixes the logic with zero risk of accidentally deleting a `<div>` or altering the UI structure.

7. **Interface & Type Isolation (The Prop Blueprint)**: 
Never define complex `Interfaces` or `Types` directly inside the component files. Extract all TypeScript definitions (Component Props, API Payloads, State Shapes) into a dedicated `[moduleName]_types.ts` file or folder.
*Why?* When an AI is generating a new micro-component, you only need to provide the `types` file. The AI instantly knows the exact data shape it is working with, drastically reducing hallucinations.

8. **Strict Server vs. Client Component Boundaries (Next.js Specific)**: 
Respect the Next.js App Router architecture. Keep top-level files like `page.tsx` or `layout.tsx` strictly as **Server Components** (no `"use client"`). Use these to fetch initial data securely. Pass this data downwards as props into your micro-modularized **Client Components**.
*Why?* It creates a clean separation of concerns. Data fetching issues are solved in the Server Component; interactivity issues are solved in the Client Component. You will never need to feed an AI both files at the same time.

9. **Leverage Next.js Native Features**: 
Ensure that the module properly utilizes Next.js native routing features for a great user experience. Extract loading states into `loading.tsx` and error boundaries into `error.tsx` wherever applicable in the module's directory.

10. **Absolute Imports Only (No Relative Paths)**: 
Never use relative imports (like `../../` or `./`) for importing components, contexts, utilities, or types. Always use absolute imports starting with `@/` (e.g., `@/app/(erp)/workout/workout_context/WorkoutContext`).
*Why?* This allows files to be moved around easily without breaking import paths and makes it much easier to copy-paste code snippets or have an AI generate standalone code without worrying about relative directory depth.

11. **Centralized URL Configuration (No Hardcoded URLs)**: 
Never hardcode URLs (e.g., `/api/auth/refresh`, `/login`, etc.) directly into API wrappers or React components. Each module must have exactly one centralized URL configuration file, named exactly `[moduleName]_url_config.ts` (e.g., `auth_url_config.ts`). This file must export all internal page routes and external API routes used by that module as named constants. Any file in the module or global utilities that needs to call an endpoint or navigate to a page must import the URL from this specific config file.
*Why?* If the backend controller path changes or the frontend route structure is updated, we only need to change the path in ONE file instead of hunting down string literals across multiple components and API clients.

13. **No Hardcoded HTTP Status Codes**: 
Never hardcode numeric HTTP status codes (e.g., `401`, `500`, `200`) in API routes, proxies, or fetch wrappers. Always use standard enums/constants from libraries like `http-status-codes` (e.g., `StatusCodes.UNAUTHORIZED`). This improves code readability and prevents silly typos in status codes.

14. **Update AI-Context Documentation**: 
Once the entire refactor is complete, update the project documentation in @[[MODULE_NAME]_features.md]. This document must serve as a map for future AI sessions. Clearly document the new "Feature-Based Sub-folder" directory structure, what each file precisely does, and where the centralized data/state is kept.

Think step-by-step. Create a detailed implementation plan first so I can review it, and then execute it perfectly without breaking existing data flows!