// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansRepository } from '@/backend_manager/modules/backend_manager/plans/repositories/plans-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class PlansFetchMembershipOverviewService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads the plans collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchMembershipOverview(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findPlansList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    return { activeCount:rows.filter((row)=>(row as any).isActive===true || row.status==='ACTIVE').length, revenue:rows.reduce((sum,row)=>sum+Number(row.price ?? row.price12Month ?? 0),0) };
  }
}
