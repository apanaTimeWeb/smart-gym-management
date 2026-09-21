// RESPONSIBILITY: Enforces route-declared rate-limit tiers using actor ID or request IP.
// FLOW: HTTP request -> CoreRateLimitGuard -> CoreRateLimitService -> controller.

import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CORE_RATE_LIMIT_TIER } from '@/backend_auth/core/rate-limit/core-rate-limit.decorator';
import { CoreRateLimitService } from '@/backend_auth/core/rate-limit/core-rate-limit.service';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { CoreRateLimitTier } from '@/backend_auth/core/rate-limit/core-rate-limit.constants';
import type { CoreRateLimitedRequest } from '@/backend_auth/core/rate-limit/core-rate-limit.interfaces';

@Injectable()
export class CoreRateLimitGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly service: CoreRateLimitService) {}

  /** @description Enforces the route's declared rate-limit tier. @param context - Nest request context. @returns True when allowed. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tier = this.reflector.getAllAndOverride<CoreRateLimitTier>(CORE_RATE_LIMIT_TIER, [context.getHandler(), context.getClass()]);
    if (!tier) return true;
    const request = context.switchToHttp().getRequest<CoreRateLimitedRequest>();
    await this.service.assertAllowed(tier, request.user?.sub ?? request.ip ?? 'unknown-client');
    return true;
  }
}
