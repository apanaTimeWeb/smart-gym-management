// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { PlansRepository } from '@/backend_manager/manager_modules/plans/manager-plans.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerPlansFindMembershipOverviewServiceFindMembershipOverviewResult {
  activeCount: unknown;
  revenue: unknown;
}

@Injectable()
export class ManagerPlansFindMembershipOverviewService {
  constructor(private readonly repository: PlansRepository) {}

  /** @description Loads the plans collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findMembershipOverview(query:ManagerCoreJsonObject={}):Promise<ManagerPlansFindMembershipOverviewServiceFindMembershipOverviewResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row: any)=>row.payload);
    return { activeCount:rows.filter((row)=>(row).isActive===true || row.status==='ACTIVE').length, revenue:rows.reduce((sum,row)=>sum+Number(row.price ?? row.price12Month ?? 0),0) };
  }
}

export { ManagerPlansFindMembershipOverviewService as PlansFindMembershipOverviewService };
