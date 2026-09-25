// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin blacklist.
// FLOW: Repository domain â†’ Blacklist response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @description Defines the AdminBlacklistHistoryDto boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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

/**
 * @description Defines the AdminBlacklistedMemberDto boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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

/**
 * @description Defines the AdminBlacklistKPIDataDto boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
