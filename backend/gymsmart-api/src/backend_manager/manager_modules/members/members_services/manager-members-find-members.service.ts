// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';
import { MembersResponseMapper } from '@/backend_manager/manager_modules/members/members_mappers/manager-members-response.mapper';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PaginationMeta } from '@/backend_manager/manager_core/manager_core_types/manager-core-pagination.types';

export interface ManagerMembersFindMembersServiceFindMembersResult {
  data: unknown;
  meta: PaginationMeta;
}

@Injectable()
export class ManagerMembersFindMembersService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findMembers(query: ManagerCoreJsonObject = {}): Promise<ManagerMembersFindMembersServiceFindMembersResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => MembersResponseMapper.toMember(row));
    return { data: { members: rows, total: result.meta.total }, meta: result.meta  };
  }
}

export { ManagerMembersFindMembersService as MembersFindMembersService };
