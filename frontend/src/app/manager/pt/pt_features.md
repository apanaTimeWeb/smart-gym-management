# Manager PT — Feature Map

## Module Purpose
The PT (Personal Training) module lets managers oversee all personal training operations at their branch. Managers can track the workload of all trainers, monitor expiring PT packages (to prevent revenue loss by renewing on time), view active PT assignments, and browse available PT packages. This is an operational oversight role — managers do not conduct sessions themselves, but they ensure trainers are assigned properly and sessions are being fulfilled.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `pt_components/ManagerPtMain/` | Root client components for PT management | `ManagerPtMain.tsx`, `ManagerPtKPIs.tsx`, `ManagerPtTrainerWorkload.tsx`, `ManagerPtExpiringSoon.tsx`, `ManagerPtAssignmentsTable.tsx` |
| `pt_api/` | API calls for PT KPIs, workload, packages, and assignments | `ManagerPtApi.ts` |
| `pt_types/` | TypeScript interfaces for PT entities and state | `ManagerPtTypes.ts` |
| `pt_context/` | Logic hook for fetching data and managing tab state | `useManagerPtLogic.ts` |
| `pt_utils/` | Centralized constants including mock data | `ManagerPtSharedConstants.ts`, `ManagerPtConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Dashboard KPIs | `/manager/pt` | View top-level stats (Active PTs, Sessions Today, Revenue) | `ManagerPtKPIs` | `GET /manager/pt/dashboard-kpis` (mocked) | ✅ Live |
| Trainer Workload | `/manager/pt` | Monitor active clients and rating per trainer | `ManagerPtTrainerWorkload` | `GET /manager/pt/workload` (mocked) | ✅ Live |
| Expiring Packages | `/manager/pt` | See packages with < 3 sessions left for renewals | `ManagerPtExpiringSoon` | Calculated via assignments | ✅ Live |
| Active Assignments | `/manager/pt` | Track session progress and manually mark sessions | `ManagerPtAssignmentsTable` | `GET /manager/pt/assignments` | ✅ Live |
| PT Packages | `/manager/pt` | Browse available PT packages and pricing | `ManagerPtMain` | `GET /manager/pt/packages` | ✅ Live |

## Edge Cases and AI Warnings
- **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.
- **Managers cannot conduct PT sessions** — They assign and oversee. Never add a "Start Session" button for managers. (They can only "Mark Session" as a fallback).
- **Expiring Logic** — A package is considered "expiring soon" if `(totalSessions - completedSessions) <= 3`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization (Components broken down into `ManagerPtKPIs`, `ManagerPtTrainerWorkload`, etc.)
- [x] Rule 8: page.tsx = Server Component
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `ManagerPtUrlConfig.ts` present
- [x] Rule 2: Zero cross-role imports
- [x] Rule 38: No generic `Props` exported
