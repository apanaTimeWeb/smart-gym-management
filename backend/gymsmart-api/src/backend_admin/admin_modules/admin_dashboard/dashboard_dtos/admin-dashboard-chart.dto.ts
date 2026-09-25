// RESPONSIBILITY: Defines nested chart/leaderboard/alert DTOs used by Admin dashboard responses.
// FLOW: Dashboard query -> mapper -> response DTO nested fields.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminDashboardSeverity } from '@/backend_admin/admin_modules/admin_dashboard/admin-dashboard.constants.js';

/**
 * @description Defines the DashboardMemberGrowth boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardMemberGrowth { @ApiProperty() month!: string; @ApiProperty() count!: number; }
/**
 * @description Defines the DashboardRevenueTrend boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardRevenueTrend { @ApiProperty() month!: string; @ApiProperty() revenue!: number; @ApiProperty() profit!: number; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; }
/**
 * @description Defines the DashboardMembersByPlan boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardMembersByPlan { @ApiProperty() plan!: string; @ApiProperty() count!: number; }
/**
 * @description Defines the DashboardMembersByStatus boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardMembersByStatus { @ApiProperty() active!: number; @ApiProperty() pending!: number; @ApiProperty() expired!: number; }
/**
 * @description Defines the DashboardBranchPerformance boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardBranchPerformance { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() revenue!: number; @ApiProperty() activeMembers!: number; @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' }) currency!: string; @ApiProperty({ enum: ['up','down','flat'] }) trend!: string; }
/**
 * @description Defines the DashboardSystemAlert boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardSystemAlert { @ApiProperty() id!: string; @ApiProperty() message!: string; @ApiProperty({ enum: ['high','medium','low'] }) severity!: AdminDashboardSeverity; @ApiProperty() date!: string; }
/**
 * @description Defines the DashboardExpiringMembership boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardExpiringMembership { @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() branch!: string; @ApiProperty() plan!: string; @ApiProperty() expiryDate!: string; @ApiProperty() daysLeft!: number; }
/**
 * @description Defines the DashboardAttendanceTrendPoint boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class DashboardAttendanceTrendPoint { @ApiProperty() date!: string; @ApiProperty() count!: number; }
