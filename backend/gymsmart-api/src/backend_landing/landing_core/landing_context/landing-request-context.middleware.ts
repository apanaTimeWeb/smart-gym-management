// RESPONSIBILITY: Establishes request-scoped correlation, trace, and network context before any tenant-sensitive work executes.
// FLOW: HTTP request -> AsyncLocalStorage -> tenant resolver -> controllers/services/repositories.
import { randomUUID } from 'node:crypto';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { trace } from '@opentelemetry/api';

import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';

import type { NextFunction, Request, Response } from 'express';

/**
 * Intent: Give every request a stable correlation context and sanitized network identity for observability and audit logging.
 * Edge Cases: Proxied deployments must configure Express trust proxy correctly before relying on request.ip.
 * Side Effects: Adds x-request-id to the HTTP response and initializes AsyncLocalStorage.
 * AI Notes: Never store authorization headers, request bodies, or other secrets in this context.
 */
@Injectable()
export class LandingRequestContextMiddleware {
  
  /**
   * Intent: Preserve the single responsibility of landing-request-context.middleware.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(private readonly service: LandingRequestContextService) {}

  /**
   * @description Creates one AsyncLocalStorage request scope before tenant resolution and downstream handlers run.
   * @param request - Incoming Express request.
   * @param response - Incoming Express response.
   * @param next - Middleware continuation callback.
   * @returns Nothing; the continuation executes inside the request context.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-request-context.middleware.use at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id')?.trim() || randomUUID();
    const spanContext = trace.getActiveSpan()?.spanContext();
    const requestWithId = request as Request & { id?: string };
    requestWithId.id = requestId;
    this.service.run({
      requestId,
      traceId: spanContext?.traceId ?? '00000000000000000000000000000000',
      spanId: spanContext?.spanId ?? '0000000000000000',
      userId: null,
      tenantId: null,
      ipAddress: request.ip ?? null,
    }, () => {
      response.setHeader('x-request-id', requestId);
      next();
    });
  }
}
