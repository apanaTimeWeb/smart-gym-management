// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin payouts.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Payouts response mapper → ApiResponse<T>.

export class AdminPayoutsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymId' })
  gymId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymName' })
  gymName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: month' })
  month?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: grossRevenue' })
  grossRevenue?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffPayroll' })
  staffPayroll?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: operationalExpenses' })
  operationalExpenses?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: platformFee' })
  platformFee?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: netProfit' })
  netProfit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: payoutStatus' })
  payoutStatus?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: paidOn' })
  paidOn?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: approvedBy' })
  approvedBy?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: approvedAt' })
  approvedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: rejectionReason' })
  rejectionReason?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: revenue' })
  revenue?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: cogs' })
  cogs?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: grossProfit' })
  grossProfit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffCost' })
  staffCost?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: rentUtilities' })
  rentUtilities?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: marketing' })
  marketing?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: miscExpenses' })
  miscExpenses?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: ebitda' })
  ebitda?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: tax' })
  tax?: number;
}
