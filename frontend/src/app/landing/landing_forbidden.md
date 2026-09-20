# Landing — Forbidden Patterns

This file is the repair-time guardrail for the `landing` feature module.

## Architecture Boundaries

1. Do not import business behavior from another feature or role. Landing currently has **no business-feature or role-level dependencies**.
2. Do not move Landing business logic into `src/components/ui/`, role-wide business folders, or generic global helpers.
3. Do not reintroduce a broad `LandingContext` for API data, mutation state, form state, or business workflows.
4. Do not bypass `landing_api/landing_api.ts` by calling transport code directly from UI components or reading fixtures directly.
5. Do not move Landing mock/fixture data into global mock folders.

## Data / API

6. Do not hardcode API URLs in components, hooks, tests, or mock handlers; use `landing_url_config.ts`.
7. Do not hardcode numeric HTTP status codes; use `http-status-codes` constants.
8. Do not consume an API response without the module Zod response schema.
9. Do not create component-level fake business fallbacks such as `owner ?? "Demo"` for API-backed data.
10. Do not swallow backend/API failures or replace the returned `message` with invented success/error copy.
11. Do not turn static success responses into fake mutation behavior. Mutable mock state must visibly change after create/update/delete-style operations when such flows exist.

## Forms / State

12. Non-trivial forms must use React Hook Form + Zod + `@hookform/resolvers`.
13. Keep form view, form hook, schema, and API responsibilities separated.
14. Disable submission while pending and prevent duplicate submit.
15. Preserve user-entered values after failed requests unless requirements explicitly say otherwise.
16. Reset the form only after confirmed success or an explicit user action to start over.
17. Dirty booking/contact forms must preserve the `beforeunload` warning contract.
18. Do not store server/API data in Zustand or Context.

## Styling / Design System

19. Do not use raw hex/RGB/RGBA theme colors in JSX when a semantic token exists.
20. Do not use arbitrary Tailwind values such as `w-[325px]`, `text-[15px]`, or `bg-[var(...)]`.
21. Do not use semantic background opacity modifiers such as `bg-success/10` or `bg-primary/20`.
22. Do not use hardcoded `text-white`, `text-black`, `bg-white`, `bg-black`, or `border-white` for themed UI.
23. Solid semantic backgrounds must use the documented contrasting text token.
24. Do not invent theme colors. Feature-local CSS variables require an explicit portability rationale.
25. Do not use random z-index values; use the documented z10/z20/z30/z40/z50 scale.
26. Do not use hover-only functionality on mobile/touch.
27. Interactive controls require visible focus-visible styling.

## Naming / Structure

28. All non-framework-reserved module files must use the module prefix and descriptive semantic name.
29. Do not use abbreviations such as `Btn`, `Nav`, or `Utils` in new module file/component names.
30. Do not create generic `Props`/`Data` exports for complex contracts.
31. Do not create `index.ts`/`index.js` barrel files.
32. Do not use relative imports; use `@/` absolute imports.

## Code Quality

33. Do not use `any`, `@ts-ignore`, or `@ts-nocheck`.
34. Do not use `console.log` in committed production code.
35. Do not put complex transformation logic directly inside JSX.
36. Custom hooks and non-trivial utilities must have concise intent JSDoc.
37. Every component file must retain a precise responsibility comment.
38. Context and custom hooks must document data-flow direction where they exist.

## Interaction Integrity

39. No button/link/control may be left as a visual no-op.
40. Do not use `href="#"` as a placeholder destination.
41. Do not hide a missing downstream flow with a fake toast or fake success message.
42. Retry must actually repeat the failed operation.
43. Save/Submit/Apply/Delete/Export/Next/Back controls must produce the documented downstream state change.
44. A route is not complete merely because it renders; reachable user flows must close with observable success, failure, cancellation, or navigation outcomes.

## Accessibility / Responsive

45. Every form field requires an associated label and appropriate `aria-describedby` / `aria-invalid` behavior where validation exists.
46. Icon-only controls require accessible labels.
47. Keyboard users must have a functional path equivalent to pointer users.
48. Dialog/drawer behavior must support Escape, focus management and mobile-safe interaction where applicable.
49. Dynamic constrained text should use the documented truncation + accessible tooltip strategy when truncation is actually applied.
50. Do not reintroduce desktop-only hover behavior as the only way to access actions.

## Testing

51. Do not add placeholder assertions such as `expect(true).toBe(true)`.
52. Do not satisfy coverage with render-only tests when behavior is the requirement.
53. Interactive tests must prove `user action → state/API/mock transition → visible result`.
54. Hook and utility tests must be co-located.
55. Do not mock away the exact behavior the test is supposed to prove.
