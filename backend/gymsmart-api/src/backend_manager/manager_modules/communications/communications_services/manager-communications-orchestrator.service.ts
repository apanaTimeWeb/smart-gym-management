// RESPONSIBILITY: Owns the communications transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerCommunicationsMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerCommunicationsMutationService } from '@/backend_manager/manager_modules/communications/communications_services/manager-communications-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerCommunicationsDomainData } from '@/backend_manager/manager_modules/communications/communications_types/manager-communications.types';

@Injectable()
export class ManagerCommunicationsOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerCommunicationsMutationService) {}

  /** @description Commits a campaign transaction and emits its lifecycle event. @param data - Validated campaign payload. @returns Created campaign. */
  async sendCampaign(data: ManagerCoreJsonObject): Promise<ManagerCommunicationsDomainData> {
    let result: ManagerCommunicationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.sendCampaign(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_COMMUNICATIONS_CREATED, { feature: 'communications', id: result.id, action: 'CAMPAIGN_SENT' });
    return result;
  }

  /** @description Commits a win-back message transaction and emits its lifecycle event. @param data - Validated win-back payload. @returns Created message. */
  async sendWinBackMessage(data: ManagerCoreJsonObject): Promise<ManagerCommunicationsDomainData> {
    let result: ManagerCommunicationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.sendWinBackMessage(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_COMMUNICATIONS_CREATED, { feature: 'communications', id: result.id, action: 'WIN_BACK_SENT' });
    return result;
  }

  /** @description Commits an automation update and emits its lifecycle event. @param data - Validated patch. @param id - Automation UUID. @returns Updated automation. */
  async updateAutomation(data: ManagerCoreJsonObject, id?: string): Promise<ManagerCommunicationsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerCommunicationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateAutomation(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_COMMUNICATIONS_UPDATED, { feature: 'communications', id, action: 'AUTOMATION_UPDATED' });
    return result;
  }

  /** @description Commits a soft-delete transaction for one communication record. @param id - Resource UUID. @returns Deleted record. */
  async deleteCommunication(id?: string): Promise<ManagerCommunicationsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerCommunicationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteCommunications(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_COMMUNICATIONS_DELETED, { feature: 'communications', id });
    return result;
  }

}

export { ManagerCommunicationsOrchestratorService as CommunicationsOrchestratorService };
