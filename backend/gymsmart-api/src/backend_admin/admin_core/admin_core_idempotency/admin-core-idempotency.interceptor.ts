// RESPONSIBILITY: Enforces Rule 112 on all state-mutating HTTP endpoints and replays canonical responses safely.
// FLOW: Mutation request -> Idempotency-Key -> fingerprint -> AdminCoreIdempotencyService -> controller -> canonical envelope.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { firstValueFrom, from, Observable } from 'rxjs';

import { AdminCoreIdempotencyService } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-idempotency.service.js';
import { CORE_REQUIRE_IDEMPOTENCY_KEY } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';

@Injectable()
/**
 * @description Defines the AdminCoreIdempotencyInterceptor boundary for the admin_core_idempotency backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly idempotency: AdminCoreIdempotencyService, private readonly reflector: Reflector) {}

  /**
   * @description Applies the declared idempotency contract to every POST/PATCH/PUT/DELETE endpoint, including authentication token issuance and rotation.
   * @param context NestJS execution context.
   * @param next Next handler in the interceptor chain.
   * @returns The first execution result or an exact cached replay.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{ method?: string; path?: string; headers?: Record<string, string | undefined>; body?: unknown }>();
    const method = String(request.method ?? '').toUpperCase();
    if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) return next.handle();

    const path = String((request as any).url ?? (request as any).path ?? '');
    if (path.startsWith('/superadmin/')) return next.handle();
    const required = this.reflector.getAllAndOverride<boolean>(CORE_REQUIRE_IDEMPOTENCY_KEY, [context.getHandler(), context.getClass()]);
    if (!required) throw new Error('CORE.IDEMPOTENCY.DECORATOR_REQUIRED');

    const scope = `${method}:${path}`;
    return from(this.idempotency.executeOnce(
      request.headers?.['idempotency-key'],
      () => firstValueFrom(next.handle()),
      scope,
      request.body ?? null,
    ));
  }
}
