// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/modules/backend_manager/hr/repositories/hr-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class HrFetchStaffService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the hr collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchStaff(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findHrList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { staff: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
