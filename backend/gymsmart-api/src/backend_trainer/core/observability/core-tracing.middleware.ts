// RESPONSIBILITY: Creates one OpenTelemetry span per HTTP request and propagates trace/span identifiers through AsyncLocalStorage.
// FLOW: HTTP request → OpenTelemetry span → CoreRequestContext → controller/service/repository → span completion.

import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { context, trace } from '@opentelemetry/api';
import type { Request, Response, NextFunction } from 'express';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';

@Injectable()
export class CoreTracingMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const tracer = trace.getTracer('trainer-backend');
    const span = tracer.startSpan(`${request.method} ${request.path}`);
    const spanContext = span.spanContext();
    const requestId = request.header('x-request-id') ?? randomUUID();
    CoreRequestContext.run(
      { requestId, traceId: spanContext.traceId, spanId: spanContext.spanId },
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
