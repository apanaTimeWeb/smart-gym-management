// RESPONSIBILITY: Validates and standardizes paginated list query parameters.
// FLOW: HTTP query â†’ AdminCorePaginationQueryDto â†’ feature query DTO â†’ repository query.
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

import { Type} from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';

/**
 * @description Defines the AdminCorePaginationQueryDto boundary for the admin_core_dto backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCorePaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 25;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  search?: string = undefined;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  sortKey?: string;

@ApiPropertyOptional() @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortDir?: 'ASC' | 'DESC' = 'DESC';
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  status?: string = undefined;

  @ApiPropertyOptional() @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order?: string = undefined;

  @ApiPropertyOptional() @IsOptional() @IsString()
  plan?: string = undefined;

  @ApiPropertyOptional() @IsOptional() @IsString()
  region?: string = undefined;

  @ApiPropertyOptional() @IsOptional() @IsString()
  type?: string = undefined;

  @ApiPropertyOptional() @IsOptional() @IsString()
  sort?: string = undefined;

  @ApiPropertyOptional() @IsOptional() @IsString()
  sortBy?: string = undefined;
}


