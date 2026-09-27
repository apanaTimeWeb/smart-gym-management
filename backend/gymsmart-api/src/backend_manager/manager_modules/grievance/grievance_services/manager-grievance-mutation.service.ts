// RESPONSIBILITY: Owns grievance mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerGrievanceMutationService → ManagerGrievanceRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerGrievanceRepository } from '@/backend_manager/manager_modules/grievance/manager-grievance.repository';
import type { GrievanceDomainData } from '@/backend_manager/manager_modules/grievance/grievance_types/manager-grievance.types';

@Injectable()
export class ManagerGrievanceMutationService {
  constructor(private readonly repository: ManagerGrievanceRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one grievance domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createGrievance(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<GrievanceDomainData> {
    const row = await this.repository.createGrievance(data, context);
    await this.audit.append(context, 'MANAGER.GRIEVANCE.CREATED', 'grievance', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one grievance domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateGrievance(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<GrievanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.GRIEVANCE.UPDATED', 'grievance', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one grievance domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteGrievance(id: string, context: ManagerCoreTransactionContext): Promise<GrievanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.GRIEVANCE.DELETED', 'grievance', id, before.payload, row.payload);
    return row;
  }

}
