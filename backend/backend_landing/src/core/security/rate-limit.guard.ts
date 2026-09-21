// RESPONSIBILITY: Enforces centralized Redis-backed request limits without embedding numeric limits in controllers.
// FLOW: HTTP request → RateLimitGuard → Redis fixed window → allow or reject.
import { CanActivate, ExecutionContext, HttpStatus, Injectable, TooManyRequestsException } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { RATE_LIMIT_CONFIG } from '@/core/config/rate-limit.config';

import { RATE_LIMIT_TIER_KEY } from '@/core/security/rate-limit.decorator';

import { RedisService } from '@/core/redis/redis.service';

import type { Request } from 'express';


@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redis: RedisService,
  ) {}

  /** @description Applies the controller-declared Redis rate-limit tier. @param context - Nest execution context. @returns Whether the request may continue. @throws TooManyRequestsException when the tier is exhausted. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tier = this.reflector.get(RATE_LIMIT_TIER_KEY, context.getHandler());
    if (!tier || process.env.DEFAULT_RATE_LIMIT_ENABLED === 'false') return true;
    const request = context.switchToHttp().getRequest<Request>();
    const config = RATE_LIMIT_CONFIG[tier];
    const key = this.buildKey(request);
    const count = await this.redis.client.incr(key);
    if (count === 1) await this.redis.client.expire(key, config.windowSeconds);
    if (count <= config.maxRequests) return true;
    throw new TooManyRequestsException({
      success: false,
      message: 'Too many requests. Please try again later.',
      data: null,
      error: 'RATE_LIMIT_EXCEEDED',
      errorCode: 'CORE.RATE_LIMIT.EXCEEDED',
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  }

  /** @description Builds a fixed-window Redis key using route-level identity. @param request - Express request. @returns Redis key. */
  private buildKey(request: Request): string {
    return `rate:${request.ip}:${request.method}:${request.path}`;
  }
}
