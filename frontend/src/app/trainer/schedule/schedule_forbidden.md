# Trainer Schedule — Forbidden Patterns

## Cross-Role Import Ban
- NEVER import from /manager, /admin, or /superadmin
- All schedule logic must live in /trainer/schedule/**

## Banned APIs
- NEVER use window.confirm() or alert() — use TrainerToast
- NEVER use Math.random() for IDs in production paths

## Animation / Motion
- NEVER use bare animate-*, transition-* classes
- ALWAYS wrap with motion-safe: (e.g. motion-safe:animate-spin)

## State Management
- NEVER mutate Zustand state directly — always use store actions
- NEVER call loadSchedule() in a render function — only in effects or actions

## Forbidden Patterns
- NEVER export generic Props types (e.g. export interface Props {})
- NEVER put useState/useCallback/useEffect directly in page.tsx
- NEVER add 'use client' to page.tsx or loading.tsx

## Leave Approval
- Trainers can only CREATE leave requests (status = PENDING)
- Approval is MANAGER-SIDE — never add Approve/Reject buttons in trainer module

