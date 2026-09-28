// RESPONSIBILITY: Owns the Manager members request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import {IsEmail, IsEnum, IsISO8601, IsInt, IsOptional, IsString, IsUUID, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { MemberBillingCycle, MemberGender, MemberStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';

export class ManagerMembersUpdateMemberRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @Matches(/^\d{10}$/) phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @Matches(/^\d{12}$/) aadhaar?: string;
  @IsOptional() @IsEnum(MemberGender) gender?: MemberGender;
  @IsOptional() @IsEnum(MemberBillingCycle) billingCycle?: MemberBillingCycle;
  @IsOptional() @IsInt() @Min(0) customDays?: number;
  @IsOptional() @IsUUID() planId?: string;
  @IsOptional() @IsInt() @Min(0) totalAmount?: number;
  @IsOptional() @IsInt() @Min(0) paidAmount?: number;
  @IsOptional() @IsInt() @Min(0) pendingAmount?: number;
  @IsOptional() @IsInt() @Min(0) advanceAmount?: number;
  @IsOptional() @IsISO8601() joinDate?: string;
  @IsOptional() @IsISO8601() expiryDate?: string;
  @IsOptional() @IsString() medicalHistory?: string;
  @IsOptional() @IsEnum(MemberStatus) status?: MemberStatus;
}

export { ManagerMembersUpdateMemberRequestDto as MembersUpdateMemberRequestDto };
