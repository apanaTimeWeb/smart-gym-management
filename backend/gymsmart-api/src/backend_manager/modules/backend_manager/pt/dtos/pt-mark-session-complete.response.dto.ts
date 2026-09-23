// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { PtPaymentStatus } from '@/backend_manager/modules/backend_manager/pt/pt.constants';

export class PtMarkSessionCompleteResponseDto {
  @ApiProperty({ type: Number })
  amountPaid!: number;

  @ApiProperty({ type: Number })
  completedSessions!: number;

  @ApiProperty()
  endDate!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  memberId!: string;

  @ApiProperty()
  memberName!: string;

  @ApiProperty()
  packageId!: string;

  @ApiProperty()
  packageName!: string;

  @ApiProperty()
  paymentStatus!: PtPaymentStatus;

  @ApiProperty({ type: Number })
  sessionsRemaining!: number;

  @ApiProperty()
  startDate!: string;

  @ApiProperty({ type: Number })
  totalAmount!: number;

  @ApiProperty({ type: Number })
  totalSessions!: number;

  @ApiProperty()
  trainerId!: string;

  @ApiProperty()
  trainerName!: string;

}
