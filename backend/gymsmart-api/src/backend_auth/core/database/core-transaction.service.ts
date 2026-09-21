// RESPONSIBILITY: Owns explicit transaction boundaries and binds the transaction manager into AsyncLocalStorage.
// FLOW: Feature orchestrator -> CoreTransactionService -> TypeORM transaction -> transaction-aware repositories.

import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { TIMEOUT_CONFIG } from '@/backend_auth/core/config/timeout.config';
import { CoreRequestContextService } from '@/backend_auth/core/context/core-request-context';

import type { DataSource, EntityManager } from 'typeorm';
@Injectable()
export class CoreTransactionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly requestContext: CoreRequestContextService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * @description Executes an operation atomically in a PostgreSQL transaction with an explicit database timeout.
   * @param callback - Transaction callback.
   * @returns Callback result after commit.
   * @throws Error when the transaction fails or the timeout is exceeded.
   */
  async run<T>(callback: () => Promise<T>): Promise<T> {
    try {
      return await this.dataSource.transaction(async (manager: EntityManager) => {
        await manager.query(`SET LOCAL statement_timeout = ${TIMEOUT_CONFIG.DB_TRANSACTION_MS}`);
        return this.requestContext.runWithEntityManager(manager, callback);
      });
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'UnknownError';
      this.logger.error({ errorName }, 'Database transaction failed.');
      throw error;
    }
  }
}
