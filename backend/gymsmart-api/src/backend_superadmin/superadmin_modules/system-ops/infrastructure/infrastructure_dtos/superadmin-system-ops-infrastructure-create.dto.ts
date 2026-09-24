import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the infrastructure HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSystemOpsInfrastructureCreateDto -> Infrastructure service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { InfrastructureNodeStatus as InfrastructureStatus } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.constants';
/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureCreateDto as the class-level contract for superadmin-system-ops-infrastructure-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsInfrastructureCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `name` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `region` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  region!: string;
  @IsEnum(InfrastructureStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: InfrastructureStatus;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `cpuPercent` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  cpuPercent!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `memoryPercent` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memoryPercent!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `diskPercent` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  diskPercent!: number;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `uptime` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  uptime!: string;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `lastChecked` data contract for this superadmin-system-ops-infrastructure-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastChecked!: Date;
}
