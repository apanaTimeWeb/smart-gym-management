// RESPONSIBILITY: Provides AsyncLocalStorage-backed request context without parameter prop-drilling.
// FLOW: RequestContextMiddleware â†’ RequestContextService â†’ deep services/repositories.
import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import { RequestContextValue } from '@/backend_landing/core/types/request-context.types';


@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContextValue>();

  /** @description Runs callback execution with request correlation and tenant context. @param context - Mutable request context. @param callback - Downstream request callback. @returns Callback result. */
  run<T>(context: RequestContextValue, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  /** @description Reads the active request context. @returns Current context. @throws Error when execution is outside the request boundary. */
  get(): RequestContextValue {
    const context = this.storage.getStore();
    if (!context) throw new Error('REQUEST_CONTEXT_UNAVAILABLE');
    return context;
  }

  /** @description Assigns the already-authorized tenant identifier to the active request. @param tenantId - Trusted tenant UUID. @returns Nothing. */
  setTenantId(tenantId: string): void {
    const context = this.get();
    context.tenantId = tenantId;
  }
}
