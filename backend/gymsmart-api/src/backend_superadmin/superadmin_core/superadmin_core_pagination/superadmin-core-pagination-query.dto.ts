// RESPONSIBILITY: Defines the canonical pagination query contract shared by every paginated feature.
// FLOW: HTTP query -> SuperadminCorePaginationQueryDto -> feature query DTO -> repository.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminCorePaginationQueryDto as the class-level contract for superadmin-core-pagination-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminCorePaginationQueryDto {@ApiPropertyOptional()

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;@ApiPropertyOptional()

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @ApiProperty()
  /** Primary Intent: Defines the `sortOrder` data contract for this superadmin-core-pagination-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sortOrder: 'ASC' | 'DESC' = 'DESC';@ApiPropertyOptional()

  @IsOptional()
  sortBy = 'createdAt';
}

