# Superadmin Module — Forbidden Patterns
1. Never hardcode system config limits.
2. Never fetch branch-specific data without `branchId` filters unless doing a global aggregation.
3. Never bypass RBAC (`middleware.ts` handles this, but don't hardcode overrides).
4. Never mix admin and superadmin contexts.
