// RESPONSIBILITY: Owns member diet-plan assignment business behavior for the Manager feature.
// FLOW: Request DTO -> focused orchestrator method -> locked member mutation -> audit/event -> canonical response.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

import { MembersOrchestratorService } from '@/backend_manager/manager_modules/members/members_services/manager-members-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerMembersAssignDietPlanService {
  constructor(private readonly orchestrator: MembersOrchestratorService) {}

  /** @description Assigns a diet plan to the existing member resource. @param data - Validated assignment payload. @param id - Member UUID from the route. @returns Success contract. */
  async assignDietPlan(data: ManagerCoreJsonObject, id?: string): Promise<{ success: boolean }> {
    if (!id) throw new ManagerCoreContextException('Member id is required.', 'MEMBERS.MEMBER.ID_REQUIRED', HttpStatus.BAD_REQUEST);
    return this.orchestrator.assignDietPlan(data, id);
  }
}

export { ManagerMembersAssignDietPlanService as MembersAssignDietPlanService };
