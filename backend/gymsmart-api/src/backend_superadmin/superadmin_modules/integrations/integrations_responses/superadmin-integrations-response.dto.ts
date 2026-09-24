// RESPONSIBILITY: Defines the stable response data contract for integrations endpoints.
// FLOW: Domain model -> SuperadminIntegrationsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminIntegrationsResponseDto as the class-level contract for superadmin-integrations-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-integrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `label` data contract for this superadmin-integrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  label!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-integrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `lastUsed` data contract for this superadmin-integrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastUsed!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `rateLimit` data contract for this superadmin-integrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  rateLimit!: number;
}
