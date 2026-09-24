// RESPONSIBILITY: Enforces and replays Idempotency-Key protected mutation responses through Redis.
// FLOW: HTTP request -> handler metadata -> SuperadminCoreIdempotencyService -> controller result -> Redis replay.
import { BadRequestException, CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { IDEMPOTENCY_REQUIRED } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminCoreIdempotencyService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.service';

/**
 * Primary Intent: Defines SuperadminCoreIdempotencyInterceptor as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector, private readonly idempotency: SuperadminCoreIdempotencyService) {}

  /**
 * Primary Intent: Executes the intercept use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const required = this.reflector.getAllAndOverride<boolean>(IDEMPOTENCY_REQUIRED, [context.getHandler(), context.getClass()]);
    if (!required) return next.handle();
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | string[] | undefined>; route?: { path?: string }; method?: string }>();
    const header = request.headers['idempotency-key'];
    const rawKey = Array.isArray(header) ? header[0] : header;
    if (!rawKey?.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'IDEMPOTENCY.KEY.REQUIRED', message: { key: 'core.ERRORS.IDEMPOTENCY_REQUIRED' } });
    const contextValue = getRequestContext();
    const route = request.route?.path ?? context.getHandler().name;
    const controller = context.getClass().name;
    const method = (request as { method?: string }).method ?? 'MUTATION';
    const key = [contextValue?.tenantId ?? 'master', contextValue?.userId ?? 'anonymous', method, controller, route, rawKey.trim()].join(':');
    return from(this.idempotency.begin(key)).pipe(
      switchMap((cached: string | null) => this.resolveProtectedRequest(cached, key, next)),
    );
  }

  /**
 * Primary Intent: Executes the resolveProtectedRequest use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private resolveProtectedRequest(cached: string | null, key: string, next: CallHandler): Observable<unknown> {
    if (cached === '__IN_PROGRESS__') throw new ConflictException({ error: 'CONFLICT', errorCode: 'IDEMPOTENCY.REQUEST.IN_PROGRESS', message: { key: 'core.ERRORS.IDEMPOTENCY_IN_PROGRESS' } });
    if (cached) {
      try { return from([JSON.parse(cached)]); }
      catch { throw new ConflictException({ error: 'CONFLICT', errorCode: 'IDEMPOTENCY.RESPONSE.INVALID', message: { key: 'core.ERRORS.IDEMPOTENCY_INVALID' } }); }
    }
    return next.handle().pipe(
      switchMap((result: unknown) => from(this.idempotency.complete(key, JSON.stringify(result ?? null))).pipe(switchMap(() => from([result])))),
      catchError((error: unknown) => from(this.idempotency.release(key)).pipe(switchMap(() => throwError(() => error)))),
    );
  }
}
