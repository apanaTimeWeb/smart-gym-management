// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { FinanceRepository } from '@/backend_manager/manager_modules/finance/manager-finance.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerFinanceFindPaymentsServiceFindPaymentsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerFinanceFindPaymentsService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Loads the finance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findPayments(query: ManagerCoreJsonObject = {}): Promise<ManagerFinanceFindPaymentsServiceFindPaymentsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { payments: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerFinanceFindPaymentsService as FinanceFindPaymentsService };
