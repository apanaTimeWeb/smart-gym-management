// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { FinanceMonthlyDataItemResponseDto } from '@/backend_manager/manager_modules/finance/finance_responses/manager-finance-monthly-data-item.response.dto';

export class ManagerFinanceFetchFinanceSummaryResponseDto {
  @ApiProperty({ type: Number }) gstCollected!: number;
  @ApiProperty({ type: [Object] }) monthlyData!: Array<{ month: string; revenue: number; expenses?: number }>;
  @ApiProperty({ type: Number }) monthlyRevenue!: number;
  @ApiProperty({ type: Number }) pendingAmount!: number;
  @ApiProperty({ type: Number }) totalRevenue!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerFinanceFetchFinanceSummaryResponseDto as FinanceFetchFinanceSummaryResponseDto };
