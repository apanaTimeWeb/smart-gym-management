// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { FinanceRepository } from '@/backend_manager/modules/backend_manager/finance/repositories/finance-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class FinanceFetchPaymentsService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Loads the finance collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPayments(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findFinanceList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { payments: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
