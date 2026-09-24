// RESPONSIBILITY: Attaches a central rate-limit tier to a controller route.
// FLOW: Controller metadata -> CoreRateLimitGuard -> CoreRateLimitService.

import { SetMetadata } from '@nestjs/common';

import { CoreRateLimitTier } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.constants';
export const CORE_RATE_LIMIT_TIER = 'core_rate_limit_tier';
export const CoreRateLimit = (tier: CoreRateLimitTier): MethodDecorator => SetMetadata(CORE_RATE_LIMIT_TIER, tier);
