# Trainer Role — Feature Map

## Module Purpose
The Trainer role container defines the authenticated Trainer application area and its role-owned shell. It exposes the documented Trainer feature modules without moving their business logic into the role container. It owns role navigation, shell presentation, approved Trainer-wide feedback/navigation infrastructure, and the dependency allowlist for those features. Feature business behavior remains inside the owning feature modules.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `attendance/` | Member/self attendance workflows | `page.tsx`, `attendance_api/`, `attendance_queries/`, `attendance_components/` |
| `dashboard/` | Operational trainer dashboard | `page.tsx`, `dashboard_api/`, `dashboard_queries/`, `dashboard_components/` |
| `earnings/` | Trainer earnings/history | `page.tsx`, `earnings_api/`, `earnings_queries/`, `earnings_components/` |
| `library/` | Diet library and assignment | `page.tsx`, `library_api/`, `library_hooks/`, `library_components/` |
| `members/` | Trainer member workspace | `page.tsx`, `members_api/`, `members_queries/`, `members_components/` |
| `notifications/` | Trainer notification reads | `page.tsx`, `notifications_api/`, `notifications_components/` |
| `profile/` | Trainer self-profile/security | `page.tsx`, `profile_api/`, `profile_hooks/`, `profile_components/` |
| `progress-tracking/` | Member progress workflows | `page.tsx`, `progress-tracking_api/`, `progress-tracking_queries/`, `progress-tracking_components/` |
| `schedule/` | Availability and leave requests | `page.tsx`, `schedule_api/`, `schedule_queries/`, `schedule_components/` |
| `sessions/` | Session management | `page.tsx`, `sessions_api/`, `sessions_queries/`, `sessions_components/` |
| `workout/` | Workout plan/exercise workflows | `page.tsx`, `workout_api/`, `workout_queries/`, `workout_components/` |
| `trainer_components/` | Zero-business Trainer shell/feedback primitives | `TrainerLayout/`, `TrainerFeedback/`, `TrainerShared/` |
| `trainer_utils/` | Trainer-wide infrastructure helpers only | `TrainerApiResponseSchema.ts`, `TrainerNavigationGuardStore.ts`, `TrainerUseDebounce.ts`, `TrainerUseWarnIfUnsavedChanges.ts` |

## Approved External Dependencies
### Application Infrastructure
- Parent application API transport and formatting infrastructure.
- Parent application authentication/session infrastructure.
- Global design-system primitives and shell bootstrap.
### Business Feature Dependencies
- None between sibling Trainer features.
### Role-Level Business Dependencies
- None; `trainer_components/` and `trainer_utils/` are restricted to shell/feedback/infrastructure responsibilities.

## Feature Inventory
| Feature | Route | User-visible responsibility |
|---|---|---|
| Dashboard | `/trainer/dashboard` | Operational coaching overview. |
| Members | `/trainer/members` | Member browsing/profile/notes. |
| Workout | `/trainer/workout` | Workout plan/exercise management. |
| Diet Library | `/trainer/library` | Diet plan browsing/assignment. |
| Sessions | `/trainer/sessions` | Session scheduling/attendance. |
| Attendance | `/trainer/attendance` | Attendance review and recording. |
| Schedule | `/trainer/schedule` | Availability/leave. |
| Progress Tracking | `/trainer/progress-tracking` | Progress measurements/comparison. |
| Earnings | `/trainer/earnings` | Trainer earnings/history. |
| Notifications | `/trainer/notifications` | Notification review/read state. |
| Profile | `/trainer/profile` | Trainer profile/security. |

## Data and State Architecture
Trainer feature server data is owned by TanStack Query inside each feature. UI-only shared state belongs to the owning feature's Zustand/local state, while Trainer-wide navigation/confirmation infrastructure remains outside business modules. Module APIs use feature URL configs and module-owned Zod/MSW contracts.

## Loading, Empty, and Error States
Each route defines `loading.tsx`, `error.tsx`, and `not-found.tsx` where applicable. Section-level failures remain local to their feature rather than being swallowed by the role container.

## Edge Cases and AI Warnings
- Never import business behavior from another Trainer feature.
- Never move feature-specific fixtures, APIs, types, hooks, or permissions into `trainer_components/` or `trainer_utils/`.
- Runtime verification of the parent application remains a separate gate when the parent project is unavailable.

## Rule Compliance Checklist
- [x] Feature boundary used as AI repair unit
- [x] No sibling business dependencies in Trainer feature modules
- [x] Role shell separated from feature business logic
- [x] Trainer URL config centralized
- [x] Runtime parent-app verification explicitly documented as external when unavailable
