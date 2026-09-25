// RESPONSIBILITY: Wraps mutating HTTP handlers in the trusted tenant UnitOfWork transaction boundary.
// FLOW: Tenant context -> mutation request -> UnitOfWork/TypeORM transaction -> controller/service -> commit/rollback.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';
import { from, Observable } from 'rxjs';

import { AdminCoreMasterUnitOfWorkService } from '@/backend_admin/admin_core/admin_core_database/admin-core-master-unit-of-work.service'
import { AdminCoreTenantUnitOfWorkService } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-unit-of-work.service'

@Injectable()
/**
 * @description Defines the AdminCoreTransactionInterceptor boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreTransactionInterceptor implements NestInterceptor {
  constructor(private readonly unitOfWork: AdminCoreTenantUnitOfWorkService, private readonly masterUnitOfWork: AdminCoreMasterUnitOfWorkService) {}

  /** @description Wraps state-changing tenant requests in a database transaction. @param context Nest execution context. @param next Next request handler. @returns Observable of the handler result. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const method = String(request.method ?? 'GET').toUpperCase();
    const path = String(request.url ?? '');
    if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) || this.isPublic(path)) return next.handle();
    if (this.isMasterMutation(path)) return from(this.masterUnitOfWork.run(() => firstValueFrom(next.handle())));
    return from(this.unitOfWork.run(() => firstValueFrom(next.handle())));
  }

  /** @description Identifies platform/master-database mutations that must share one master transaction with their audit record. @param path Request URL path. @returns True for master mutations. */
  private isMasterMutation(path: string): boolean {
    const normalized = path.replace(/^\/api\/v1/, '');
    return normalized.startsWith('/admin/subscriptions/') || normalized === '/admin/usage/upgrade-request' || normalized === '/admin/profile/updatePassword';
  }

  /** @description Identifies public/runtime endpoints that do not belong in tenant transactions. @param path Request URL path. @returns True for non-tenant public paths. */
  private isPublic(path: string): boolean {
    const normalized = path.replace(/^\/api\/v1/, '');
    return normalized === '/health/live' || normalized === '/health/ready' || normalized.startsWith('/metrics') || normalized === '/auth/login' || normalized === '/auth/refresh' || normalized.startsWith('/superadmin/');
  }
}
