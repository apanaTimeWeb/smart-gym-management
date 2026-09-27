// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { HrPayrollItemResponseDto } from '@/backend_manager/manager_modules/hr/hr_responses/manager-hr-payroll-item.response.dto';

export class ManagerHrFetchPayrollsResponseDto {
  @ApiProperty({ type: [HrPayrollItemResponseDto] })
  payrolls?: Array<HrPayrollItemResponseDto>;
}

export { ManagerHrFetchPayrollsResponseDto as HrFetchPayrollsResponseDto };
