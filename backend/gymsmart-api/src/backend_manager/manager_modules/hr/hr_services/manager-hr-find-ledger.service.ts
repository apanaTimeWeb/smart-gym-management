// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/manager_modules/hr/manager-hr.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerHrFindLedgerServiceFindLedgerResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerHrFindLedgerService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the filtered hr collection for a resource-scoped query. @param staffId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async findLedger(staffId: string, query: ManagerCoreJsonObject = {}): Promise<ManagerHrFindLedgerServiceFindLedgerResult> {
    const result = await this.repository.findAll({ ...query, staffId });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerHrFindLedgerService as HrFindLedgerService };
