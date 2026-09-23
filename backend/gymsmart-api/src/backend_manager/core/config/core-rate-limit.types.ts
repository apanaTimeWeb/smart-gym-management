// RESPONSIBILITY: Defines the strongly typed rate-limit tier contract.
// FLOW: Central configuration -> request classification -> limiter enforcement.
export interface CoreRateLimitTier {
  limit: number;
  windowSeconds: number;
}
