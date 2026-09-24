import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates creation payloads at the messaging HTTP boundary.
// FLOW: HTTP JSON -> SuperadminMessagingCreateDto -> Messaging service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TenantMessageChannel as MessagingChannel, TenantMessageStatus as TenantMessageStatus } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';
/**
 * Primary Intent: Defines SuperadminMessagingCreateDto as the class-level contract for superadmin-messaging-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantId` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantId!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `tenantName` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  tenantName!: string;
  @IsEnum(MessagingChannel)
  @ApiProperty()
  /** Primary Intent: Defines the `channel` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  channel!: MessagingChannel;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `subject` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  subject!: string;
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `body` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  body!: string;
  @IsEnum(TenantMessageStatus)
  @ApiProperty()
  /** Primary Intent: Defines the `status` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  status!: TenantMessageStatus;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `sentAt` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  sentAt!: Date;
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  /** Primary Intent: Defines the `scheduledAt` data contract for this superadmin-messaging-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  scheduledAt!: Date;
}
