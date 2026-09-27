// RESPONSIBILITY: Owns backend core NestJS request/response cross-cutting infrastructure.
// FLOW: Request lifecycle → cross-cutting policy → downstream handler → transformed lifecycle result.
import { BadRequestException, CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { Reflector } from '@nestjs/core';
import { catchError, from, switchMap, throwError } from 'rxjs';

import type { Observable } from 'rxjs';

import { ManagerCoreIdempotencyService } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-idempotency.service';
import { MANAGER_CORE_REQUIRE_IDEMPOTENCY_KEY } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import type { Request } from 'express';

@Injectable()
export class ManagerCoreIdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly idempotency: ManagerCoreIdempotencyService, private readonly reflector: Reflector) {}

  /** @description Applies scoped idempotency reservation/replay to protected mutations. @param context - HTTP context. @param next - Next handler. @returns Observable result. @throws BadRequestException when the protected key is missing. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.route?.path ?? request.path;
    if (!this.isCritical(request.method, path)) return next.handle();
    const explicitlyRequired = this.reflector.getAllAndOverride<boolean>(MANAGER_CORE_REQUIRE_IDEMPOTENCY_KEY, [context.getHandler(), context.getClass()]);
    const mutationMethod = this.isMutationMethod(request.method);
    if (!explicitlyRequired && !mutationMethod) return next.handle();
    const key = request.header('Idempotency-Key');
    if (!key) throw new BadRequestException({ errorCode: 'VALIDATION.IDEMPOTENCY.KEY_REQUIRED', message: 'Idempotency-Key header is required.' });
    const scope = `${request.method.toUpperCase()} ${path}`;
    const fingerprint = this.requestFingerprint(request.body as unknown);
    return from(this.idempotency.reserveOrReplay(key, scope, fingerprint)).pipe(
      switchMap((cached: string | null) => cached ? from([JSON.parse(cached) as unknown]) : next.handle().pipe(
        switchMap((result: unknown) => from(this.idempotency.store(key, scope, fingerprint, JSON.stringify(result))).pipe(switchMap(() => from([result])))),
        catchError((error: unknown) => from(this.idempotency.release(key, scope)).pipe(switchMap(() => throwError(() => error))))
      ))
    );
  }

  /** @description Produces a deterministic request fingerprint so one Idempotency-Key cannot be replayed with a different body. @param value - Raw request body. @returns SHA-256 fingerprint. @throws ConflictException when canonicalization fails. */
  private requestFingerprint(value: unknown): string {
    try {
      return createHash('sha256').update(this.stableStringify(value)).digest('hex');
    } catch {
      throw new ConflictException({ errorCode: 'CORE.IDEMPOTENCY.FINGERPRINT_FAILED', message: 'The request could not be fingerprinted safely.' });
    }
  }

  /** @description Canonicalizes JSON-compatible values with deterministic key ordering. @param value - JSON-compatible value. @returns Canonical JSON string. */
  private stableStringify(value: unknown): string {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map((item) => this.stableStringify(item)).join(',')}]`;
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${this.stableStringify(record[key])}`).join(',')}}`;
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
