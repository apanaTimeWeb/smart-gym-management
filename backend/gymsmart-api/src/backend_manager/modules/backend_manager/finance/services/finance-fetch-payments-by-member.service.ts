// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { FinanceRepository } from '@/backend_manager/modules/backend_manager/finance/repositories/finance-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class FinanceFetchPaymentsByMemberService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Loads the filtered finance collection for a resource-scoped query. @param memberId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchPaymentsByMember(memberId: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findFinanceList({ ...query, memberId });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
