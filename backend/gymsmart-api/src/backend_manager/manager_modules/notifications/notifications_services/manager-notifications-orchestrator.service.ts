// RESPONSIBILITY: Owns the notifications transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerNotificationsMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerNotificationsMutationService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerNotificationsDomainData } from '@/backend_manager/manager_modules/notifications/notifications_types/manager-notifications.types';

@Injectable()
export class ManagerNotificationsOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerNotificationsMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createNotification(data: ManagerCoreJsonObject): Promise<ManagerNotificationsDomainData> {
    let result: ManagerNotificationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createNotification(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_NOTIFICATIONS_CREATED, { feature: 'notifications', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateNotification(data: ManagerCoreJsonObject, id?: string): Promise<ManagerNotificationsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerNotificationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateNotification(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_NOTIFICATIONS_UPDATED, { feature: 'notifications', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteNotification(id?: string): Promise<ManagerNotificationsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerNotificationsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteNotification(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_NOTIFICATIONS_DELETED, { feature: 'notifications', id });
    return result;
  }

  /** @description Marks all notifications read inside the UnitOfWork transaction. @returns Number of changed notifications. */
  async updateAllNotificationsRead(): Promise<number> {
    let result: number | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateAllNotificationsRead(context); });
    if (result === undefined) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    return result;
  }
}

export { ManagerNotificationsOrchestratorService as NotificationsOrchestratorService };
