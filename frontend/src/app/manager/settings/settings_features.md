# Manager Settings — Feature Map

## Module Purpose
Manager Settings is the branch configuration workspace. Managers can update language/timezone preferences, gym profile details, operating hours, membership rules, and notification templates. Settings are server data and form drafts are local RHF state. The module does not own authentication secrets or global environment configuration.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `settings_api/` | Feature-owned responsibility for the settings module. | `ManagerSettingsApi.ts; ManagerUseManagerSettingsQuery.ts` |
| `settings_components/` | Feature-owned responsibility for the settings module. | `—` |
| `settings_context/` | Feature-owned responsibility for the settings module. | `ManagerUseManagerSettingsLogic.ts` |
| `settings_fixtures/` | Feature-owned responsibility for the settings module. | `ManagerSettingsMockData.ts` |
| `settings_mocks/` | Feature-owned responsibility for the settings module. | `—` |
| `settings_types/` | Feature-owned responsibility for the settings module. | `ManagerSettingsSchema.ts; ManagerSettingsTypes.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchSettings | `/manager/settings` | Uses the fetchSettings workflow with typed request/response handling. | `GET /manager/settings` | ✅ Implemented |
| updateSettings | `/manager/settings` | Uses the updateSettings workflow with typed request/response handling. | `PATCH /manager/settings` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Update settings
1. Manager loads the complete ManagerAllSettings response.
2. The active settings tab edits only the relevant form fields.
3. RHF + Zod validates the draft and protects against unsaved changes.
4. updateSettings() submits the partial settings payload and the authoritative response becomes the rendered state.

## Data and State Architecture
TanStack Query owns settings server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchSettings` | `GET` | `/api/v1/manager/settings` | `—` | `ManagerAllSettings` |
| `updateSettings` | `PATCH` | `/api/v1/manager/settings` | `Partial<ManagerAllSettings>` | `ManagerAllSettings` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Preferences: Language | `preferences.language` | `/api/v1/manager/settings` | `data.preferences.language` | No | Yes |
| Preferences: Timezone | `preferences.timezone` | `/api/v1/manager/settings` | `data.preferences.timezone` | No | Yes |
| Preferences: Push notifications | `preferences.pushNotificationsEnabled` | `/api/v1/manager/settings` | `data.preferences.pushNotificationsEnabled` | No | Yes |
| Preferences: Daily email reports | `preferences.emailDailyReports` | `/api/v1/manager/settings` | `data.preferences.emailDailyReports` | No | Yes |
| Gym: Name | `gymProfile.gymName` | `/api/v1/manager/settings` | `data.gymProfile.gymName` | No | Yes |
| Gym: Logo | `gymProfile.logoUrl` | `/api/v1/manager/settings` | `data.gymProfile.logoUrl` | Yes | Yes |
| Gym: Address | `gymProfile.address` | `/api/v1/manager/settings` | `data.gymProfile.address` | No | Yes |
| Gym: City | `gymProfile.city` | `/api/v1/manager/settings` | `data.gymProfile.city` | No | Yes |
| Gym: State | `gymProfile.state` | `/api/v1/manager/settings` | `data.gymProfile.state` | No | Yes |
| Gym: Pincode | `gymProfile.pincode` | `/api/v1/manager/settings` | `data.gymProfile.pincode` | No | Yes |
| Hours: Day | `operatingHours[].day` | `/api/v1/manager/settings` | `data.operatingHours[].day` | No | Yes |
| Hours: Open | `operatingHours[].openTime` | `/api/v1/manager/settings` | `data.operatingHours[].openTime` | No | Yes |
| Hours: Close | `operatingHours[].closeTime` | `/api/v1/manager/settings` | `data.operatingHours[].closeTime` | No | Yes |
| Membership: Grace period | `membershipSettings.gracePeriodDays` | `/api/v1/manager/settings` | `data.membershipSettings.gracePeriodDays` | No | Yes |
| Membership: Freeze days | `membershipSettings.maxFreezeDaysPerYear` | `/api/v1/manager/settings` | `data.membershipSettings.maxFreezeDaysPerYear` | No | Yes |
| Template: Body | `notificationTemplates[].body` | `/api/v1/manager/settings` | `data.notificationTemplates[].body` | No | Yes |
| Template: Subject | `notificationTemplates[].subject` | `/api/v1/manager/settings` | `data.notificationTemplates[].subject` | Yes | Yes |

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
- **Settings updates must use the single module endpoint and reconcile the returned full settings object:** Settings updates must use the single module endpoint and reconcile the returned full settings object.
- **Do not move public/private environment configuration into the settings form:** Do not move public/private environment configuration into the settings form.
- **Notification template variables should remain backend-defined values, not arbitrary client strings:** Notification template variables should remain backend-defined values, not arbitrary client strings.
- **Unsaved settings changes must be guarded before in-app navigation:** Unsaved settings changes must be guarded before in-app navigation.
- **Gym profile logo URL is optional and must have explicit empty-state handling:** Gym profile logo URL is optional and must have explicit empty-state handling.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `settings/settings_components/ManagerSettingsMain/ManagerSettingsMain.tsx` | Renders the editable Manager Settings tabs using an RHF draft backed by Manager Settings API data. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
