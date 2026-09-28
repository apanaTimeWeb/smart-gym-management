// RESPONSIBILITY: Exposes the independently searchable expiring-memberships widget contract.
// FLOW: Filtered expiry rows -> explicit response DTO -> canonical pagination envelope.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerDashboardPendingPaymentItemResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-pending-payment-item.response.dto';

export class ManagerDashboardFetchDashboardExpiringMembershipsResponseDto {
  @ApiProperty({ type: [ManagerDashboardPendingPaymentItemResponseDto] }) expiringMemberships!: ManagerDashboardPendingPaymentItemResponseDto[];
  @ApiProperty() total!: number;
}

export { ManagerDashboardFetchDashboardExpiringMembershipsResponseDto as DashboardFetchDashboardExpiringMembershipsResponseDto };
