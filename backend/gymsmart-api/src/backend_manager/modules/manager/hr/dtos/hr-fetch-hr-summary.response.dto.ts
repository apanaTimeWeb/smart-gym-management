// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrFetchHrSummaryResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrFetchHrSummaryResponseDto {
  @ApiProperty({ type: Number })
  activeStaff?: number;

  @ApiProperty({ type: Number })
  totalAdvanceGiven?: number;

  @ApiProperty({ type: Number })
  totalSalaryDue?: number;

  @ApiProperty({ type: Number })
  totalSalaryPaid?: number;

  @ApiProperty({ type: Number })
  totalSalaryThisMonth?: number;

}
