// RESPONSIBILITY: Defines the stable response data contract for white-labeling endpoints.
// FLOW: Domain model -> SuperadminWhiteLabelingResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminWhiteLabelingResponseDto as the class-level contract for superadmin-white-labeling-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminWhiteLabelingResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `gymId` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `gymName` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `domain` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  domain!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `sslStatus` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sslStatus!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `logoUrl` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  logoUrl!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `primaryColor` data contract for this superadmin-white-labeling-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  primaryColor!: string | null;
}
