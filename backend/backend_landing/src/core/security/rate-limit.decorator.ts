// RESPONSIBILITY: Associates a route with one centralized rate-limit tier.
// FLOW: Controller metadata → RateLimitGuard → RATE_LIMIT_CONFIG → Redis.
import { SetMetadata } from '@nestjs/common';
import type { RateLimitTier } from '@/core/config/rate-limit.config';

export const RATE_LIMIT_TIER_KEY = 'rate-limit-tier';
export const RateLimitTier = (tier: RateLimitTier) => SetMetadata(RATE_LIMIT_TIER_KEY, tier);
