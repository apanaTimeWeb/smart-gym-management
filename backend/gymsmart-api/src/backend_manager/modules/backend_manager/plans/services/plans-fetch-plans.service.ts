// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansRepository } from '@/backend_manager/modules/backend_manager/plans/repositories/plans-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class PlansFetchPlansService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads the plans collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPlans(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findPlansList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { plans: rows, total: result.meta.total }, meta: result.meta  } as any;
  }
}
