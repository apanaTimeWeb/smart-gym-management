// RESPONSIBILITY: Executes Manager member payment recording through the member transaction boundary.
// FLOW: Validated payment DTO -> MembersOrchestratorService -> locked repository mutation -> audit/event.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { MembersOrchestratorService } from '@/backend_manager/manager_modules/members/members_services/manager-members-orchestrator.service';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerMembersAddMemberPaymentService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}
  /**
   * @description Executes create member payment within its declared architectural boundary.
   * @param data - Validated input for the operation.
   * @param id - Validated input for the operation.
   * @returns The orchestrator's typed member payment result.
   * @throws Error when a validation, persistence, transaction, or downstream invariant fails.
   */
  async createMemberPayment(data: ManagerCoreJsonObject, id?: string): ReturnType<MembersOrchestratorService['createMemberPayment']> {
    if (!id) throw new ManagerCoreBusinessException('core.ERRORS.RESOURCE_ID_REQUIRED', 'CORE.RESOURCE.ID_REQUIRED', HttpStatus.BAD_REQUEST);
    return this.orchestrator.createMemberPayment(data, id);
  }
}

export { ManagerMembersAddMemberPaymentService as MembersAddMemberPaymentService };
