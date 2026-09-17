# Superadmin Team & Access — Feature Map

## Module Purpose
This Superadmin-only module gives the platform owner a controlled view of internal operators who can access the SaaS control plane. It solves the accountability problem created by shared full-access accounts by keeping operator identity, role, sign-in protection, and alert preferences visible in one place. A Superadmin can review named team members, compare internal role scopes, and review platform alert preferences. This module does not manage gym staff, trainers, managers, or any other tenant-facing users.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `team_components/` | Route presentation, operator list, role groups, alert preferences, and dedicated empty states | `SuperadminTeamClient.tsx`, `SuperadminTeamPageHeader.tsx`, `SuperadminTeamSummaryCards.tsx`, `SuperadminTeamMembersPanel.tsx`, `SuperadminTeamMembersEmptyState.tsx`, `SuperadminTeamRolesAndAlertPreferencesPanel.tsx`, `SuperadminTeamRoleGroupsEmptyState.tsx`, `SuperadminTeamAlertPreferencesEmptyState.tsx` |
| `team_api/` | API boundary for platform team data | `superadmin_team_api.ts` |
| `team_types/` | Response contract and inferred TypeScript types | `SuperadminTeamTypes.ts` |
| `team_mocks/fixtures/` | Complete mock operator, role, and alert records | `SuperadminTeamMockFixtures.ts` |
| `team_mocks/handlers/` | MSW handler for the team endpoint | `SuperadminTeamMockHandlers.ts` |
| `team_utils/` | TanStack Query orchestration | `useSuperadminTeamPage.ts` |

## Feature Inventory
| Feature | Route | What the Superadmin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Team Members | `/superadmin/team` | Review named operators, roles, sign-in protection, and last sign-in | `SuperadminTeamMembersPanel.tsx` | `GET /api/superadmin/team` | Implemented in source; runtime build not verified here |
| Role Groups | `/superadmin/team` | Review internal platform access scopes and permission counts | `SuperadminTeamRolesAndAlertPreferencesPanel.tsx` | `GET /api/superadmin/team` | Implemented in source; runtime build not verified here |
| Alert Preferences | `/superadmin/team` | Review alert channel, threshold, and enabled state for platform operators | `SuperadminTeamRolesAndAlertPreferencesPanel.tsx` | `GET /api/superadmin/team` | Implemented in source; runtime build not verified here |

## User Flows & Interactions
### Flow 1: Review platform access
1. Superadmin opens `/superadmin/team`.
2. `useSuperadminTeamPage.ts` requests the module endpoint through the API layer.
3. Zod validates the response before the page consumes the data.
4. Team Members, Role Groups, and Alert Preferences panels render from the response.

### Flow 2: Investigate a disabled operator
1. Superadmin scans the Team Members table.
2. The operator status badge shows the current account state.
3. Last sign-in uses the nullable display fallback when no sign-in exists.
4. Role scope and alert settings can be reviewed without opening a tenant module.

## Data and State Architecture
- Server state: TanStack Query only.
- UI state: local component state only; no Zustand is currently required.
- Query key: `['superadmin', 'team', 'overview']`.
- MSW handler: `team_mocks/handlers/SuperadminTeamMockHandlers.ts`.
- MSW fixture: `team_mocks/fixtures/SuperadminTeamMockFixtures.ts`.
- Fixture scenarios: populated data plus nullable last sign-in to exercise the empty display fallback.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchTeamData()` | GET | `/api/superadmin/team` | None | `SuperadminTeamResponse` |

The API layer uses the canonical global `apiFetch` transport and `SuperadminTeamResponseSchema` for response validation.

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Team table name | `name` | GET team | `data.users[].name` | No | Yes |
| Team table email | `email` | GET team | `data.users[].email` | No | Yes |
| Team table role | `role` | GET team | `data.users[].role` | No | Yes |
| Sign-in protection | `mfa` | GET team | `data.users[].mfa` | Yes | Yes |
| Last sign-in | `lastLogin` | GET team | `data.users[].lastLogin` | Yes | Yes |
| Team status | `status` | GET team | `data.users[].status` | No | Yes |
| Role scope | `scope` | GET team | `data.roles[].scope` | No | Yes |
| Role permission count | `permissions` | GET team | `data.roles[].permissions` | No | Yes |
| Alert name | `name` | GET team | `data.alerts[].name` | No | Yes |
| Alert channel | `channel` | GET team | `data.alerts[].channel` | No | Yes |
| Alert threshold | `threshold` | GET team | `data.alerts[].threshold` | No | Yes |
| Alert enabled state | `enabled` | GET team | `data.alerts[].enabled` | No | Yes |

Dedicated empty states are used for Team Members, Role Groups, and Alert Preferences when their respective arrays are empty.

## Permissions and Security
- Required role: `SUPERADMIN`.
- Cross-role rule: zero imports from Admin, Manager, Trainer, or tenant business modules.
- Secrets: no passwords, tokens, private keys, or API secrets are rendered.
- Future account mutation actions must use the approved double-confirm/type-to-confirm safeguards where applicable.

## Loading, Empty, and Error States
- `loading.tsx` provides the page skeleton.
- `error.tsx` provides the route-level branded retry state.
- Team list sections use module-owned data rendering and must never silently render `undefined`; nullable fields use the canonical display fallback.

## Edge Cases and AI Warnings
- **Never share accounts:** each operator record has its own stable ID so audit entries can be attributable.
- **Nullable last sign-in:** a disabled or never-used account may have `lastLogin = null`; always render the canonical en dash fallback.
- **Never display secrets:** role management must expose permission metadata, never credentials or secret values.
- **Do not move team fixtures globally:** all operator/role/alert fixture records remain in `team_mocks/fixtures/`.
- **Do not import tenant users:** tenant staff are outside this module's business boundary.
- **Keep status styling centralized:** add new account states to `SuperadminStatusBadgeConfig.ts`, not to JSX conditionals.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminTeamClient.tsx` | Orchestrates query state and child sections. |
| `SuperadminTeamPageHeader.tsx` | Renders the module title and description. |
| `SuperadminTeamSummaryCards.tsx` | Renders operator/role/alert summary metrics. |
| `SuperadminTeamMembersPanel.tsx` | Renders the named operator table. |
| `SuperadminTeamMembersEmptyState.tsx` | Renders the empty state for the operator table. |
| `SuperadminTeamRolesAndAlertPreferencesPanel.tsx` | Renders role scopes and alert preferences. |
| `SuperadminTeamRoleGroupsEmptyState.tsx` | Renders the empty state for role groups. |
| `SuperadminTeamAlertPreferencesEmptyState.tsx` | Renders the empty state for alert preferences. |

## External Infrastructure Dependencies
- `@/lib/api` — global API transport and response validation plumbing.
- `@/lib/formatters` — date/number/null display formatting.
- `@tanstack/react-query` — server state.
- `msw` — development/test transport.
- Superadmin shared UI primitives.

## Final Component Additions
- `SuperadminTeamMembersEmptyState.tsx` — renders the operator-list empty state.
- `SuperadminTeamRoleGroupsEmptyState.tsx` — renders the role-group empty state.
- `SuperadminTeamAlertPreferencesEmptyState.tsx` — renders the alert-preference empty state.
