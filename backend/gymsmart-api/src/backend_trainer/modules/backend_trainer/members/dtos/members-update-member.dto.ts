// RESPONSIBILITY: Validates fields the Trainer UI may submit when updating a member.
// FLOW: PATCH /trainer/members/:id → MembersUpdateMemberDto → MembersUpdateService.

import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNumber, IsObject, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { MemberBillingCycle, MemberGender, MemberProgressStatus, MemberStatus } from '@/backend_trainer/modules/backend_trainer/members/members-enums';

export class MembersUpdateMemberDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsEnum(MemberGender) gender?: MemberGender;
  @IsOptional() @IsString() branch?: string;
  @IsOptional() @IsUUID() planId?: string;
  @IsOptional() @IsString() planName?: string;
  @IsOptional() @IsString() planTier?: string;
  @IsOptional() @IsEnum(MemberBillingCycle) billingCycle?: MemberBillingCycle;
  @IsOptional() @IsEnum(MemberStatus) status?: MemberStatus;
  @IsOptional() @IsDateString() joinDate?: string;
  @IsOptional() @IsDateString() expiryDate?: string;
  @IsOptional() @IsNumber() @Min(0) @Max(300) age?: number;
  @IsOptional() @IsNumber() @Min(100) @Max(300) heightCm?: number;
  @IsOptional() @IsNumber() @Min(0) @Max(500) weightKg?: number;
  @IsOptional() @IsNumber() @Min(0) @Max(300) targetWeightKg?: number;
  @IsOptional() @IsNumber() @Min(0) @Max(100) bmi?: number;
  @IsOptional() @IsString() fitnessGoal?: string;
  @IsOptional() @IsString() fitnessLevel?: string;
  @IsOptional() @IsEnum(MemberProgressStatus) progressStatus?: MemberProgressStatus;
  @IsOptional() @IsBoolean() isPT?: boolean;
  @IsOptional() @IsString() medicalRestrictions?: string;
  @IsOptional() @IsNumber() @Min(0) daysSinceLastCheckIn?: number;
  @IsOptional() @IsString() membershipNumber?: string;
  @IsOptional() @IsObject() assessment?: Record<string, unknown>;
  @IsOptional() @IsUUID() assignedDietId?: string;
  @IsOptional() @IsUUID() assignedWorkoutId?: string;
  @IsOptional() @IsObject() assignedDiet?: Record<string, unknown>;
  @IsOptional() @IsObject() assignedWorkout?: Record<string, unknown>;
}
