// RESPONSIBILITY: Associates a route with one centralized rate-limit tier.
// FLOW: Controller metadata -> LandingRateLimitGuard -> RATE_LIMIT_CONFIG -> Redis.
import { SetMetadata } from '@nestjs/common';

import type { LandingRateLimitTier } from '@/backend_landing/landing_core/landing_config/landing-rate-limit.config';

export { LandingRateLimitTier } from '@/backend_landing/landing_core/landing_config/landing-rate-limit.config';
export const RATE_LIMIT_TIER_KEY = 'rate-limit-tier';
export const SetRateLimit = (tier: LandingRateLimitTier) => SetMetadata(RATE_LIMIT_TIER_KEY, tier);
