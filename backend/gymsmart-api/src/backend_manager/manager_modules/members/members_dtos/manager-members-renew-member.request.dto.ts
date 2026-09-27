// RESPONSIBILITY: Validates Manager membership-renewal requests.
// FLOW: HTTP payload -> DTO validation -> renewal orchestration -> atomic member/payment writes.
import { IsEnum, IsISO8601, IsInt, IsOptional, IsString, IsUUID, Matches, Min } from 'class-validator';
import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';
import { ManagerMembersPaymentMethod, MemberBillingCycle } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersRenewMemberRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/) currency!: string;
  @IsUUID() planId!: string;
  @IsISO8601() newExpiryDate!: string;
  @IsInt() @Min(0) amountPaid!: number;
  @IsEnum(ManagerMembersPaymentMethod) paymentMethod!: ManagerMembersPaymentMethod;
  @IsEnum(MemberBillingCycle) billingCycle!: MemberBillingCycle;
  @IsOptional() @IsInt() @Min(0) customDays?: number;
}

export { ManagerMembersRenewMemberRequestDto as MembersRenewMemberRequestDto };
