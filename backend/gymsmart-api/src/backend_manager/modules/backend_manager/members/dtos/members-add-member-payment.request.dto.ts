// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { MemberStatus } from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersAddMemberPaymentRequestDto extends CoreRequestDto {
  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsString()
  method!: string;

  @IsString()
  status!: MemberStatus;

  @IsISO8601()
  paidAt!: string;
}
