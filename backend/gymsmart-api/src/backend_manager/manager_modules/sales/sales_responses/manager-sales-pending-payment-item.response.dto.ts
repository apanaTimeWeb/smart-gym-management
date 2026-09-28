// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerSalesPendingPaymentItemResponseDto {
  @ApiProperty()
  expiryDate!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty({ type: Number })
  pendingAmount!: number;
  @ApiProperty()
  currency!: string;
}

export { ManagerSalesPendingPaymentItemResponseDto as SalesPendingPaymentItemResponseDto };
