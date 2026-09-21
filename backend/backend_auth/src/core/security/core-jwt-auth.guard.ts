// RESPONSIBILITY: Verifies bearer access JWTs and stores typed actor context without owning business authorization.
// FLOW: HTTP Authorization -> JWT verify -> CoreJwtAuthGuard -> CoreRequestContextService -> controller.

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';

import { CoreErrorConstants } from '@/core/constants/core-error.constants';
import { CoreRequestContextService } from '@/core/context/core-request-context';
import { CORE_PUBLIC_ROUTE } from '@/core/security/core-public.decorator';

import type { CoreAuthenticatedRequest } from '@/core/security/core-security.interfaces';
import type { CoreJwtClaims } from '@/core/security/core-jwt-claims';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CoreJwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly requestContext: CoreRequestContextService,
  ) {}

  /** @description Verifies the access JWT on protected routes. @param context - Nest execution context. @returns Whether the request may continue. @throws UnauthorizedException for missing/invalid bearer credentials. */
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(CORE_PUBLIC_ROUTE, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<CoreAuthenticatedRequest>();
    const token = this.extractBearerToken(request.headers.authorization);
    if (!token) throw new UnauthorizedException(CoreErrorConstants.MESSAGE.AUTHENTICATION_REQUIRED);

    const claims = this.verify(token);
    request.user = claims;
    this.requestContext.setUserId(claims.sub);
    if (claims.tenantId) this.requestContext.setTenantId(claims.tenantId);
    return true;
  }

  /** @description Extracts a bearer token from an Authorization header. @param authorization - Raw Authorization header. @returns Bearer token or null. */
  private extractBearerToken(authorization?: string): string | null {
    if (!authorization?.startsWith('Bearer ')) return null;
    return authorization.slice(7).trim() || null;
  }

  /** @description Verifies an access token using the configured signing secret. @param token - Bearer token without the scheme. @returns Verified JWT claims. @throws UnauthorizedException when verification fails. */
  private verify(token: string): CoreJwtClaims {
    try {
      const payload = jwt.verify(token, this.configService.getOrThrow<string>('environment.JWT_ACCESS_SECRET')) as Record<string, unknown>;
      if (typeof payload['sub'] !== 'string' || typeof payload['sid'] !== 'string' || typeof payload['email'] !== 'string' || typeof payload['role'] !== 'string') {
        throw new Error('Invalid access claims');
      }
      if (payload['tenantId'] !== undefined && typeof payload['tenantId'] !== 'string') throw new Error('Invalid tenant claim');
      return payload as unknown as CoreJwtClaims;
    } catch {
      throw new UnauthorizedException(CoreErrorConstants.MESSAGE.INVALID_ACCESS_TOKEN);
    }
  }
}
