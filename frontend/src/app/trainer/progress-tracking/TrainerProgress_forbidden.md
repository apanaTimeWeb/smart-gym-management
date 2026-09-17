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

13. **NO Global Member Access:** Trainers cannot fetch `fetchProgressEntries` for a member ID that is not actively assigned to them. The member selector must ONLY list the trainer's own assigned members.

14. **NO Editing Historic/Other Trainer's Data:** Trainers cannot edit or delete a progress entry recorded by another trainer or by the admin. Progress mutations should only be allowed on entries owned/recorded by the current trainer.

15. **NO Member Profile or Plan Deletion:** Progress tracking is purely observational and metric-based. Trainers must not be able to suspend a member or delete a member's plan from the progress tracking UI.

16. **NO Hardcoded Trainer ID:** When creating an entry (`createProgressEntry`), the `recordedBy` or `trainerId` field must come from the server's session/auth token context. The frontend must not hardcode `"Trainer John"`.

17. **NO Mixed Client/Server Filtering for Trends:** Do not pull down 10,000 progress entries to calculate trends on the client. Only fetch the entries for the explicitly selected member(s).
