// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerLibraryDietPlanItemResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-diet-plan-item.response.dto';

export class ManagerLibraryFetchDietPlansResponseDto {
  @ApiProperty({ type: [ManagerLibraryDietPlanItemResponseDto] })
  dietPlans?: Array<ManagerLibraryDietPlanItemResponseDto>;

}

export { ManagerLibraryFetchDietPlansResponseDto as LibraryFetchDietPlansResponseDto };
