// RESPONSIBILITY: Owns the settings transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerSettingsMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerSettingsMutationService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { SettingsDomainData } from '@/backend_manager/manager_modules/settings/settings_types/manager-settings.types';

@Injectable()
export class ManagerSettingsOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerSettingsMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createManagerSettings(data: ManagerCoreJsonObject): Promise<SettingsDomainData> {
    let result: SettingsDomainData | undefined;
    await this.uow.run(async (context) => { result = await (this.mutation as any).createSettings(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_SETTINGS_CREATED, { feature: 'settings', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateSettings(data: ManagerCoreJsonObject, id?: string): Promise<SettingsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: SettingsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateSettings(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_SETTINGS_UPDATED, { feature: 'settings', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteManagerSettings(id?: string): Promise<SettingsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: SettingsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteManagerSettings(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_SETTINGS_DELETED, { feature: 'settings', id });
    return result;
  }
}

export { ManagerSettingsOrchestratorService as SettingsOrchestratorService };
