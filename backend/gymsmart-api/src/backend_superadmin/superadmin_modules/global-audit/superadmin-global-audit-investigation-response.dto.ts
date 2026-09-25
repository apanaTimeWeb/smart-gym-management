// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminGlobalAuditInvestigationResponseDto as the class-level contract for superadmin-global-audit-investigation-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGlobalAuditInvestigationResponseDto {
  @ApiProperty()
  changes!: Array<{ time: string; actor: string; action: string; resource: string; before: string; after: string; risk: string }>;
  @ApiProperty()
  anomalies!: Array<{ title: string; detail: string; severity: string }>;
  @ApiProperty()
  /** Primary Intent: Defines the `filters` data contract for this superadmin-global-audit-investigation-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  filters!: string[];
}
