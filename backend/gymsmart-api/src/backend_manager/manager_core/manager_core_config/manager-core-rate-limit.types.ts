// RESPONSIBILITY: Defines the strongly typed rate-limit tier contract.
// FLOW: Central configuration -> request classification -> limiter enforcement.
export interface ManagerCoreRateLimitTier {
  limit: number;
  windowSeconds: number;
}
