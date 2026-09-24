// RESPONSIBILITY: Defines the durable status contract for an asynchronous Superadmin export job.
// FLOW: Export status query -> SuperadminExportDataService -> job repository -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminExportDataStatusResponseDto as the class-level contract for superadmin-export-data-status-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminExportDataStatusResponseDto {
  @ApiProperty({ format: 'uuid' })
  /** Primary Intent: Defines the `jobId` data contract for this superadmin-export-data-status-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  jobId!: string;
  @ApiProperty({ example: 'QUEUED' })
  /** Primary Intent: Defines the `status` data contract for this superadmin-export-data-status-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `downloadUrl` data contract for this superadmin-export-data-status-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  downloadUrl?: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `expiresAt` data contract for this superadmin-export-data-status-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  expiresAt?: string;
  @ApiPropertyOptional()
  /** Primary Intent: Defines the `errorCode` data contract for this superadmin-export-data-status-response.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  errorCode?: string;
}
