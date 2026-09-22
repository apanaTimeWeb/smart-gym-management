// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrGiveStaffAdvanceResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrGiveStaffAdvanceResponseDto {
  @ApiProperty({ type: Number })
  advanceAmount: number;

}
