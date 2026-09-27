// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerNotificationsManagerNotificationItemResponseDto {
  @ApiProperty()
  createdAt!: string;
  @ApiProperty()
  memberName!: string;
  @ApiProperty()
  message!: string;
  @ApiProperty()
  priority!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  type!: string;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerNotificationsManagerNotificationItemResponseDto as NotificationsManagerNotificationItemResponseDto };
