// RESPONSIBILITY: Establishes trusted tenant context after JWT authentication and master-DB authorization.
// FLOW: HTTP request â†’ JWT actor/tenant â†’ master authorization â†’ AsyncLocalStorage â†’ feature repository.
import { randomUUID } from 'node:crypto';

import { context as otelContext, trace as otelTrace } from '@opentelemetry/api';

import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable, from, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreMasterTenantLookupService } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-lookup.service'

@Injectable()
/**
 * @description Defines the AdminCoreTenantContextInterceptor boundary for the admin_core_context backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreTenantContextInterceptor implements NestInterceptor {
  constructor(
    private readonly contextService: AdminCoreRequestContextService,
    private readonly tenantLookup: AdminCoreMasterTenantLookupService,
    private readonly tenantDataSourceManager: AdminCoreTenantDataSourceManager,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const rawPath = String(request.url ?? '');
    const path = rawPath;
    if (path === '/health/live' || path === '/health/ready' || path.startsWith('/metrics') || path.startsWith('/auth/') || path.startsWith('/superadmin/')) {
      return next.handle();
    }

    const user = request.user as { tenantId?: string; sub?: string; role?: string } | undefined;
    const headers = request.headers as Record<string, unknown> | undefined;
    const suppliedTenantId = headers?.['x-tenant-id'];
    if (!user?.tenantId || !user.sub) throw new ForbiddenException({ message: 'Trusted tenant context is missing.', errorCode: 'CORE.CORE.FORBIDDEN' });
    if (typeof suppliedTenantId === 'string' && suppliedTenantId !== user.tenantId) {
      throw new ForbiddenException({ message: 'Tenant header does not match the authenticated tenant.', errorCode: 'CORE.CORE.FORBIDDEN' });
    }

    return from(this.tenantLookup.isUserAuthorizedForTenant(user.sub, user.tenantId)).pipe(
      mergeMap((authorized) => {
        if (!authorized) return throwError(() => new ForbiddenException({ message: 'Actor is not authorized for this tenant.', errorCode: 'CORE.CORE.FORBIDDEN' }));
        return new Observable<unknown>((subscriber) => {
          const contextValue = {
            tenantId: user.tenantId as string,
            userId: user.sub as string,
            userRole: user.role ?? 'ADMIN',
            requestId: typeof headers?.['x-request-id'] === 'string' ? headers['x-request-id'] : randomUUID(),
            traceId: otelTrace.getSpan(otelContext.active())?.spanContext().traceId ?? randomUUID(),
            spanId: otelTrace.getSpan(otelContext.active())?.spanContext().spanId ?? randomUUID(),
            ipAddress: typeof request.ip === 'string' ? request.ip : null,
            userAgent: headers && typeof headers['user-agent'] === 'string' ? headers['user-agent'] : null,
          };
          this.contextService.run(contextValue, () => {
            next.handle().pipe(
              catchError((error: unknown) => throwError(() => error)),
            ).subscribe({
              next: (value) => subscriber.next(value),
              error: (error: unknown) => { this.tenantDataSourceManager.releaseCurrent(); subscriber.error(error); },
              complete: () => { this.tenantDataSourceManager.releaseCurrent(); subscriber.complete(); },
            });
          });
        });
      }),
    );
  }
}
