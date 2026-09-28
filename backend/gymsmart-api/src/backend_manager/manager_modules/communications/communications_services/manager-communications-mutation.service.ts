// RESPONSIBILITY: Owns communications mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerCommunicationsMutationService → ManagerCommunicationsRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { CommunicationsDeliveryMedium } from '@/backend_manager/manager_modules/communications/manager-communications.constants';
import { ManagerCommunicationsDeliveryJobRepository } from '@/backend_manager/manager_modules/communications/communications_repositories/manager-communications-delivery-job.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerCommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';
import type { ManagerCommunicationsDomainData } from '@/backend_manager/manager_modules/communications/communications_types/manager-communications.types';

@Injectable()
export class ManagerCommunicationsMutationService {
  constructor(private readonly repository: ManagerCommunicationsRepository, private readonly audit: ManagerCoreAuditLogRepository, private readonly jobs: ManagerCommunicationsDeliveryJobRepository, private readonly contextService: ManagerCoreRequestContextService) {}

  /** @description Persists and audits a campaign, then queues delivery when a supported medium is provided. @param data - Validated campaign payload. @param context - Transaction context. @returns Created campaign. */
  async sendCampaign(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerCommunicationsDomainData> {
    const row = await this.repository.sendCampaign(data, context);
    await this.audit.append(context, 'MANAGER.COMMUNICATIONS.CAMPAIGN_SENT', 'communications', row.id, null, row.payload);
    await (this as any).queueDeliveryIfRequested(row.id, data, context);
    return row;
  }

  /** @description Persists and audits a win-back message, then queues delivery when a supported medium is provided. @param data - Validated win-back payload. @param context - Transaction context. @returns Created message record. */
  async sendWinBackMessage(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerCommunicationsDomainData> {
    const row = await this.repository.sendWinBackMessage(data, context);
    await this.audit.append(context, 'MANAGER.COMMUNICATIONS.WIN_BACK_SENT', 'communications', row.id, null, row.payload);
    await (this as any).queueDeliveryIfRequested(row.id, data, context);
    return row;
  }

  /** @description Updates an automation record under pessimistic locking and writes an audit entry. @param id - Automation UUID. @param data - Validated patch. @param context - Transaction context. @returns Updated automation. */
  async updateAutomation(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerCommunicationsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateAutomation(id, data, context);
    await this.audit.append(context, 'MANAGER.COMMUNICATIONS.AUTOMATION_UPDATED', 'communications', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one communications domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteCommunications(id: string, context: ManagerCoreTransactionContext): Promise<ManagerCommunicationsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.deleteCommunication(id, context);
    await this.audit.append(context, 'MANAGER.COMMUNICATIONS.DELETED', 'communications', id, before.payload, row.payload);
    return row;
  }

}
