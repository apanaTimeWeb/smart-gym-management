// RESPONSIBILITY: Applies Redis-backed request throttling from centralized tiers without hardcoded controller limits.
// FLOW: Request â†’ AdminCoreRateLimitGuard â†’ AdminCoreRateLimitConfig â†’ Redis window counter.
import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { AdminCoreRateLimitConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-rate-limit.config.js';
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service.js';

@Injectable()
/**
 * @description Defines the AdminCoreRateLimitGuard boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreRateLimitGuard implements CanActivate {
  constructor(private readonly redis: AdminCoreRedisService) {}

  /** @description Enforces the configured rate-limit tier for the current request path. @param context NestJS execution context. @returns Whether the request may continue. @throws TooManyRequestsException when the current window exceeds its limit. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const headers = request.headers as Record<string, string | undefined>;
    const path = String(request.path ?? '');
    const method = String(request.method ?? 'GET').toUpperCase();
    const tier = path.includes('/auth/login') ? AdminCoreRateLimitConfig.PUBLIC_AUTH : path.includes('export') ? AdminCoreRateLimitConfig.EXPORT : ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) ? AdminCoreRateLimitConfig.CRITICAL_MUTATION : AdminCoreRateLimitConfig.AUTHENTICATED_READ;
    const subject = String((request as { ip?: string }).ip ?? 'local');
    const key = `rate:${subject}:${String(request.method)}:${path}:${Math.floor(Date.now() / (tier.windowSeconds * 1000))}`;
    const count = await this.redis.increment(key);
    if (count === 1) await this.redis.setWithTtl(`${key}:ttl`, '1', tier.windowSeconds);
    if (count > tier.limit) throw new HttpException('Rate limit exceeded.', HttpStatus.TOO_MANY_REQUESTS);
    return true;
  }
}
