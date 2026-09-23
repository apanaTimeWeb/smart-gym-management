// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class ReferralsCreateReferralRequestDto extends CoreRequestDto {
  @IsString()
  referrerName!: string;

  @IsString()
  referrerId!: string;

  @IsString()
  refereeName!: string;

  @IsString()
  refereePhone!: string;

}
