// RESPONSIBILITY: Validates pagination, search, and sorting inputs for the analytics feature.
// FLOW: HTTP query -> class-validator -> SuperadminAnalyticsListQuery.
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
import { IsIn, IsInt, IsOptional, IsString, Max, Min 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';
import { SuperadminCorePaginationQueryDto 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination-query.dto';

/**
 * Primary Intent: Defines SuperadminAnalyticsQueryDto as the class-level contract for superadmin-analytics-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAnalyticsQueryDto extends SuperadminCorePaginationQueryDto {@ApiPropertyOptional()

  /** Optional case-insensitive search text. */
  @IsOptional() @IsString() search?: string;@ApiPropertyOptional()

  /** Allowlisted sort field. */
  @IsOptional() @IsIn(['createdAt','updatedAt']) sortBy = 'createdAt';

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

