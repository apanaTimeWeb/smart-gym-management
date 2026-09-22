// RESPONSIBILITY: Authenticates access tokens at the HTTP boundary and enriches the AsyncLocalStorage actor context.
// FLOW: Request → CoreAuthGuard → JWT verification → CoreRequestContext user/role.


import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CORE_PUBLIC_KEY } from '@/backend_trainer/core/security/core-public.decorator';
import type { CoreAuthUser } from '@/backend_trainer/core/types/core-auth.types';

@Injectable()
export class CoreAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwt: JwtService) {}
  /** Verifies a bearer token and stores the actor identity for downstream guards. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.getAllAndOverride<boolean>(CORE_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.header('authorization') ?? '';
    if (!header.startsWith('Bearer ')) throw new UnauthorizedException('AUTH.BEARER.TOKEN_REQUIRED');
    try {
      const payload = await this.jwt.verifyAsync<CoreAuthUser>(header.slice(7));
      CoreRequestContext.get().userId = payload.userId;
      CoreRequestContext.get().role = payload.role;
      return true;
    } catch {
      throw new UnauthorizedException('AUTH.BEARER.TOKEN_INVALID');
    }
  }
}
