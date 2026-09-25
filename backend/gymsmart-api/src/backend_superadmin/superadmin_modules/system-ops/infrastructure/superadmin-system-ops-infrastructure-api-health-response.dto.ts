// RESPONSIBILITY: Defines the exact frontend-consumed response contract for this Superadmin use case.
// FLOW: Use-case service -> response DTO -> global response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureApiHealthResponseDto as the class-level contract for superadmin-system-ops-infrastructure-api-health-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsInfrastructureApiHealthResponseDto {
  @ApiProperty()
  summary!: { requestsPerMinute: number; errorsPercent: number; p50: number; p95: number; p99: number };
  @ApiProperty()
  endpoints!: Array<{ name: string; p50: number; p95: number; p99: number; errors: number }>;
  @ApiProperty()
  /**
   * Primary Intent: Defines the `incidents` contract used by the owning feature.
   * Edge Cases: Preserve its declared nesting, nullability, and collection semantics across the API contract.
   * Side-Effects: None; this declaration is data-only.
   * AI-Note: Do not rename or reshape this field without updating the frozen contract and all dependent tests.
   */
  incidents!: Array<{ title: string; impact: string; started: string; status: string }>;
}
