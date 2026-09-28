// RESPONSIBILITY: Validates fields the Trainer UI may submit when updating a member.
// FLOW: PATCH /trainer/members/:id → TrainerMembersUpdateMemberDto → TrainerMembersUpdateService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNumber, IsObject, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { MemberBillingCycle, MemberGender, MemberProgressStatus, MemberStatus } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enums';

import { TrainerMembersEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enum.mapper';

/**
 * Intent: Defines the TrainerMembersUpdateMemberDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersUpdateMemberDto {
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() name?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() address?: string;
  @ApiPropertyOptional({ enum: MemberGender })
@IsOptional() @IsEnum(MemberGender) gender?: MemberGender;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() branch?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsUUID() planId?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() planName?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() planTier?: string;
  @ApiPropertyOptional({ enum: MemberBillingCycle })
@IsOptional() @Transform(({value}) => TrainerMembersEnumMapper.toBilling(value)) @IsEnum(MemberBillingCycle) billingCycle?: MemberBillingCycle;
  @ApiPropertyOptional({ enum: MemberStatus })
@IsOptional() @Transform(({value}) => TrainerMembersEnumMapper.toStatus(value)) @IsEnum(MemberStatus) status?: MemberStatus;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() joinDate?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() expiryDate?: string;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(0) @Max(300) age?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(100) @Max(300) heightCm?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(0) @Max(500) weightKg?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(0) @Max(300) targetWeightKg?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(0) @Max(100) bmi?: number;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() fitnessGoal?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() fitnessLevel?: string;
  @ApiPropertyOptional({ enum: MemberProgressStatus })
@IsOptional() @Transform(({value}) => TrainerMembersEnumMapper.toProgress(value)) @IsEnum(MemberProgressStatus) progressStatus?: MemberProgressStatus;
  @ApiPropertyOptional({ type: Boolean })
@IsOptional() @IsBoolean() isPT?: boolean;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() medicalRestrictions?: string;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(0) daysSinceLastCheckIn?: number;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() membershipNumber?: string;
  @ApiPropertyOptional({ type: Object })
@IsOptional() @IsObject() assessment?: Record<string, unknown>;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsUUID() assignedDietId?: string;
  // Accepted for frontend contract parity; the service ignores client snapshots and resolves authoritative values from IDs.
  @ApiPropertyOptional({ type: Object })
@IsOptional() @IsObject() assignedDiet?: Record<string, unknown>;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsUUID() assignedWorkoutId?: string;
  // Accepted for frontend contract parity; the service ignores client snapshots and resolves authoritative values from IDs.
  @ApiPropertyOptional({ type: Object })
@IsOptional() @IsObject() assignedWorkout?: Record<string, unknown>;
}
