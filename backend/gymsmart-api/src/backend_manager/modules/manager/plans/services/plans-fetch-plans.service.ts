// RESPONSIBILITY: Read use-case for GET /api/v1/manager/plans.
// FLOW: Controller -> PlansFetchPlansService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PlansRepository } from '@/modules/manager/plans/repositories/plans-repository';

@Injectable()
export class PlansFetchPlansService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads the plans collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchPlans(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findPlansList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { plans: rows, total: result.meta.total }, meta: result.meta };
  }
}
