// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> HrUpdatePayrollStatusResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HrUpdatePayrollStatusResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  month!: string;

  @ApiProperty({ type: Number })
  netPayable!: number;

  @ApiProperty({ type: Number })
  paidAmount!: number;

  @ApiProperty({ type: Number })
  pendingAmount!: number;

  @ApiProperty()
  staffId!: string;

  @ApiProperty()
  status!: string;

}
