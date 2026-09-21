// RESPONSIBILITY: Authenticates Bearer access tokens at the controller boundary and attaches the verified actor to the request.
// FLOW: HTTP Authorization header â†’ JWT verification â†’ request.user â†’ tenant authorization.

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

type CoreJwtPayload = { sub: string; tenantId: string; role: string };

@Injectable()
export class CoreJwtAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | undefined>; user?: CoreJwtPayload }>();
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) throw new UnauthorizedException('Authentication required.');
    const token = header.slice('Bearer '.length).trim();
    try {
      const payload = jwt.verify(token, this.config.getOrThrow<string>('JWT_ACCESS_SECRET')) as CoreJwtPayload;
      if (!payload.sub || !payload.tenantId || !payload.role) throw new UnauthorizedException('Invalid access token.');
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token.');
    }
  }
}
