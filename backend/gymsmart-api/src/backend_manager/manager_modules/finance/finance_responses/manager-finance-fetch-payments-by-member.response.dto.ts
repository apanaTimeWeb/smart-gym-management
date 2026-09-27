// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '@/backend_manager/manager_modules/finance/manager-finance.constants';
import { PaymentStatus } from '@/backend_manager/manager_modules/finance/manager-finance.constants';

export class ManagerFinanceFetchPaymentsByMemberResponseDto {
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
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerFinanceFetchPaymentsByMemberResponseDto as FinanceFetchPaymentsByMemberResponseDto };
