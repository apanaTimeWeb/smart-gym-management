// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerMembersFindMemberStatsServiceFindMemberStatsResult {
  total: unknown;
  active: unknown;
  expired: unknown;
}

@Injectable()
export class ManagerMembersFindMemberStatsService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findMemberStats(query:ManagerCoreJsonObject={}):Promise<ManagerMembersFindMemberStatsServiceFindMemberStatsResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const totalMembers=rows.length;
    return { total:totalMembers, active:rows.filter((row)=>row.status==='ACTIVE').length, expired:rows.filter((row)=>row.status==='EXPIRED').length };
  }
}

export { ManagerMembersFindMemberStatsService as MembersFindMemberStatsService };
