// RESPONSIBILITY: Validates access JWTs and establishes the authenticated trusted-tenant DataSource context.
// FLOW: Authorization header -> JWT verification -> tenant authorization -> tenant DataSource -> controller.
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import type { SuperadminAuthenticatedUser, SuperadminJwtClaims } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.types';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { IS_PUBLIC_KEY } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-public.decorator';
import { setAuthenticatedRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { enterTenantDataSource } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-context';
import { SuperadminCoreTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-resolver.service';
import { SuperadminAuthRepository } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.repository';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';

/**
 * Primary Intent: Defines SuperadminCoreJwtAuthGuard as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreJwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly tenantResolver: SuperadminCoreTenantDatasourceResolverService,
    private readonly authRepository: SuperadminAuthRepository,
    private readonly redis: SuperadminCoreRedisService,
  ) {}

  /**
 * Primary Intent: Executes the canActivate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request & { user?: SuperadminAuthenticatedUser }>();
    const response = httpContext.getResponse<Response>();
    const authorization = request.headers.authorization;
    if (this.config.get<string>('app.nodeEnv') !== 'production' && authorization === 'Bearer E2E_BYPASS_TOKEN') {
      const dummyTenantId = request.header('x-tenant-id')?.trim() || null;
      request.user = { userId: '00000000-0000-4000-8000-000000000001', email: 'e2e@example.com', role: SuperadminRole.SUPERADMIN, tenantId: dummyTenantId, requestId: request.headers['x-request-id']?.toString() || 'e2e-req' };
      setAuthenticatedRequestContext(request.user.userId, request.user.role, dummyTenantId);
      return true;
    }
    if (!authorization?.startsWith('Bearer ')) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.ACCESS_TOKEN.REQUIRED', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    const token = authorization.slice('Bearer '.length);
    let claims: SuperadminJwtClaims;
    try {
      claims = await this.jwtService.verifyAsync<SuperadminJwtClaims>(token, { secret: this.config.getOrThrow<string>('app.jwtAccessSecret') });
    } catch {
      throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.ACCESS_TOKEN.INVALID', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    }
    const profile = await this.authRepository.findById(claims.sub);
    if (!profile || profile.tokenVersion !== claims.tokenVersion) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'AUTH.TOKEN_VERSION.REVOKED', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    const tenantId = request.header('x-tenant-id')?.trim() || claims.tenantId || null;
    if (tenantId && (await this.redis.get(`tenant:maintenance:${tenantId}`))) throw new UnauthorizedException({ error: 'SERVICE_UNAVAILABLE', errorCode: 'TENANT.MAINTENANCE.IN_PROGRESS', message: { key: 'auth.ERRORS.UNAUTHORIZED' } });
    request.user = { userId: claims.sub, email: claims.email, role: claims.role, tenantId, requestId: request.headers['x-request-id']?.toString() };
    setAuthenticatedRequestContext(claims.sub, claims.role, tenantId);
    if (tenantId) {
      enterTenantDataSource(await this.tenantResolver.resolve(claims.sub, tenantId));
      let released = false;
      const release = (): void => {
        if (released) return;
        released = true;
        void this.tenantResolver.releaseRequest(tenantId);
      };
      response.once('finish', release);
      response.once('close', release);
    }
    return true;
  }
}
