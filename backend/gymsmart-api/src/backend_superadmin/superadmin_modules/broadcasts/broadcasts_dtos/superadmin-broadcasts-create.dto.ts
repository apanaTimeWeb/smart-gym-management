import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the broadcasts HTTP boundary.
// FLOW: HTTP JSON -> SuperadminBroadcastsCreateDto -> Broadcasts service.
import { Type } from 'class-transformer';

import { BroadcastChannel } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.constants';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { BroadcastStatus as BroadcastsStatus, BroadcastAudience as BroadcastsAudience } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.constants';
/**
 * Primary Intent: Defines SuperadminBroadcastsCreateDto as the class-level contract for superadmin-broadcasts-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBroadcastsCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `title` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  title!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `content` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  content!: string;
  @IsEnum(BroadcastsStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: BroadcastsStatus;
  @ApiProperty()
  /** Primary Intent: Defines the `targetGymIds` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  targetGymIds!: Record<string, unknown> | unknown[] | null;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `scheduledDate` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  scheduledDate!: Date;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `sentDate` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sentDate!: Date;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `totalRecipients` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  totalRecipients!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `deliveredCount` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  deliveredCount!: number;
  @IsInt()
  @Min(0)
  @ApiProperty()
  /** Primary Intent: Defines the `failedCount` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  failedCount!: number;
  @IsEnum(BroadcastsAudience)
  @ApiProperty()
  /** Primary Intent: Defines the `audience` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  audience!: BroadcastsAudience;
  @IsOptional()
  @IsEnum(BroadcastChannel)
  @ApiProperty()
  /** Primary Intent: Defines the `channel` data contract for this superadmin-broadcasts-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  channel: BroadcastChannel = BroadcastChannel.EMAIL;@ApiPropertyOptional()

  @IsOptional()
  @IsInt()
  @Min(0)
  openedCount = 0;@ApiPropertyOptional()

  @IsOptional()
  @IsInt()
  @Min(0)
  clickedCount = 0;
}
