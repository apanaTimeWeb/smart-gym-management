# Messaging Module — Forbidden Patterns

## What is EXPLICITLY NOT ALLOWED in this module

1. **No `key={index}`** — All list renders must use stable unique IDs (`msg.id`, `notif.id`). Index keys break React reconciliation.

2. **No inline JSX in `const` objects** — `NOTIF_ICON` style patterns using `React.ReactNode` in plain constants are forbidden. Use a dedicated render function or small component (e.g., `NotifIcon`) instead.

3. **No hardcoded server records inside the client component** — Messages, notifications, and tenants must come from `useSuperadminMessaging`/module API state. Display-only constants such as channel/status classes remain in `SuperadminMessagingConstants.ts`.

4. **Tenant recipient selection must remain searchable and tenant-scoped** — Use the module searchable dropdown; Superadmin messaging must not expose gym-member recipients.

5. **No `any` type** — Strictly forbidden. Use typed interfaces from `messaging_types.ts`.

6. **No relative imports** — All imports must use `@/` absolute paths (Rule 10).

7. **No `console.log`** — Forbidden in committed code (Rule 44).

8. **No hardcoded Tailwind colors** — Use design system tokens only. Never `bg-[#111]` or arbitrary hex values.

9. **No cross-feature business component imports** — Use only shared Superadmin infrastructure or messaging-owned contracts; do not reach into another business feature for recipient data.

10. **No modal z-index above `z-40`** — Modals use `z-40` per the design system Z-index scale (Design §12). Toast notifications own `z-50`.
