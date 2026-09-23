// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEmail, IsEnum, IsISO8601, IsOptional, IsString, Matches, Min, IsUUID, IsInt } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { MemberBillingCycle, MemberGender, MemberStatus } from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersCreateMemberRequestDto extends CoreRequestDto {
  @IsString() name!: string;
  @IsOptional() @IsEmail() email?: string;
  @IsString() @Matches(/^\d{10}$/) phone!: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @Matches(/^\d{12}$/) aadhaar?: string;
  @IsEnum(MemberGender) gender!: MemberGender;
  @IsEnum(MemberBillingCycle) billingCycle!: MemberBillingCycle;
  @IsOptional() @IsInt() @Min(0) customDays?: number;
  @IsUUID() planId!: string;
  @IsOptional() @IsInt() @Min(0) totalAmount?: number;
  @IsOptional() @IsInt() @Min(0) paidAmount?: number;
  @IsOptional() @IsInt() @Min(0) pendingAmount?: number;
  @IsOptional() @IsInt() @Min(0) advanceAmount?: number;
  @IsOptional() @IsISO8601() joinDate?: string;
  @IsOptional() @IsISO8601() expiryDate?: string;
  @IsOptional() @IsString() medicalHistory?: string;
  @IsOptional() @IsEnum(MemberStatus) status?: MemberStatus;
}
