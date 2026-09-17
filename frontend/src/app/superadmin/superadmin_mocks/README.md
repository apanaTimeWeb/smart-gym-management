# Superadmin Mock Boundary

Feature-owned MSW handlers and fixtures remain inside each feature folder.

`SuperadminMockHandlers.ts` is the stable aggregate registration export for the host MSW bootstrap. It only imports and combines module-owned handler arrays; it does not contain feature business data, response builders, or validation logic.

The authenticated shell notification bell owns a small shell-specific notification contract under `superadmin_components/SuperadminNotifications/` because the global shell must not import the Messaging feature's business implementation.
