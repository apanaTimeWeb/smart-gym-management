// RESPONSIBILITY: Owns backend core NestJS request/response cross-cutting infrastructure.
// FLOW: Request lifecycle → cross-cutting policy → downstream handler → transformed lifecycle result.
import {  BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor,    } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, from, switchMap, throwError } from 'rxjs';

import type { Observable } from 'rxjs';

import { CoreIdempotencyService } from '@/backend_manager/core/idempotency/core-idempotency.service';
import { CORE_REQUIRE_IDEMPOTENCY_KEY } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import type { Request } from 'express';

@Injectable()
export class CoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly idempotency: CoreIdempotencyService, private readonly reflector: Reflector) {}

  /** @description Applies scoped idempotency reservation/replay to protected mutations. @param context - HTTP context. @param next - Next handler. @returns Observable result. @throws BadRequestException when the protected key is missing. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.route?.path ?? request.path;
    if (!this.isCritical(request.method, path)) return next.handle();
    const explicitlyRequired = this.reflector.getAllAndOverride<boolean>(CORE_REQUIRE_IDEMPOTENCY_KEY, [context.getHandler(), context.getClass()]);
    const mutationMethod = this.isMutationMethod(request.method);
    if (!explicitlyRequired && !mutationMethod) return next.handle();
    const key = request.header('Idempotency-Key');
    if (!key) throw new BadRequestException({ errorCode: 'VALIDATION.IDEMPOTENCY.KEY_REQUIRED', message: 'Idempotency-Key header is required.' });
    const scope = `${request.method.toUpperCase()} ${path}`;
    return from(this.idempotency.reserveOrReplay(key, scope)).pipe(
      switchMap((cached: string | null) => cached ? from([JSON.parse(cached) as unknown]) : next.handle().pipe(
        switchMap((result: unknown) => from(this.idempotency.store(key, scope, JSON.stringify(result))).pipe(switchMap(() => from([result])))),
        catchError((error: unknown) => from(this.idempotency.release(key, scope)).pipe(switchMap(() => throwError(() => error))))
      ))
    );
  }

  /** @description Determines whether a route requires an idempotency key. @param method - HTTP method. @param path - Route template. @returns True for protected mutations. */
  private isCritical(method: string, path: string): boolean { void path; return this.isMutationMethod(method); }

  /**
   * @description Identifies HTTP methods that can mutate application state.
   * @param method - HTTP method name.
   * @returns True for POST, PATCH, PUT and DELETE.
   */
  private isMutationMethod(method: string): boolean { return ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method.toUpperCase()); }
}
