# Manager PT — Feature Map

## Module Purpose
The PT (Personal Training) module lets managers oversee all personal training sessions happening at their branch. Managers can view the full PT schedule, assign trainers to members, track session completion rates, and manage PT packages. This is an operational oversight role — managers do not conduct sessions themselves, but they ensure trainers are assigned and sessions are running on schedule.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `pt_components/ManagerPtMain/` | Root client component for PT management | `ManagerPtMain.tsx` |
| `pt_api/` | API calls for PT sessions, assignments, packages | `ManagerPtApi.ts` |
| `pt_types/` | TypeScript interfaces for PT sessions, assignments, packages | `ManagerPtTypes.ts` |
| `pt_context/` | Logic hook for PT data and mutations | `useManagerPtLogic.ts` |
| `pt_utils/` | Centralized constants: status styles, duration options | `ManagerPtSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| PT Overview | `/manager/pt` | View all PT sessions, filter by trainer/status/date | `ManagerPtMain` | `GET /api/v1/manager/pt/sessions` | 🔧 Stub |
| Assign Trainer | `/manager/pt` (modal) | Assign a trainer to a member's PT package | `ManagerPtMain` | `POST /api/v1/manager/pt/assign` | 🔧 Stub |
| Session History | `/manager/pt` | View completed/cancelled session history | `ManagerPtMain` | `GET /api/v1/manager/pt/sessions?status=completed` | 🔧 Stub |

## Edge Cases and AI Warnings
- **No native `<select>` for trainer assignment** — Use `SearchableDropdown` from `manager_components/ManagerShared/`.
- **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.
- **Managers cannot conduct PT sessions** — They assign and oversee. Never add a "Start Session" button for managers.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `ManagerPtUrlConfig.ts` present
- [x] Rule 2: Zero cross-role imports
