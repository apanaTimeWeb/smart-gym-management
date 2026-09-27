// RESPONSIBILITY: Owns the Manager hr request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Matches } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerHrGeneratePayrollsRequestDto extends CoreRequestDto {
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/)
  @ApiProperty()
  month!: string;

}

export { ManagerHrGeneratePayrollsRequestDto as HrGeneratePayrollsRequestDto };
