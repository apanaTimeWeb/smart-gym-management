// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { HrStaffItemResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-staff-item.response.dto';

export class ManagerHrFetchStaffResponseDto {
  @ApiProperty({ type: [HrStaffItemResponseDto] })
  staff?: Array<HrStaffItemResponseDto>;

}

export { ManagerHrFetchStaffResponseDto as HrFetchStaffResponseDto };
