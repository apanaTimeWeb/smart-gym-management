# Progress Tracking — Forbidden Patterns

## Strictly Forbidden

1. **No TrainerHeader import** — layout.tsx handles the header. Never import TrainerHeader inside any component in this module.

2. **No alert() / window.confirm()** — always use `useConfirm()` from `TrainerConfirmProvider` (Rule 71).

3. **No native `<select>` for large datasets** — use `SearchableDropdown` from `TrainerShared/` (Rule 20).

4. **No animations without motion-safe:** — all Tailwind animation/transition classes must be prefixed with `motion-safe:` (Rule 29).

5. **No direct API calls in components** — all API calls go through `progress_api/TrainerProgressApi.ts` via the logic hook.

6. **No 'use client' on page.tsx** — page.tsx must remain a Server Component. Only `*Main.tsx` and sub-components are Client Components.

7. **No hardcoded member IDs in production** — `selectedMemberId` and `selectedComparisonIds` must come from route params or a member selector when backend is wired.

8. **No BMI stored without recalculation** — BMI must always be derived from weight and height, never stored as a raw user input.

9. **No Recharts / Chart.js in comparison chart** — `TrainerProgressComparisonChart` must use ApexCharts exclusively via dynamic import with `{ ssr: false }` (web_global_design.md).

10. **No inline hex colors in ApexCharts config** — exception: `#FACC15` (primary gold) and the fixed 4-member palette in `MEMBER_COLORS` are the only allowed hardcoded hex values. All other colors must use CSS variables.

11. **No write operations in comparison view** — `TrainerProgressComparisonTable` and `TrainerProgressComparisonChart` are strictly read-only. Never add edit/delete buttons to the Compare tab.

12. **No more than COMPARISON_MAX_MEMBERS selected** — the selector enforces this in UI; `toggleComparisonMember` in the logic hook also enforces it. Never bypass this limit.
