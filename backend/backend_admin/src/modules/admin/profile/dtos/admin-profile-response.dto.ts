// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin profile.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Profile response mapper → ApiResponse<T>.

export class AdminProfileResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: name' })
  name?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: email' })
  email?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: phone' })
  phone?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: role' })
  role?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchName' })
  branchName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: joinedAt' })
  joinedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: avatarInitial' })
  avatarInitial?: string;
}
