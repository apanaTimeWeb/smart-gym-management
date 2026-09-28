# Core Bootstrap Integration Contract

The supplied role archive has no application `main.ts`/bootstrap entrypoint, so these controls cannot be wired into the actual NestFactory call inside this artifact scope. The expected bootstrap must apply:

- `CORE_HTTP_HARDENING_CONFIG` for compression, strict CORS, Helmet/security headers, payload limits, and SIGINT/SIGTERM shutdown hooks.
- URI API versioning with `api/v1` as the default public prefix.
- Global validation using whitelist + forbidNonWhitelisted.

This file is an explicit scope handoff; it is not presented as runtime proof.
