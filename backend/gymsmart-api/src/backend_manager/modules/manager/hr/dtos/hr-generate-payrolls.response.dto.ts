// RESPONSIBILITY: Exact response DTO contract for CoreJsonObject /api/v1/manager/hr/payrolls/generate.
// CoreJsonObject: CoreJsonObject projection -> HrGeneratePayrollsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CoreJsonObject } from '@/core/types/json-value.types';

export class HrGeneratePayrollsResponseDto {
  @ApiProperty({ type: [Object] })
  payrolls!: CoreJsonObject[];

}
