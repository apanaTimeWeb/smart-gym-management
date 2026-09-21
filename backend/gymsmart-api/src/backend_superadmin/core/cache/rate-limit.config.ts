// RESPONSIBILITY: Defines the centralized rate-limit policy tiers used by the Redis guard.
// FLOW: Controller request -> tier lookup -> Redis counter -> allow/reject.
export const RATE_LIMIT_TIERS = {
  PUBLIC_AUTH: { limit: 5, windowSeconds: 60 },
  AUTHENTICATED_READ: { limit: 100, windowSeconds: 60 },
  MUTATION: { limit: 30, windowSeconds: 60 },
  EXPORT: { limit: 2, windowSeconds: 60 },
} as const;
