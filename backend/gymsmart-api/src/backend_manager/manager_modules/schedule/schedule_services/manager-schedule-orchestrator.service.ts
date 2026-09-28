// RESPONSIBILITY: Owns the schedule transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerScheduleMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerScheduleMutationService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerScheduleDomainData } from '@/backend_manager/manager_modules/schedule/schedule_types/manager-schedule.types';

@Injectable()
export class ManagerScheduleOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerScheduleMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createShift(data: ManagerCoreJsonObject): Promise<ManagerScheduleDomainData> {
    let result: ManagerScheduleDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createShift(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_SCHEDULE_CREATED, { feature: 'schedule', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateShift(data: ManagerCoreJsonObject, id?: string): Promise<ManagerScheduleDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerScheduleDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateShift(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_SCHEDULE_UPDATED, { feature: 'schedule', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteShift(id?: string): Promise<ManagerScheduleDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerScheduleDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteShift(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_SCHEDULE_DELETED, { feature: 'schedule', id });
    return result;
  }
}

export { ManagerScheduleOrchestratorService as ScheduleOrchestratorService };
