// RESPONSIBILITY: Applies centralized Redis-backed rate-limit tiers without embedding limits in business controllers.
// FLOW: HTTP request → route tier classification → Redis window counter → allow or HttpStatus.TOO_MANY_REQUESTS.

import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { CORE_RATE_LIMIT_TIERS } from '@/backend_trainer/backend_core/core_security/core-rate-limit.config';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreRedisService } from '@/backend_trainer/backend_core/core_redis/core-redis.service';


/**
 * Intent: Defines the CoreRateLimitGuard boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreRateLimitGuard implements CanActivate {
  constructor(private readonly redis: CoreRedisService) {}

  /** Applies the configured rate-limit tier to the current route. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const tier = request.path.includes('/auth/login')
      ? CORE_RATE_LIMIT_TIERS.PUBLIC_AUTH
      : request.path.includes('/export')
        ? CORE_RATE_LIMIT_TIERS.EXPORT
        : ['GET', 'HEAD'].includes(request.method)
          ? CORE_RATE_LIMIT_TIERS.AUTHENTICATED_READ
          : CORE_RATE_LIMIT_TIERS.MUTATION;
    const windowStart = Math.floor(Date.now() / (tier.windowSeconds * 1000));
    const contextValue = CoreRequestContext.getOptional();
    const dimension = tier === CORE_RATE_LIMIT_TIERS.PUBLIC_AUTH
      ? `ip:${request.ip}`
      : `tenant:${contextValue?.tenantId ?? 'unknown'}:user:${contextValue?.userId ?? request.ip}`;
    const key = `ratelimit:${tier === CORE_RATE_LIMIT_TIERS.PUBLIC_AUTH ? 'public' : 'authenticated'}:${dimension}:${request.method}:${request.path}:${windowStart}`;
    const count = await this.redis.client.incr(key);
    if (count === 1) await this.redis.client.expire(key, tier.windowSeconds);
    if (count > tier.max) {
      throw new HttpException('CORE.RATE_LIMIT.REQUEST_EXCEEDED', HttpStatus.TOO_MANY_REQUESTS);
    }
    return true;
  }
}
