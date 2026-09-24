import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates partial updates at the infrastructure HTTP boundary.
// FLOW: HTTP JSON -> SuperadminSystemOpsInfrastructureUpdateDto -> Infrastructure service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { InfrastructureNodeStatus as InfrastructureStatus } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.constants';
/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureUpdateDto as the class-level contract for superadmin-system-ops-infrastructure-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsInfrastructureUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `name` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `region` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  region!: string;
  @IsOptional()
  @IsEnum(InfrastructureStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: InfrastructureStatus;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `cpuPercent` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  cpuPercent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `memoryPercent` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memoryPercent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `diskPercent` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  diskPercent!: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `uptime` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  uptime!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `lastChecked` data contract for this superadmin-system-ops-infrastructure-update.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  lastChecked!: Date;
}
