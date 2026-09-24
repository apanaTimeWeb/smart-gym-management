// RESPONSIBILITY: Defines the stable response data contract for jobs endpoints.
// FLOW: Domain model -> SuperadminSystemOpsJobsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSystemOpsJobsResponseDto as the class-level contract for superadmin-system-ops-jobs-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsJobsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `queueName` data contract for this superadmin-system-ops-jobs-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  queueName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `jobName` data contract for this superadmin-system-ops-jobs-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  jobName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-jobs-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `attempts` data contract for this superadmin-system-ops-jobs-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  attempts!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `error` data contract for this superadmin-system-ops-jobs-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  error!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-system-ops-jobs-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string | null;
}
