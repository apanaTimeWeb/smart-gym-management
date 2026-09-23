// RESPONSIBILITY: Validates access JWTs and establishes the authenticated trusted-tenant DataSource context.
// FLOW: Authorization header -> JWT verification -> tenant authorization -> tenant DataSource -> controller.
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SuperadminAuthenticatedUser, SuperadminJwtClaims } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { IS_PUBLIC_KEY } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-public.decorator';
import { setAuthenticatedRequestContext } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-request-context';
import { enterTenantDataSource } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-datasource-context';
import { SuperadminTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-datasource-resolver.service';

@Injectable()
export class SuperadminJwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly tenantResolver: SuperadminTenantDatasourceResolverService,
  ) {}

  /** Verifies the access token and establishes an authorized tenant DataSource when a tenant context is requested. */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request & { user?: SuperadminAuthenticatedUser }>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.ACCESS_TOKEN.REQUIRED', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    const token = authorization.slice('Bearer '.length);
    let claims: SuperadminJwtClaims;
    try {
      claims = await this.jwtService.verifyAsync<SuperadminJwtClaims>(token, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret') });
    } catch {
      throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.ACCESS_TOKEN.INVALID', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    }
    const tenantId = request.header('x-tenant-id')?.trim() || claims.tenantId || null;
    request.user = { userId: claims.sub, email: claims.email, role: claims.role, tenantId, requestId: request.headers['x-request-id']?.toString() };
    setAuthenticatedRequestContext(claims.sub, claims.role, tenantId);
    if (tenantId) enterTenantDataSource(await this.tenantResolver.resolve(claims.sub, tenantId));
    return true;
  }
}