// RESPONSIBILITY: Defines the stable response data contract for settings endpoints.
// FLOW: Domain model -> SuperadminSettingsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSettingsResponseDto as the class-level contract for superadmin-settings-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSettingsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `key` data contract for this superadmin-settings-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  key!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `value` data contract for this superadmin-settings-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  value!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `description` data contract for this superadmin-settings-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `category` data contract for this superadmin-settings-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  category!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `dataType` data contract for this superadmin-settings-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  dataType!: string;
}
