// RESPONSIBILITY: Owns reports mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerReportsMutationService → ManagerReportsRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerReportsRepository } from '@/backend_manager/manager_modules/reports/manager-reports.repository';
import type { ManagerReportsDomainData } from '@/backend_manager/manager_modules/reports/reports_types/manager-reports.types';

@Injectable()
export class ManagerReportsMutationService {
  constructor(private readonly repository: ManagerReportsRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one reports domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createReports(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerReportsDomainData> {
    const row = await (this.repository as any).createReports(data, context);
    await this.audit.append(context, 'MANAGER.REPORTS.CREATED', 'reports', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one reports domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateReports(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerReportsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.REPORTS.UPDATED', 'reports', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one reports domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteReports(id: string, context: ManagerCoreTransactionContext): Promise<ManagerReportsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.REPORTS.DELETED', 'reports', id, before.payload, row.payload);
    return row;
  }

}
