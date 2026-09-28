// RESPONSIBILITY: Validates member payment recording requests at the Manager feature boundary.
// FLOW: HTTP payload -> strict DTO validation -> member payment orchestration -> repository mutation.
import { IsEnum, IsISO8601, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';
import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';
import { ManagerMembersPaymentMethod, ManagerMembersPaymentStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersAddMemberPaymentRequestDto extends CoreRequestDto {
  @IsInt() @Min(0) amount!: number;
  @IsString() @IsEnum(ManagerMembersPaymentMethod) method!: ManagerMembersPaymentMethod;
  @IsEnum(ManagerMembersPaymentStatus) status!: ManagerMembersPaymentStatus;
  @IsISO8601() paidAt!: string;
  @Matches(/^[A-Z]{3}$/) currency!: string;
  @IsOptional() @IsString() invoiceNumber?: string;
}

export { ManagerMembersAddMemberPaymentRequestDto as MembersAddMemberPaymentRequestDto };
