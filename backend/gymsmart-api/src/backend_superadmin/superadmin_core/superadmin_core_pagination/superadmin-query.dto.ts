import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the common Superadmin query contract used by feature query controllers.
// FLOW: HTTP query -> SuperadminQueryDto -> feature service/query DTO -> repository allowlist.
import { IsIn, IsOptional, IsString } from 'class-validator';
import { SuperadminCorePaginationQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination-query.dto';

/**
 * Primary Intent: Defines SuperadminQueryDto as the class-level contract for superadmin-query.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminQueryDto extends SuperadminCorePaginationQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `search` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  search?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `status` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `severity` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  severity?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `actorType` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  actorType?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `priority` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  priority?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `from` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  from?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `to` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  to?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `startDate` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  startDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `endDate` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  endDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `range` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  range?: string;




  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `period` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  period?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `gymId` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `filter` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  filter?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `targetVersion` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetVersion?: string;


  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @ApiPropertyOptional({ required: false })
  /** Primary Intent: Defines the `order` data contract for this superadmin-query.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  order?: 'ASC' | 'DESC' | 'asc' | 'desc';

}
