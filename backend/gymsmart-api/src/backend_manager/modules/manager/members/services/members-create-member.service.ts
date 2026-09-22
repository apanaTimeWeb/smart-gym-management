// RESPONSIBILITY: Write use-case for POST /api/v1/manager/members.
// FLOW: Controller DTO -> MembersCreateMemberService -> MembersOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { MembersOrchestratorService } from '@/backend_manager/modules/manager/members/services/members-orchestrator.service';

@Injectable()
export class MembersCreateMemberService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createMember(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createMembers(data);
  }
}
