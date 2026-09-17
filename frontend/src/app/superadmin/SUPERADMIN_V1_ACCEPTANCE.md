# Superadmin V1 — Acceptance Checklist

## Static gates
- [x] Module-owned mock registry exists.
- [x] No cross-feature Messaging business dependency from shell notifications.
- [x] Unsaved guard is module-owned and consumers use the module path.
- [x] Backup schedule uses RHF + Zod + API + MSW.
- [x] Ticket reply uses API + MSW instead of a timeout simulation.
- [x] Jobs actions use API + MSW and invalidate TanStack Query.
- [x] Messaging server state uses TanStack Query.
- [x] System SLA credit uses API + MSW.
- [x] Size-ceiling scan passes.
- [x] TypeScript syntax scan passes.

## Runtime gates
- [ ] Host-project typecheck — NOT VERIFIED in module-only archive.
- [ ] Host-project lint/Tailwind/Prettier — NOT VERIFIED.
- [ ] Vitest/RTL — NOT VERIFIED.
- [ ] Playwright — NOT VERIFIED.
- [ ] Production build — NOT VERIFIED.
- [ ] SCA / secret scan — NOT VERIFIED.

A V1 package is considered runtime-accepted only after these host-project gates pass.
