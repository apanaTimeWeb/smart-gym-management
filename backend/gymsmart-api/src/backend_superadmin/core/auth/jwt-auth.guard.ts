// RESPONSIBILITY: Validates access JWTs and attaches typed claims to the request boundary.
// FLOW: Authorization header -> JWT verification -> AuthenticatedUser -> controller.
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthenticatedUser, JwtClaims } from '@/backend_superadmin/core/auth/auth.types';
import { IS_PUBLIC_KEY } from '@/backend_superadmin/core/auth/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  /** Verifies the access token and attaches the authenticated actor to the request. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request & { user?: AuthenticatedUser }>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) throw new UnauthorizedException('Access token is required');
    const token = authorization.slice('Bearer '.length);
    try {
      const claims = await this.jwtService.verifyAsync<JwtClaims>(token, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret') });
      request.user = { userId: claims.sub, email: claims.email, role: claims.role, tenantId: claims.tenantId, requestId: request.headers['x-request-id']?.toString() };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
