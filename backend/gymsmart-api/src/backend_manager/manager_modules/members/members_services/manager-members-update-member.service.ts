// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersOrchestratorService } from '@/backend_manager/manager_modules/members/members_services/manager-members-orchestrator.service';
import { MembersResponseMapper } from '@/backend_manager/manager_modules/members/members_mappers/manager-members-response.mapper';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerMembersUpdateMemberServiceUpdateMemberResult extends ManagerCoreJsonObject {}

@Injectable()
export class ManagerMembersUpdateMemberService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateMember(data: ManagerCoreJsonObject, id?: string): Promise<ManagerMembersUpdateMemberServiceUpdateMemberResult> {
    return MembersResponseMapper.toMember(await this.orchestrator.updateMember(data, id));
  }
}

export { ManagerMembersUpdateMemberService as MembersUpdateMemberService };
