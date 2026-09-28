# Core i18n Integration Boundary

This role-scoped backend artifact defines the required global integration boundary for the architecture's Rule 116 locale strategy.

The supplied role ZIP intentionally does not own the application's package manifest or complete root bootstrap, so it must not create a second global framework configuration inside `backend_trainer`.

## Required root integration

- Install the project's approved `nestjs-i18n` version in the real application root.
- Register the global `I18nModule` once in the real application root; do not register `forRoot()` inside any Trainer feature module.
- Point the i18n loader at each feature's co-located `_locales/` directory and the core `_locales/` directory.
- Enable `en` and `hi` for the current phased rollout; other target languages may be added when the application enables them.
- Pass request locale into the canonical exception/response message boundary.
- Keep domain error codes stable; translate only human-readable `message` text.

## Role-local evidence already repaired

Every Trainer feature now owns:

```text
<feature>/_locales/en/errors.json
<feature>/_locales/en/messages.json
<feature>/_locales/hi/errors.json
<feature>/_locales/hi/messages.json
```

The locale files remain inside the owning feature to preserve the project's extreme-isolation rule.

## Verification

The global application must prove that a request with `Accept-Language: hi` resolves a Trainer domain error to its Hindi human-readable message while preserving the same `errorCode`.
