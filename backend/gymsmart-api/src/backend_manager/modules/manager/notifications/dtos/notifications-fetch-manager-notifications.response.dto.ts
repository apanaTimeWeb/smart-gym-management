// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> NotificationsFetchManagerNotificationsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NotificationsFetchManagerNotificationsResponseDto {
  @ApiProperty({ type: [Object] })
  notifications?: Array<{ createdAt?: string; memberName?: string; message?: number; priority?: string; status?: string; title?: string; type?: string; }>;

}
