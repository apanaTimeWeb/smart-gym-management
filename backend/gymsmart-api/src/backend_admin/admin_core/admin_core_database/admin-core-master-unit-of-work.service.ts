// RESPONSIBILITY: Owns master-database transaction boundaries for platform billing and authentication mutations.
// FLOW: Master mutation -> QueryRunner -> master repositories/audit -> commit -> post-commit callbacks.
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'

@Injectable()
/**
 * @description Defines the AdminCoreMasterUnitOfWorkService boundary for the admin_core_database backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterUnitOfWorkService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly context: AdminCoreRequestContextService,
    private readonly logger: PinoLogger,
  ) {}

  /** @description Executes master-database work inside one transaction and never turns a committed mutation into a retryable error because of post-commit work. @param callback Transactional work. @returns Transaction result. */
  async run<T>(callback: () => Promise<T>): Promise<T> {
    if (this.context.get().masterEntityManager) return callback();
    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const result = await this.context.runWithMasterEntityManager(runner.manager, callback);
      await runner.commitTransaction();
      try { await this.context.flushAfterCommit(); } catch { /* durable outbox/retry owns post-commit delivery; DB commit is final */ }
      return result;
    } catch (error) {
      this.logger.error({ err: error }, 'Master transaction rolled back');
      if (runner.isTransactionActive) await runner.rollbackTransaction();
      throw error;
    } finally {
      await runner.release();
    }
  }
}
