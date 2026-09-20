# trainer_e2e — Feature Map

## Module Purpose
`trainer_e2e/` contains end-to-end verification for critical Trainer workflows. It does not render production UI and it does not own business API behavior; instead, it drives the real application surface through Playwright. The suite covers route reachability, permission-denied behavior, destructive-action confirmation, schedule validation, URL-state persistence, read-only earnings behavior, profile controls, and responsive shell smoke coverage.

## Directory Structure
| Folder/File | Responsibility | Key Files |
|---|---|---|
| `trainer_e2e/` | Playwright critical-flow tests and their documentation | `TrainerCriticalFlows.spec.ts`, `trainer_e2e_*` docs |

## Approved External Dependencies
### Application Infrastructure
- `@playwright/test`
- Trainer route URL constants through `@/app/trainer/trainer_url_config`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Verification Feature | Route(s) | What It Verifies | Key Test | Status |
|---|---|---|---|---|
| Route reachability | all `TrainerPageUrlConfig` routes | Each supported Trainer route reaches a visible page state | `every supported Trainer route reaches a visible page state` | ✅ Defined; runtime NOT VERIFIED here |
| Permission denial | `/trainer/dashboard` | Unauthorized role receives access-denied UI | `permission-denied UI is visible to an unauthorized role` | ✅ Defined; runtime NOT VERIFIED here |
| Critical confirmations | `/trainer/sessions`, `/trainer/progress-tracking` | Destructive/cancellation controls require confirmation | two confirmation tests | ✅ Defined; runtime NOT VERIFIED here |
| Schedule validation | `/trainer/schedule` | Leave form exposes validation before submission | `schedule leave form exposes validation...` | ✅ Defined; runtime NOT VERIFIED here |
| URL state | `/trainer/members` | Search/page query params survive navigation | `members search and pagination remain shareable through URL state` | ✅ Defined; runtime NOT VERIFIED here |
| Earnings restrictions | `/trainer/earnings` | Trainer role remains read-only | `earnings remains read-only for Trainer role` | ✅ Defined; runtime NOT VERIFIED here |
| Responsive smoke | `/trainer/dashboard` | Shell is usable at 375/768/1280 widths | `Trainer shell remains usable at documented breakpoints` | ✅ Defined; runtime NOT VERIFIED here |

## User Flows & Interactions
- Critical-flow tests intentionally use required assertions for controls that must exist; they must not silently skip because a required control is absent.

## Data and State Architecture
- Playwright drives the production feature paths and does not bypass feature APIs.
- Route values come from `TrainerPageUrlConfig`.

## API Contract
- No API client is owned by E2E.

## UI Data Requirements
- Runtime assertions depend on production feature data/fixtures provided by the application.

## Permissions and Security
- Permission-denied smoke coverage is mandatory for protected Trainer routes.

## Loading, Empty, and Error States
- Critical route/feature state checks should be expanded here when a module marks a loading/empty/error path as critical.

## Edge Cases and AI Warnings
- **Do not weaken required assertions to `if (count)` checks:** missing critical controls must fail the test.
- **Do not hardcode route lists separately from the canonical Trainer route config.**
- **Do not treat route visibility as proof that downstream interaction works.**

## Component Responsibility Map
- No production React components are owned here.

## Rule Compliance Checklist
- [x] Critical controls are asserted as required where documented.
- [x] Route inventory is sourced from canonical Trainer route config.
- [x] E2E test file remains outside production feature modules.
