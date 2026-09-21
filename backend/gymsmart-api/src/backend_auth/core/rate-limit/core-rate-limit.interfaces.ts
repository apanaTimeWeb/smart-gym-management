// RESPONSIBILITY: Defines rate-limit configuration and request-boundary contracts for core enforcement.
// FLOW: Controller metadata -> CoreRateLimitGuard -> CoreRateLimitTier -> Redis rate window.

import type { Request } from 'express';

import type { CoreJwtClaims } from '@/backend_auth/core/security/core-jwt-claims';

export interface CoreRateLimitTierConfig {
  maxEnvironmentKey: string;
  windowEnvironmentKey: string;
  defaultMax: number;
  defaultWindowSeconds: number;
}

export type CoreRateLimitedRequest = Request & { user?: CoreJwtClaims };
