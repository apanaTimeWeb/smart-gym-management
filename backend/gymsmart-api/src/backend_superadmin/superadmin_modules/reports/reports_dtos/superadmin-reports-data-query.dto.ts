import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
// RESPONSIBILITY: Validates optional filters used by the report list endpoints.
// FLOW: HTTP query -> DTO validation -> report data service.
import { IsISO8601, IsOptional, IsString} from 'class-validator';

/**
 * Primary Intent: Defines SuperadminReportsDataQueryDto as the class-level contract for superadmin-reports-data-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminReportsDataQueryDto {
  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional({ required: false})
  /** Primary Intent: Defines the `from` data contract for this superadmin-reports-data-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  from?: string;

  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional({ required: false})
  /** Primary Intent: Defines the `to` data contract for this superadmin-reports-data-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  to?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false})
  /** Primary Intent: Defines the `plan` data contract for this superadmin-reports-data-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  plan?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false})
  /** Primary Intent: Defines the `region` data contract for this superadmin-reports-data-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  region?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  preset?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  timeRange?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  customStart?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  customEnd?: string;
}

