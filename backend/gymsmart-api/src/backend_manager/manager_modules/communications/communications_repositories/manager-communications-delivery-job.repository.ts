// RESPONSIBILITY: Owns durable communications delivery job persistence; it never calls provider SDKs.
// FLOW: Tenant transaction/query -> delivery-job row -> worker state transition -> persisted retry/DLQ result.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { CommunicationsDeliveryJobEntity } from '@/backend_manager/manager_modules/communications/communications_repositories/manager-communications-delivery-job.entity';
import { CommunicationsDeliveryJobStatus } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

@Injectable()
export class ManagerCommunicationsDeliveryJobRepository extends CoreBaseRepository<CommunicationsDeliveryJobEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService) { super(tenants, CommunicationsDeliveryJobEntity); }

  /**
   * @description Executes create queued job within its declared architectural boundary.
   * @param communicationId - Validated input for the operation.
   * @param deliveryMedium - Validated input for the operation.
   * @param payload - Validated input for the operation.
   * @param context - Validated input for the operation.
   * @returns Promise<CommunicationsDeliveryJobEntity>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async createQueuedJob(communicationId: string, deliveryMedium: CommunicationsDeliveryMedium, payload: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<CommunicationsDeliveryJobEntity> {
    const repository = await this.getRepository(context);
    return repository.save(repository.create({ communicationId, deliveryMedium, payload, status: CommunicationsDeliveryJobStatus.QUEUED, attempts: 0, maxAttempts: 5, nextAttemptAt: new Date(), lastError: null }));
  }

  /**
   * @description Executes claim next job within its declared architectural boundary.
   * @returns Promise<CommunicationsDeliveryJobEntity | null>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async claimNextJob(): Promise<CommunicationsDeliveryJobEntity | null> {
    const repository = await this.getRepository();
    return repository.manager.transaction(async (manager) => {
      const row = await manager.getRepository(CommunicationsDeliveryJobEntity)
        .createQueryBuilder('job')
        .setLock('pessimistic_write')
        .setOnLocked('skip_locked')
        .where('job.status = :status', { status: CommunicationsDeliveryJobStatus.QUEUED })
        .andWhere('job.next_attempt_at <= CURRENT_TIMESTAMP')
        .andWhere('job.deleted_at IS NULL')
        .orderBy('job.next_attempt_at', 'ASC')
        .addOrderBy('job.id', 'ASC')
        .getOne();
      if (!row) return null;
      row.status = CommunicationsDeliveryJobStatus.PROCESSING;
      row.attempts += 1;
      return manager.getRepository(CommunicationsDeliveryJobEntity).save(row);
    });
  }

  /**
   * @description Executes mark sent in transaction within its declared architectural boundary.
   * @param id - Validated input for the operation.
   * @param context - Validated input for the operation.
   * @returns Promise<void>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async markSentInTransaction(id: string, context: ManagerCoreTransactionContext): Promise<void> {
    const repository = await this.getRepository(context);
    await repository.update(id, { status: CommunicationsDeliveryJobStatus.SENT, lastError: null });
  }

  /**
   * @description Executes mark failure in transaction within its declared architectural boundary.
   * @param id - Validated input for the operation.
   * @param attempts - Validated input for the operation.
   * @param maxAttempts - Validated input for the operation.
   * @param errorMessage - Validated input for the operation.
   * @param context - Validated input for the operation.
   * @returns Promise<void>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async markFailureInTransaction(id: string, attempts: number, maxAttempts: number, errorMessage: string, context: ManagerCoreTransactionContext): Promise<void> {
    const repository = await this.getRepository(context);
    if (attempts >= maxAttempts) {
      await repository.update(id, { status: CommunicationsDeliveryJobStatus.DEAD_LETTER, lastError: errorMessage });
      return;
    }
    const delayMs = Math.min(300_000, 2 ** Math.max(0, attempts - 1) * 10_000);
    await repository.update(id, { status: CommunicationsDeliveryJobStatus.QUEUED, nextAttemptAt: new Date(Date.now() + delayMs), lastError: errorMessage });
  }
}

export { ManagerCommunicationsDeliveryJobRepository as CommunicationsDeliveryJobRepository };
