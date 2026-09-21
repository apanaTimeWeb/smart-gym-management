// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin usage.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Usage response mapper → ApiResponse<T>.

export class AdminUsageResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: storageUsed' })
  storageUsed?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: storageLimit' })
  storageLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: membersUsed' })
  membersUsed?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: membersLimit' })
  membersLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffUsed' })
  staffUsed?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: staffLimit' })
  staffLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymsUsed' })
  gymsUsed?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymsLimit' })
  gymsLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: apiRequestsUsed' })
  apiRequestsUsed?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: apiRequestsLimit' })
  apiRequestsLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: currentPlan' })
  currentPlan?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: renewalDate' })
  renewalDate?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: usagePercent' })
  usagePercent?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: planName' })
  planName?: string;
}
