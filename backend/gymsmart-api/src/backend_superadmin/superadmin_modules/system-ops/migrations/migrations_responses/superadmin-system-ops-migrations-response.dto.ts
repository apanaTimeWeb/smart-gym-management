// RESPONSIBILITY: Defines the stable response data contract for migrations endpoints.
// FLOW: Domain model -> SuperadminSystemOpsMigrationsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsResponseDto as the class-level contract for superadmin-system-ops-migrations-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsMigrationsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `version` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  version!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `description` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `appliedAt` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  appliedAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `targetTenants` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetTenants!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `durationMs` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  durationMs!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `errorLog` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  errorLog!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `executedAt` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  executedAt!: string | null;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `executedBy` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  executedBy!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `errorDetails` data contract for this superadmin-system-ops-migrations-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  errorDetails!: string | null;
}
