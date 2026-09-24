// RESPONSIBILITY: Defines the stable response data contract for global-audit endpoints.
// FLOW: Domain model -> SuperadminGlobalAuditResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminGlobalAuditResponseDto as the class-level contract for superadmin-global-audit-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGlobalAuditResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `actorId` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  actorId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `actorRole` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  actorRole!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `action` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  action!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `entityType` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  entityType!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `entityId` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  entityId!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `oldValue` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  oldValue!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `newValue` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  newValue!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `ipAddress` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  ipAddress!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-global-audit-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string | null;
}
