// RESPONSIBILITY: Creates per-request correlation context before authentication or business processing.
// FLOW: Incoming request -> trace context -> AsyncLocalStorage -> guards/controllers/services/repositories.

import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { trace } from '@opentelemetry/api';

import { CoreRequestContextService } from '@/backend_auth/core/context/core-request-context';

import type { NestMiddleware } from '@nestjs/common';

import type { NextFunction, Request, Response } from 'express';
@Injectable()
export class CoreRequestContextMiddleware implements NestMiddleware {
  constructor(private readonly requestContext: CoreRequestContextService) {}

  /** @description Creates request, trace, span and client-IP context without storing request bodies or credentials. @param request - Incoming HTTP request. @param response - HTTP response. @param next - Next middleware callback. @returns void. */
  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = randomUUID();
    const activeSpanContext = trace.getActiveSpan()?.spanContext();
    const traceId = activeSpanContext?.traceId ?? randomUUID().replaceAll('-', '');
    const spanId = activeSpanContext?.spanId ?? randomUUID().replaceAll('-', '').slice(0, 16);
    const ipAddress = request.ip ?? null;
    request.headers['x-request-id'] = requestId;
    request.headers['x-trace-id'] = traceId;
    request.headers['x-span-id'] = spanId;
    response.setHeader('x-request-id', requestId);
    this.requestContext.run({ requestId, traceId, spanId, ipAddress }, next);
  }
}
