// RESPONSIBILITY: Owns the Manager plans request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerPlansActivateMembershipRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  memberId!: string;

  @IsString()
  @ApiProperty()
  planId!: string;

  @IsISO8601()
  @ApiProperty()
  startDate!: string;

}

export { ManagerPlansActivateMembershipRequestDto as PlansActivateMembershipRequestDto };
