# Trainer Members — Feature Map

## Module Purpose
The Trainer Members module provides access to the trainer's assigned members ONLY — not the
global member list. Trainers can view member profiles, BMI/body measurements, progress
tracking, and attendance history. Financial data (membership fees, payment history) is
strictly forbidden. Phone numbers are masked in list view.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton |
| `error.tsx` | Error boundary |
| `members_components/TrainerMembersMain.tsx` | Root Client Component |
| `members_components/TrainerMembersTable.tsx` | Assigned members table, clickable rows |
| `members_components/TrainerMembersProfileDrawer.tsx` | Member profile drawer (no finance tab) |
| `members_components/TrainerMembersProgressModal.tsx` | Log body measurements / progress |
| `members_context/MembersProvider.tsx` | Fetch state, assigned member list |
| `members_types/TrainerMembersTypes.ts` | `AssignedMember`, `ProgressEntry` types |
| `members_api/TrainerMembersApi.ts` | API wrappers |
| `members_utils/TrainerMembersUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Assigned Members | `/trainer/members` | View trainer's assigned members | `GET /trainer/members` | ✅ Live |
| Member Profile | `/trainer/members` | View profile, BMI, attendance | `GET /trainer/members/:id` | ✅ Live |
| Log Progress | `/trainer/members` | Record body measurements | `POST /trainer/members/:id/progress` | ✅ Live |

## Data and State Architecture
- Server-state: `MembersProvider` — assigned member list, selected member
- Zustand stores: `useTrainerMembersStore` — drawer/modal open state
- Context providers: `MembersProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Trainer opens `/trainer/members` → table shows only assigned members
2. Trainer clicks a member row → `TrainerMembersProfileDrawer` opens
3. Inside profile → Trainer clicks "Log Progress" → `TrainerMembersProgressModal` → submit → `POST`

## Component Responsibility Map
- `TrainerMembersMain` — layout + provider. MUST NOT contain table logic.
- `TrainerMembersTable` — pure display. Phone masked via `maskSensitiveData()`.
- `TrainerMembersProfileDrawer` — shows profile tabs: Overview, Measurements, Attendance. NO Finance tab.
- `TrainerMembersProgressModal` — owns React Hook Form + Zod state for progress entry.

## Permissions and Security
| Action | Required Role |
|---|---|
| View assigned members | `TRAINER` |
| Log progress | `TRAINER` |
| ❌ View payment history | Strictly forbidden — Trainer role |
| ❌ View membership fees | Strictly forbidden — Trainer role |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8-row table skeleton
- **Empty:** "No members assigned to you yet" — contact Manager message
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Assigned members only** — the API endpoint `/trainer/members` returns ONLY members assigned to the authenticated trainer. Never use the global members endpoint.
- **No finance tab in profile** — `TrainerMembersProfileDrawer` must never include a Finance or Payments tab. This is a hard role isolation rule.
- **Phone masking** — phone numbers in the table must use `maskSensitiveData()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — no financial data, assigned members only
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modal
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 43: Phone numbers masked in table view
