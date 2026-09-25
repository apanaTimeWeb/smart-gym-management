// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin plans.
// FLOW: Repository domain â†’ Plans response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminPlansTier } from '@/backend_admin/admin_modules/admin_plans/admin-plans.constants'

/**
 * @description Defines the AdminPlanDto boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlanDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() tier!: AdminPlansTier;
  @ApiProperty() price1Month!: number;
  @ApiProperty() price3Month!: number;
  @ApiProperty() price6Month!: number;
  @ApiProperty() price12Month!: number;
  @ApiProperty({ type: [String] }) features!: string[];
  @ApiProperty() isActive!: boolean;
  @ApiPropertyOptional() freezeAllowed?: boolean;
  @ApiPropertyOptional() joiningFee?: number;
  @ApiPropertyOptional() ptSessionsIncluded?: number;
  @ApiPropertyOptional() taxRate?: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminPlanRevenueRecordDto boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlanRevenueRecordDto {
  @ApiProperty() id!: string;
  @ApiProperty() planName!: string;
  @ApiProperty() tier!: AdminPlansTier;
  @ApiProperty() totalRevenue!: number;
  @ApiProperty() activeSubscriptions!: number;
  @ApiProperty() newSignups!: number;
  @ApiProperty() renewalRate!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}
