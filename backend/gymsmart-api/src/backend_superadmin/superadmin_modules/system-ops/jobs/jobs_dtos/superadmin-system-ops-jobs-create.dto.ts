import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the jobs HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSystemOpsJobsCreateDto -> Jobs service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { BackgroundJobStatus as BackgroundJobStatus } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.constants';
/**
 * Primary Intent: Defines SuperadminSystemOpsJobsCreateDto as the class-level contract for superadmin-system-ops-jobs-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsJobsCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `queueName` data contract for this superadmin-system-ops-jobs-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  queueName!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `jobName` data contract for this superadmin-system-ops-jobs-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  jobName!: string;
  @IsEnum(BackgroundJobStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-jobs-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: BackgroundJobStatus;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `attempts` data contract for this superadmin-system-ops-jobs-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  attempts!: number;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `error` data contract for this superadmin-system-ops-jobs-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  error!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-system-ops-jobs-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
}
