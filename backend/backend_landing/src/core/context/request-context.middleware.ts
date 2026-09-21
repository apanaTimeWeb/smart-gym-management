// RESPONSIBILITY: Establishes request-scoped correlation and trace context at the HTTP boundary.
// FLOW: Incoming HTTP request → RequestContextService.run → downstream middleware/controllers.
import { randomUUID } from 'node:crypto';

import { NextFunction, Request, Response } from 'express';

import { trace } from '@opentelemetry/api';

import { RequestContextService } from '@/core/context/request-context.service';


/** @description Establishes request correlation state before downstream execution. @param request - Express request. @param response - Express response. @param next - Downstream callback. @returns Nothing. */
export const RequestContextMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const service = request.app.get(RequestContextService);
  const requestId = request.header('x-request-id') ?? randomUUID();
  const spanContext = trace.getActiveSpan()?.spanContext();
  const context = {
    requestId,
    traceId: spanContext?.traceId ?? randomUUID(),
    spanId: spanContext?.spanId ?? randomUUID(),
    tenantId: null,
    userId: null,
    ipAddress: request.ip ?? null,
  };
  response.setHeader('x-request-id', requestId);
  service.run(context, () => next());
};
