// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersOrchestratorService } from '@/backend_manager/manager_modules/members/members_services/manager-members-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerMembersDeleteMemberServiceDeleteMemberResult {
  id: unknown;
}

@Injectable()
export class ManagerMembersDeleteMemberService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteMember(id?: string): Promise<ManagerMembersDeleteMemberServiceDeleteMemberResult> { const result = await this.orchestrator.deleteMember(id); return { id: String(result.id ?? id) }; }
}

export { ManagerMembersDeleteMemberService as MembersDeleteMemberService };
