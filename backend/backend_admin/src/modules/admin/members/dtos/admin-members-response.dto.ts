// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin members.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Members response mapper → ApiResponse<T>.

export class AdminMemberDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() branchId!: string;
  @ApiProperty() branchName!: string;
  @ApiProperty() planName!: string;
  @ApiProperty({ enum: ['active', 'expired', 'pending', 'frozen'] }) status!: string;
  @ApiProperty() joinDate!: string;
  @ApiProperty() expiryDate!: string;
  @ApiProperty() pendingAmount!: number;
  @ApiProperty({ enum: ['Male', 'Female', 'Other'] }) gender!: string;
  @ApiPropertyOptional() referralSource?: string;
  @ApiPropertyOptional() photo?: string;
  @ApiPropertyOptional() lastCheckIn?: string;
  @ApiPropertyOptional() totalVisits?: number;
  @ApiPropertyOptional() dateOfBirth?: string;
  @ApiPropertyOptional() address?: string;
}

export class AdminMembersListResponseDto {
  @ApiProperty({ type: [AdminMemberDto] }) data!: AdminMemberDto[];
}

export class AdminMembersSummaryDto {
  @ApiProperty() totalMembers!: number;
  @ApiProperty() activeMembers!: number;
  @ApiProperty() expiredMembers!: number;
  @ApiProperty() pendingMembers!: number;
  @ApiProperty() expiringThisWeek!: number;
  @ApiProperty() expiringThisMonth!: number;
  @ApiProperty() totalOutstanding!: number;
  @ApiProperty() newThisMonth!: number;
}
