// RESPONSIBILITY: Validates partial progress-entry updates while preserving the create-field contract.
// FLOW: HTTP PATCH body → TrainerProgressTrackingUpdateProgressEntryDto → progress command service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';


/**
 * Intent: Defines the TrainerProgressTrackingUpdateProgressEntryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerProgressTrackingUpdateProgressEntryDto {
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() date?: string;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(30) @Max(300) weightKg?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(100) @Max(300) heightCm?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(3) @Max(60) bodyFatPercent?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() @Min(10) @Max(150) muscleMassKg?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() chestCm?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() waistCm?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() hipCm?: number;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() bloodPressure?: string;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() restingHeartRate?: number;
  @ApiPropertyOptional({ type: Number })
@IsOptional() @IsNumber() vo2Max?: number;
  @ApiPropertyOptional({ type: [String] })
@IsOptional() @IsArray() progressPhotos?: string[];
}
