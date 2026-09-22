import { PtPaymentStatus } from '@/modules/manager/pt/pt.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PtMarkSessionCompleteResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PtMarkSessionCompleteResponseDto {
  @ApiProperty({ type: Number })
  amountPaid: number;

  @ApiProperty({ type: Number })
  completedSessions: number;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  memberId: string;

  @ApiProperty()
  memberName: string;

  @ApiProperty()
  packageId: string;

  @ApiProperty()
  packageName: string;

  @ApiProperty()
  paymentStatus: PtPaymentStatus;

  @ApiProperty({ type: Number })
  sessionsRemaining: number;

  @ApiProperty()
  startDate: string;

  @ApiProperty({ type: Number })
  totalAmount: number;

  @ApiProperty({ type: Number })
  totalSessions: number;

  @ApiProperty()
  trainerId: string;

  @ApiProperty()
  trainerName: string;

}
