// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin coupons.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Coupons response mapper → ApiResponse<T>.

export class AdminCouponsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: code' })
  code?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: description' })
  description?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: type' })
  type?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: value' })
  value?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: minOrderAmount' })
  minOrderAmount?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: maxDiscount' })
  maxDiscount?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: usageLimit' })
  usageLimit?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: usedCount' })
  usedCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: assignedGyms' })
  assignedGyms?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: assignedGymNames' })
  assignedGymNames?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: validFrom' })
  validFrom?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: validUntil' })
  validUntil?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
}
