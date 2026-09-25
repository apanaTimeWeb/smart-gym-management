// RESPONSIBILITY: Stores trusted tenant, actor, trace, and transaction context using AsyncLocalStorage.
// FLOW: Request boundary -> trusted tenant -> transaction manager -> deep services/repositories.
import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import type { EntityManager } from 'typeorm';

export interface AdminCoreRequestContext {
  tenantId: string;
  userId: string;
  userRole: string;
  requestId: string;
  traceId: string;
  spanId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  entityManager?: EntityManager;
  masterEntityManager?: EntityManager;
  tenantDataSourceLeaseHeld?: boolean;
  afterCommitTasks?: Array<() => Promise<void> | void>;
  mutationBefore?: unknown;
}
export const globalAdminCoreRequestStorage = new AsyncLocalStorage<AdminCoreRequestContext>();

@Injectable()
/**
 * @description Defines the AdminCoreRequestContextService boundary for the admin_core_context backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreRequestContextService {
  private readonly storage = globalAdminCoreRequestStorage;

  /** @description Runs a callback inside a trusted request context. @param context Trusted request metadata. @param callback Work executed with the context. @returns Callback result. */
  run<T>(context: AdminCoreRequestContext, callback: () => T): T {
    return this.storage.run({ ...context, afterCommitTasks: context.afterCommitTasks ?? [] }, callback);
  }

  /** @description Re-enters the current request with a transaction manager while preserving tenant and trace identity. @param manager Active TypeORM transaction manager. @param callback Transactional work. @returns Callback result. */
  runWithEntityManager<T>(manager: EntityManager, callback: () => T): T {
    const current = this.get();
    return this.storage.run({ ...current, entityManager: manager, afterCommitTasks: current.afterCommitTasks ?? [] }, callback);
  }

  /** @description Re-enters the current request with the active master-database transaction manager. @param manager Master transaction manager. @param callback Transactional work. @returns Callback result. */
  runWithMasterEntityManager<T>(manager: EntityManager, callback: () => T): T {
    const current = this.get();
    return this.storage.run({ ...current, masterEntityManager: manager, afterCommitTasks: current.afterCommitTasks ?? [] }, callback);
  }

  /** @description Marks whether the current HTTP/job context owns one tenant DataSource lease. @param held Lease state. @returns Void. */
  setTenantDataSourceLeaseHeld(held: boolean): void {
    this.get().tenantDataSourceLeaseHeld = held;
  }

  /** @description Registers an asynchronous task to run only after the surrounding transaction commits. @param task Post-commit task. @returns void. */
  deferUntilCommit(task: () => Promise<void> | void): void {
    const current = this.get();
    current.afterCommitTasks ??= [];
    current.afterCommitTasks.push(task);
  }

  /** @description Executes and clears deferred post-commit tasks. @returns Promise completion. */
  async flushAfterCommit(): Promise<void> {
    const current = this.get();
    const tasks = current.afterCommitTasks ?? [];
    current.afterCommitTasks = [];
    for (const task of tasks) await task();
  }

  /**
   * @description Stores a serializable pre-mutation snapshot for the next audit record in the active request context.
   * @param value ORM entity state before the mutation.
   * @returns void.
   * @remarks BigInt values are normalized to strings so audit persistence cannot fail solely because of numeric representation.
   */
  setMutationBefore(value: unknown): void {
    const current = this.get();
    current.mutationBefore = this.serializeForAudit(value);
  }

  /**
   * @description Consumes and clears the pre-mutation snapshot captured by the repository boundary.
   * @returns Serialized previous state or null when no snapshot was captured.
   */
  consumeMutationBefore(): unknown | null {
    const current = this.get();
    const value = current.mutationBefore ?? null;
    current.mutationBefore = undefined;
    return value;
  }

  private serializeForAudit(value: unknown): unknown {
    try {
      return JSON.parse(JSON.stringify(value, (_key, entry: unknown) => typeof entry === 'bigint' ? entry.toString() : entry));
    } catch {
      return null;
    }
  }

  /** @description Returns the active request context when one is established. @returns Trusted request metadata or undefined for public entry points. */
  tryGet(): AdminCoreRequestContext | undefined {
    return this.storage.getStore();
  }

  /** @description Returns the active request context. @returns Trusted request metadata. @throws Error when no request context exists. */
  get(): AdminCoreRequestContext {
    const context = this.storage.getStore();
    if (!context) throw new Error('REQUEST_CONTEXT_MISSING');
    return context;
  }
}
