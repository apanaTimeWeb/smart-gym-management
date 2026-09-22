// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/notifications/:id.
// CoreJsonObject: CoreJsonObject projection -> NotificationsDeleteNotificationResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/core/types/json-value.types';

export class NotificationsDeleteNotificationResponseDto {
}
