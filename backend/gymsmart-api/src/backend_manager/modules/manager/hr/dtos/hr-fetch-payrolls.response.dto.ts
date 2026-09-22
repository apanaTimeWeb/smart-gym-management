// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrFetchPayrollsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrFetchPayrollsResponseDto {
  @ApiProperty({ type: [Object] })
  payrolls?: Array<{ month?: string; netPayable?: string; paidAmount?: number; pendingAmount?: number; staff?: { name?: string; }; status?: string; }>;

}
