# Superadmin Tickets — Feature Map

## Module Purpose
The Superadmin Tickets module is the platform-level support desk. Gym tenants (admins/managers)
submit support tickets which superadmins triage, assign, respond to, and resolve. Tickets
cover billing disputes, technical issues, feature requests, and onboarding blockers. This
module is the primary communication channel between tenants and the platform team. All
ticket history is immutable — responses can be added but not deleted.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 10 row placeholders |
| `error.tsx` | Error boundary with retry |
| `tickets_components/SuperadminTicketsClient.tsx` | Root Client Component — table + filter bar |
| `tickets_components/SuperadminTicketsTable.tsx` | Paginated ticket table |
| `tickets_components/SuperadminTicketsTableRow.tsx` | Single ticket row — tenant, subject, priority, status, assignee |
| `tickets_components/SuperadminTicketsFilterBar.tsx` | Filter by status, priority, assignee |
| `tickets_components/SuperadminTicketsDetailDrawer.tsx` | Full ticket thread — messages + reply form |
| `tickets_components/SuperadminTicketsReplyForm.tsx` | Reply input — RHF + Zod |
| `tickets_components/SuperadminTicketsStatusSelect.tsx` | Inline status change — OPEN / IN_PROGRESS / RESOLVED / CLOSED |
| `tickets_types/SuperadminTicketsTypes.ts` | `Ticket`, `TicketMessage`, `TicketStatus`, `TicketPriority`, `ReplyDto` |
| `tickets_utils/SuperadminTicketsConstants.ts` | `TICKET_STATUS_STYLES`, `TICKET_PRIORITY_STYLES` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Ticket List | `/superadmin/tickets` | All tickets across all tenants, paginated | `GET /superadmin/tickets?page=&status=&priority=` | ✅ Live |
| View Ticket Thread | `/superadmin/tickets` | Full message thread in drawer | `GET /superadmin/tickets/:id` | ✅ Live |
| Reply to Ticket | `/superadmin/tickets` | Add response to ticket thread | `POST /superadmin/tickets/:id/reply` | ✅ Live |
| Update Status | `/superadmin/tickets` | Change ticket status inline | `PATCH /superadmin/tickets/:id/status` | ✅ Live |
| Assign Ticket | `/superadmin/tickets` | Assign to a superadmin team member | `PATCH /superadmin/tickets/:id/assign` | ✅ Live |
| Filter by Status/Priority | `/superadmin/tickets` | Scope list | — (query params) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'tickets', { page, status, priority }]`, `['superadmin', 'tickets', ticketId]`
- Mutations: `useReplyToTicket`, `useUpdateTicketStatus`, `useAssignTicket`
- Zustand stores: None
- Context providers: None
- Local-state: `statusFilter`, `priorityFilter`, `page` — local to `SuperadminTicketsClient`

## User Flows
1. Superadmin opens `/superadmin/tickets` → paginated ticket list loads, sorted by `createdAt` desc
2. Superadmin filters by "OPEN" + "HIGH" priority → list scoped accordingly
3. Superadmin clicks ticket row → `SuperadminTicketsDetailDrawer` → full thread loads
4. Superadmin types reply → `SuperadminTicketsReplyForm` → `POST /superadmin/tickets/:id/reply` → thread invalidated
5. Superadmin changes status via `SuperadminTicketsStatusSelect` → `PATCH /superadmin/tickets/:id/status`
6. Superadmin assigns ticket → assignee dropdown → `PATCH /superadmin/tickets/:id/assign`

## Component Responsibility Map
- `SuperadminTicketsClient` — filter + pagination state. MUST NOT contain thread logic.
- `SuperadminTicketsDetailDrawer` — thread display + reply form. MUST NOT manage list state.
- `SuperadminTicketsReplyForm` — form only. MUST use RHF + Zod. MUST NOT manage thread state.
- `SuperadminTicketsStatusSelect` — inline select only. MUST NOT contain thread logic.
- `SuperadminTicketsTableRow` — display only. MUST NOT call mutations directly.

## Permissions and Security
| Action | Required Role |
|---|---|
| View all tickets | `SUPERADMIN` |
| Reply to ticket | `SUPERADMIN` |
| Update ticket status | `SUPERADMIN` |
| Assign ticket | `SUPERADMIN` |
| ❌ Delete ticket messages | Forbidden — immutable audit trail |
| ❌ Tenant submitting tickets | Tenant-side feature — not in this module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 10 table row skeletons
- **Empty (no tickets):** "No tickets — all clear" with green checkmark
- **Empty (filtered):** "No tickets match your filters" with clear filter link
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **TICKET_STATUS_STYLES** — maps `OPEN | IN_PROGRESS | RESOLVED | CLOSED` to badge classes; must live in constants.
- **TICKET_PRIORITY_STYLES** — maps `LOW | MEDIUM | HIGH | CRITICAL` to badge classes; must live in constants.
- **Reply form** — `ReplyDto.message` must be non-empty; Zod schema enforces `min(1)`.
- **Thread ordering** — messages sorted by `createdAt` asc (oldest first) inside drawer.
- **Pagination reset** — page resets to 1 when any filter changes.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminTickets*`
- [x] Rule 7: Type isolation — all types in `SuperadminTicketsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable ticket + message IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
