// RESPONSIBILITY: Validates and normalizes frontend query/filter parameters for Admin settings.
// FLOW: HTTP query â†’ AdminSettingsQueryDto â†’ repository allowlists â†’ PostgreSQL query.
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

import { Type, Transform} from 'class-transformer';
import { IsOptional, IsString, IsIn, IsNumber, IsEnum} from 'class-validator';

import { AdminCorePaginationQueryDto} from '@/backend_admin/admin_core/admin_core_dto/admin-core-pagination-query.dto'

import { AdminSettingsStatus} from '@/backend_admin/admin_modules/admin_settings/admin-settings.constants'

/**
 * @description Defines the AdminSettingsQueryDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsQueryDto extends AdminCorePaginationQueryDto {
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
  @Transform(({ value}) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminSettingsStatus)
  status?: AdminSettingsStatus;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  priority?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  severity?: string;

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
  consumer?: string;}

