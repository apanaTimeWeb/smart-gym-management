# Trainer Profile — Feature Map

## Module Purpose
The Profile module lets each Trainer view and update their own profile information and change their password. Personal data is loaded from the Trainer profile API and edited through separate RHF/Zod forms. Password inputs always provide visibility toggles and submissions are disabled while pending. Trainers cannot edit other users or access Manager-only payroll/HR information.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/TrainerProfileMain/` | Personal/security form presentation | `TrainerProfileMain.tsx` |
| `profile_api/` | Profile API calls | `TrainerProfileApi.ts` |
| `profile_types/` | Profile and form schemas | `TrainerProfileSchema.ts`, `TrainerProfileTypes.ts` |
| `profile_context/` | Form/query/mutation orchestration | `useTrainerProfileLogic.ts` |
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
