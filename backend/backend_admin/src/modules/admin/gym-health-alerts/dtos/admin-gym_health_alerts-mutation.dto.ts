// RESPONSIBILITY: Validates mutation fields exposed by the Admin gym-health-alerts frontend contract.
// FLOW: HTTP request body → AdminGymHealthAlertsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminGymHealthAlertsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymId?: number;

  @IsOptional()
  @IsString()
  gymName?: string;

  @IsOptional()
  @IsString()
  alertType?: string;

  @IsOptional()
  @IsString()
  severity?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  metric?: string;

  @IsOptional()
  @IsString()
  threshold?: string;

  @IsOptional()
  @IsString()
  detectedAt?: string;

  @IsOptional()
  @IsString()
  isResolved?: string;

  @IsOptional()
  @IsString()
  resolvedAt?: string;

  @IsOptional()
  @IsString()
  alertAge?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  assignedTo?: number;

  @IsOptional()
  @IsString()
  snoozeUntil?: string;
}
