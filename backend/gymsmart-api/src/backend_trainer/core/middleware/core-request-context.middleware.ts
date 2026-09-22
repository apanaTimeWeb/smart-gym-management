// RESPONSIBILITY: Creates request-scoped identity context while preserving tracing and actor metadata.
// FLOW: Incoming HTTP request → existing trace context → requestId/IP → CoreRequestContext.

import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';

@Injectable()
export class CoreRequestContextMiddleware implements NestMiddleware {
  /** Adds request ID and client IP without discarding the tracing context created upstream. */
  use(request: Request, _response: Response, next: NextFunction): void {
    const current = CoreRequestContext.getOptional();
    CoreRequestContext.run({
      requestId: request.header('x-request-id') ?? current?.requestId ?? randomUUID(),
      traceId: current?.traceId ?? request.header('x-trace-id') ?? randomUUID(),
      spanId: current?.spanId ?? request.header('x-span-id') ?? randomUUID(),
      userId: current?.userId,
      role: current?.role,
      tenantId: current?.tenantId,
      ipAddress: request.ip,
    }, next);
  }
}
