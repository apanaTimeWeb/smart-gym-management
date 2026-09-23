// RESPONSIBILITY: Defines the stable response data contract for usage-meters endpoints.
// FLOW: Domain model -> SuperadminUsageMetersResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminUsageMetersResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  tenantId!: string;
  @ApiPropertyOptional()
  tenantName!: string;
  @ApiPropertyOptional()
  smsSent!: number;
  @ApiPropertyOptional()
  smsLimit!: number;
  @ApiPropertyOptional()
  whatsappMessagesSent!: number;
  @ApiPropertyOptional()
  whatsappLimit!: number;
  @ApiPropertyOptional()
  emailsSent!: number;
  @ApiPropertyOptional()
  emailLimit!: number;
  @ApiPropertyOptional()
  apiCallsCount!: number;
  @ApiPropertyOptional()
  apiCallsLimit!: number;
  @ApiPropertyOptional()
  databaseGb!: number;
  @ApiPropertyOptional()
  mediaGb!: number;
  @ApiPropertyOptional()
  storageLimitGb!: number;
  @ApiPropertyOptional()
  activeMembers!: number;
  @ApiPropertyOptional()
  totalMembers!: number;
  @ApiPropertyOptional()
  memberLimit!: number;
  @ApiPropertyOptional()
  staffCount!: number;
  @ApiPropertyOptional()
  staffLimit!: number;
  @ApiPropertyOptional()
  billingCycleEnd!: string;
}