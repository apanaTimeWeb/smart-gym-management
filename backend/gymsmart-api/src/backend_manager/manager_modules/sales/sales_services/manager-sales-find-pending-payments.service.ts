// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { SalesRepository } from '@/backend_manager/manager_modules/sales/manager-sales.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerSalesFindPendingPaymentsServiceFindPendingPaymentsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerSalesFindPendingPaymentsService {
  constructor(private readonly repository: SalesRepository) {}

  /** @description Loads the sales collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findPendingPayments(query: ManagerCoreJsonObject = {}): Promise<ManagerSalesFindPendingPaymentsServiceFindPendingPaymentsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { members: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerSalesFindPendingPaymentsService as SalesFindPendingPaymentsService };
