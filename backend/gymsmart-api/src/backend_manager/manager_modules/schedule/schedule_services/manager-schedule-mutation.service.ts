// RESPONSIBILITY: Owns schedule mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerScheduleMutationService → ManagerScheduleRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerScheduleRepository } from '@/backend_manager/manager_modules/schedule/manager-schedule.repository';
import type { ScheduleDomainData } from '@/backend_manager/manager_modules/schedule/schedule_types/manager-schedule.types';

@Injectable()
export class ManagerScheduleMutationService {
  constructor(private readonly repository: ManagerScheduleRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one schedule domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createShift(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ScheduleDomainData> {
    const row = await this.repository.createShift(data, context);
    await this.audit.append(context, 'MANAGER.SCHEDULE.CREATED', 'schedule', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one schedule domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateShift(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ScheduleDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.SCHEDULE.UPDATED', 'schedule', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one schedule domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteShift(id: string, context: ManagerCoreTransactionContext): Promise<ScheduleDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.SCHEDULE.DELETED', 'schedule', id, before.payload, row.payload);
    return row;
  }

}
