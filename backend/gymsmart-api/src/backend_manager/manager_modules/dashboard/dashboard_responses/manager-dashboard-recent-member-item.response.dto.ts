// RESPONSIBILITY: Defines one recent-member row for the dashboard API.
// FLOW: Server-side dashboard list query -> typed recent-member row -> paginated response.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerDashboardRecentMemberItemResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'object' }] }) plan!: string | { name: string };
  @ApiProperty() status!: string;
  @ApiProperty() joinDate!: string;
  @ApiProperty() paidAmount!: number;
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerDashboardRecentMemberItemResponseDto as DashboardRecentMemberItemResponseDto };
