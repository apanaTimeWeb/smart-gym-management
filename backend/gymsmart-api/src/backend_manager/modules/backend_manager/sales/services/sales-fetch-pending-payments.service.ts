// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { SalesRepository } from '@/backend_manager/modules/backend_manager/sales/repositories/sales-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class SalesFetchPendingPaymentsService {
  constructor(private readonly repository: SalesRepository) {}

  /** @description Loads the sales collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPendingPayments(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findSalesList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { members: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
