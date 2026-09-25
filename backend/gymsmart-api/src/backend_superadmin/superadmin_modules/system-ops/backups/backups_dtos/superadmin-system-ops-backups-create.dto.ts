import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the backups HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSystemOpsBackupsCreateDto -> Backups service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { BackupRecordStatus as SuperadminBackupJobStatus } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.constants';
/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsCreateDto as the class-level contract for superadmin-system-ops-backups-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsBackupsCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-system-ops-backups-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `databaseName` data contract for this superadmin-system-ops-backups-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseName!: string;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `sizeMB` data contract for this superadmin-system-ops-backups-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sizeMB!: number;
  @IsEnum(SuperadminBackupJobStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-backups-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: SuperadminBackupJobStatus;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `timestamp` data contract for this superadmin-system-ops-backups-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  timestamp!: Date;
}
