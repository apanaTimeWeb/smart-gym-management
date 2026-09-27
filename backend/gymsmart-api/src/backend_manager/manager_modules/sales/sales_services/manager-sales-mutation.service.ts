// RESPONSIBILITY: Owns sales mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerSalesMutationService → ManagerSalesRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerSalesRepository } from '@/backend_manager/manager_modules/sales/manager-sales.repository';
import type { SalesDomainData } from '@/backend_manager/manager_modules/sales/sales_types/manager-sales.types';

@Injectable()
export class ManagerSalesMutationService {
  constructor(private readonly repository: ManagerSalesRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one sales domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createSales(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<SalesDomainData> {
    const row = await this.repository.createSales(data, context);
    await this.audit.append(context, 'MANAGER.SALES.CREATED', 'sales', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one sales domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateSales(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<SalesDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.SALES.UPDATED', 'sales', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one sales domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteSales(id: string, context: ManagerCoreTransactionContext): Promise<SalesDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.SALES.DELETED', 'sales', id, before.payload, row.payload);
    return row;
  }

}
