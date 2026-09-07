# Manager Inquiries — Feature Map

## Module Purpose
The Manager Inquiries module is the CRM lead management system for the branch. It tracks
prospective members from first contact through follow-up to conversion. Leads can be
converted to full members directly from this module. The module uses a table view with
status-based filtering (New, Contacted, Visited, Converted, Lost).

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton |
| `error.tsx` | Error boundary |
| `inquiries_components/ManagerInquiriesMain.tsx` | Root Client Component |
| `inquiries_components/ManagerInquiriesTable.tsx` | Paginated leads table, clickable rows |
| `inquiries_components/ManagerInquiriesFilters.tsx` | Status, source, date filters |
| `inquiries_components/ManagerInquiriesAddModal.tsx` | Add new lead form |
| `inquiries_components/ManagerInquiriesDetailModal.tsx` | Lead detail + follow-up timeline |
| `inquiries_components/ManagerInquiriesConvertModal.tsx` | Convert lead to member form |
| `inquiries_context/InquiriesProvider.tsx` | Fetch state, lead list, pagination |
| `inquiries_types/ManagerInquiriesTypes.ts` | `Lead`, `LeadStatus` enum, `CreateLeadDto` types |
| `inquiries_api/ManagerInquiriesApi.ts` | API wrappers |
| `inquiries_utils/ManagerInquiriesUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Lead List | `/manager/inquiries` | Paginated, filterable leads table | `GET /manager/inquiries` | ✅ Live |
| Add Lead | `/manager/inquiries` | Register new inquiry | `POST /manager/inquiries` | ✅ Live |
| View Lead Detail | `/manager/inquiries` | Full lead profile + follow-up log | `GET /manager/inquiries/:id` | ✅ Live |
| Update Status | `/manager/inquiries` | Move lead through pipeline | `PATCH /manager/inquiries/:id/status` | ✅ Live |
| Convert to Member | `/manager/inquiries` | Create member from lead | `POST /manager/inquiries/:id/convert` | ✅ Live |

## Data and State Architecture
- Server-state: `InquiriesProvider` — lead list, pagination, filters
- Zustand stores: `useManagerInquiriesStore` — modal open/close, selected lead
- Context providers: `InquiriesProvider`
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Manager opens `/manager/inquiries` → table loads with all leads
2. Manager clicks "Add Lead" → `ManagerInquiriesAddModal` → submit → `POST` → table refreshes
3. Manager clicks a lead row → `ManagerInquiriesDetailModal` opens with timeline
4. Manager clicks "Convert to Member" → `ManagerInquiriesConvertModal` → submit → `POST /convert` → lead status updates to Converted

## Component Responsibility Map
- `ManagerInquiriesMain` — layout + provider. MUST NOT contain table logic.
- `ManagerInquiriesTable` — pure display. Status badge uses `statusBadgeConfig.ts`.
- `ManagerInquiriesDetailModal` — shows follow-up timeline. Fetches single lead on open.
- `ManagerInquiriesConvertModal` — pre-fills member registration form from lead data.

## Permissions and Security
| Action | Required Role |
|---|---|
| View / Add leads | `MANAGER` |
| Convert to member | `MANAGER` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8-row table skeleton
- **Empty:** "No inquiries yet" with "Add Lead" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Lead status badge colors** — must use `statusBadgeConfig.ts` token map (New=info, Contacted=warning, Converted=success, Lost=muted). Never inline color logic.
- **Convert to member** — pre-populates member registration form with lead data. Lead record is NOT deleted — its status changes to `CONVERTED`.
- **Phone masking** — lead phone numbers in the table must use `maskSensitiveData()` from `@/lib/formatters`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 3B: Status badge colors via `statusBadgeConfig.ts`
- [x] Rule 6: Logic/UI Separation — fetch in context, form in modals
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 43: Phone numbers masked in table view
