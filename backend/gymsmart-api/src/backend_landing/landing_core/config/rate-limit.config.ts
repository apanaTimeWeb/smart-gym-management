// RESPONSIBILITY: Defines centralized rate-limit tiers used by HTTP guards.
// FLOW: RateLimitTier metadata â†’ RateLimitGuard â†’ Redis fixed-window counter.
export const RATE_LIMIT_CONFIG = {
  PUBLIC_MUTATION: { maxRequests: 10, windowSeconds: 60 },
  PUBLIC_GENERAL: { maxRequests: 60, windowSeconds: 60 },
} as const;

export type RateLimitTier = keyof typeof RATE_LIMIT_CONFIG;
