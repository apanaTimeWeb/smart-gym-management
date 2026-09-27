// RESPONSIBILITY: Processes durable Manager communications delivery jobs with retry and dead-letter handling.
// FLOW: Claim one job -> primary medium adapter -> configured fallback -> transactional audit/state transition.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CommunicationsDeliveryAdapter } from '@/backend_manager/manager_modules/communications/communications_adapters/manager-communications-delivery.adapter';
import { CommunicationsDeliveryJobRepository } from '@/backend_manager/manager_modules/communications/communications_repositories/manager-communications-delivery-job.repository';
import { CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications-delivery.constants';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerCommunicationsProcessDeliveryJobsService {
  constructor(private readonly jobs: CommunicationsDeliveryJobRepository, private readonly adapter: CommunicationsDeliveryAdapter, private readonly config: ManagerCoreConfigService, private readonly audit: ManagerCoreAuditLogRepository, private readonly uow: ManagerCoreUnitOfWorkService) {}

  /**
   * @description Executes update one within its declared architectural boundary.
   * @returns Promise<boolean>.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async updateOne(): Promise<boolean> {
    const job = await this.jobs.claimNextJob();
    if (!job) return false;
    const actor = this.actorFrom(job.payload);
    await this.processClaimedJob(job, actor);
    return true;
  }

  /** Processes a claimed delivery job and persists success/retry/DLQ state. */
  private async processClaimedJob(job: import('@/backend_manager/manager_modules/communications/manager-communications-delivery-job.entity').CommunicationsDeliveryJobEntity, actor: { id: string; role: import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole }): Promise<void> {
    try {
      await this.adapter.send(job.deliveryMedium, job.payload, job.id);
      await this.markSent(job.id, actor.id, actor.role, job.communicationId, job.deliveryMedium);
      return;
    } catch (primaryError) {
      await this.tryFallbackOrRetry(job, actor, this.normalizeError(primaryError));
    }
  }

  /** Attempts the configured fallback medium before consuming a retry or moving to the DLQ. */
  private async tryFallbackOrRetry(job: import('@/backend_manager/manager_modules/communications/manager-communications-delivery-job.entity').CommunicationsDeliveryJobEntity, actor: { id: string; role: import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole }, primaryError: string): Promise<void> {
    const fallback = this.config.communicationsFallbackMedium as CommunicationsDeliveryMedium;
    if (fallback !== job.deliveryMedium) {
      try {
        await this.adapter.send(fallback, job.payload, `${job.id}:fallback:${fallback}`);
        await this.markSent(job.id, actor.id, actor.role, job.communicationId, fallback);
        return;
      } catch (fallbackError) {
        await this.markFailure(job.id, job.attempts, job.maxAttempts, this.normalizeError(fallbackError), actor.id, actor.role, job.communicationId, primaryError);
        return;
      }
    }
    await this.markFailure(job.id, job.attempts, job.maxAttempts, primaryError, actor.id, actor.role, job.communicationId);
  }


  /** Commits the successful delivery state and audit record atomically. */
  private async markSent(jobId: string, actorId: string, actorRole: import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole, communicationId: string, medium: CommunicationsDeliveryMedium): Promise<void> {
    await this.uow.run(async (context) => {
      await this.jobs.markSentInTransaction(jobId, context);
      await this.audit.appendForActor(context, actorId, actorRole, 'COMMUNICATIONS.DELIVERY.SENT', 'communications', communicationId, null, { jobId, deliveryMedium: medium });
    });
  }

  /** Commits retry or DLQ state and the corresponding audit trail atomically. */
  private async markFailure(jobId: string, attempts: number, maxAttempts: number, errorMessage: string, actorId: string, actorRole: import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole, communicationId: string, primaryError?: string): Promise<void> {
    await this.uow.run(async (context) => {
      await this.jobs.markFailureInTransaction(jobId, attempts, maxAttempts, errorMessage, context);
      await this.audit.appendForActor(context, actorId, actorRole, attempts >= maxAttempts ? 'COMMUNICATIONS.DELIVERY.DEAD_LETTER' : 'COMMUNICATIONS.DELIVERY.RETRY', 'communications', communicationId, null, { jobId, attempts, error: errorMessage, primaryError: primaryError ?? null });
    });
  }

  /**
   * @description Executes actor from within its declared architectural boundary.
   * @param payload - Validated input for the operation.
   * @returns .
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private actorFrom(payload: ManagerCoreJsonObject): { id: string; role: import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole } {
    const id = typeof payload.actorId === 'string' ? payload.actorId : '00000000-0000-4000-8000-000000000000';
    const role = String(payload.actorRole ?? 'MANAGER') as import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole;
    return { id, role };
  }

  /**
   * @description Executes normalize error within its declared architectural boundary.
   * @param error - Validated input for the operation.
   * @returns string.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  private normalizeError(error: unknown): string { return error instanceof Error ? error.message.slice(0, 500) : 'Provider delivery failed.'; }
}

export { ManagerCommunicationsProcessDeliveryJobsService as CommunicationsProcessDeliveryJobsService };
