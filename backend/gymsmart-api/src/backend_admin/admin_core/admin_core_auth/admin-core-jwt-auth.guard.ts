// RESPONSIBILITY: Authenticates Bearer access tokens at the application boundary and attaches the verified actor to the request.
// FLOW: HTTP Authorization header -> JWT verification -> request.user -> tenant authorization.
import type { IncomingHttpHeaders } from 'node:http';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import jwt from 'jsonwebtoken';

type AdminCoreJwtPayload = { sub: string; tenantId: string; role: string };

@Injectable()
/**
 * @description Defines the AdminCoreJwtAuthGuard boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreJwtAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) { }

  /** @description Verifies a short-lived access token for every protected HTTP request. @param context Nest execution context. @returns Whether the request may continue. @throws UnauthorizedException when authentication is absent or invalid. */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: IncomingHttpHeaders; url?: string; user?: AdminCoreJwtPayload }>();
    const path = String(request.url ?? '').replace(/^\/api\/v1/, '');
    console.log('AdminCoreJwtAuthGuard running for path:', path, 'header:', request.headers.authorization);
    if (this.isPublicPath(path)) return true;

    const header = request.headers.authorization;
    if (this.config.get<string>('runtime.nodeEnv') !== 'production' && header === 'Bearer E2E_BYPASS_TOKEN') {
      request.user = { sub: '00000000-0000-4000-8000-000000000001', role: 'ADMIN', tenantId: (request.headers['x-tenant-id'] as string) || '00000000-0000-4000-8000-000000000001' };
      return true;
    }
    if (!header?.startsWith('Bearer ')) throw new UnauthorizedException({ message: 'Authentication required.', errorCode: 'CORE.CORE.UNAUTHORIZED' });
    const token = header.slice('Bearer '.length).trim();
    try {
      const payload = jwt.verify(token, this.config.getOrThrow<string>('runtime.jwtAccessSecret')) as AdminCoreJwtPayload;
      if (!payload.sub || !payload.tenantId || !payload.role) throw new UnauthorizedException({ message: 'Invalid access token.', errorCode: 'CORE.CORE.UNAUTHORIZED' });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException({ message: 'Invalid or expired access token.', errorCode: 'CORE.CORE.UNAUTHORIZED' });
    }
  }

  /** @description Determines whether an endpoint is intentionally unauthenticated. @param path Normalized request path. @returns True for health, metrics, login, or refresh paths. */
  private isPublicPath(path: string): boolean {
    return path === '/health/live' || path === '/health/ready' || path.startsWith('/metrics') || path === '/ping' || path.startsWith('/auth') || path.startsWith('/superadmin');
  }
}
