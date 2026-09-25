// RESPONSIBILITY: Defines the notification response contract for Superadmin messaging.
// FLOW: Notification repository -> response DTO -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminMessagingNotificationResponseDto as the class-level contract for superadmin-messaging-notification-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingNotificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() body!: string;
  @ApiProperty() type!: string;
  @ApiProperty() read!: boolean;
  @ApiProperty() createdAt!: string;
}
