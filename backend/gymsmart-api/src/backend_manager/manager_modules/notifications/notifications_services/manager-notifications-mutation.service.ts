// RESPONSIBILITY: Owns notifications mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerNotificationsMutationService → ManagerNotificationsRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerNotificationsRepository } from '@/backend_manager/manager_modules/notifications/manager-notifications.repository';
import type { ManagerNotificationsDomainData } from '@/backend_manager/manager_modules/notifications/notifications_types/manager-notifications.types';

@Injectable()
export class ManagerNotificationsMutationService {
  constructor(private readonly repository: ManagerNotificationsRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one notifications domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createNotification(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerNotificationsDomainData> {
    const row = await this.repository.createNotification(data, context);
    await this.audit.append(context, 'MANAGER.NOTIFICATIONS.CREATED', 'notifications', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one notifications domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateNotification(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerNotificationsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.NOTIFICATIONS.UPDATED', 'notifications', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one notifications domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteNotification(id: string, context: ManagerCoreTransactionContext): Promise<ManagerNotificationsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.NOTIFICATIONS.DELETED', 'notifications', id, before.payload, row.payload);
    return row;
  }

  /** @description Marks all active notifications read within the active transaction. @param context - Active transaction context. @returns Number of affected notifications. */
  async updateAllNotificationsRead(context: ManagerCoreTransactionContext): Promise<number> { return this.repository.markAllAsRead(context); }

}
