# Superadmin V1 Handoff

## What is included
This directory is the repaired Superadmin module. Replace your existing Superadmin module directory with this one, preserving the host application's global infrastructure outside this module.

## Backendless requirement
Register `superadminMockHandlers` from `superadmin_mocks/SuperadminMockHandlers.ts` in the host project's existing browser/test MSW bootstrap. This aggregate export includes all Superadmin feature handlers and the shell notification handler.

## Important host dependencies
The module expects the documented host infrastructure: `@/lib/api`, `@/lib/logger`, `@/lib/formatters`, approved auth/session and permission infrastructure, shadcn/ui primitives, TanStack Query, React Hook Form, Zod, Zustand, MSW, Lucide, and the application's existing theme tokens.

## Verification status
Static syntax and architecture scans were completed on the package. Full typecheck, lint, test, E2E, production build, SCA, and secret scans require the host application because this module archive does not contain the host package manifest or installed dependency graph.
