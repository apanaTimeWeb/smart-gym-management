// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminAnalyticsRetentionInsightsResponseDto as the class-level contract for superadmin-analytics-retention-insights-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAnalyticsRetentionInsightsResponseDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-analytics-retention-insights-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;

  @ApiProperty()
  metrics!: { existingIncomeRetained: number; grossIncomeRetained: number; gymRetention: number; revenueLost: number; customerChurn: number };
  @ApiProperty()
  /**
   * Primary Intent: Defines the `cohort` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  cohort!: Array<{ month: string; m1: number; m2: number; m3: number; m6: number; m12: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `movement` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  movement!: Array<{ label: string; value: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `adoption` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  adoption!: Array<{ feature: string; available: number; active: number; used: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `sources` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  sources!: Array<{ source: string; gyms: number; monthlyIncome: number; churn: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `concentration` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  concentration!: Array<{ group: string; share: number }>;
}
