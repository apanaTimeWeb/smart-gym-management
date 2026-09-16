# Superadmin Repair Manifest

## Applied changes
- Isolated sibling business feature dependencies by moving consuming contracts/API calls into the consuming feature.
- Added local URL constants for cross-feature navigation/API endpoints.
- Moved Plans list TanStack Query/mutation orchestration into `plans/plans_components/useSuperadminPlansList.ts`.
- Added keyboard Escape/focus-trap/focus-restore semantics and ARIA labelling to `SuperadminConfirmModal`.
- Replaced identified raw Tailwind color utilities with semantic tokens.
- Updated Superadmin architecture documentation to match the current feature-oriented repository.

## Verification limitation
This archive is module-only. Host-project `package.json`, `tsconfig`, ESLint, Tailwind configuration, monitoring provider and E2E runtime were not supplied; full build/test/type/lint verification remains **NOT VERIFIED** until integrated into the host project.
