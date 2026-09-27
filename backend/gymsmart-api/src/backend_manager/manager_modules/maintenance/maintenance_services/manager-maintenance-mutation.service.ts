// RESPONSIBILITY: Owns maintenance mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerMaintenanceMutationService → ManagerMaintenanceRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerMaintenanceRepository } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.repository';
import type { ManagerMaintenanceDomainData } from '@/backend_manager/manager_modules/maintenance/maintenance_types/manager-maintenance.types';

@Injectable()
export class ManagerMaintenanceMutationService {
  constructor(private readonly repository: ManagerMaintenanceRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one maintenance domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createMaintenance(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMaintenanceDomainData> {
    const row = await this.repository.createMaintenance(data, context);
    await this.audit.append(context, 'MANAGER.MAINTENANCE.CREATED', 'maintenance', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one maintenance domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateMaintenance(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMaintenanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.MAINTENANCE.UPDATED', 'maintenance', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one maintenance domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteMaintenance(id: string, context: ManagerCoreTransactionContext): Promise<ManagerMaintenanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.MAINTENANCE.DELETED', 'maintenance', id, before.payload, row.payload);
    return row;
  }

}
