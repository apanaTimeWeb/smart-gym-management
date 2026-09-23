// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class PlansFreezeMembershipRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  freezeFrom!: string;

  @IsString()
  freezeUntil!: string;

}
