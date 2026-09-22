// @ts-nocheck
// RESPONSIBILITY: Transaction orchestrator for Manager notifications; no domain business rules live here.
// FLOW: command use-case -> NotificationsOrchestratorService -> UnitOfWork -> repository -> audit -> event.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreEventRegistry } from '@/backend_manager/core/events/core-event-registry.constants';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { NotificationsRepository } from '@/backend_manager/modules/manager/notifications/repositories/notifications-repository';

@Injectable()
export class NotificationsOrchestratorService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly audit: CoreAuditLogRepository, private readonly events: CoreEventService, private readonly repository: NotificationsRepository) {}

  /** @description Creates a notifications record atomically with its audit entry. @param data - Validated payload. @returns Created domain payload. */
  async createNotifications(data: CoreJsonObject): Promise<CoreJsonObject> { return this.runCreate(data); }

  /** @description Updates a notifications record atomically with its audit entry. @param id - Resource UUID. @param data - Validated patch. @returns Updated domain payload. @throws CoreNotFoundException when absent. */
  async updateNotificationsById(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runUpdate(id, data); }

  /** @description Soft-deletes a notifications record atomically with its audit entry. @param data - Unused request payload for interface compatibility. @param id - Resource UUID. @returns Soft-deleted domain payload. @throws CoreNotFoundException when absent. */
  async softDeleteNotificationsById(id?: string): Promise<CoreJsonObject> { if (!id) throw new CoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); return this.runDelete(id); }

  /** @description Runs create inside a transaction and emits the feature lifecycle event. @param data - Validated data. @returns Created payload. */
  private async runCreate(data: CoreJsonObject): Promise<CoreJsonObject> { let result: CoreJsonObject = {}; let id=''; await this.uow.run(async(context) => { const row=await this.repository.createNotifications(data,context); result={ id: row.id, ...row.payload }; id=row.id; await this.audit.append(context,'MANAGER.NOTIFICATIONS.CREATED','notifications',id,null,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_NOTIFICATIONS_CREATED,{feature:'notifications',id}); return result; }

  /** @description Runs update inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @param data - Patch data. @returns Updated payload. */
  private async runUpdate(id:string,data:CoreJsonObject):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findNotificationsByIdOrThrow(id); const row=await this.repository.updateNotificationsById(id,data,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.NOTIFICATIONS.UPDATED','notifications',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_NOTIFICATIONS_UPDATED,{feature:'notifications',id}); return result; }

  /** @description Runs soft delete inside a transaction and emits the feature lifecycle event. @param id - Resource UUID. @returns Soft-deleted payload. */
  private async runDelete(id:string):Promise<CoreJsonObject>{ let result:CoreJsonObject={}; await this.uow.run(async(context)=>{ const before=await this.repository.findNotificationsByIdOrThrow(id); const row=await this.repository.softDeleteNotificationsById(id,context); result={ id: row.id, ...row.payload }; await this.audit.append(context,'MANAGER.NOTIFICATIONS.DELETED','notifications',id,before.payload,row.payload); }); this.events.emit(CoreEventRegistry.MANAGER_NOTIFICATIONS_DELETED,{feature:'notifications',id}); return result; }
}
