// RESPONSIBILITY: Validates partial progress-entry updates while preserving the create-field contract.
// FLOW: HTTP PATCH body → ProgressTrackingUpdateProgressEntryDto → progress command service.

import { IsArray, IsDateString, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class ProgressTrackingUpdateProgressEntryDto {
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsNumber() @Min(30) @Max(300) weightKg?: number;
  @IsOptional() @IsNumber() @Min(100) @Max(300) heightCm?: number;
  @IsOptional() @IsNumber() @Min(3) @Max(60) bodyFatPercent?: number;
  @IsOptional() @IsNumber() @Min(10) @Max(150) muscleMassKg?: number;
  @IsOptional() @IsNumber() chestCm?: number;
  @IsOptional() @IsNumber() waistCm?: number;
  @IsOptional() @IsNumber() hipCm?: number;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() bloodPressure?: string;
  @IsOptional() @IsNumber() restingHeartRate?: number;
  @IsOptional() @IsNumber() vo2Max?: number;
  @IsOptional() @IsArray() progressPhotos?: string[];
}
