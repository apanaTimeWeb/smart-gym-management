// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminFeaturesRolloutInsightsResponseDto as the class-level contract for superadmin-features-rollout-insights-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesRolloutInsightsResponseDto {
  @ApiProperty()
  rollouts!: Array<{ feature: string; rollout: number; target: string; status: string; health: number }>;
  @ApiProperty()
  releases!: Array<{ version: string; date: string; summary: string; impact: string }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `rollback` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  rollback!: Array<{ feature: string; lastRollback: string; lastHealthy: string }>;
}
