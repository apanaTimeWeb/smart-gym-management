import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/members/:id/renew.
// FLOW: HTTP payload -> MembersRenewMemberRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MembersRenewMemberRequestDto extends CoreRequestDto {
  @IsString()
  planId!: string;

  @IsISO8601()
  newExpiryDate!: string;

  @IsNumber()
  @Type(() => Number)
  amountPaid!: number;

  @IsString()
  paymentMethod!: ManagerMembersPaymentMethod;

  @IsString()
  billingCycle!: MemberBillingCycle;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customDays?: number;

}
