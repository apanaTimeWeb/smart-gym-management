# trainer_utils — Feature Map

## Module Purpose
`trainer_utils/` contains stable Trainer infrastructure helpers that are shared across Trainer features without owning any business domain behavior. Its responsibilities include canonical API-envelope validation, debounce support, navigation dirty-state coordination, safe error reporting, and stable Trainer-wide constants. It does not own feature records, business workflows, feature-specific API handlers, or business fixtures.

## Directory Structure
| Folder/File | Responsibility | Key Files |
|---|---|---|
| `trainer_utils/` | Stable Trainer infrastructure helpers | `TrainerApiResponseSchema.ts`, `TrainerErrorReporter.ts`, `TrainerNavigationGuardStore.ts`, `TrainerSharedConstants.ts`, `TrainerUseDebounce.ts`, `TrainerUseWarnIfUnsavedChanges.ts`, `TrainerUserSafeError.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — canonical HTTP transport only.
- `@/lib/logger` — centralized diagnostics.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| API response contract | N/A | Not directly user-facing; validates Trainer API response envelopes | `TrainerApiResponseSchema.ts` | None | ✅ Maintained |
| Dirty navigation guard | `/trainer/*` | Receive safe warning before leaving dirty forms | `TrainerNavigationGuardStore.ts`, `TrainerUseWarnIfUnsavedChanges.ts` | None | ✅ Maintained |
| Error reporting/safe errors | `/trainer/*` | Send safe diagnostics without exposing internal details | `TrainerErrorReporter.ts`, `TrainerUserSafeError.ts` | Monitoring only | ✅ Maintained |
| Debounce/shared constants | `/trainer/*` | Provide stable timing/configuration helpers | `TrainerUseDebounce.ts`, `TrainerSharedConstants.ts` | None | ✅ Maintained |

## User Flows & Interactions
1. A feature API response arrives → `TrainerApiResponseSchema` validates the canonical envelope → feature schema validates its payload.
2. A complex form becomes dirty → `TrainerUseWarnIfUnsavedChanges` registers the source → browser/in-app navigation is guarded until the user confirms.
3. A runtime error occurs → `TrainerErrorReporter` emits safe diagnostics → UI receives a non-technical fallback.

## Data and State Architecture
- **State pattern:** infrastructure only; no server-state ownership.
- **Zustand stores:** `TrainerNavigationGuardStore.ts` stores only dirty-navigation coordination state.
- **Context providers:** None.
- **Local-storage keys:** None.
- **MSW handler/fixture:** None.

## API Contract
- No feature API clients are owned here. `TrainerApiResponseSchema.ts` validates response envelopes consumed by feature API clients.

## UI Data Requirements
- No business UI is owned here.

## Permissions and Security
- No business permission policy is defined here. Global/session security infrastructure remains authoritative.

## Loading, Empty, and Error States
- Not applicable as a standalone feature surface. Error helpers support feature-owned fallbacks.

## Edge Cases and AI Warnings
- **Do not place business logic here:** similar behavior needed by a feature should be duplicated locally if it reduces business coupling.
- **Do not store API response data in the navigation guard store.**
- **Do not weaken safe-error behavior:** raw backend/internal details must not leak to users.

## Component Responsibility Map
- No React components are owned here.

## Rule Compliance Checklist
- [x] Infrastructure-only responsibility documented.
- [x] No business mock data.
- [x] Canonical API envelope validator centralized here.
- [x] No sibling feature imports.
