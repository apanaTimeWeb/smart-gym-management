// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin sales.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Sales response mapper → ApiResponse<T>.

export class AdminSalesResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: monthlyRevenue' })
  monthlyRevenue?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: overviewData' })
  overviewData?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: referralData' })
  referralData?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: report' })
  report?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: totals' })
  totals?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: members' })
  members?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: total' })
  total?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: orders' })
  orders?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: summary' })
  summary?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: allMemberships' })
  allMemberships?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: storeProducts' })
  storeProducts?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: storeOrders' })
  storeOrders?: Record<string, unknown>;
}
