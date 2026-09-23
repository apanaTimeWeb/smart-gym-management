// RESPONSIBILITY: Opens and closes PostgreSQL transactions through the project-wide UnitOfWork abstraction.
// FLOW: Orchestrator -> UnitOfWorkService -> TypeORM DataSource transaction -> repositories.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';

@Injectable()
export class UnitOfWorkService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly context: TransactionContext,
    private readonly logger: PinoLogger,
  ) {}

  /** Runs a business operation atomically and propagates the transaction through repository infrastructure. */
  async run<T>(work: () => Promise<T>): Promise<T> {
    try {
      return await this.dataSource.transaction((manager: EntityManager) => this.context.run(manager, work));
    } catch (error) {
      this.logger.error({ err: error }, 'Database transaction rolled back');
      throw error;
    }
  }
}