// RESPONSIBILITY: Defines the durable backup/restore job status API contract.
// FLOW: Job repository -> job status DTO -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SuperadminBackupJobStatus } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.constants';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsJobStatusResponseDto as the class-level contract for superadmin-system-ops-backups-job-status-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsBackupsJobStatusResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: SuperadminBackupJobType }) type!: SuperadminBackupJobType;
  @ApiProperty({ enum: SuperadminBackupJobStatus }) status!: SuperadminBackupJobStatus;
  @ApiProperty() tenantId!: string;
  @ApiProperty() attempts!: number;
  @ApiPropertyOptional({ nullable: true }) errorCode!: string | null;
  @ApiPropertyOptional({ nullable: true, type: String, format: 'date-time' }) completedAt!: Date | null;
  @ApiPropertyOptional({ nullable: true }) resultBackupId!: string | null;
}
