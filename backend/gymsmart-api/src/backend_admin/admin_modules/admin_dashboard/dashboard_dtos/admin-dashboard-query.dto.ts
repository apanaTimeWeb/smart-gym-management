// RESPONSIBILITY: Validates and normalizes frontend query/filter parameters for Admin dashboard.
// FLOW: HTTP query â†’ AdminDashboardQueryDto â†’ repository allowlists â†’ PostgreSQL query.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsOptional, IsString, IsIn, IsNumber, IsEnum } from 'class-validator';

import { AdminCorePaginationQueryDto } from '@/backend_admin/admin_core/admin_core_dto/admin-core-pagination-query.dto.js';

import { AdminDashboardStatus, AdminDashboardSeverity } from '@/backend_admin/admin_modules/admin_dashboard/admin-dashboard.constants.js';

/**
 * @description Defines the AdminDashboardQueryDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardQueryDto extends AdminCorePaginationQueryDto {
@ApiPropertyOptional() @IsOptional()
  @IsString()
  branchId?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  gymId?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  range?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  startDate?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  endDate?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminDashboardStatus)
  status?: AdminDashboardStatus;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  priority?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminDashboardSeverity)
  severity?: AdminDashboardSeverity;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  dateRange?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  period?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  month?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  consumer?: string;
}
