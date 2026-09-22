# notifications_forbidden.md

## What is NEVER allowed in this module

1. Never emit a critical notification before persistence commits. Rule 120. Consequence: offline users can permanently miss the event.
2. Never return soft-deleted notifications. Rule 120. Consequence: deleted audit/history records can reappear.
3. Never broadcast an untyped notification payload. Rule 113. Consequence: frontend consumers cannot safely validate realtime events.
4. Never publish a cross-tenant notification. Rules 39/83/120. Consequence: tenant data isolation is breached.
5. Never add a WebSocket event without declaring the runtime event dependency. Rule 49/50. Consequence: event coupling becomes invisible to AI repairs.
