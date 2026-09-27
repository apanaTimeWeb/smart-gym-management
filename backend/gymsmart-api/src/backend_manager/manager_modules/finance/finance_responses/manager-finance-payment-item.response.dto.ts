// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FinancePaymentMemberResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-payment-member.response.dto';

export class ManagerFinancePaymentItemResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;
  @ApiProperty()
  currency!: string;
  @ApiProperty()
  invoiceNumber!: string;
  @ApiPropertyOptional({ type: FinancePaymentMemberResponseDto })
  member?: FinancePaymentMemberResponseDto;
  @ApiProperty()
  method!: string;
  @ApiProperty()
  paidAt!: string;
  @ApiProperty()
  status!: string;
}

export { ManagerFinancePaymentItemResponseDto as FinancePaymentItemResponseDto };
