// RESPONSIBILITY: Defines asynchronous backup command acknowledgements.
// FLOW: Trigger/restore service -> queue acknowledgement DTO -> canonical response envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsQueuedResponseDto as the class-level contract for superadmin-system-ops-backups-queued-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsBackupsQueuedResponseDto {
  @ApiProperty({ type: [String] }) jobIds!: string[];
  @ApiProperty() statusUrl!: string;
}
/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsRestoreQueuedResponseDto as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminSystemOpsBackupsRestoreQueuedResponseDto {
  @ApiProperty() jobId!: string;
  @ApiProperty() statusUrl!: string;
}
