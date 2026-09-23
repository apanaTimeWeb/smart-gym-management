// RESPONSIBILITY: Defines the notification response contract for Superadmin messaging.
// FLOW: Notification repository -> response DTO -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';

export class SuperadminMessagingNotificationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() body!: string;
  @ApiProperty() type!: string;
  @ApiProperty() read!: boolean;
  @ApiProperty() createdAt!: string;
}