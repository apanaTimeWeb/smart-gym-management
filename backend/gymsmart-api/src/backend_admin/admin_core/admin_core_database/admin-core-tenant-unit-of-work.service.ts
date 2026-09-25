// RESPONSIBILITY: Owns explicit tenant database transaction boundaries without leaking ORM transaction objects to business services.
// FLOW: Transaction boundary -> QueryRunner -> EntityManager -> repository/audit writes -> commit -> post-commit tasks.
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { AdminCoreTimeoutConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-timeout.config.js';
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';

import type { EntityManager, QueryRunner } from 'typeorm';

@Injectable()
/**
 * @description Defines the AdminCoreTenantUnitOfWorkService boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreTenantUnitOfWorkService {
  constructor(
    private readonly tenantManager: AdminCoreTenantDataSourceManager,
    private readonly context: AdminCoreRequestContextService,
    private readonly logger: PinoLogger,
  ) {}

  /** @description Runs tenant-scoped application work atomically and executes deferred side effects only after commit.
   * @param callback Transactional application work.
   * @returns Transaction result.
   * @throws Original transaction error after rollback.
   */
  async run<T>(callback: () => Promise<T>): Promise<T> {
    if (this.context.get().entityManager) return callback();
    const runner = (await this.tenantManager.getCurrent()).createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      await this.applyTimeout(runner.manager);
      const result = await this.context.runWithEntityManager(runner.manager, callback);
      await runner.commitTransaction();
      try { await this.context.flushAfterCommit(); } catch { /* committed mutation remains committed; durable post-commit delivery is retried separately */ }
      return result;
    } catch (error) {
      this.logger.error({ err: error }, 'Tenant transaction rolled back');
      await this.rollbackQuietly(runner);
      throw error;
    } finally {
      await runner.release();
    }
  }

  /** @description Applies the configured statement timeout to the active tenant transaction. @param manager Active TypeORM entity manager. @returns Promise completion. */
  private async applyTimeout(manager: EntityManager): Promise<void> {
    await manager.query('SET LOCAL statement_timeout = $1', [AdminCoreTimeoutConfig.DB_TRANSACTION_MS]);
  }

  /** @description Rolls back a failed transaction while preserving the original application error.
   * @param runner Active query runner.
   * @returns Promise completion.
   */
  private async rollbackQuietly(runner: QueryRunner): Promise<void> {
    if (runner.isTransactionActive) await runner.rollbackTransaction();
  }
}
