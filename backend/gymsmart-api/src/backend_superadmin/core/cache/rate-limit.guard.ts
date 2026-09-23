// RESPONSIBILITY: Enforces centralized Redis-backed API rate limits without embedding business thresholds in controllers.
// FLOW: Request context -> rate tier -> Redis INCR/EXPIRE -> permit or 429.
import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';
import { RATE_LIMIT_TIERS } from '@/backend_superadmin/core/cache/rate-limit.config';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly redis: RedisService) {}

  /** Applies the configured public/authenticated mutation tier to the request. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: { userId?: string } }>();
    if (request.path === '/health' || request.path === '/ping' || request.path === '/metrics') return true;
    const tier = request.path.includes('/export') ? RATE_LIMIT_TIERS.EXPORT : request.user ? (request.method === 'GET' ? RATE_LIMIT_TIERS.AUTHENTICATED_READ : RATE_LIMIT_TIERS.MUTATION) : RATE_LIMIT_TIERS.PUBLIC_AUTH;
    const actor = request.user?.userId ?? 'anonymous';
    const key = `rate:${actor}:${request.ip}:${request.method}:${request.path}`;
    const count = await this.redis.increment(key, tier.windowSeconds);
    if (count > tier.limit) throw new HttpException({ error: 'RATE_LIMITED', errorCode: 'RATE_LIMIT.GENERAL.EXCEEDED', message: { key: 'core.ERRORS.RATE_LIMIT_EXCEEDED' } }, HttpStatus.TOO_MANY_REQUESTS);
    return true;
  }
}