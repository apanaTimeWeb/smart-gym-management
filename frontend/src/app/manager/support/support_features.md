# Manager Support — Feature Map

## Module Purpose
The Support module is the manager's interface for raising and tracking support tickets with the GymSmart platform team. Managers submit tickets for billing issues, technical problems, member complaints, or equipment faults. They can view ticket history, check resolution status, and follow up on open tickets. This is NOT a member-facing support tool — it is internal manager-to-platform communication.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `support_components/ManagerSupportMain/` | Root client component for support ticket management | `ManagerSupportMain.tsx` |
| `support_api/` | API calls for ticket CRUD | `ManagerSupportApi.ts` |
| `support_types/` | TypeScript interfaces for tickets, categories, priorities | `ManagerSupportTypes.ts` |
| `support_context/` | Logic hook for ticket data and form state | `useManagerSupportLogic.ts` |
| `support_utils/` | Centralized constants: status styles, issue categories, priority options | `ManagerSupportSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Ticket List | `/manager/support` | View all support tickets with status badges, filter by status/category | `ManagerSupportMain` | `GET /api/v1/manager/support/tickets` | 🔧 Stub |
| Raise Ticket | `/manager/support` (modal) | Submit a new support ticket — select category via SearchableDropdown, set priority, describe issue | `ManagerSupportMain` | `POST /api/v1/manager/support/tickets` | 🔧 Stub |
| Ticket Detail | `/manager/support` (drawer) | View full ticket thread, add follow-up messages | `ManagerSupportMain` | `GET /api/v1/manager/support/tickets/:id` | 🔧 Stub |

## Edge Cases and AI Warnings
- **No raw SVG icons** — All icons must use lucide-react components. Use `MessageSquareWarning` for complaints, `TriangleAlert` for critical issues. Rule 9b.
- **No native `<select>` for issue category** — Use `SearchableDropdown`. Rule 20.
- **No hardcoded mock ticket IDs** — Never hardcode `#TKT-1042` or similar. All ticket data comes from the API or MSW handlers.
- **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component
- [x] Rule 9b: lucide-react only, no raw SVGs
- [x] Rule 20: SearchableDropdown for category selection
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `ManagerSupportUrlConfig.ts` present
- [x] Rule 2: Zero cross-role imports
