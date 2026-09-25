// RESPONSIBILITY: Establishes trusted tenant context after JWT authentication and master-DB authorization.
// FLOW: HTTP request â†’ JWT actor/tenant â†’ master authorization â†’ AsyncLocalStorage â†’ feature repository.

import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { randomUUID } from 'node:crypto';
import { CoreRequestContextService } from '@/backend_admin/core/context/core-request-context.service';
import { CoreMasterTenantLookupService } from '@/backend_admin/core/tenant/core-master-tenant-lookup.service';

@Injectable()
export class CoreTenantContextInterceptor implements NestInterceptor {
  constructor(
    private readonly contextService: CoreRequestContextService,
    private readonly tenantLookup: CoreMasterTenantLookupService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const rawPath = String(request.url ?? '');
    const path = rawPath.replace(/^\/api\/v1/, '');
    if (path.startsWith('/health') || path.startsWith('/metrics') || path.includes('/auth/login') || path.includes('/auth/refresh') || path.includes('/auth/exit-ghost-login') || path.includes('/auth/set-cookie') || path.startsWith('/superadmin') || path.startsWith('/api/superadmin') || path.startsWith('/api/gyms')) {
      return next.handle();
    }

    const user = request.user as { tenantId?: string; sub?: string; role?: string } | undefined;
    const headers = request.headers as Record<string, unknown> | undefined;
    const suppliedTenantId = headers?.['x-tenant-id'];
    if (!user?.tenantId || !user.sub) throw new ForbiddenException('Trusted tenant context is missing.');
    if (typeof suppliedTenantId === 'string' && suppliedTenantId !== user.tenantId) {
      throw new ForbiddenException('Tenant header does not match the authenticated tenant.');
    }

    return from(this.tenantLookup.isUserAuthorizedForTenant(user.sub, user.tenantId)).pipe(
      mergeMap((authorized) => {
        if (!authorized) return throwError(() => new ForbiddenException('Actor is not authorized for this tenant.'));
        return new Observable<unknown>((subscriber) => {
          const contextValue = {
            tenantId: user.tenantId as string,
            userId: user.sub as string,
            userRole: user.role ?? 'ADMIN',
            requestId: randomUUID(),
            traceId: randomUUID(),
            spanId: randomUUID(),
          };
          this.contextService.run(contextValue, () => {
            next.handle().pipe(
              catchError((error: unknown) => throwError(() => error)),
            ).subscribe({
              next: (value) => subscriber.next(value),
              error: (error: unknown) => subscriber.error(error),
              complete: () => subscriber.complete(),
            });
          });
        });
      }),
    );
  }
}
