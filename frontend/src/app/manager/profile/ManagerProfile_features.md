# Manager Profile — Feature Map

## Module Purpose
The Profile module lets a manager view and edit their own name and phone number and change their password. Email, role, and branch assignment are server-owned read-only fields.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_components/ManagerProfileMain/` | View layer and RHF forms | `ManagerProfileMain.tsx` |
| `profile_api/` | Profile query/mutation API clients | `ManagerProfileApi.ts`, `ManagerUseManagerProfileQueries.ts`, `ManagerUseManagerProfileMutations.ts` |
| `profile_types/` | DTOs and runtime schemas | `ManagerProfileTypes.ts`, `ManagerProfileSchema.ts` |
| `profile_utils/` | Form validation and tab constants | `ManagerProfileFormSchemas.ts` |
| `profile_fixtures/` | MSW profile response fixture | `ManagerProfileMockData.ts` |

## Feature Inventory
| Feature | Route | API |
|---|---|---|
| View Profile | `/manager/profile` | `GET /manager/profile` |
| Edit Profile | `/manager/profile` | `PATCH /manager/profile` |
| Change Password | `/manager/profile` | `PATCH /manager/profile/password` |

## Data and State Architecture
TanStack Query owns the server profile. React Hook Form + Zod owns profile and password drafts. Local state is limited to active tab and password-visibility UI state; server fields are not duplicated in `useState`.

## Loading, Empty, Error States
The route has loading and error boundaries; query failures surface an actionable retry state. Mutation feedback uses the backend response message and reset occurs only after successful submission.

## Edge Cases / AI Warnings
- Password inputs retain eye-toggle controls.
- Failed submissions preserve entered values.
- Dirty profile/password forms register a `beforeunload` warning; application confirmations use `useConfirm`, not browser `window.confirm`.
