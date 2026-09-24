import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates SuperadminSystemOpsBackupsScheduleDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsInt, IsString, Min } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsScheduleDto as the class-level contract for superadmin-system-ops-backups-schedule.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsBackupsScheduleDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `cronExpression` data contract for this superadmin-system-ops-backups-schedule.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  cronExpression!: string;
  @IsInt()
  @Min(1)
  @ApiProperty()
  /** Primary Intent: Defines the `retentionDays` data contract for this superadmin-system-ops-backups-schedule.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  retentionDays!: number;
}
