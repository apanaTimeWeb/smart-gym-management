// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PtRepository } from '@/backend_manager/manager_modules/pt/manager-pt.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerPtFindAssignmentsServiceFindAssignmentsResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerPtFindAssignmentsService {
  constructor(private readonly repository: PtRepository) {}

  /** @description Loads the pt collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findAssignments(query: ManagerCoreJsonObject = {}): Promise<ManagerPtFindAssignmentsServiceFindAssignmentsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    return { data: { assignments: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerPtFindAssignmentsService as PtFindAssignmentsService };
