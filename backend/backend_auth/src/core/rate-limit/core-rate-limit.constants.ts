// RESPONSIBILITY: Defines centralized rate-limit tiers for Auth endpoints.
// FLOW: Controller decorator -> CoreRateLimitGuard -> tier configuration -> Redis.

export enum CoreRateLimitTier {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_REFRESH = 'AUTH_REFRESH',
  AUTH_ME = 'AUTH_ME',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}
