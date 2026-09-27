// RESPONSIBILITY: Owns Manager request execution context using AsyncLocalStorage.
// FLOW: HTTP middleware -> AsyncLocalStorage.run -> auth/tenant guards -> services/repositories consume context.
import { AsyncLocalStorage } from 'node:async_hooks';
import { Injectable } from '@nestjs/common';

import type { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import type { ManagerCoreRequestContext } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.types';

@Injectable()
export class ManagerCoreRequestContextService {
  private readonly storage = new AsyncLocalStorage<ManagerCoreRequestContext>();

  /** Runs a request callback inside its isolated context. */
  run<T>(context: ManagerCoreRequestContext, callback: () => T): T {
    return this.storage.run({ ...context }, callback);
  }

  /** Returns the current request context, or a safe empty context for non-HTTP jobs. */
  get(): ManagerCoreRequestContext {
    return this.storage.getStore() ?? { requestId: 'system', traceId: 'system', spanId: 'system' };
  }

  /** Stores the authenticated actor after JWT verification. */
  setActor(id: string, role: ManagerCoreRole, branchId?: string): void {
    const current = this.get();
    if (!this.storage.getStore()) return;
    current.actorId = id;
    current.actorRole = role;
    if (branchId) current.branchId = branchId;
  }

  /** Stores the trusted tenant after master-database authorization. */
  setTenant(id: string, databaseName: string): void {
    const current = this.get();
    if (!this.storage.getStore()) return;
    current.tenantId = id;
    current.tenantDatabaseName = databaseName;
  }
}
