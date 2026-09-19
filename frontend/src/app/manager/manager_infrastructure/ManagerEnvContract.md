# Manager Runtime Configuration Contract

The Manager module requires these public, browser-visible configuration values. Secrets must never be placed here.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GYM_NAME` | Yes | Runtime gym/business display name |
| `NEXT_PUBLIC_GYM_PHONE` | Yes | Runtime contact number |
| `NEXT_PUBLIC_GYM_GST` | Yes | Runtime GST identifier used in receipts/settings |
| `NEXT_PUBLIC_GYM_ADDRESS` | Yes | Runtime address used in receipts/settings |
| `NEXT_PUBLIC_CURRENCY_CODE` | Yes | ISO-4217 currency code used by centralized minor-unit formatting |

`ManagerEnvConfig.ts` is the single browser-side access point. Components and hooks must not read `process.env` directly.

Host integration requirement: provide `.env.example` and environment-specific configuration at the application root; never commit `.env.local` or secrets.
