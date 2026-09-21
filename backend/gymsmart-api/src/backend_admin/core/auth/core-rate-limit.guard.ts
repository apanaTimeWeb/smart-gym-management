// RESPONSIBILITY: Applies Redis-backed request throttling from centralized tiers without hardcoded controller limits.
// FLOW: Request → CoreRateLimitGuard → CoreRateLimitConfig → Redis window counter.

import { CanActivate, ExecutionContext, Injectable, TooManyRequestsException } from '@nestjs/common';

import { CoreRateLimitConfig } from '@/backend_admin/core/config/core-rate-limit.config';
import { CoreRedisService } from '@/backend_admin/core/redis/core-redis.service';

@Injectable()
export class CoreRateLimitGuard implements CanActivate {
  constructor(private readonly redis: CoreRedisService) {}

  /** @description Enforces the configured rate-limit tier for the current request path. @param context NestJS execution context. @returns Whether the request may continue. @throws TooManyRequestsException when the current window exceeds its limit. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const headers = request.headers as Record<string, string | undefined>;
    const path = String(request.path ?? '');
    const tier = path.includes('/auth/login') ? CoreRateLimitConfig.PUBLIC_AUTH : path.includes('export') ? CoreRateLimitConfig.EXPORT : CoreRateLimitConfig.AUTHENTICATED_READ;
    const subject = headers['x-forwarded-for'] ?? 'local';
    const key = `rate:${subject}:${String(request.method)}:${path}:${Math.floor(Date.now() / (tier.windowSeconds * 1000))}`;
    const count = await this.redis.increment(key);
    if (count === 1) await this.redis.setWithTtl(`${key}:ttl`, '1', tier.windowSeconds);
    if (count > tier.limit) throw new TooManyRequestsException('Rate limit exceeded.');
    return true;
  }
}
