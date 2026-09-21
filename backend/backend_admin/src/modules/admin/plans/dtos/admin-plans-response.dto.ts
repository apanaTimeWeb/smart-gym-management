// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin plans.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Plans response mapper → ApiResponse<T>.

export class AdminPlansResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: name' })
  name?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: tier' })
  tier?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: price1Month' })
  price1Month?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: price3Month' })
  price3Month?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: price6Month' })
  price6Month?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: price12Month' })
  price12Month?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: features' })
  features?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: isActive' })
  isActive?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: freezeAllowed' })
  freezeAllowed?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: joiningFee' })
  joiningFee?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: ptSessionsIncluded' })
  ptSessionsIncluded?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: taxRate' })
  taxRate?: number;
}
