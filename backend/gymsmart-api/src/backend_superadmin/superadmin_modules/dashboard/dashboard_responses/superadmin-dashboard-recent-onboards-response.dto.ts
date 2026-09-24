// RESPONSIBILITY: Defines the dashboard recent-onboards widget contract.
// FLOW: Dashboard onboard service -> tenant projection -> canonical response envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Primary Intent: Defines SuperadminDashboardRecentOnboardsResponseDto as the class-level contract for superadmin-dashboard-recent-onboards-response.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
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
