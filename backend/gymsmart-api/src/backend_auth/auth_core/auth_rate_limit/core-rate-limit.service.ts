// RESPONSIBILITY: Applies centralized Redis-backed API rate-limit tiers using configuration-owned thresholds.
// FLOW: CoreRateLimitGuard -> CoreRateLimitService -> RATE_LIMIT_CONFIG -> Redis.

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CoreRedisService } from '@/backend_auth/auth_core/cache/core-redis.service';
import { CoreErrorConstants } from '@/backend_auth/auth_core/constants/core-error.constants';
import { RATE_LIMIT_CONFIG } from '@/backend_auth/auth_core/config/rate-limit.config';
import { CoreRateLimitTier } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.constants';
@Injectable()
export class CoreRateLimitService {
  constructor(private readonly config: ConfigService, private readonly redis: CoreRedisService) {}

  /** @description Enforces the configured Redis request window for one route tier. @param tier - Central rate-limit tier. @param subject - Actor or client identifier. @returns Promise completion. @throws TooManyRequestsException when the configured threshold is exceeded. */
  async assertAllowed(tier: CoreRateLimitTier, subject: string): Promise<void> {
    const { max, ttlSeconds } = this.resolveTier(tier);
    const count = await this.redis.incrementWithExpiry(`rate-limit:${tier}:${subject}`, ttlSeconds);
    if (count > max) throw new HttpException(CoreErrorConstants.MESSAGE.RATE_LIMITED, HttpStatus.TOO_MANY_REQUESTS);
  }

  /** @description Resolves one tier from the centralized registry and validated environment configuration. @param tier - Requested tier. @returns Maximum requests and window duration. */
  private resolveTier(tier: CoreRateLimitTier): { max: number; ttlSeconds: number } {
    const definition = RATE_LIMIT_CONFIG[tier];
    const max = this.config.get<number>(definition.maxEnvironmentKey) ?? definition.defaultMax;
    const ttlSeconds = this.config.get<number>(definition.windowEnvironmentKey) ?? definition.defaultWindowSeconds;
    return { max, ttlSeconds };
  }
}
