// RESPONSIBILITY: Enforces centralized Redis-backed request limits without embedding numeric limits in controllers.
// FLOW: HTTP request -> LandingRateLimitGuard -> validated config + Redis fixed window -> allow or reject.
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { RATE_LIMIT_CONFIG } from '@/backend_landing/landing_core/landing_config/landing-rate-limit.config';
import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';
import { LandingRedisService } from '@/backend_landing/landing_core/landing_redis/landing-redis.service';
import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';
import { RATE_LIMIT_TIER_KEY } from '@/backend_landing/landing_core/landing_security/landing-rate-limit.decorator';

import type { Request } from 'express';

/**
 * Intent: Apply centrally defined fixed-window rate-limit tiers to endpoints that explicitly opt in.
 * Edge Cases: Unknown tiers and Redis failures fail closed rather than silently bypassing protection.
 * Side Effects: Increments a Redis counter keyed by caller identity and route.
 * AI Notes: Never put numeric rate limits in controllers; update the centralized tier configuration instead.
 */
@Injectable()
export class LandingRateLimitGuard implements CanActivate {
  
  /**
   * Intent: Preserve the single responsibility of landing-rate-limit.guard.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly reflector: Reflector,
    private readonly redis: LandingRedisService,
    private readonly configService: ConfigService,
    private readonly requestContext: LandingRequestContextService,
  ) {}

  /**
   * Intent: Decide whether a request may execute under its declared rate-limit tier.
   * Edge Cases: Redis outages and unknown configured tiers are treated as protected failures.
   * Side Effects: Performs Redis INCR/EXPIRE operations for rate tracking.
   * AI Notes: Keep this guard free of business logic and use HttpStatus enums for responses.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tier = this.reflector.get<string>(RATE_LIMIT_TIER_KEY, context.getHandler());
    if (!tier || !this.configService.getOrThrow<boolean>('app.rateLimit.enabled')) return true;

    const tierConfig = RATE_LIMIT_CONFIG[tier as keyof typeof RATE_LIMIT_CONFIG];
    if (!tierConfig) {
      throw new HttpException({
        message: CORE_ERROR_MESSAGES.RATE_LIMIT_CONFIGURATION_INVALID,
        error: 'RATE_LIMIT_CONFIGURATION_INVALID',
        errorCode: 'CORE.RATE_LIMIT.CONFIGURATION_INVALID',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const request = context.switchToHttp().getRequest<Request>();
    const key = this.buildKey(request);
    try {
      const count = await this.redis.client.incr(key);
      if (count === 1) await this.redis.client.expire(key, tierConfig.windowSeconds);
      if (count <= tierConfig.maxRequests) return true;
    } catch {
      throw new HttpException({
        message: CORE_ERROR_MESSAGES.REDIS_UNAVAILABLE,
        error: 'REDIS_UNAVAILABLE',
        errorCode: 'CORE.REDIS.UNAVAILABLE',
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }

    throw new HttpException({
      message: CORE_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
      error: 'RATE_LIMIT_EXCEEDED',
      errorCode: 'CORE.RATE_LIMIT.EXCEEDED',
    }, HttpStatus.TOO_MANY_REQUESTS);
  }

  /**
   * Intent: Keep rate-limit keys deterministic and tenant-aware whenever a trusted tenant exists.
   * Edge Cases: Pre-tenant public infrastructure uses a null tenant partition.
   * Side Effects: None.
   * AI Notes: Never include credentials, tokens, or request bodies in the key.
   */
  private buildKey(request: Request): string {
    const tenantId = this.requestContext.get().tenantId ?? 'public';
    return `rate:${tenantId}:${request.ip}:${request.method}:${request.path}`;
  }
}
