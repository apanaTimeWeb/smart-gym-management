// RESPONSIBILITY: Owns backend core authorization/security guard.
// FLOW: Request context → authentication/authorization decision → allow or reject.
import { CanActivate, ExecutionContext, Injectable, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CoreRateLimitConfig } from '@/backend_manager/core/config/rate-limit.config';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreRedisService } from '@/backend_manager/core/database/core-redis.service';

import type { Request } from 'express';

@Injectable()
export class CoreRateLimitGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly redis: CoreRedisService, private readonly context: CoreRequestContextService) {}

  /** @description Enforces the central rate-limit tier for the current HTTP route. @param executionContext - Current HTTP execution context. @returns True when request remains below its tier limit. @throws HttpException when the tier limit is exceeded. */
  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>('core_public', [executionContext.getHandler(), executionContext.getClass()])) return true;
    const request = executionContext.switchToHttp().getRequest<Request>();
    if (request.path.includes('/health')) return true;
    const tier = this.getTier(request);
    const config = CoreRateLimitConfig[tier];
    const now = Math.floor(Date.now() / (config.windowSeconds * 1000));
    const key = `rate:${tier}:${request.method}:${request.ip}:${now}`;
    const client = this.redis.getClient();
    const count = await client.incr(key);
    if (count === 1) await client.expire(key, config.windowSeconds);
    if (count > config.limit) throw new HttpException({ errorCode: 'RATE_LIMIT.EXCEEDED', message: 'Rate limit exceeded.' }, 429);
    void this.context;
    return true;
  }

  /** @description Selects the centralized tier from request authentication state and path. @param request - Current request. @returns Rate-limit tier key. */
  private getTier(request: Request): keyof typeof CoreRateLimitConfig {
    if (request.path.includes('/auth/')) return 'publicAuth';
    if (request.method.toUpperCase() === 'GET') return request.path.includes('/export') ? 'export' : 'authenticatedRead';
    return request.path.includes('/export') ? 'export' : 'mutation';
  }
}
