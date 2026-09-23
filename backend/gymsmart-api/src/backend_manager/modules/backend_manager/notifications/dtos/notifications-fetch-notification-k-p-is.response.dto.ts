// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class NotificationsFetchNotificationKPIsResponseDto {
  @ApiProperty({ type: Number })
  highPriority!: number;

  @ApiProperty({ type: Number })
  todayCount!: number;

  @ApiProperty({ type: Number })
  total!: number;

  @ApiProperty({ type: Number })
  unread!: number;

}
