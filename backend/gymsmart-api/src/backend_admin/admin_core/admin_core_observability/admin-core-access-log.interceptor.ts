// RESPONSIBILITY: Emits privacy-safe structured HTTP access logs with route templates and request correlation metadata.
// FLOW: Completed HTTP handler -> route metadata -> AsyncLocalStorage context -> nestjs-pino structured access log.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';

/**
 * @description Logs only low-cardinality request metadata after a response completes; request and response bodies are never recorded.
 * @param logger Canonical nestjs-pino logger.
 * @param contextService Trusted AsyncLocalStorage context provider.
 */
@Injectable()
/**
 * @description Defines the AdminCoreAccessLogInterceptor boundary for the admin_core_observability backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreAccessLogInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger, private readonly contextService: AdminCoreRequestContextService) {}

  /**
   * @description Records the required structured access-log fields without leaking raw URLs, credentials, or payloads.
   * @param executionContext Nest execution context.
   * @param next Next handler in the pipeline.
   * @returns Observable of the downstream handler result.
   */
  intercept(executionContext: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = executionContext.switchToHttp().getRequest<{ method?: string; route?: { path?: string }; baseUrl?: string; path?: string }>();
    const response = executionContext.switchToHttp().getResponse<{ statusCode?: number }>();
    const startedAt = Date.now();
    return next.handle().pipe(finalize(() => {
      const current = this.contextService.tryGet();
      const routePath = request.route?.path ? `${request.baseUrl ?? ''}${request.route.path}` : request.path ?? 'unknown';
      this.logger.info({
        method: request.method ?? 'UNKNOWN',
        route: routePath,
        statusCode: response.statusCode ?? 0,
        requestId: current?.requestId ?? 'unknown',
        tenantId: current?.tenantId ?? null,
        traceId: current?.traceId ?? null,
        spanId: current?.spanId ?? null,
        context: executionContext.getClass().name,
        responseTime: Date.now() - startedAt,
      }, 'HTTP access');
    }));
  }
}
