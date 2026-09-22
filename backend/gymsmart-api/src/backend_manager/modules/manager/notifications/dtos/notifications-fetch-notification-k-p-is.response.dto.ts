// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> NotificationsFetchNotificationKPIsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
