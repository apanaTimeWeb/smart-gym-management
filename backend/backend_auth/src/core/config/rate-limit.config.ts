// RESPONSIBILITY: Defines the canonical rate-limit tier registry without embedding route-specific limits in controllers or services.
// FLOW: CoreRateLimitTier -> RATE_LIMIT_CONFIG -> ConfigService -> Redis rate-limit counter.

import { CoreRateLimitTier } from '@/core/rate-limit/core-rate-limit.constants';

import type { CoreRateLimitTierConfig } from '@/core/config/core-rate-limit.interfaces';

export const RATE_LIMIT_CONFIG: Record<CoreRateLimitTier, CoreRateLimitTierConfig> = {
  [CoreRateLimitTier.AUTH_LOGIN]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_AUTH_LOGIN_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_AUTH_LOGIN_WINDOW_SECONDS',
    defaultMax: 5,
    defaultWindowSeconds: 60,
  },
  [CoreRateLimitTier.AUTH_REFRESH]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_AUTH_REFRESH_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_AUTH_REFRESH_WINDOW_SECONDS',
    defaultMax: 20,
    defaultWindowSeconds: 60,
  },
  [CoreRateLimitTier.AUTH_ME]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_AUTH_ME_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_AUTH_ME_WINDOW_SECONDS',
    defaultMax: 60,
    defaultWindowSeconds: 60,
  },
  [CoreRateLimitTier.AUTH_LOGOUT]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_AUTH_LOGOUT_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_AUTH_LOGOUT_WINDOW_SECONDS',
    defaultMax: 20,
    defaultWindowSeconds: 60,
  },
  [CoreRateLimitTier.HEALTH_LIVE]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_HEALTH_LIVE_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_HEALTH_LIVE_WINDOW_SECONDS',
    defaultMax: 120,
    defaultWindowSeconds: 60,
  },
  [CoreRateLimitTier.HEALTH_READY]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_HEALTH_READY_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_HEALTH_READY_WINDOW_SECONDS',
    defaultMax: 60,
    defaultWindowSeconds: 60,
  },
  [CoreRateLimitTier.METRICS]: {
    maxEnvironmentKey: 'environment.RATE_LIMIT_METRICS_MAX',
    windowEnvironmentKey: 'environment.RATE_LIMIT_METRICS_WINDOW_SECONDS',
    defaultMax: 120,
    defaultWindowSeconds: 60,
  },
};
