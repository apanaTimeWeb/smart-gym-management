// RESPONSIBILITY: Enforces/replays Redis-backed Idempotency-Key behavior for critical Manager mutations.
// FLOW: Mutation request -> route scope + key -> Redis reservation/replay -> controller -> cache/release.
import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { catchError, from, type Observable, switchMap, throwError } from 'rxjs';

import { CORE_IDEMPOTENT_ROUTES } from '@/backend_manager/core/idempotency/core-idempotency.routes';
import { CoreIdempotencyService } from '@/backend_manager/core/idempotency/core-idempotency.service';

@Injectable()
export class CoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly idempotency: CoreIdempotencyService) {}

  /** @description Applies scoped idempotency reservation/replay to protected mutations. @param context - HTTP context. @param next - Next handler. @returns Observable result. @throws BadRequestException when the protected key is missing. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.route?.path ?? request.path;
    if (!this.isCritical(request.method, path)) return next.handle();
    const key = request.header('Idempotency-Key');
    if (!key) throw new BadRequestException({ errorCode: 'VALIDATION.IDEMPOTENCY.KEY_REQUIRED', message: 'Idempotency-Key header is required.' });
    const scope = `${request.method.toUpperCase()} ${path}`;
    return from(this.idempotency.reserveOrReplay(key, scope)).pipe(
      switchMap((cached) => cached ? from([JSON.parse(cached) as unknown]) : next.handle().pipe(
        switchMap((result: unknown) => from(this.idempotency.store(key, scope, JSON.stringify(result))).pipe(switchMap(() => from([result])))),
        catchError((error: unknown) => from(this.idempotency.release(key, scope)).pipe(switchMap(() => throwError(() => error))))
      ))
    );
  }

  /** @description Determines whether a route requires an idempotency key. @param method - HTTP method. @param path - Route template. @returns True for protected mutations. */
  private isCritical(method: string, path: string): boolean { return !['GET', 'HEAD'].includes(method.toUpperCase()) && CORE_IDEMPOTENT_ROUTES.some((pattern) => pattern.test(path)); }
}
