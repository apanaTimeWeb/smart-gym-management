import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the migrations HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSystemOpsMigrationsCreateDto -> Migrations service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { MigrationLogStatus as MigrationLogStatus } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.constants';
/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsCreateDto as the class-level contract for superadmin-system-ops-migrations-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsMigrationsCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `version` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  version!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `description` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  description!: string;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `appliedAt` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  appliedAt!: Date;
  @IsEnum(MigrationLogStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: MigrationLogStatus;
  @ApiProperty()
  /** Primary Intent: Defines the `targetTenants` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetTenants!: Record<string, unknown> | unknown[] | null;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `durationMs` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  durationMs!: number;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `errorLog` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  errorLog!: string;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `executedAt` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  executedAt!: Date;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `executedBy` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  executedBy!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `errorDetails` data contract for this superadmin-system-ops-migrations-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  errorDetails!: string;
}
