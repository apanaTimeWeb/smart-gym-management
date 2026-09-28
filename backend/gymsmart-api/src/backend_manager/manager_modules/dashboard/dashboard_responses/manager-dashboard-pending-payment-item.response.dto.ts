// RESPONSIBILITY: Defines one dashboard pending-payment row.
// FLOW: Server-side pending-payment query -> typed row -> paginated dashboard response.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerDashboardPendingPaymentItemResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() pendingAmount!: number;
  @ApiProperty() expiryDate!: string;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerDashboardPendingPaymentItemResponseDto as DashboardPendingPaymentItemResponseDto };
