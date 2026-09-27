// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { PlansPlanItemResponseDto } from '@/backend_manager/manager_modules/plans/plans_responses/manager-plans-plan-item.response.dto';

export class ManagerPlansFetchPlansResponseDto {
  @ApiProperty({ type: [PlansPlanItemResponseDto] })
  plans?: Array<PlansPlanItemResponseDto>;
}

export { ManagerPlansFetchPlansResponseDto as PlansFetchPlansResponseDto };
