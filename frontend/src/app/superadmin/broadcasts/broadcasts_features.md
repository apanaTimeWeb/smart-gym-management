# Superadmin Broadcasts — Feature Map

## Module Purpose
The Superadmin Broadcasts module enables platform-wide mass announcements to all gym
tenants simultaneously. Broadcasts are used for maintenance windows, feature release
announcements, policy updates, and critical platform alerts. Unlike the Messaging module
(1-to-1 targeted), Broadcasts are 1-to-many and cannot be targeted to individual tenants.
All broadcasts are logged and visible to tenants in their notification center.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton + compose area placeholder |
| `error.tsx` | Error boundary with retry |
| `broadcasts_components/SuperadminBroadcastsClient.tsx` | Root Client Component — broadcasts table + modals |
| `broadcasts_components/SuperadminBroadcastsTable/` | Table of broadcasts |
| `broadcasts_components/SuperadminBroadcastsHeader/` | Search, filter, and create button |
| `broadcasts_components/SuperadminBroadcastsEmptyState/` | Empty state when no broadcasts |
| `broadcasts_components/SuperadminBroadcastModal.tsx` | Compose new broadcast modal |
| `broadcasts_components/SuperadminBroadcastQueueModal.tsx` | Modal showing queue progress when sending |
| `broadcasts_components/SuperadminBroadcastStatusBadge/` | Status badge for broadcasts |
| `broadcasts_types/` | Broadcast types |
| `broadcasts_utils/` | Shared utilities and hooks (`useSuperadminBroadcastsPage`) |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Broadcast History | `/superadmin/broadcasts` | All past broadcasts with reach stats | `GET /superadmin/broadcasts?page=` | ✅ Live |
| Compose Broadcast | `/superadmin/broadcasts` | Create and send/schedule broadcast | `POST /superadmin/broadcasts` | ✅ Live |
| Preview Before Send | `/superadmin/broadcasts` | Preview modal before confirming send | — (client-side preview) | ✅ Live |
| Cancel Scheduled | `/superadmin/broadcasts` | Cancel a scheduled (not yet sent) broadcast | `DELETE /superadmin/broadcasts/:id` | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'broadcasts', { page }]`
- Mutations: `useCreateBroadcast`, `useCancelBroadcast`
- Zustand stores: None
- Context providers: None
- Local-state: `showComposeForm` (boolean) — local to `SuperadminBroadcastsClient`

## User Flows
1. Superadmin opens `/superadmin/broadcasts` → broadcast history table loads
2. Superadmin clicks "New Broadcast" → compose form expands
3. Superadmin fills subject, body, channel, optional schedule → clicks "Preview" → `SuperadminBroadcastsPreviewModal`
4. Superadmin confirms in preview → `POST /superadmin/broadcasts` → history table invalidated
5. Superadmin clicks "Cancel" on a SCHEDULED broadcast → `useConfirm()` → `DELETE /superadmin/broadcasts/:id`

## Component Responsibility Map
- `SuperadminBroadcastsClient` — compose visibility state. MUST NOT contain form logic.
- `SuperadminBroadcastModal` — handles creating/editing broadcasts. MUST use RHF + Zod.
- `SuperadminBroadcastQueueModal` — displays queue progress during send.
- `SuperadminBroadcastsTable` — read-only table of broadcasts.

## Permissions and Security
| Action | Required Role |
|---|---|
| View broadcast history | `SUPERADMIN` |
| Send broadcast | `SUPERADMIN` |
| Cancel scheduled broadcast | `SUPERADMIN` |
| ❌ Target individual tenants | Use Messaging module |
| ❌ Delete sent broadcasts | Forbidden — immutable audit record |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — compose area placeholder + 5 history row skeletons
- **Empty:** "No broadcasts sent yet" with "Send First Broadcast" CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Send confirmation** — sending a broadcast to ALL tenants is irreversible; MUST show preview modal before `POST`.
- **Cancel only for SCHEDULED** — only broadcasts with `status === 'SCHEDULED'` show the cancel button; never show cancel on SENT.
- **BROADCAST_CHANNEL_STYLES** — maps `EMAIL | SMS | IN_APP` to badge classes; must live in constants.
- **Body sanitization** — broadcast body is rendered as HTML in tenant notification center; backend must sanitize; frontend must not render raw HTML from API response without sanitization.
- **Schedule field** — optional ISO datetime; if omitted, broadcast sends immediately.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminBroadcasts*`
- [x] Rule 7: Type isolation — all types in `SuperadminBroadcastsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 26: Cancel uses `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable broadcast IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
