// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/modules/backend_manager/hr/repositories/hr-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class HrFetchLedgerService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the filtered hr collection for a resource-scoped query. @param staffId - Resource or related identifier. @param query - Validated pagination/filter query. @returns Canonical paginated collection payload. */
  async fetchLedger(staffId: string, query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findHrList({ ...query, staffId });
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { items: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
