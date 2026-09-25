// RESPONSIBILITY: Initializes request-scoped AsyncLocalStorage context at the HTTP boundary.
// FLOW: HTTP request -> identifiers -> AsyncLocalStorage -> downstream pipeline.
import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { requestContextStorage } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import type { SuperadminAuthenticatedUser } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.types';
/**
 * Primary Intent: Defines SuperadminCoreRequestContextMiddleware as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreRequestContextMiddleware implements NestMiddleware {
  /**
 * Primary Intent: Executes the use use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  use(request: Request & { user?: SuperadminAuthenticatedUser }, _response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id') ?? randomUUID();
    const traceId = request.header('x-trace-id') ?? randomUUID();
    const spanId = request.header('x-span-id') ?? randomUUID();
    const forwardedFor = request.header('x-forwarded-for')?.split(',')[0]?.trim();
    const ipAddress = forwardedFor || request.ip || 'unknown';
    requestContextStorage.run({ requestId, traceId, spanId, userId: request.user?.userId ?? null, userRole: request.user?.role ?? null, tenantId: request.user?.tenantId ?? request.header('x-tenant-id') ?? null, ipAddress }, next);
  }
}
