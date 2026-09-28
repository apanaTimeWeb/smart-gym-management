// RESPONSIBILITY: Documents the complete Trainer Notifications list and preference response contracts.
// FLOW: Notifications query/command service → response DTO contract → canonical API envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


/**
 * Intent: Defines the TrainerNotificationsNotificationResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerNotificationsNotificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() text!: string;
  @ApiProperty() time!: string;
  @ApiProperty() unread!: boolean;
  @ApiPropertyOptional({ enum: ['MEMBER', 'WORKOUT', 'SYSTEM', 'ATTENDANCE'] }) type?: string;
  @ApiPropertyOptional() actionUrl?: string;
  @ApiPropertyOptional() relatedEntityId?: string;
  @ApiPropertyOptional() relatedEntityType?: string;
  @ApiPropertyOptional({ type: Object }) metadata?: Record<string, unknown>;
}


/**
 * Intent: Defines the TrainerNotificationsListResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerNotificationsListResponseDto {
  @ApiProperty({ type: [TrainerNotificationsNotificationResponseDto] }) notifications!: TrainerNotificationsNotificationResponseDto[];
  @ApiPropertyOptional() total?: number;
  @ApiPropertyOptional() unreadCount?: number;
  @ApiPropertyOptional() page?: number;
  @ApiPropertyOptional() limit?: number;
  @ApiPropertyOptional({ type: Object }) pagination?: object;
}


/**
 * Intent: Defines the TrainerNotificationsPreferencesResponseDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerNotificationsPreferencesResponseDto {
  @ApiProperty() email!: boolean;
  @ApiProperty() push!: boolean;
  @ApiProperty() sms!: boolean;
  @ApiProperty() sessionReminders!: boolean;
  @ApiProperty() memberUpdates!: boolean;
}
