# Manager Profile — Feature Map

## Module Purpose
Manager Profile is the authenticated manager’s own profile and credentials workspace. It lets the manager view/update profile details and change the account password. This module is not a general staff administration surface. Profile and password data are server state handled only through the module API and approved authentication infrastructure.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_api/` | Feature-owned responsibility for the profile module. | `ManagerProfileApi.ts; ManagerUseManagerProfileMutations.ts; ManagerUseManagerProfileQueries.ts` |
| `profile_components/` | Feature-owned responsibility for the profile module. | `—` |
| `profile_hooks/` | Feature-owned responsibility for the profile module. | `ManagerUseManagerProfileLogic.ts` |
| `profile_fixtures/` | Feature-owned responsibility for the profile module. | `ManagerProfileMockData.ts` |
| `profile_mocks/` | Feature-owned responsibility for the profile module. | `—` |
| `profile_types/` | Feature-owned responsibility for the profile module. | `ManagerProfileSchema.ts; ManagerProfileTypes.ts` |
| `profile_utils/` | Feature-owned responsibility for the profile module. | `ManagerProfileFormSchemas.ts` |

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchProfile | `/manager/profile` | Uses the fetchProfile workflow with typed request/response handling. | `GET /manager/profile` | ✅ Implemented |
| updateProfile | `/manager/profile` | Uses the updateProfile workflow with typed request/response handling. | `PATCH /manager/profile` | ✅ Implemented |
| updatePassword | `/manager/profile` | Uses the updatePassword workflow with typed request/response handling. | `PATCH /manager/profile/password` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Update profile
1. Manager loads the profile record from the module API.
2. RHF + Zod validates editable profile fields.
3. updateProfile() submits changes and the authoritative response updates the view.
### Flow 2: Change password
1. Manager enters the current/new password fields and uses the visibility toggles.
2. The password form validates locally with Zod while the backend remains authoritative.
3. updatePassword() submits through the secure API boundary; raw errors/secrets are never rendered.

## Data and State Architecture
TanStack Query owns profile server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchProfile` | `GET` | `/api/v1/manager/profile` | `—` | `ManagerProfileData` |
| `updateProfile` | `PATCH` | `/api/v1/manager/profile` | `UpdateManagerProfilePayload` | `ManagerProfileData` |
| `updatePassword` | `PATCH` | `/api/v1/manager/profile/password` | `UpdateManagerPasswordPayload` | `Record<string, unknown>` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Profile: Name | `name` | `/api/v1/manager/profile` | `data.name` | No | Yes |
| Profile: Email | `email` | `/api/v1/manager/profile` | `data.email` | No | Yes |
| Profile: Phone | `phone` | `/api/v1/manager/profile` | `data.phone` | Yes | Yes |
| Password form: current password | `currentPassword` | `client form + PATCH /profile/password` | `request.currentPassword` | No | Yes |
| Password form: new password | `newPassword` | `client form + PATCH /profile/password` | `request.newPassword` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
- **Never expose password values in logs or user-facing error text:** Never expose password values in logs or user-facing error text.
- **Password fields must include a lucide-react visibility toggle:** Password fields must include a lucide-react visibility toggle.
- **Profile save must not optimistically overwrite server data with the submitted DTO:** Profile save must not optimistically overwrite server data with the submitted DTO.
- **Phone/profile optional fields must use deliberate empty-value rendering:** Phone/profile optional fields must use deliberate empty-value rendering.
- **Authentication/redirect behavior belongs to the approved global auth infrastructure:** Authentication/redirect behavior belongs to the approved global auth infrastructure.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `profile/profile_components/ManagerProfileMain/ManagerProfileMain.tsx` | Renders the Manager profile and password forms using RHF + Zod while consuming server profile state through TanStack Query. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
