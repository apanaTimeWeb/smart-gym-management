// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerMembersFindMemberTrainersServiceFindMemberTrainersResult {
  staff: unknown[];
}

@Injectable()
export class ManagerMembersFindMemberTrainersService {
  constructor(private readonly repository: MembersRepository) {}

  /** @description Loads the members collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findMemberTrainers(query: ManagerCoreJsonObject = {}): Promise<ManagerMembersFindMemberTrainersServiceFindMemberTrainersResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { staff: rows };
  }
}

export { ManagerMembersFindMemberTrainersService as MembersFindMemberTrainersService };
