import { PaymentMethod } from '@/backend_manager/modules/manager/finance/finance.constants';
import { PaymentStatus } from '@/backend_manager/modules/manager/finance/finance.constants';
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> FinanceFetchPaymentsByMemberResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FinanceFetchPaymentsByMemberResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;

  @ApiProperty({ type: Number })
  discountAmount!: number;

  @ApiProperty({ type: Number })
  gstAmount!: number;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  invoiceNumber!: string;

  @ApiProperty()
  memberId!: string;

  @ApiProperty()
  method!: PaymentMethod;

  @ApiProperty()
  paidAt!: string;

  @ApiProperty()
  status!: PaymentStatus;

  @ApiProperty({ type: Number })
  taxableAmount!: number;

}
