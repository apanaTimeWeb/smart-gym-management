// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin members.
// FLOW: Repository domain â†’ Members response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminMembersStatus } from '@/backend_admin/admin_modules/admin_members/admin-members.constants.js';

/**
 * @description Defines the AdminMemberDto boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMemberDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() branchId!: string;
  @ApiProperty() branchName!: string;
  @ApiProperty() planName!: string;
  @ApiProperty({ enum: AdminMembersStatus }) status!: AdminMembersStatus;
  @ApiProperty() joinDate!: string;
  @ApiProperty() expiryDate!: string;
  @ApiProperty() pendingAmount!: number;
  @ApiProperty({ enum: ['Male', 'Female', 'Other'] }) gender!: string;
  @ApiPropertyOptional() referralSource?: string;
  @ApiPropertyOptional() photo?: string;
  @ApiPropertyOptional() lastCheckIn?: string;
  @ApiPropertyOptional() totalVisits?: number;
  @ApiPropertyOptional() dateOfBirth?: string;
  @ApiPropertyOptional() address?: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminMembersSummaryDto boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersSummaryDto {
  @ApiProperty() totalMembers!: number;
  @ApiProperty() activeMembers!: number;
  @ApiProperty() expiredMembers!: number;
  @ApiProperty() pendingMembers!: number;
  @ApiProperty() expiringThisWeek!: number;
  @ApiProperty() expiringThisMonth!: number;
  @ApiProperty() totalOutstanding!: number;
  @ApiProperty() newThisMonth!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}
