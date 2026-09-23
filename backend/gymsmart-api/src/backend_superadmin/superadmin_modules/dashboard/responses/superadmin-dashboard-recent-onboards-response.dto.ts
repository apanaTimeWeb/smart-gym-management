// RESPONSIBILITY: Defines the dashboard recent-onboards widget contract.
// FLOW: Dashboard onboard service -> tenant projection -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminDashboardRecentOnboardsResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() ownerName!: string;
  @ApiProperty() adminEmail!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() status!: string;
  @ApiProperty() plan!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() memberCount!: number;
  @ApiProperty() monthlyRevenue!: number;
  @ApiProperty() databaseVersion!: string;
  @ApiPropertyOptional() city?: string;
  @ApiPropertyOptional() state?: string;
  @ApiPropertyOptional() country?: string;
  @ApiPropertyOptional() gstin?: string;
  @ApiPropertyOptional() trialEndsAt?: string;
  @ApiPropertyOptional() lastLoginAt?: string;
  @ApiPropertyOptional() lastActiveAt?: string | null;
  @ApiProperty() staffCount!: number;
  @ApiProperty() currency!: string;
}
