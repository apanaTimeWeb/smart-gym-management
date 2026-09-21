// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin members.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Members response mapper → ApiResponse<T>.

export class AdminMembersResponseDto {
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
  @ApiProperty({ required: false, description: 'Frontend contract field: branchId' })
  branchId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchName' })
  branchName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: planName' })
  planName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: joinDate' })
  joinDate?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: expiryDate' })
  expiryDate?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: pendingAmount' })
  pendingAmount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: gender' })
  gender?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: referralSource' })
  referralSource?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: photo' })
  photo?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: lastCheckIn' })
  lastCheckIn?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: totalVisits' })
  totalVisits?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: dateOfBirth' })
  dateOfBirth?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: address' })
  address?: string;
}
