// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { SalesMonthlyRevenueItemResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-monthly-revenue-item.response.dto';

export class ManagerSalesFetchSalesOverviewResponseDto {
  @ApiProperty({ type: [SalesMonthlyRevenueItemResponseDto] })
  monthlyRevenue?: Array<SalesMonthlyRevenueItemResponseDto>;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerSalesFetchSalesOverviewResponseDto as SalesFetchSalesOverviewResponseDto };
