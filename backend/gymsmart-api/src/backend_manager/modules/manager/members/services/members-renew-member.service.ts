// RESPONSIBILITY: Write use-case for POST /api/v1/manager/members/:id/renew.
// FLOW: Controller DTO -> MembersRenewMemberService -> MembersOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { MembersOrchestratorService } from '@/modules/manager/members/services/members-orchestrator.service';

@Injectable()
export class MembersRenewMemberService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async renewMember(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateMembersById(data, id);
  }
}
