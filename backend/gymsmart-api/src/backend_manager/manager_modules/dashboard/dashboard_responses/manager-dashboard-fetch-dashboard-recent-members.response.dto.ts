// RESPONSIBILITY: Exposes the independently pageable dashboard recent-members widget contract.
// FLOW: Filtered recent member domain rows -> explicit response DTO -> canonical pagination envelope.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerDashboardRecentMemberItemResponseDto } from '@/backend_manager/manager_modules/dashboard/dashboard_responses/manager-dashboard-recent-member-item.response.dto';

export class ManagerDashboardFetchDashboardRecentMembersResponseDto {
  @ApiProperty({ type: [ManagerDashboardRecentMemberItemResponseDto] }) recentMembers!: ManagerDashboardRecentMemberItemResponseDto[];
  @ApiProperty() totalRecentMembers!: number;
}

export { ManagerDashboardFetchDashboardRecentMembersResponseDto as DashboardFetchDashboardRecentMembersResponseDto };
