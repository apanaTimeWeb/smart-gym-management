import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the usage-meters HTTP boundary.
// FLOW: HTTP JSON -> SuperadminUsageMetersCreateDto -> UsageMeters service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
/**
 * Primary Intent: Defines SuperadminUsageMetersCreateDto as the class-level contract for superadmin-usage-meters-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminUsageMetersCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `smsSent` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  smsSent!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `smsLimit` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  smsLimit!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `whatsappMessagesSent` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  whatsappMessagesSent!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `whatsappLimit` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  whatsappLimit!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `emailsSent` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  emailsSent!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `emailLimit` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  emailLimit!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `apiCallsCount` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  apiCallsCount!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `apiCallsLimit` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  apiCallsLimit!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `databaseGb` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  databaseGb!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `mediaGb` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  mediaGb!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `storageLimitGb` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  storageLimitGb!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `activeMembers` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  activeMembers!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `totalMembers` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  totalMembers!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `memberLimit` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  memberLimit!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `staffCount` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  staffCount!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `staffLimit` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  staffLimit!: number;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `billingCycleEnd` data contract for this superadmin-usage-meters-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  billingCycleEnd!: Date;
}
