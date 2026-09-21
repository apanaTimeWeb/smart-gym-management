// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin blacklist.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Blacklist response mapper → ApiResponse<T>.

export class AdminBlacklistResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: memberId' })
  memberId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: name' })
  name?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: phone' })
  phone?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: email' })
  email?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: reason' })
  reason?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: blacklistedBy' })
  blacklistedBy?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: blacklistedAt' })
  blacklistedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: scope' })
  scope?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: assignedGyms' })
  assignedGyms?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: assignedGymNames' })
  assignedGymNames?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: isActive' })
  isActive?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: history' })
  history?: Record<string, unknown>;
}
