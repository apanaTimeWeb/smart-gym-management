# Trainer Reports — Feature Map

## Module Purpose
The Reports module gives trainers a read-only view of performance data scoped strictly to their assigned members. Trainers can view member reports, attendance trends, progress tracking, and workout summaries — then export any report as CSV. They cannot see data for members assigned to other trainers, and they have zero access to gym-wide financial or HR reports (those belong to Admin/Manager).

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `reports_components/` | Root client component rendering tab navigation and report content area | `TrainerReportsMain.tsx` |
| `reports_api/` | API call for CSV export | `TrainerReportsApi.ts` |
| `reports_types/` | TypeScript types: `ReportTabId`, `TrainerReportTab`, `TrainerReportExportParams` | `TrainerReportsTypes.ts` |
| `reports_context/` | Logic hook managing active tab state | `useTrainerReportsLogic.ts` |
| `reports_utils/` | Centralized constants: tab definitions, report config | `TrainerReportsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Members Report | `/trainer/reports` | View member list report for assigned members only | `TrainerReportsMain` | `GET /api/v1/trainer/reports/members` | 🔧 Stub |
| Attendance Report | `/trainer/reports` | View attendance trends for assigned members | `TrainerReportsMain` | `GET /api/v1/trainer/reports/attendance` | 🔧 Stub |
| Progress Report | `/trainer/reports` | View fitness progress data (BMI, strength, cardio) | `TrainerReportsMain` | `GET /api/v1/trainer/reports/progress` | 🔧 Stub |
| Workout Report | `/trainer/reports` | View workout plan adherence and completion rates | `TrainerReportsMain` | `GET /api/v1/trainer/reports/workout` | 🔧 Stub |
| Export CSV | `/trainer/reports` (inline) | Export any active report tab as a CSV file | `TrainerReportsMain` | `GET /api/v1/trainer/reports/:type/export` | 🔧 Stub |

## Data and State Architecture
- **State pattern:** Local `useState` for active tab. No Zustand needed.
- **Scope restriction:** All API endpoints are scoped to the authenticated trainer's assigned members server-side. The frontend does not filter — the backend enforces this.

## API Contract

| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `exportTrainerReport(params)` | GET | `/api/v1/trainer/reports/:type/export` | `{ type, startDate?, endDate? }` | `Blob` (CSV) |

## Edge Cases and AI Warnings
- **No `TrainerHeader` import** — `TrainerReportsMain.tsx` must NEVER import `TrainerHeader`. The layout handles it. This was a pre-existing violation that has been fixed.
- **Data is trainer-scoped server-side** — Never add client-side filtering by trainer ID. The backend returns only the authenticated trainer's data.
- **Export is a Blob response** — `exportTrainerReport()` returns a `Blob`. The component must create an object URL and trigger a download link — never navigate to the API URL directly.
- **No cross-role imports** — Zero imports from `/admin`, `/manager`, or `/superadmin`.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component, TrainerReportsMain = Client, no TrainerHeader import
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `TrainerReportsUrlConfig.ts` present
- [x] Rule 2: Zero cross-role imports
- [x] Rule 29: `motion-safe:` prefix on all transitions
