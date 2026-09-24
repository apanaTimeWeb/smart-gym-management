// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminReportsComparisonResponseDto as the class-level contract for superadmin-reports-comparison-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminReportsComparisonResponseDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-reports-comparison-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;
  @ApiProperty()
  periods!: Array<{ key: string; label: string }>;
  @ApiProperty()
  segments!: Array<{ key: string; label: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `metrics` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  metrics!: Array<{ name: string; current: number; previous: number; change: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `planComparison` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  planComparison!: Array<{ name: string; income: number; gyms: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `regionComparison` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  regionComparison!: Array<{ name: string; current: number; previous: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `comparisonSets` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  comparisonSets!: Array<{ periodKey: string; segmentKey: string; metrics: Array<{ name: string; current: number; previous: number; change: number }> }>;
}
