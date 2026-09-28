// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';
import { ManagerMembersMapper } from '@/backend_manager/manager_modules/members/manager-members.mapper';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerMembersFindMemberByIdServiceFindMemberByIdResult extends ManagerCoreJsonObject {}

@Injectable()
export class ManagerMembersFindMemberByIdService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads one members record by its trusted identifier. @param id - Resource UUID. @param query - Additional validated query context. @returns Contract-compatible resource payload. @throws ManagerCoreNotFoundException when the record does not exist. */
  async findMemberById(id: string, query: ManagerCoreJsonObject = {}): Promise<ManagerMembersFindMemberByIdServiceFindMemberByIdResult> {
    void query;
    const row = await this.repository.findByIdOrThrow(id);
    return ManagerMembersMapper.toMember(row);
  }
}

export { ManagerMembersFindMemberByIdService as MembersFindMemberByIdService };
