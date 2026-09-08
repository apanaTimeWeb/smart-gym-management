# Trainer Profile — Feature Map

## Module Purpose
The Profile module lets trainers view and update their own account information — display name, phone number, and specialization — and change their password. It is strictly self-service: a trainer can only edit their own profile. They cannot view or edit other trainers' profiles, and they have no access to salary, payroll, or HR data (those are Manager-only).

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/TrainerProfileMain/` | Root client component. Renders Personal Info and Security tabs | `TrainerProfileMain.tsx` |
| `profile_api/` | API calls for fetching and updating trainer profile | `TrainerProfileApi.ts` |
| `profile_types/` | TypeScript interfaces for trainer profile data and form DTOs | `TrainerProfileTypes.ts` |
| `profile_context/` | Logic hook: form state, save handlers, password change | `useTrainerProfileLogic.ts` |
| `profile_utils/` | Centralized constants: tab definitions, specialization options | `TrainerProfileSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| View Profile | `/trainer/profile` | View name, email (read-only), phone, specialization | `TrainerProfileMain` | `GET /api/v1/trainer/profile` | 🔧 Stub |
| Edit Profile | `/trainer/profile` | Update name, phone, specialization | `TrainerProfileMain` | `PATCH /api/v1/trainer/profile` | 🔧 Stub |
| Change Password | `/trainer/profile` (Security tab) | Change password with current + new + confirm fields, eye-toggle visibility | `TrainerProfileMain` | `PATCH /api/v1/trainer/profile/password` | 🔧 Stub |

## Data and State Architecture
- **State pattern:** Local `useState` in `useTrainerProfileLogic.ts` — no Zustand needed for a single-user self-edit form.
- **Email is read-only:** Email cannot be changed from the profile page. It is displayed but the input is disabled.
- **Password visibility:** All three password fields have eye-toggle buttons (Rule 23).

## API Contract

| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerProfile()` | GET | `/api/v1/trainer/profile` | — | `TrainerProfile` |
| `updateTrainerProfile(dto)` | PATCH | `/api/v1/trainer/profile` | `UpdateTrainerProfileDto` | `TrainerProfile` |
| `changeTrainerPassword(dto)` | PATCH | `/api/v1/trainer/profile/password` | `ChangePasswordDto` | `void` |

## Edge Cases and AI Warnings
- **Email is always read-only** — Never make the email field editable. Email changes require a separate verification flow not present in this module.
- **`TrainerProfileMain.tsx` at profile root is a re-export shim** — The canonical component is in `profile_components/TrainerProfileMain/TrainerProfileMain.tsx`. The root-level file only re-exports it for backward compatibility. Do not add logic to the root-level file.
- **No `TrainerHeader` import** — The layout handles the header. Do not import it in `TrainerProfileMain`.
- **Password change requires all three fields** — Current, new, and confirm password are all required. Validate that new === confirm before calling the API.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component, TrainerProfileMain = Client Component
- [x] Rule 23: Password visibility toggle (Eye/EyeOff) on all password fields
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `TrainerProfileUrlConfig.ts` present
- [x] Rule 2: Zero cross-role imports
- [x] Rule 29: `motion-safe:` prefix on animations
