// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin usage.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Usage response mapper → ApiResponse<T>.

export class AdminUsageHistoryPointDto {
  @ApiProperty()
  date!: string;
  @ApiProperty()
  membersUsed!: number;
  @ApiProperty()
  storageUsedGb!: number;
  @ApiProperty()
  smsUsed!: number;
}

export class AdminUsageDataDto {
  @ApiProperty()
  tenantId!: string;
  @ApiProperty()
  planName!: string;
  @ApiProperty({ enum: ['Starter', 'Growth', 'Pro', 'Enterprise'] })
  planTier!: string;
  @ApiProperty()
  billingCycleEnd!: string;
  @ApiProperty()
  monthlyPrice!: number;
  @ApiProperty()
  smsSent!: number;
  @ApiProperty()
  smsLimit!: number;
  @ApiProperty()
  databaseGb!: number;
  @ApiProperty()
  mediaGb!: number;
  @ApiProperty()
  storageLimitGb!: number;
  @ApiProperty()
  activeMembers!: number;
  @ApiProperty()
  memberLimit!: number;
  @ApiProperty()
  staffCount!: number;
  @ApiProperty()
  staffLimit!: number;
  @ApiProperty()
  branchCount!: number;
  @ApiProperty()
  branchLimit!: number;
  @ApiProperty()
  apiCallsToday!: number;
  @ApiProperty()
  apiCallsLimit!: number;
  @ApiProperty({ type: [AdminUsageHistoryPointDto] })
  usageHistory!: AdminUsageHistoryPointDto[];
}

export class AdminUsageResponseDto {
  @ApiProperty({ type: AdminUsageDataDto })
  data!: AdminUsageDataDto;
}

export class AdminUsageUpgradeRequestDto {
  @ApiProperty()
  requestId!: string;
  @ApiProperty()
  planName!: string;
  @ApiProperty({ enum: ['pending'] })
  status!: string;
  @ApiProperty()
  requestedAt!: string;
}

export class AdminUsageUpgradeResponseDto {
  @ApiProperty({ type: AdminUsageUpgradeRequestDto })
  data!: AdminUsageUpgradeRequestDto;
}
