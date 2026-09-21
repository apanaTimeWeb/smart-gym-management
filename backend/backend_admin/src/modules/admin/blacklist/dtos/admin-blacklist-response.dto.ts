// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin blacklist.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Blacklist response mapper → ApiResponse<T>.

export class AdminBlacklistHistoryDto {
  @ApiProperty()
  action!: string;
  @ApiProperty()
  actor!: string;
  @ApiProperty()
  timestamp!: string;
  @ApiProperty()
  note!: string;
}

export class AdminBlacklistedMemberDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  memberId!: string;
  @ApiProperty()
  memberName!: string;
  @ApiProperty()
  memberPhone!: string;
  @ApiProperty()
  memberEmail!: string;
  @ApiProperty()
  reason!: string;
  @ApiProperty()
  blacklistedBy!: string;
  @ApiProperty()
  blacklistedAt!: string;
  @ApiProperty({ enum: ['global', 'specific'] })
  scope!: string;
  @ApiProperty({ type: [String] })
  assignedGyms!: string[];
  @ApiProperty({ type: [String] })
  assignedGymNames!: string[];
  @ApiProperty()
  isActive!: boolean;
  @ApiPropertyOptional({ type: [AdminBlacklistHistoryDto] })
  history?: AdminBlacklistHistoryDto[];
}

export class AdminBlacklistListResponseDto {
  @ApiProperty({ type: [AdminBlacklistedMemberDto] })
  data!: AdminBlacklistedMemberDto[];
}

export class AdminBlacklistKPIDataDto {
  @ApiProperty()
  totalBlacklisted!: number;
  @ApiProperty()
  globalBans!: number;
  @ApiProperty()
  gymSpecificBans!: number;
  @ApiProperty()
  addedThisMonth!: number;
}
