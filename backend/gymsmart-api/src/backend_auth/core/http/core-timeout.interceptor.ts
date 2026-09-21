// RESPONSIBILITY: Enforces endpoint-declared synchronous SLA limits and converts overruns into canonical timeout exceptions.
// FLOW: HTTP request -> CoreSla metadata -> CoreTimeoutInterceptor -> controller/service -> response or timeout.

import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';

import { TIMEOUT_CONFIG } from '@/backend_auth/core/config/timeout.config';
import { CoreErrorConstants } from '@/backend_auth/core/constants/core-error.constants';
import { CoreSlaCategory, CORE_SLA_CATEGORY } from '@/backend_auth/core/http/core-sla.decorator';

import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
@Injectable()
export class CoreTimeoutInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  /** @description Enforces the endpoint's declared synchronous SLA category. @param context - Nest execution context. @param next - Downstream handler. @returns Timed request observable. */
  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const category = this.reflector.getAllAndOverride<CoreSlaCategory>(CORE_SLA_CATEGORY, [context.getHandler(), context.getClass()]) ?? CoreSlaCategory.STANDARD;
    const timeoutMs = this.resolveTimeout(category);
    return next.handle().pipe(timeout(timeoutMs), catchError((error: unknown) => this.mapTimeout(error)));
  }

  /** @description Maps one timeout error into Nest's canonical request-timeout exception. @param error - Stream error. @returns Rethrown observable error. */
  private mapTimeout(error: unknown): Observable<never> {
    if (error instanceof Error && error.name === 'TimeoutError') return throwError(() => new RequestTimeoutException(CoreErrorConstants.MESSAGE.REQUEST_TIMEOUT));
    return throwError(() => error);
  }

  /** @description Resolves the configured timeout budget for an endpoint SLA category. @param category - SLA category. @returns Timeout in milliseconds. */
  private resolveTimeout(category: CoreSlaCategory): number {
    if (category === CoreSlaCategory.FAST) return TIMEOUT_CONFIG.HTTP_FAST_MS;
    if (category === CoreSlaCategory.HEAVY) return TIMEOUT_CONFIG.DB_QUERY_REPORT_MS;
    return TIMEOUT_CONFIG.HTTP_STANDARD_MS;
  }
}
