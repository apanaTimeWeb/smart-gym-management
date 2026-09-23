// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/modules/backend_manager/members/repositories/members-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class MembersFetchMemberStatsService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchMemberStats(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findMembersList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const totalMembers=rows.length;
    return { total:totalMembers, active:rows.filter((row)=>row.status==='ACTIVE').length, expired:rows.filter((row)=>row.status==='EXPIRED').length };
  }
}
