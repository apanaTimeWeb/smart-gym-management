// RESPONSIBILITY: Exposes the independently searchable dashboard pending-payments widget contract.
// FLOW: Filtered pending-payment domain rows -> explicit response DTO -> canonical pagination envelope.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerDashboardPendingPaymentItemResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-pending-payment-item.response.dto';

export class ManagerDashboardFetchDashboardPendingPaymentsResponseDto {
  @ApiProperty({ type: [ManagerDashboardPendingPaymentItemResponseDto] }) pendingPaymentsList!: ManagerDashboardPendingPaymentItemResponseDto[];
  @ApiProperty() total!: number;
}

export { ManagerDashboardFetchDashboardPendingPaymentsResponseDto as DashboardFetchDashboardPendingPaymentsResponseDto };
