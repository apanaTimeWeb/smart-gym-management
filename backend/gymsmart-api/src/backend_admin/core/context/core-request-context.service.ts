// RESPONSIBILITY: Stores trusted tenant, actor and trace context using AsyncLocalStorage.
// FLOW: Request boundary â†’ CoreRequestContextService â†’ deep services/repositories.

import { AsyncLocalStorage } from 'node:async_hooks';
import { Injectable } from '@nestjs/common';

export interface CoreRequestContext {
  tenantId: string;
  userId: string;
  userRole: string;
  requestId: string;
  traceId: string;
  spanId: string;
}

export const globalCoreRequestStorage = new AsyncLocalStorage<CoreRequestContext>();

@Injectable()
export class CoreRequestContextService {
  private readonly storage = globalCoreRequestStorage;

  run<T>(context: CoreRequestContext, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  get(): CoreRequestContext {
    const context = this.storage.getStore();
    if (!context) throw new Error('REQUEST_CONTEXT_MISSING');
    return context;
  }
}
