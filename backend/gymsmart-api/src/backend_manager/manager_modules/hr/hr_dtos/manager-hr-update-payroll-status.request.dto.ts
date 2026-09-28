// RESPONSIBILITY: Owns the Manager hr request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { HrPayrollStatus } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

export class ManagerHrUpdatePayrollStatusRequestDto extends CoreRequestDto {
  @IsEnum(HrPayrollStatus)
  @ApiProperty()
  status!: HrPayrollStatus;

}

export { ManagerHrUpdatePayrollStatusRequestDto as HrUpdatePayrollStatusRequestDto };
