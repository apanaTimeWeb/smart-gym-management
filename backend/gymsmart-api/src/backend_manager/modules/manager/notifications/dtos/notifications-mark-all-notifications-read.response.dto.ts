// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/notifications/read-all.
// CoreJsonObject: CoreJsonObject projection -> NotificationsMarkAllNotificationsReadResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/core/types/json-value.types';

export class NotificationsMarkAllNotificationsReadResponseDto {
}
