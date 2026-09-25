// RESPONSIBILITY: Validates mutation fields exposed by the Admin gym-health-alerts frontend contract.
// FLOW: HTTP request body â†’ AdminGymHealthAlertsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';

import { AdminGymHealthAlertsSeverity } from '@/backend_admin/admin_modules/admin_gym-health-alerts/admin-gym-health-alerts.constants'

/**
 * @description Defines the AdminGymHealthAlertsMutationDto boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymId?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  gymName?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  alertType?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminGymHealthAlertsSeverity)
  severity?: AdminGymHealthAlertsSeverity;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  title?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  description?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  metric?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  threshold?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  detectedAt?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  isResolved?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  resolvedAt?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  alertAge?: string;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  assignedTo?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  snoozeUntil?: string;
}
