// RESPONSIBILITY: Owns backend core request-context middleware.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { randomUUID } from 'node:crypto';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';

import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class CoreRequestContextMiddleware implements NestMiddleware {
  constructor(private readonly context: CoreRequestContextService) {}

  /**
   * @description Creates the per-request correlation context required by logs, tenant selection, and tracing.
   * @param _request - Incoming HTTP request.
   * @param _response - HTTP response.
   * @param next - Next middleware.
   * @returns Nothing; execution continues through the callback context.
   */
  use(request: Request, _response: Response, next: NextFunction): void {
    const requestId = randomUUID();
    this.context.run({ requestId, traceId: requestId, spanId: randomUUID(), ipAddress: request.ip }, next);
  }
}
