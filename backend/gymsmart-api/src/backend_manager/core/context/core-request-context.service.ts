// RESPONSIBILITY: Request-scoped actor, tenant, database, and tracing identifiers.
// FLOW: Middleware starts context → JWT/Tenant guards populate trusted actor/tenant/database → repositories consume context.
import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

export interface CoreRequestContext {
  requestId: string;
  traceId: string;
  spanId: string;
  actorId?: string;
  actorRole?: import('@/core/auth/core-role.constants').CoreRole;
  tenantId?: string;
  tenantDatabaseName?: string;
}

@Injectable()
export class CoreRequestContextService {
  private readonly storage = new AsyncLocalStorage<CoreRequestContext>();

  /**
   * @description Starts a request context that propagates actor, tenant, and tracing metadata through async boundaries.
   * @param context - Initial request context.
   * @param callback - Request execution callback.
   * @returns The callback result.
   */
  run<T>(context: CoreRequestContext, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  /**
   * @description Returns the current request context or a safe anonymous fallback for non-request infrastructure.
   * @returns Current request context.
   */
  get(): CoreRequestContext {
    return this.storage.getStore() ?? { requestId: 'unknown', traceId: 'unknown', spanId: 'unknown' };
  }

  /**
   * @description Records the authenticated actor identity for the current request.
   * @param id - Authenticated actor UUID.
   * @param role - Authenticated actor role.
   * @returns Nothing.
   */
  setActor(id: string, role: string): void {
    const context = this.storage.getStore();
    if (context) { context.actorId = id; context.actorRole = role; }
  }

  /**
   * @description Records the tenant UUID and master-resolved tenant database name for the current request.
   * @param id - Authorized tenant UUID.
   * @param databaseName - Database name resolved from the master database.
   * @returns Nothing.
   */
  setTenant(id: string, databaseName: string): void {
    const context = this.storage.getStore();
    if (context) { context.tenantId = id; context.tenantDatabaseName = databaseName; }
  }
}
