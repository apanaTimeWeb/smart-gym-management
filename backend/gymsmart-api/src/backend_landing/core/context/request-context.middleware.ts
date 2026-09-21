// RESPONSIBILITY: Establishes request-scoped correlation and trace context at the HTTP boundary.
// FLOW: Incoming HTTP request -> RequestContextService.run -> downstream middleware/controllers.
import { randomUUID } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { trace } from '@opentelemetry/api';
import { RequestContextService } from '@/backend_landing/core/context/request-context.service';

/** @description Establishes request correlation state before downstream execution. */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly service: RequestContextService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id') ?? randomUUID();
    const spanContext = trace.getActiveSpan()?.spanContext();

    this.service.run(
      {
        requestId,
        traceId: spanContext?.traceId ?? '00000000000000000000000000000000',
        spanId: spanContext?.spanId ?? '0000000000000000',
        userId: null,
        tenantId: null,
        ipAddress: null,
      },
      () => {
        response.setHeader('x-request-id', requestId);
        next();
      },
    );
  }
}
