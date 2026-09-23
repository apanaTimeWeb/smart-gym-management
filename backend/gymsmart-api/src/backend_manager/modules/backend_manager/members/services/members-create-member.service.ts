// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { MembersOrchestratorService } from '@/backend_manager/modules/backend_manager/members/services/members-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class MembersCreateMemberService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createMember(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createMembers(data);
  }
}
