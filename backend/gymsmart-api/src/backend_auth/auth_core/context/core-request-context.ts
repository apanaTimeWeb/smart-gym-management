// RESPONSIBILITY: Stores request, actor, tenant, trace, IP and transaction context through AsyncLocalStorage.
// FLOW: HTTP middleware -> CoreRequestContextService -> guards/services/repositories.

import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CoreRequestContextState } from '@/backend_auth/auth_core/context/core-request-context.interfaces';

@Injectable()
export class CoreRequestContextService {
  private readonly storage = new AsyncLocalStorage<CoreRequestContextState>();

  /** @description Starts an isolated request context. @param state - Initial request context. @param callback - Request lifecycle callback. @returns Callback result. */
  run<T>(state: CoreRequestContextState, callback: () => T): T { return this.storage.run(state, callback); }

  /** @description Returns the current request context. @returns Current context or undefined. */
  get(): CoreRequestContextState | undefined { return this.storage.getStore(); }

  /** @description Stores the authenticated actor UUID. @param userId - Actor UUID. @returns void. */
  setUserId(userId: string): void {
    const store = this.storage.getStore();
    if (store) store.userId = userId;
  }

  /** @description Stores the trusted tenant UUID. @param tenantId - Authorized tenant UUID. @returns void. */
  setTenantId(tenantId: string): void {
    const store = this.storage.getStore();
    if (store) store.tenantId = tenantId;
  }

  /** @description Runs a callback with a transaction EntityManager bound to AsyncLocalStorage. @param entityManager - Transaction manager. @param callback - Transaction callback. @returns Callback result. */
  runWithEntityManager<T>(entityManager: EntityManager, callback: () => T): T {
    const store = this.storage.getStore();
    if (!store) return callback();
    return this.storage.run({ ...store, entityManager }, callback);
  }
}
