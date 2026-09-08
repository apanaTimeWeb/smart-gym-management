# Manager Communications — Feature Map

## Module Purpose
The Communications module is the manager's dedicated bulk messaging hub. It solves the core
daily task of sending targeted renewal reminders, payment due alerts, promotional messages,
and event announcements to filtered member segments — without needing to go through the
Members table and message each person individually. The manager selects an audience segment
(e.g. "expiring in 7 days"), picks a channel (WhatsApp or Email), customises a pre-filled
template, previews the recipient list, and dispatches the campaign. 

It also includes an **Automations** system where managers can toggle and configure background triggers like Birthday and Work Anniversary messages to automatically dispatch without manual intervention.

A full send history with status tracking is available in the History tab. This module is strictly read-only with
respect to member data — it never modifies member records.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `communications_components/ManagerCommunicationsMain/` | Root client orchestrator — KPIs, tab switcher, conditionally renders Composer or History | `ManagerCommunicationsMain.tsx` |
| `communications_components/ManagerCommunicationsKPIs/` | 4 stat cards: Total Sent, WhatsApp Sent, Emails Sent, Campaigns This Month | `ManagerCommunicationsKPIs.tsx` |
| `communications_components/ManagerCommunicationsSegmentPicker/` | Grid of audience segment cards with live recipient count badge | `ManagerCommunicationsSegmentPicker.tsx` |
| `communications_components/ManagerCommunicationsComposer/` | Full compose UI — segment picker, channel toggle, title, subject, message body, send action, preview modal | `ManagerCommunicationsComposer.tsx` |
| `communications_components/ManagerCommunicationsAutomations/` | UI for enabling/disabling automated background triggers (Birthdays, Anniversaries) and editing their WhatsApp templates. | `ManagerCommunicationsAutomations.tsx` |
| `communications_components/ManagerCommunicationsHistory/` | Paginated history table of past campaigns with search + channel filter | `ManagerCommunicationsHistory.tsx` |
| `communications_api/` | Mock API: fetchCampaigns, fetchKPIs, fetchSegmentRecipients, sendCampaign | `ManagerCommunicationsApi.ts` |
| `communications_context/` | Business logic hook — queries, mutations, filtered data, segment change handler | `useManagerCommunicationsLogic.ts` |
| `communications_store/` | Zustand store — activeTab, composer fields, history filters, pagination | `useManagerCommunicationsStore.ts` |
| `communications_types/` | TypeScript types: CommCampaign, CommRecipient, CommKPIData, CommFormValues, CommSegment, CommChannel, CommStatus | `communications_types.ts` |
| `communications_utils/` | Constants, Zod schema, mock data, message templates, status styles | `ManagerCommunicationsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Manager Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| KPI Overview | `/manager/communications` | See total messages sent, WhatsApp vs Email breakdown, campaigns this month | `ManagerCommunicationsKPIs` | `GET /manager/communications/kpis` | ✅ Live |
| Segment Picker | `/manager/communications` (Compose tab) | Choose audience: All Active, Expiring 7 Days, Expiring 30 Days, Expired, Pending Payment, Custom | `ManagerCommunicationsSegmentPicker` | `GET /manager/communications/segments?type=X` | ✅ Live |
| Message Composer | `/manager/communications` (Compose tab) | Set campaign title, pick channel (WhatsApp/Email), customise pre-filled template, set email subject | `ManagerCommunicationsComposer` | — | ✅ Live |
| Preview & Send | `/manager/communications` (Compose tab) | Preview full recipient list in `ManagerBulkMessageModal` before dispatching | `ManagerBulkMessageModal` (shared) | — | ✅ Live |
| Send Campaign | `/manager/communications` (Compose tab) | Dispatch campaign — records it in history, resets composer, switches to History tab | `ManagerCommunicationsComposer` | `POST /manager/communications/send` | ✅ Live |
| Manage Automations | `/manager/communications` (Automations tab) | Toggle Birthday/Anniversary auto-messages and customize their templates | `ManagerCommunicationsAutomations` | `GET/PATCH /manager/communications/automations` | ✅ Live (UI) |
| Send History | `/manager/communications` (History tab) | View all past campaigns with channel badge, segment, recipient count, sent count, status, date | `ManagerCommunicationsHistory` | `GET /manager/communications/campaigns` | ✅ Live |
| History Filters | `/manager/communications` (History tab) | Search by campaign title; filter by channel (All / WhatsApp / Email) | `ManagerCommunicationsHistory` | — (client-side) | ✅ Live |

## User Flows & Interactions

### Flow 1: Send a Renewal Reminder to Expiring Members
1. Manager navigates to `/manager/communications` — lands on Compose tab
2. In Segment Picker, clicks "Expiring in 7 Days" — card highlights, recipient count loads (e.g. "3 recipients")
3. Message body auto-fills with the renewal reminder template; subject auto-fills for email
4. Manager types a campaign title: "June Renewal Reminder"
5. Channel is WhatsApp (default) — no subject needed
6. Manager clicks "Preview & Send" → `ManagerBulkMessageModal` opens showing all 3 recipients
7. Manager sends each WhatsApp individually (WhatsApp prevents automated bulk)
8. Closes modal → OR clicks "Send Campaign" to log it in history
9. On success: toast "Campaign queued successfully", composer resets, tab switches to History

### Flow 2: Send a Bulk Email Newsletter
1. Manager selects "All Active Members" segment — count loads (e.g. "5 recipients")
2. Clicks "Email" channel button
3. Subject field appears — pre-filled from template, manager edits it
4. Edits message body
5. Clicks "Send Campaign" → `POST /manager/communications/send`
6. History tab shows new entry with Email badge, "Sent" status

### Flow 3: Review Past Campaigns
1. Manager clicks "Send History" tab
2. Table shows all past campaigns sorted by date
3. Manager types in search box to find "June" campaigns
4. Clicks "WhatsApp" filter to see only WhatsApp campaigns

## Data and State Architecture

- **State pattern:** Zustand for all composer UI state + TanStack Query for server state (campaigns, KPIs, segment recipients)
- **Zustand store:** `useManagerCommunicationsStore.ts` — holds: `activeTab`, `selectedSegment`, `selectedChannel`, `composerTitle`, `composerMessage`, `composerSubject`, `historySearch`, `historyChannelFilter`, `currentPage`
- **TanStack Query keys:**
  - `['managerCommunications', 'campaigns']`
  - `['managerCommunications', 'kpis']`
  - `['managerCommunications', 'segment', selectedSegment]` — refetches when segment changes
- **Template auto-fill:** When segment changes, `handleSegmentChange()` in the logic hook auto-fills `composerMessage` and `composerSubject` from `COMM_MESSAGE_TEMPLATES[segment]`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `ManagerCommunicationsApi` in `communications_api/ManagerCommunicationsApi.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchCampaigns()` | GET | `/manager/communications/campaigns` | — | `CommCampaign[]` |
| `fetchKPIs()` | GET | `/manager/communications/kpis` | — | `CommKPIData` |
| `fetchSegmentRecipients(segment)` | GET | `/manager/communications/segments?type=segment` | `CommSegment` | `CommRecipient[]` |
| `sendCampaign(payload)` | POST | `/manager/communications/send` | `CommFormValues & { recipientCount, segmentLabel }` | `CommCampaign` |

## Permissions and Security

- **Required role:** `MANAGER` — enforced by `middleware.ts`
- **Read-only for member data:** This module never calls any member mutation API. It only reads segment data.
- **No automated WhatsApp bulk send:** `ManagerBulkMessageModal` requires per-recipient manual send — this is intentional and compliant with WhatsApp's terms of service.
- **Cross-role isolation:** Zero imports from `/admin`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking KPIs + tab + composer | N/A | `error.tsx` — branded error with Retry |
| Segment recipient count | `Loader2` spinner inside segment card | "0 recipients" shown | Shared with main query |
| History table | `TableSkeleton` (5 rows, 7 cols) | Inline empty state — icon + "No campaigns yet" + CTA | Shared with main query |

## Edge Cases and AI Warnings

- **Template auto-fill on segment change:** `handleSegmentChange()` in `useManagerCommunicationsLogic` auto-fills both `composerMessage` and `composerSubject`. If you add a new segment to `COMM_SEGMENT_OPTIONS`, you MUST also add a corresponding entry to `COMM_MESSAGE_TEMPLATES` — otherwise the auto-fill will silently use `undefined`.
- **WhatsApp cannot be automated:** `ManagerBulkMessageModal` opens `wa.me` links one at a time. Do NOT attempt to loop `window.open` calls — browsers block popups after the first one.
- **`{name}` placeholder is display-only:** The `{name}` token in templates is shown as a tip to the manager. Actual personalisation (replacing `{name}` with each member's real name) must happen server-side when the real API is integrated. The mock API does not replace it.
- **`sendCampaign` resets composer and switches tab:** After a successful send, `resetComposer()` is called and `setActiveTab('history')` fires. Do NOT add any additional state resets in the component — the logic hook owns this flow.
- **Segment query is disabled for `custom`:** `fetchSegmentRecipients` has `enabled: store.selectedSegment !== 'custom'`. Custom selection is a future feature — do not remove this guard.
- **`COMM_STATUS_STYLES` is the single source of truth for status badge colors:** Never add inline color classes for campaign status. Add new statuses to the constants map.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `ManagerCommunicationsMain.tsx` | Root orchestrator. Renders KPIs, tab switcher, conditionally Composer or History. No direct API calls. |
| `ManagerCommunicationsKPIs.tsx` | 4 read-only stat cards. Reads `kpis` from logic hook. |
| `ManagerCommunicationsSegmentPicker.tsx` | Segment card grid. Calls `handleSegmentChange`. Shows live recipient count with loading state. |
| `ManagerCommunicationsComposer.tsx` | Full compose form. Channel toggle, title, subject, message body, send button, preview modal trigger. |
| `ManagerCommunicationsHistory.tsx` | Paginated history table. Search + channel filter. Reads `paginatedCampaigns` from logic hook. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, file size ceiling respected
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — role prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors (WA_GREEN documented as brand exception)
- [x] Rule 5: Smart State Management — Zustand for UI, TanStack Query for server state
- [x] Rule 6: Logic/UI Separation — `useManagerCommunicationsLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `communications_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present and non-generic
- [x] Rule 11: `ManagerCommunicationsUrlConfig.ts` present
- [x] Rule 13: This document
- [x] Rule 15B: Zod schema present (`CommFormSchema`)
- [x] Rule 40: `communications_forbidden.md` present
- [x] Rule 48: Inline empty state in History table
- [x] Rule 72: API functions follow verb contract
