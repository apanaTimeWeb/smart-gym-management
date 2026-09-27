// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { SalesPendingPaymentItemResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-pending-payment-item.response.dto';

export class ManagerSalesFetchPendingPaymentsResponseDto {
  @ApiProperty({ type: [SalesPendingPaymentItemResponseDto] })
  members?: Array<SalesPendingPaymentItemResponseDto>;
}

export { ManagerSalesFetchPendingPaymentsResponseDto as SalesFetchPendingPaymentsResponseDto };
