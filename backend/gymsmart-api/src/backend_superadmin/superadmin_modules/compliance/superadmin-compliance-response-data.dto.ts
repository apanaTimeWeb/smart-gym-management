// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminComplianceResponseDataDto as the class-level contract for superadmin-compliance-response-data.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminComplianceResponseDataDto {
  @ApiProperty()
  summary!: { registeredTenants: number; missingTaxDetails: number; documentsExpiring: number; openComplianceTasks: number };
  @ApiProperty()
  regions!: Array<{ region: string; registered: number; missing: number; taxRate: number; status: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `documents` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  documents!: Array<{ tenant: string; document: string; status: string; expires: string | null }>;
}
