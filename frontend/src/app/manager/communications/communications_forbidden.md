# Manager Communications — Forbidden Patterns

## Zero Cross-Role Imports
- NEVER import from `/admin`, `/trainer`, `/superadmin`, or any other role folder.
- The only shared imports allowed are from `src/components/ui/`, `src/lib/`, and `@/app/manager/manager_components/`.

## No Direct Member Data Mutation
- This module is READ-ONLY with respect to member data. It fetches member segments for targeting but NEVER modifies member records.
- Do NOT import `ManagerMembersApi` or any members mutation hook here.

## No Hardcoded Recipient Lists
- Never hardcode a list of phone numbers or emails in this module. All recipients must come from `fetchSegmentRecipients()`.

## No Automated Bulk WhatsApp Sending
- WhatsApp prevents automated bulk messaging. The `ManagerBulkMessageModal` correctly requires per-recipient manual send. Do NOT attempt to automate this with loops or `window.open` in a loop.

## No New Dependencies
- `ManagerBulkMessageModal` already handles the send UI. Do NOT install a third-party SMS/email library.
- Do NOT install `nodemailer`, `twilio`, `sendgrid`, or any server-side messaging SDK in this frontend module.
