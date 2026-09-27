// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { FinancePaymentItemResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-payment-item.response.dto';

export class ManagerFinanceFetchPaymentsResponseDto {
  @ApiProperty({ type: [FinancePaymentItemResponseDto] })
  payments?: Array<FinancePaymentItemResponseDto>;
}

export { ManagerFinanceFetchPaymentsResponseDto as FinanceFetchPaymentsResponseDto };
