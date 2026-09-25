// RESPONSIBILITY: Defines the stable response data contract for infrastructure endpoints.
// FLOW: Domain model -> SuperadminSystemOpsInfrastructureResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureResponseDto as the class-level contract for superadmin-system-ops-infrastructure-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsInfrastructureResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `name` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `region` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  region!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `cpuPercent` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  cpuPercent!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `memoryPercent` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memoryPercent!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `diskPercent` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  diskPercent!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `uptime` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  uptime!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `lastChecked` data contract for this superadmin-system-ops-infrastructure-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastChecked!: string;
}
