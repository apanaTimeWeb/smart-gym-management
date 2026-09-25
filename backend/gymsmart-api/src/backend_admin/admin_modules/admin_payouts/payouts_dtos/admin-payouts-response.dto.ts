// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin payouts.
// FLOW: Repository domain â†’ Payouts response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @description Defines the AdminGymPayoutDto boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymPayoutDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() month!: string;
  @ApiProperty() grossRevenue!: number;
  @ApiProperty() staffPayroll!: number;
  @ApiProperty() operationalExpenses!: number;
  @ApiProperty() platformFee!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty({ enum: ['paid', 'pending', 'processing'] }) payoutStatus!: string;
  @ApiPropertyOptional() paidOn?: string;
  @ApiPropertyOptional() approvedBy?: string;
  @ApiPropertyOptional() approvedAt?: string;
  @ApiPropertyOptional() rejectionReason?: string;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminPnLEntryDto boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPnLEntryDto {
  @ApiProperty() gymId!: string;
  @ApiProperty() gymName!: string;
  @ApiProperty() month!: string;
  @ApiProperty() revenue!: number;
  @ApiProperty() cogs!: number;
  @ApiProperty() grossProfit!: number;
  @ApiProperty() staffCost!: number;
  @ApiProperty() rentUtilities!: number;
  @ApiProperty() marketing!: number;
  @ApiProperty() miscExpenses!: number;
  @ApiProperty() ebitda!: number;
  @ApiProperty() tax!: number;
  @ApiProperty() netProfit!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}

/**
 * @description Defines the AdminPayoutsKPIDataDto boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsKPIDataDto {
  @ApiProperty() totalNetProfit!: number;
  @ApiProperty() totalGrossRevenue!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() pendingPayouts!: number;
  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}
