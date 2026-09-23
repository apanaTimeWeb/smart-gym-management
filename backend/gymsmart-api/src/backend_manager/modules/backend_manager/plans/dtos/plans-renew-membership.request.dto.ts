// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class PlansRenewMembershipRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  planId!: string;

  @IsISO8601()
  newExpiryDate!: string;

}
