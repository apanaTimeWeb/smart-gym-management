// RESPONSIBILITY: Validates and normalizes frontend query/filter parameters for Admin sales.
// FLOW: HTTP query â†’ AdminSalesQueryDto â†’ repository allowlists â†’ PostgreSQL query.
import { ApiProperty, ApiPropertyOptional 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@nestjs/swagger';

import { Type, Transform 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-transformer';
import { IsOptional, IsString, IsIn, IsNumber, IsEnum 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';

import { AdminCorePaginationQueryDto 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_admin/admin_core/admin_core_dto/admin-core-pagination-query.dto'

import { AdminSalesStatus 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_admin/admin_modules/admin_sales/admin-sales.constants'

/**
 * @description Defines the AdminSalesQueryDto boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesQueryDto extends AdminCorePaginationQueryDto {
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
  @Transform(({ value 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminSalesStatus)
  status?: AdminSalesStatus;

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
  consumer?: string;

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

