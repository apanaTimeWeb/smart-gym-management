// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin payouts.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain â†’ Payouts response mapper â†’ ApiResponse<T>.

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
}

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
}

export class AdminPayoutsKPIDataDto {
  @ApiProperty() totalNetProfit!: number;
  @ApiProperty() totalGrossRevenue!: number;
  @ApiProperty() totalExpenses!: number;
  @ApiProperty() pendingPayouts!: number;
}
