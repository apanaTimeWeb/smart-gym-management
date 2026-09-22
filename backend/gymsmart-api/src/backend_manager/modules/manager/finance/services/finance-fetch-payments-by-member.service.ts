// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/finance/payments/member/:memberId.
// FLOW: Controller -> FinanceFetchPaymentsByMemberService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { FinanceRepository } from '@/backend_manager/modules/manager/finance/repositories/finance-repository';

@Injectable()
export class FinanceFetchPaymentsByMemberService {
  constructor(private readonly repository: FinanceRepository) {}

  /** @description Loads the filtered finance collection for a resource-scoped query. @param memberId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchPaymentsByMember(memberId: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findFinanceList({ ...query, memberId });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta };
  }
}
