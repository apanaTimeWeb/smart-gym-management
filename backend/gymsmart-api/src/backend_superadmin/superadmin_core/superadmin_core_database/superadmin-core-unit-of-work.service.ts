// RESPONSIBILITY: Opens and closes PostgreSQL transactions through the project-wide UnitOfWork abstraction.
// FLOW: Orchestrator -> SuperadminCoreUnitOfWorkService -> TypeORM DataSource transaction -> repositories.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';

/**
 * Primary Intent: Defines SuperadminCoreUnitOfWorkService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreUnitOfWorkService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly context: SuperadminCoreTransactionContext,
    private readonly logger: PinoLogger,
  ) {}

  /**
 * Primary Intent: Executes the `run` responsibility owned by this feature-local superadmin-core-unit-of-work.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the run use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async run<T>(work: () => Promise<T>): Promise<T> {
    try {
      return await this.dataSource.transaction((manager: EntityManager) => this.context.run(manager, work));
    } catch (error) {
      this.logger.error({ err: error }, 'Database transaction rolled back');
      throw error;
    }
  }
}
