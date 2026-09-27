// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansRepository } from '@/backend_manager/manager_modules/plans/manager-plans.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerPlansFindPlansServiceFindPlansResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerPlansFindPlansService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads the plans collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findPlans(query: ManagerCoreJsonObject = {}): Promise<ManagerPlansFindPlansServiceFindPlansResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { plans: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerPlansFindPlansService as PlansFindPlansService };
