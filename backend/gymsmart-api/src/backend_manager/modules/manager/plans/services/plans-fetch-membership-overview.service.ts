// RESPONSIBILITY: Read use-case for GET /api/v1/manager/plans/membership-overview.
// FLOW: Controller -> PlansFetchMembershipOverviewService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { PlansRepository } from '@/modules/manager/plans/repositories/plans-repository';

@Injectable()
export class PlansFetchMembershipOverviewService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads the plans collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchMembershipOverview(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findPlansList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { memberOptions: rows,  }, meta: result.meta };
  }
}
