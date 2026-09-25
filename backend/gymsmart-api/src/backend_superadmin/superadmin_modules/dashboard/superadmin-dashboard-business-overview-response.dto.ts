// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminDashboardBusinessOverviewResponseDto as the class-level contract for superadmin-dashboard-business-overview-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardBusinessOverviewResponseDto {
  @ApiProperty({ example: 'INR' })
  /** Primary Intent: Defines the `currency` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  currency!: string;

  @ApiProperty()
  /** Primary Intent: Defines the `openingIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  openingIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `newIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  newIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `growthIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  growthIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `returningIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  returningIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `reducedIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  reducedIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `lostIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lostIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `endingIncome` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  endingIncome!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `existingIncomeRetained` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  existingIncomeRetained!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `gymRetention` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  gymRetention!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `revenueLostPercent` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  revenueLostPercent!: number;
  @ApiProperty()
  /** Primary Intent: Defines the `customerChurn` data contract for this superadmin-dashboard-business-overview-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  customerChurn!: number;
  @ApiProperty()
  alerts!: Array<{ id: string; level: string; title: string; detail: string; count: number }>;
  @ApiProperty()
  leaderboard!: Array<{ name: string; plan: string; income: number; growth: number; health: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `waterfall` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  waterfall!: Array<{ label: string; value: number }>;
}
