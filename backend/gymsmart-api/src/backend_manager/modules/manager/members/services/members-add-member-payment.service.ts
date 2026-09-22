// RESPONSIBILITY: Write use-case for POST /api/v1/manager/members/:memberId/payments.
// FLOW: Controller DTO -> MembersAddMemberPaymentService -> MembersOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { MembersOrchestratorService } from '@/backend_manager/modules/manager/members/services/members-orchestrator.service';

@Injectable()
export class MembersAddMemberPaymentService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async addMemberPayment(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createMembers(data);
  }
}
