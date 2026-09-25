// RESPONSIBILITY: Validates mutation fields exposed by the Admin audit_logs frontend contract.
// FLOW: HTTP request body â†’ AdminAuditLogsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';

import { AdminAuditLogsSeverity } from '@/backend_admin/admin_modules/admin_audit_logs/admin-audit-logs.constants.js';

/**
 * @description Defines the AdminAuditLogsMutationDto boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  timestamp?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  action?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  user?: string;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  branchId?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  details?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminAuditLogsSeverity)
  severity?: AdminAuditLogsSeverity;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  module?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  userAgent?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  affectedRecordId?: string;
}
