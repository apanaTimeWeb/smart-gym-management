// RESPONSIBILITY: Defines the typed Store dashboard summary contract.
// FLOW: Store aggregate query -> low-stock projection -> typed response envelope.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerStoreLowStockProductResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-low-stock-product.response.dto';

export class ManagerStoreFetchStoreSummaryResponseDto {
  @ApiProperty({ type: [ManagerStoreLowStockProductResponseDto] }) lowStockProducts!: ManagerStoreLowStockProductResponseDto[];
  @ApiProperty({ type: Number }) totalOrders!: number;
  @ApiProperty({ type: Number }) totalProducts!: number;
  @ApiProperty({ type: Number }) totalRevenue!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerStoreFetchStoreSummaryResponseDto as StoreFetchStoreSummaryResponseDto };
