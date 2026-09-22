// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/profile/password.
// CoreJsonObject: CoreJsonObject projection -> ProfileUpdatePasswordResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

export class ProfileUpdatePasswordResponseDto {
}
