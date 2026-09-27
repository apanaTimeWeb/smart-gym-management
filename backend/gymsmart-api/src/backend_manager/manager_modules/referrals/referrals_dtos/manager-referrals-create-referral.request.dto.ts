// RESPONSIBILITY: Owns the Manager referrals request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerReferralsCreateReferralRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  referrerName!: string;

  @IsString()
  @ApiProperty()
  referrerId!: string;

  @IsString()
  @ApiProperty()
  refereeName!: string;

  @IsString()
  @ApiProperty()
  refereePhone!: string;

}

export { ManagerReferralsCreateReferralRequestDto as ReferralsCreateReferralRequestDto };
