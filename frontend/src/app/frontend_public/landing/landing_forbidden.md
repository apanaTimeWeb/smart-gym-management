# PublicLanding Forbidden Patterns

- No cross-feature business imports.
- No role-wide business buckets.
- No `LandingMarketingConstants.ts` or other monolithic mixed business constants file.
- No relative imports.
- No hardcoded backend API URLs outside `landing_url_config.ts`.
- No hardcoded theme colors in JSX.
- No semantic background opacity modifiers.
- No API business records inside components.
- No raw transport error text in the UI.
- No new idempotency key on retry.
- No `any`, `@ts-ignore`, or `@ts-nocheck`.
- No browser storage direct access from components.
- No no-op buttons, placeholder alerts, or fake mutation success.
- No `key={index}` for business lists.
- No hardcoded currency symbols or inline minor-unit conversion in JSX.
- No untranslated user-facing strings when a module translation key is available.
- No unguarded motion utilities; use `motion-safe:` / reduced-motion CSS.
