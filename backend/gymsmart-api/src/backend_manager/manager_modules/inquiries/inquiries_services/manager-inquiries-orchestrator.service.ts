// RESPONSIBILITY: Owns the inquiries transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerInquiriesMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerInquiriesMutationService } from '@/backend_manager/manager_modules/inquiries/inquiries_services/manager-inquiries-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { InquiriesDomainData } from '@/backend_manager/manager_modules/inquiries/inquiries_types/manager-inquiries.types';

@Injectable()
export class ManagerInquiriesOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerInquiriesMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createInquiry(data: ManagerCoreJsonObject): Promise<InquiriesDomainData> {
    let result: InquiriesDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createInquiry(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_INQUIRIES_CREATED, { feature: 'inquiries', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateInquiry(data: ManagerCoreJsonObject, id?: string): Promise<InquiriesDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: InquiriesDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateInquiry(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_INQUIRIES_UPDATED, { feature: 'inquiries', id });
    return result;
  }

  /** @description Converts an inquiry into a new member inside one transaction, then emits a post-commit event. @param data - Validated member creation payload. @param id - Inquiry UUID. @returns The new member identity. */
  async convertLead(data: ManagerCoreJsonObject, id?: string): Promise<{ memberId: string }> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: { memberId: string } | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.convertLead(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_INQUIRIES_UPDATED, { feature: 'inquiries', id, memberId: result.memberId, action: 'CONVERTED' });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteInquiry(id?: string): Promise<InquiriesDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: InquiriesDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteInquiry(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_INQUIRIES_DELETED, { feature: 'inquiries', id });
    return result;
  }
}

export { ManagerInquiriesOrchestratorService as InquiriesOrchestratorService };
