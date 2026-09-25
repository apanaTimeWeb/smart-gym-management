// RESPONSIBILITY: Validates mutation fields exposed by the Admin notifications frontend contract.
// FLOW: HTTP request body â†’ AdminNotificationsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';

import { AdminNotificationsSeverity } from '@/backend_admin/admin_modules/admin_notifications/admin-notifications.constants.js';

/**
 * @description Defines the AdminNotificationsMutationDto boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  title?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  body?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminNotificationsSeverity)
  severity?: AdminNotificationsSeverity;

@ApiPropertyOptional() @IsOptional()
  @IsBoolean()
  read?: boolean;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  branchId?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  branchName?: string;
}
