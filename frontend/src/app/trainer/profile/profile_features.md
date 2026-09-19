# Trainer Profile — Feature Map

## Module Purpose
The Profile module lets each Trainer view and update their own profile information and change their password. Personal data is loaded from the Trainer profile API and edited through separate RHF/Zod forms. Password inputs always provide visibility toggles and submissions are disabled while pending. Trainers cannot edit other users or access Manager-only payroll/HR information.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/TrainerProfileMain/` | Personal/security form presentation | `TrainerProfileMain.tsx` |
| `profile_api/` | Profile API calls | `TrainerProfileApi.ts` |
| `profile_types/` | Profile and form schemas | `TrainerProfileSchema.ts`, `TrainerProfileTypes.ts` |
| `profile_hooks/` | Form/query/mutation orchestration | `useTrainerProfileLogic.ts` |
| `profile_utils/` | Static tab/specialization configuration | `TrainerProfileSharedConstants.ts` |

## Feature Inventory
| Feature | Route | API | Status |
|---|---|---|---|
| View profile | `/trainer/profile` | `GET /trainer/profile` | Live via API/MSW |
| Edit personal info | `/trainer/profile` | `PATCH /trainer/profile` | Live via API/MSW |
| Change password | `/trainer/profile` | `PATCH /trainer/profile/password` | Live via API/MSW |

## Data and State Architecture
TanStack Query owns the fetched profile. React Hook Form owns each form's draft state and dirty state. Password visibility is private component UI state. No backend profile response is stored in Zustand or Context.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerProfile()` | GET | `/trainer/profile` | — | `TrainerProfile` |
| `updateTrainerProfile(dto)` | PATCH | `/trainer/profile` | `UpdateTrainerProfileDto` | `TrainerProfile` |
| `changeTrainerPassword(dto)` | PATCH | `/trainer/profile/password` | `ChangePasswordDto` | mutation envelope/message |

## UI Data Requirements
| UI element | Field | Source |
|---|---|---|
| Name | `name` | profile response |
| Email | `email` | profile response |
| Phone | `phone` | profile response/form |
| Specializations | `specialization[]` | profile response/form constants |
| Password status | backend `message` | password mutation response |

## User Flows
### Flow 1: Update Personal Profile
1. Trainer opens `/trainer/profile` and the profile query loads the current server-backed profile.
2. Trainer edits permitted personal fields in the RHF form.
3. Zod validates the draft; invalid fields remain visible with inline errors.
4. Submit triggers `updateTrainerProfile(dto)` through the module mutation path.
5. On success, the TanStack Query profile cache is reconciled with the authoritative response and the saved values remain visible.
6. On failure, the draft is preserved and the backend message is surfaced safely.

### Flow 2: Change Password
1. Trainer opens the password section.
2. Trainer enters the required password fields and can toggle visibility.
3. Zod validates the form before submission.
4. `changeTrainerPassword(dto)` executes through the module API layer.
5. Success/error feedback uses the backend message; credentials are never exposed in UI errors.

## Edge Cases and AI Warnings
- **Password fields stay hidden by default:** Use the Eye/EyeOff toggle rather than exposing plaintext.
- **Dirty form protection:** Profile forms use `useTrainerUnsavedChangesGuard(isDirty)` for browser exits and approved navigation callbacks.
- **Failed mutation:** Preserve entered form data on failure; reset only after a successful response.
- **Email is read-only:** Do not add an email-update control to this module.
- **Sensitive error messages:** Show the standardized backend `message`; never expose raw response objects or credentials.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerProfileMain.tsx` | Renders personal/security forms and delegates data/validation/mutations. |

## Rule Compliance Checklist
- [x] RHF + Zod
- [x] Password visibility toggle
- [x] TanStack Query for server state
- [x] Dirty-state guard
- [x] Backend message handling

- **Feedback:** Mutation success/error feedback uses `useTrainerFeedback()` with stable deduplication IDs and the role-level `TrainerToastHost`.

## Current Implementation Alignment

- Module URL contract is owned by `profile_url_config.ts`; role URL configuration only owns role navigation.
- Feature server data is owned by the module API/query layer; UI components do not call `apiFetch` directly.
- Feature-owned mock/fixture files are the browser-first demonstration boundary.
- Route loading and error states use module-owned files; route error UI does not expose raw digest/message details.
- Root project runner/tooling files are outside this archive, so lint/typecheck/build/E2E execution remains an environment verification step.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, approved formatting utilities, Trainer feedback/UI primitives.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Permissions and Security
- Required capability: `trainer.view`.
- Profile access is self-scoped to the authenticated Trainer.
- Password mutation is a protected security-sensitive action and must never expose credentials or raw API errors.
- Frontend visibility does not replace backend authorization.

## Loading, Empty, and Error States
- Route `loading.tsx` provides profile-shaped skeleton UI.
- Profile query failure is rendered through a safe route/section error state.
- Mutation states disable submit buttons and preserve drafts on failure.

## Rule Compliance Checklist
- [x] RHF + Zod form architecture
- [x] Dirty-state guard
- [x] TanStack Query server-state ownership
- [x] Password visibility control
- [x] Module-owned URL/API/schema/fixtures/tests/docs
- [ ] Parent runtime/tooling/browser verification — NOT VERIFIED
