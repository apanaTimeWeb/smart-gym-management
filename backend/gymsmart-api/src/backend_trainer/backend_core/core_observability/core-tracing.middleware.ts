// RESPONSIBILITY: Creates one OpenTelemetry span per HTTP request and propagates trace/span identifiers through AsyncLocalStorage.
// FLOW: HTTP request → OpenTelemetry span → CoreRequestContext → controller/service/repository → span completion.

import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { context, trace } from '@opentelemetry/api';
import type { Request, Response, NextFunction } from 'express';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';


/**
 * Intent: Defines the CoreTracingMiddleware boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreTracingMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const tracer = trace.getTracer('trainer-backend');
    const span = tracer.startSpan(`${request.method} ${request.path}`);
    const spanContext = span.spanContext();
    const requestId = request.header('x-request-id') ?? randomUUID();
    const current = CoreRequestContext.getOptional();
    CoreRequestContext.run(
      {
        requestId: current?.requestId ?? requestId,
        tenantId: current?.tenantId,
        userId: current?.userId,
        role: current?.role,
        traceId: spanContext.traceId,
        spanId: spanContext.spanId,
        ipAddress: current?.ipAddress ?? request.ip,
      },
      () => context.with(trace.setSpan(context.active(), span), next),
    );
    response.once('finish', () => {
      span.setAttribute('http.method', request.method);
      span.setAttribute('http.route', request.route?.path ?? request.path);
      span.setAttribute('http.status_code', response.statusCode);
      span.end();
    });
  }
}
