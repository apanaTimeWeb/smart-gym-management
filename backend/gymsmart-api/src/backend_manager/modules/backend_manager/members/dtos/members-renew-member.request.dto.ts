// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { ManagerMembersPaymentMethod, MemberBillingCycle } from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersRenewMemberRequestDto extends CoreRequestDto {
  @IsString()
  planId!: string;

  @IsISO8601()
  newExpiryDate!: string;

  @IsNumber()
  @Type(() => Number)
  amountPaid!: number;

  @IsEnum(ManagerMembersPaymentMethod)
  paymentMethod!: ManagerMembersPaymentMethod;

  @IsEnum(MemberBillingCycle)
  billingCycle!: MemberBillingCycle;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customDays!: number;

}
