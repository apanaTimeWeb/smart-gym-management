# Manager Communications — Feature Map

## Module Purpose
The Communications module is the manager's dedicated bulk messaging hub. It solves the core
daily task of sending targeted renewal reminders, payment due alerts, promotional messages,
and event announcements to filtered member segments — without needing to go through the
Members table and message each person individually. The manager selects an audience segment
(e.g. "expiring in 7 days"), picks a channel (WhatsApp or Email), customises a pre-filled
template, previews the recipient list, and dispatches the campaign.

It also includes an **Automations** system where managers can toggle and configure background triggers like Birthday and Work Anniversary messages to automatically dispatch without manual intervention.

A **Churn Recovery / Win-Back** sub-section allows the manager to see all exited/churned members in a dedicated table, understand how long ago they left, filter by exit reason, and send a personalised win-back message (with auto-filled templates based on days since exit) in a single flow — without navigating to the Members list or manually building a segment.

A full send history with status tracking is available in the History tab. This module is strictly read-only with
respect to member data — it never modifies member records.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `communications_components/ManagerCommunicationsMain/` | Root client orchestrator — KPIs, tab switcher, conditionally renders Composer, History, Automations, or ChurnRecoveryTab | `ManagerCommunicationsMain.tsx` |
| `communications_components/ManagerCommunicationsKPIs/` | 4 stat cards: Total Sent, WhatsApp Sent, Emails Sent, Campaigns This Month | `ManagerCommunicationsKPIs.tsx` |
| `communications_components/ManagerCommunicationsSegmentPicker/` | Grid of audience segment cards with live recipient count badge | `ManagerCommunicationsSegmentPicker.tsx` |
| `communications_components/ManagerCommunicationsComposer/` | Full compose UI — segment picker, channel toggle, title, subject, message body, send action, preview modal | `ManagerCommunicationsComposer.tsx` |
| `communications_components/ManagerCommunicationsAutomations/` | UI for enabling/disabling automated background triggers (Birthdays, Anniversaries) and editing their WhatsApp templates. | `ManagerCommunicationsAutomations.tsx` |
| `communications_components/ManagerCommunicationsHistory/` | Paginated history table of past campaigns with search + channel filter | `ManagerCommunicationsHistory.tsx` |
| `communications_components/ManagerChurnRecovery/` | Churn Recovery tab: KPIs, churned member table, win-back composer drawer | `ManagerChurnRecoveryTab.tsx`, `ManagerChurnRecoveryKPIs.tsx`, `ManagerChurnRecoveryTable.tsx`, `ManagerChurnRecoveryTableRow.tsx`, `ManagerChurnRecoveryComposer.tsx`, `ManagerChurnRecoveryEmptyState.tsx` |
| `communications_api/` | Mock API: fetchCampaigns, fetchKPIs, fetchSegmentRecipients, sendCampaign, fetchChurnedMembers, fetchChurnKPIs, sendWinBackMessage | `ManagerCommunicationsApi.ts` |
| `communications_context/` | Business logic hooks — queries, mutations, filtered data | `useManagerCommunicationsLogic.ts`, `useManagerChurnRecoveryLogic.ts` |
| `communications_store/` | Zustand store — activeTab, composer fields, history filters, churn filters, pagination | `useManagerCommunicationsStore.ts` |
| `communications_types/` | TypeScript types: CommCampaign, CommRecipient, CommKPIData, CommFormValues, CommSegment, CommChannel, CommStatus, ChurnedMember, ChurnKPIData, WinBackRecord, ChurnReasonType, WinBackTemplateTier | `communications_types.ts` |
| `communications_utils/` | Constants, Zod schema, mock data, message templates, win-back templates, status styles, churn reason labels | `ManagerCommunicationsSharedConstants.ts` |

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
| **Churn KPIs** | `/manager/communications` (Win-Back tab) | See Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit | `ManagerChurnRecoveryKPIs` | `GET /manager/communications/churn/kpis` | ✅ Live (Mock) |
| **Churned Members Table** | `/manager/communications` (Win-Back tab) | View all exited members with exit date, days since exit (colour-coded), reason, plan, contact status | `ManagerChurnRecoveryTable`, `ManagerChurnRecoveryTableRow` | `GET /manager/communications/churn/members` | ✅ Live (Mock) |
| **Win-Back Composer** | `/manager/communications` (Win-Back tab) | Select template tier (7/30/90 days), pick channel, edit message, send to individual churned member | `ManagerChurnRecoveryComposer` | `POST /manager/communications/churn/win-back` | ✅ Live (Mock) |

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

### Flow 4: Win-Back a Churned Member
1. Manager clicks the "Win-Back" tab — sees Churn KPIs + churned members table
2. Scans the table — each row shows days since exit colour-coded (red ≤7d, amber ≤30d, blue >30d)
3. Manager clicks a row (e.g. Ravi Shankar, 7 days since exit)
4. `ManagerChurnRecoveryComposer` drawer slides in from the right
5. Template tier auto-selects "< 7 Days" — message pre-fills with the aggressive win-back copy
6. Manager edits the message body if needed
7. Selects WhatsApp → drawer shows "WhatsApp cannot be bulk-sent" notice
8. Clicks "Send Win-Back" → WhatsApp link opens; campaign logged in Send History tab
9. Toast: "Win-back message sent successfully"; member row shows "Contacted [date]"

## Data and State Architecture

- **State pattern:** Zustand for all composer/churn UI state + TanStack Query for server state (campaigns, KPIs, segment recipients, churned members, churn KPIs)
- **Zustand store:** `useManagerCommunicationsStore.ts` — holds: `activeTab` (including `'churn_recovery'`), `selectedSegment`, `selectedChannel`, `composerTitle`, `composerMessage`, `composerSubject`, `historySearch`, `historyChannelFilter`, `currentPage`, `churnSearch`, `churnReasonFilter`, `churnCurrentPage`, `isChurnComposerOpen`, `selectedChurnedMemberId`
- **TanStack Query keys:**
  - `['managerCommunications', 'campaigns']`
  - `['managerCommunications', 'kpis']`
  - `['managerCommunications', 'segment', selectedSegment]`
  - `['managerCommunications', 'automations']`
  - `['managerCommunications', 'churn', 'members']`
  - `['managerCommunications', 'churn', 'kpis']`
- **Template auto-fill:** When segment changes, `handleSegmentChange()` in the logic hook auto-fills from `COMM_MESSAGE_TEMPLATES`. When a churned member is selected, `useManagerChurnRecoveryLogic` derives `defaultTier` from `daysSinceExit` and auto-fills from `CHURN_WIN_BACK_TEMPLATES`.
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
| `fetchAutomations()` | GET | `/manager/communications/automations` | — | `CommAutomation[]` |
| `updateAutomation(id, payload)` | PATCH | `/manager/communications/automations/:id` | `Partial<CommAutomation>` | `CommAutomation` |
| `fetchChurnedMembers()` | GET | `/manager/communications/churn/members` | — | `ChurnedMember[]` |
| `fetchChurnKPIs()` | GET | `/manager/communications/churn/kpis` | — | `ChurnKPIData` |
| `sendWinBackMessage(payload)` | POST | `/manager/communications/churn/win-back` | `{ memberId, memberName, phone, email, channel, templateTier, message, subject }` | `CommCampaign` |

## Permissions and Security

- **Required role:** `MANAGER` — enforced by `middleware.ts`
- **Read-only for member data:** This module never calls any member mutation API. It only reads segment and churn data.
- **No automated WhatsApp bulk send:** `ManagerBulkMessageModal` and `ManagerChurnRecoveryComposer` require per-recipient manual send — this is intentional and compliant with WhatsApp's terms of service.
- **Sensitive data:** Phone numbers in the churn table are masked (`98****2310`) via `maskPhone()` inside `ManagerChurnRecoveryTable`.
- **Cross-role isolation:** Zero imports from `/admin`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking KPIs + tab + composer | N/A | `error.tsx` — branded error with Retry |
| Segment recipient count | `Loader2` spinner inside segment card | "0 recipients" shown | Shared with main query |
| History table | `TableSkeleton` (5 rows, 7 cols) | Inline empty state — icon + "No campaigns yet" + CTA | Shared with main query |
| Churn KPIs | Skeleton pulse blocks per card | N/A (cards show 0) | Shared with churn query |
| Churn members table | 5 skeleton rows (7 cols) | `ManagerChurnRecoveryEmptyState` — ShieldCheck icon + "Great retention!" message | Shared with churn query |

## Edge Cases and AI Warnings

- **Template auto-fill on segment change:** `handleSegmentChange()` in `useManagerCommunicationsLogic` auto-fills both `composerMessage` and `composerSubject`. If you add a new segment to `COMM_SEGMENT_OPTIONS`, you MUST also add a corresponding entry to `COMM_MESSAGE_TEMPLATES` — otherwise the auto-fill will silently use `undefined`.
- **WhatsApp cannot be automated:** `ManagerBulkMessageModal` opens `wa.me` links one at a time. Do NOT attempt to loop `window.open` calls — browsers block popups after the first one. The same rule applies to `ManagerChurnRecoveryComposer`.
- **`{name}` placeholder is display-only:** The `{name}` token in templates is shown as a tip to the manager. Actual personalisation must happen server-side when the real API is integrated.
- **`sendCampaign` resets composer and switches tab:** After a successful send, `resetComposer()` is called and `setActiveTab('history')` fires. Do NOT add any additional state resets in the component.
- **`sendWinBackMessage` logs a campaign entry:** Win-back sends appear in the Send History tab with segment label "Win-Back (Churned)". Do not remove this side-effect from the mock API — it ensures the history tab is a complete audit log.
- **Churn composer `defaultTier` derives from `daysSinceExit`:** If `daysSinceExit ≤ 7` → `'7_days'`, `≤ 30` → `'30_days'`, else `'90_days'`. This is computed in `useManagerChurnRecoveryLogic.getTemplateTier()` — do not duplicate this logic in the component.
- **`recovered: true` members show no Win-Back button:** `ManagerChurnRecoveryTableRow` conditionally hides the Win-Back CTA for recovered members. Do not remove this guard.
- **`CHURN_WIN_BACK_TEMPLATES` is the single source of truth:** Never add inline message text in the composer component. Always add new win-back tiers to `ManagerCommunicationsSharedConstants.ts`.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `ManagerCommunicationsMain.tsx` | Root orchestrator. Renders KPIs, 4-tab switcher (Compose / History / Automations / Win-Back), conditionally renders the active tab's component. No direct API calls. |
| `ManagerCommunicationsKPIs.tsx` | 4 read-only stat cards. Reads `kpis` from logic hook. |
| `ManagerCommunicationsSegmentPicker.tsx` | Segment card grid. Calls `handleSegmentChange`. Shows live recipient count with loading state. |
| `ManagerCommunicationsComposer.tsx` | Full compose form. Channel toggle, title, subject, message body, send button, preview modal trigger. |
| `ManagerCommunicationsHistory.tsx` | Paginated history table. Search + channel filter. Reads `paginatedCampaigns` from logic hook. |
| `ManagerChurnRecoveryTab.tsx` | Root orchestrator for the Win-Back tab. Distributes logic hook data to KPIs, Table, and Composer. |
| `ManagerChurnRecoveryKPIs.tsx` | 4 churn-specific stat cards: Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit. |
| `ManagerChurnRecoveryTable.tsx` | Paginated churned member table with search + reason filter pill buttons. Skeleton loading rows. |
| `ManagerChurnRecoveryTableRow.tsx` | Single churned member row. Days-since-exit badge, masked phone, reason label, recovery status, Win-Back CTA. |
| `ManagerChurnRecoveryComposer.tsx` | Right-side slide-in drawer. Template tier selector, channel toggle, editable message, send button. |
| `ManagerChurnRecoveryEmptyState.tsx` | Empty state shown when no churned members exist. Positive "Great retention!" framing. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, file size ceiling respected
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — role prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors (WA_GREEN documented as brand exception)
- [x] Rule 5: Smart State Management — Zustand for UI, TanStack Query for server state
- [x] Rule 6: Logic/UI Separation — `useManagerCommunicationsLogic` and `useManagerChurnRecoveryLogic` extract all logic
- [x] Rule 7: Type Isolation — all types in `communications_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present and non-generic
- [x] Rule 11: `ManagerCommunicationsUrlConfig.ts` present with all CHURN endpoints
- [x] Rule 13: This document — updated in same commit
- [x] Rule 15B: Zod schema present (`CommFormSchema`)
- [x] Rule 19: Clickable table rows — churn table rows use `cursor-pointer`
- [x] Rule 26: Loading button state — `Loader2` spinner on "Send Win-Back" button
- [x] Rule 40: `communications_forbidden.md` present
- [x] Rule 43: Sensitive data masking — `maskPhone()` in churn table
- [x] Rule 48: Empty state component present (`ManagerChurnRecoveryEmptyState`)
- [x] Rule 72: API functions follow verb contract (fetchChurnedMembers, sendWinBackMessage)
- [x] Design §5j: Composer as a right-side drawer (Confirmation Drawer pattern)
- [x] Design §12: z-40 for drawer, z-50 for toasts
- [x] Design §28: `bg-overlay` used for drawer background
- [x] Design §29: `motion-safe:` guards on all transitions and animations
