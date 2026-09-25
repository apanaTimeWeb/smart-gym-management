// RESPONSIBILITY: Defines the asynchronous Gym CSV export status contract.
// FLOW: Export job repository -> status DTO -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SuperadminGymsExportJobStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';

/**
 * Primary Intent: Defines SuperadminGymsExportJobStatusResponseDto as the class-level contract for superadmin-gyms-export-job-status-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsExportJobStatusResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: SuperadminGymsExportJobStatus }) status!: SuperadminGymsExportJobStatus;
  @ApiProperty() attempts!: number;
  @ApiPropertyOptional({ nullable: true }) errorCode!: string | null;
  @ApiPropertyOptional({ nullable: true }) resultPath!: string | null;
  @ApiPropertyOptional({ nullable: true, type: String, format: 'date-time' }) completedAt!: Date | null;
}
/**
 * Primary Intent: Defines SuperadminGymsExportQueuedResponseDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminGymsExportQueuedResponseDto {
  @ApiProperty() jobId!: string;
  @ApiProperty() statusUrl!: string;
  @ApiProperty() downloadUrl!: string;
}

/**
 * Primary Intent: Defines the frontend legacy GET export contract as a single protected download URL.
 * Edge Cases: URL points to a durable job artifact and may expire according to the signing policy.
 * Side-Effects: None; transport-only response contract.
 * AI-Note: Keep this shape stable for the existing frontend GET /api/gyms/export consumer.
 */
export class SuperadminGymsExportDownloadResponseDto {
  /** Primary Intent: Protected download URL for the asynchronously generated Gym export. Edge Cases: URL is short-lived. Side-Effects: None. AI-Note: Do not expose storage paths. */
  @ApiProperty({ example: '/api/gyms/export/uuid/download?token=...' })
  downloadUrl!: string;
}
