# Forbidden Patterns — Trainer Sessions

1. Do not use `alert()` or `window.confirm()` for destructive session actions. Use `useConfirm()` from the approved Trainer feedback infrastructure.
2. Do not store session API responses in React Context or Zustand. TanStack Query owns server state; Zustand is UI-only.
3. Do not hardcode session URLs. All Sessions routes/API paths must come from `sessions_url_config.ts` / `TrainerSessionsUrlConfig`.
4. Do not use `key={index}` for session records; use stable session IDs.
5. Do not optimistically mark a session cancelled. Update visible server/mock state only after the mutation succeeds.
6. Do not fake cancellation success with a toast while leaving the underlying mock state unchanged.
7. Do not expose raw API/exception messages to users.
8. Do not place Sessions business logic in sibling feature modules or role-level business folders.
