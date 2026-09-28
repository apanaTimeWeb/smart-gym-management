// RESPONSIBILITY: Creates the request-scoped identity context before global authentication and tenant guards execute.
// FLOW: Incoming HTTP request → request metadata → AsyncLocalStorage scope → auth/tenant guards.

import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';


/**
 * Intent: Defines the CoreRequestContextMiddleware boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreRequestContextMiddleware implements NestMiddleware {
  /** Starts the request-scoped AsyncLocalStorage store and preserves inbound tracing IDs when supplied. */
  use(request: Request, _response: Response, next: NextFunction): void {
    CoreRequestContext.run(
      {
        requestId: request.header('x-request-id') ?? randomUUID(),
        traceId: request.header('x-trace-id') ?? randomUUID(),
        spanId: request.header('x-span-id') ?? randomUUID(),
        ipAddress: request.ip,
      },
      next,
    );
  }
}
