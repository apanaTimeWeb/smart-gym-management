# Messaging Module — Free Smart Bulk WhatsApp Feature Map

## Module Purpose
This Superadmin-only extension provides a free guided WhatsApp workflow for platform-to-tenant communication. It is intentionally tenant-only: Superadmin targets tenant owners, admins, and managers. Gym-member communication belongs to Admin / Manager modules and is not represented here. The feature uses WhatsApp click-to-chat links with pre-filled personalized messages rather than a paid messaging API.

## Core Feature Inventory

| Capability | Detail |
|---|---|
| Tenant audience builder | All Tenant Contacts, Subscription Due, Subscription Overdue, Trials Ending Soon, Onboarding Pending, At-Risk Tenants, Maintenance / Incident Affected, Tenant Admins & Managers, plus gym scope. |
| Template library | Subscription Renewal Reminder, Subscription Payment Overdue, Trial Ending Reminder, Onboarding Reminder, Tenant Check-In, Planned Maintenance Notice, Service Issue Update, New Feature Announcement, Holiday & Support Hours Update, Security Action Required, Platform Policy Update, Custom Tenant Message. |
| Personalization | `{contact_name}`, `{tenant_name}`, `{contact_role}`, `{plan_name}`, `{subscription_amount}`, `{invoice_number}`, `{due_date}`, `{trial_end_date}`, `{maintenance_start}`, `{maintenance_end}`, `{affected_service}`, `{support_link}`, `{dashboard_link}`. |
| Free sending workflow | Build queue → Open WhatsApp → press WhatsApp Send → Mark Sent & Next, with Skip support. |
| Progress tracking | Tenant contacts, Waiting, Marked sent, Skipped, queue progress, and recent campaign history. |
| Tenant safety | Every queue record is a tenant contact and can be narrowed to one gym; opted-out or invalid contacts are excluded. |
| Role boundary | No gym member audience, member fee reminders, member renewal messages, or member-level records exist in this Superadmin feature. |

## User Flow
1. Open `/superadmin/messaging`.
2. Select a tenant-facing template or Custom Tenant Message.
3. Choose a tenant audience and gym scope.
4. Review the live personalized preview.
5. Start the tenant WhatsApp queue.
6. Open the current tenant contact's WhatsApp chat.
7. Press Send in WhatsApp.
8. Return to Superadmin and choose Mark Sent & Next or Skip.
9. Continue until the queue reaches completion.

## Operations, Maintenance, and Announcements
Operational presets cover planned maintenance, service incidents, new features, holiday/support hours, security actions, and policy notices. Billing/onboarding presets cover platform subscription and trial lifecycle events. Each preset can be edited before queue creation.

## Data and State Architecture
- Server state: TanStack Query through `fetchSuperadminWhatsAppBulkCenter`.
- Campaign creation: `createSuperadminWhatsAppCampaign` validates the payload and records the queue request through the feature API boundary.
- Queue state: local React state for the active operator session; no browser storage is used by this feature.
- Mock source: feature-owned fixture and MSW handlers under `messaging_whatsapp_mocks/`.

## API Contract

| Function | Method | Endpoint expression |
|---|---|---|
| `fetchSuperadminWhatsAppBulkCenter` | GET | `MessagingUrlConfig.BACKEND_API.WHATSAPP_BULK_CENTER` |
| `createSuperadminWhatsAppCampaign` | POST | `MessagingUrlConfig.BACKEND_API.WHATSAPP_CAMPAIGNS` |

## Free-Mode Limitation
The frontend can open a WhatsApp chat and pre-fill a message, but WhatsApp's own Send action remains manual. The queue therefore labels the operator action as **Opened**, **Marked sent**, or **Skipped** rather than claiming automated delivery/read confirmation.

## Edge Cases
- Invalid or missing phone numbers are excluded from the queue.
- Tenant contacts without WhatsApp opt-in are excluded.
- Missing personalization values use an explicit `—` fallback.
- Empty tenant audiences disable campaign start and show a clear reason.
- Queue completion is based on operator actions, not WhatsApp delivery events.
- The feature has its own URL constants, schemas, fixtures, API wrapper, tests, and documentation.
