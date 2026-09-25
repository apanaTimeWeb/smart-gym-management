// RESPONSIBILITY: Centralizes rate-limit tiers for public, authenticated and export operations.
// FLOW: Request â†’ AdminCoreRateLimitGuard â†’ AdminCoreRateLimitConfig â†’ allow/reject.

export const AdminCoreRateLimitConfig = {
  PUBLIC_AUTH: { limit: 5, windowSeconds: 60 },
  AUTHENTICATED_READ: { limit: 100, windowSeconds: 60 },
  EXPORT: { limit: 2, windowSeconds: 60 },
  CRITICAL_MUTATION: { limit: 20, windowSeconds: 60 },
} as const;
