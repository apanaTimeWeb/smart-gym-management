# Dependency Approval Record

This repository uses a deliberately bounded dependency set aligned with the architecture. The selected runtime stack is NestJS, PostgreSQL (`pg`), TypeORM, Redis (`ioredis`), bcrypt, Swagger, Terminus, `nestjs-pino`, Zod, Prometheus instrumentation and OpenTelemetry.

The development toolchain additionally uses TypeScript, Jest, pytest, Husky, lint-staged, Prettier, tsc-alias, tsx, TypeScript ESLint and `eslint-plugin-import-x` for the mechanical Rule 88 import-order gate.

`eslint-plugin-import-x` was selected specifically to enforce import ordering mechanically instead of relying on human review. New dependencies require human approval before merge under Rule 77.

Production merges also require the human review gate required for `auth/`, migrations and security-sensitive infrastructure under Rule 93.
