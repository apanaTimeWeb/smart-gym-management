// RESPONSIBILITY: Owns profile mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerProfileMutationService → ManagerProfileRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerProfileRepository } from '@/backend_manager/manager_modules/profile/manager-profile.repository';
import type { ManagerProfileDomainData } from '@/backend_manager/manager_modules/profile/profile_types/manager-profile.types';

@Injectable()
export class ManagerProfileMutationService {
  constructor(private readonly repository: ManagerProfileRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one profile domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createProfile(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerProfileDomainData> {
    const row = await this.repository.createProfile(data, context);
    await this.audit.append(context, 'MANAGER.PROFILE.CREATED', 'profile', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one profile domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateProfile(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerProfileDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.PROFILE.UPDATED', 'profile', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one profile domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteProfile(id: string, context: ManagerCoreTransactionContext): Promise<ManagerProfileDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.PROFILE.DELETED', 'profile', id, before.payload, row.payload);
    return row;
  }

}
