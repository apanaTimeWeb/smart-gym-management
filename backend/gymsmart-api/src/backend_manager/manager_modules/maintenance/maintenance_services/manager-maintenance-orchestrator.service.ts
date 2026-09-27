// RESPONSIBILITY: Owns the maintenance transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerMaintenanceMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerMaintenanceMutationService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { MaintenanceDomainData } from '@/backend_manager/manager_modules/maintenance/maintenance_types/manager-maintenance.types';

@Injectable()
export class ManagerMaintenanceOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerMaintenanceMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createMaintenance(data: ManagerCoreJsonObject): Promise<MaintenanceDomainData> {
    let result: MaintenanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createMaintenance(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_MAINTENANCE_CREATED, { feature: 'maintenance', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateMaintenance(data: ManagerCoreJsonObject, id?: string): Promise<MaintenanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: MaintenanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateMaintenance(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_MAINTENANCE_UPDATED, { feature: 'maintenance', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteMaintenance(id?: string): Promise<MaintenanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: MaintenanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteMaintenance(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_MAINTENANCE_DELETED, { feature: 'maintenance', id });
    return result;
  }
}

export { ManagerMaintenanceOrchestratorService as MaintenanceOrchestratorService };
