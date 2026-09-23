// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class StoreFetchStoreSummaryResponseDto {
  @ApiProperty({ type: [Object] }) lowStockProducts!: Array<Record<string, unknown>>;
  @ApiProperty({ type: Number }) totalOrders!: number;
  @ApiProperty({ type: Number }) totalProducts!: number;
  @ApiProperty({ type: Number }) totalRevenue!: number;
}
