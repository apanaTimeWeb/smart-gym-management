// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { HrRepository } from '@/backend_manager/manager_modules/hr/manager-hr.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerHrFindStaffServiceFindStaffResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerHrFindStaffService {
  constructor(private readonly repository: HrRepository) {}

  /** @description Loads the hr collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findStaff(query: ManagerCoreJsonObject = {}): Promise<ManagerHrFindStaffServiceFindStaffResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { staff: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerHrFindStaffService as HrFindStaffService };
