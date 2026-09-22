import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { MemberStatus } from '@/modules/manager/members/members.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/members/:memberId/payments.
// FLOW: HTTP payload -> MembersAddMemberPaymentRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
