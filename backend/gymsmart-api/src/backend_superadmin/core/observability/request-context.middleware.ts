// RESPONSIBILITY: Initializes request-scoped AsyncLocalStorage context at the HTTP boundary.
// FLOW: HTTP request -> identifiers -> AsyncLocalStorage -> downstream pipeline.
import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { requestContextStorage } from '@/backend_superadmin/core/observability/request-context';
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  /** Creates request, trace, and span ids and preserves them through async work. */
  use(request: Request & { user?: { userId: string; tenantId: string | null } }, _response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id') ?? randomUUID();
    const traceId = request.header('x-trace-id') ?? randomUUID();
    const spanId = request.header('x-span-id') ?? randomUUID();
    requestContextStorage.run({ requestId, traceId, spanId, userId: request.user?.userId ?? null, tenantId: request.user?.tenantId ?? request.header('x-tenant-id') ?? null }, next);
  }
}
