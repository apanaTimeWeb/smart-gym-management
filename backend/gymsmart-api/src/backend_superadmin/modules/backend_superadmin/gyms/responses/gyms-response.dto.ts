// RESPONSIBILITY: Defines the stable response data contract for gyms endpoints.
// FLOW: Domain model -> GymsResponseDto -> canonical ApiResponse envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GymsResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  name!: string;
  @ApiPropertyOptional()
  ownerName!: string;
  @ApiPropertyOptional()
  adminEmail!: string;
  @ApiPropertyOptional()
  phone!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  plan!: string;
  @ApiPropertyOptional()
  memberCount!: number;
  @ApiPropertyOptional()
  monthlyRevenue!: number;

  @ApiProperty({ example: 'INR' })
  currency!: string;
  @ApiPropertyOptional()
  databaseVersion!: string;
  @ApiPropertyOptional()
  city!: string;
  @ApiPropertyOptional()
  state!: string;
  @ApiPropertyOptional()
  country!: string;
  @ApiPropertyOptional()
  gstin!: string;
  @ApiPropertyOptional()
  trialEndsAt!: string | null;
  @ApiPropertyOptional()
  lastLoginAt!: string | null;
  @ApiPropertyOptional()
  lastActiveAt!: string | null;
  @ApiPropertyOptional()
  staffCount!: number;
  @ApiPropertyOptional()
  databaseName!: string;
  @ApiPropertyOptional()
  subscriptionHistory!: Record<string, unknown> | unknown[] | null;
  @ApiPropertyOptional()
  usageStats!: Record<string, unknown> | unknown[] | null;
}
