// RESPONSIBILITY: Defines the stable response data contract for features endpoints.
// FLOW: Domain model -> SuperadminFeaturesResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminFeaturesResponseDto as the class-level contract for superadmin-features-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `name` data contract for this superadmin-features-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `description` data contract for this superadmin-features-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `isGlobalEnabled` data contract for this superadmin-features-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  isGlobalEnabled!: boolean;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `enabledTenantIds` data contract for this superadmin-features-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  enabledTenantIds!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `notes` data contract for this superadmin-features-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  notes!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `history` data contract for this superadmin-features-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  history!: Record<string, unknown> | unknown[] | null;
}
