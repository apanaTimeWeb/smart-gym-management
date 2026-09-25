// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin usage.
// FLOW: Repository domain â†’ Usage response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminUsageStatus } from '@/backend_admin/admin_modules/admin_usage/admin-usage.constants'

/**
 * @description Defines the AdminUsageHistoryPointDto boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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

/**
 * @description Defines the AdminUsageDataDto boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminUsageUpgradeRequestDto boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageUpgradeRequestDto {
  @ApiProperty()
  requestId!: string;
  @ApiProperty()
  planName!: string;
  @ApiProperty({ enum: ['pending'] })
  status!: AdminUsageStatus;
  @ApiProperty()
  requestedAt!: string;
}

