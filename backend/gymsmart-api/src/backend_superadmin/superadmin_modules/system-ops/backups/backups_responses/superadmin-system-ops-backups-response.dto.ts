// RESPONSIBILITY: Defines the stable response data contract for backups endpoints.
// FLOW: Domain model -> SuperadminSystemOpsBackupsResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsResponseDto as the class-level contract for superadmin-system-ops-backups-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsBackupsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-system-ops-backups-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `databaseName` data contract for this superadmin-system-ops-backups-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseName!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `sizeMB` data contract for this superadmin-system-ops-backups-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sizeMB!: number;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-backups-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `timestamp` data contract for this superadmin-system-ops-backups-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  timestamp!: string;
}
