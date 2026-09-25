// RESPONSIBILITY: Validates and normalizes frontend query/filter parameters for Admin blacklist.
// FLOW: HTTP query â†’ AdminBlacklistQueryDto â†’ repository allowlists â†’ PostgreSQL query.
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

import { Type, Transform} from 'class-transformer';
import { IsOptional, IsString, IsIn, IsNumber, IsEnum} from 'class-validator';

import { AdminCorePaginationQueryDto} from '@/backend_admin/admin_core/admin_core_dto/admin-core-pagination-query.dto'

import { AdminBlacklistStatus} from '@/backend_admin/admin_modules/admin_blacklist/admin-blacklist.constants'

/**
 * @description Defines the AdminBlacklistQueryDto boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistQueryDto extends AdminCorePaginationQueryDto {
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
  @IsEnum(AdminBlacklistStatus)
  status?: AdminBlacklistStatus = undefined;

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

