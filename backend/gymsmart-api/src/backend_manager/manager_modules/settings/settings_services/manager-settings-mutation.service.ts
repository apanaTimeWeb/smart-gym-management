// RESPONSIBILITY: Owns settings mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerSettingsMutationService → ManagerSettingsRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerSettingsRepository } from '@/backend_manager/manager_modules/settings/manager-settings.repository';
import type { SettingsDomainData } from '@/backend_manager/manager_modules/settings/settings_types/manager-settings.types';

@Injectable()
export class ManagerSettingsMutationService {
  constructor(private readonly repository: ManagerSettingsRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one settings domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createManagerSettings(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<SettingsDomainData> {
    const row = await (this.repository as any).createSettings(data, context);
    await this.audit.append(context, 'MANAGER.SETTINGS.CREATED', 'settings', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one settings domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateSettings(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<SettingsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.SETTINGS.UPDATED', 'settings', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one settings domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteManagerSettings(id: string, context: ManagerCoreTransactionContext): Promise<SettingsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.SETTINGS.DELETED', 'settings', id, before.payload, row.payload);
    return row;
  }

}
