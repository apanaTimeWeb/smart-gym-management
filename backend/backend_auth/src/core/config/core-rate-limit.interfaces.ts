// RESPONSIBILITY: Defines the typed configuration contract for centralized rate-limit tiers.
// FLOW: RATE_LIMIT_CONFIG -> CoreRateLimitService -> Redis request-window enforcement.

export interface CoreRateLimitTierConfig {
  maxEnvironmentKey: string;
  windowEnvironmentKey: string;
  defaultMax: number;
  defaultWindowSeconds: number;
}
