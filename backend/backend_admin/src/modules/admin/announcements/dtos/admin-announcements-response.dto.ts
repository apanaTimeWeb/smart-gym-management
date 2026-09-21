// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin announcements.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain → Announcements response mapper → ApiResponse<T>.

export class AdminAnnouncementViewsByBranchDto {
  @ApiProperty()
  branchId!: string;
  @ApiProperty()
  count!: number;
}

export class AdminAnnouncementDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  body!: string;
  @ApiProperty({ enum: ['high', 'medium', 'low'] })
  priority!: string;
  @ApiProperty({ enum: ['active', 'scheduled', 'expired', 'draft'] })
  status!: string;
  @ApiProperty({ type: [String], enum: ['all', 'members', 'managers', 'trainers', 'staff'] })
  audience!: string[];
  @ApiProperty({ type: [String] })
  gymIds!: string[];
  @ApiProperty({ type: [String] })
  gymNames!: string[];
  @ApiProperty()
  publishedAt!: string;
  @ApiProperty()
  expiresAt!: string;
  @ApiProperty()
  createdBy!: string;
  @ApiProperty()
  createdAt!: string;
  @ApiProperty()
  viewCount!: number;
  @ApiPropertyOptional({ type: [AdminAnnouncementViewsByBranchDto] })
  viewsByBranch?: AdminAnnouncementViewsByBranchDto[];
  @ApiProperty()
  isPinned!: boolean;
  @ApiPropertyOptional()
  deliveryStatus?: string;
  @ApiPropertyOptional()
  pushNotificationSent?: boolean;
  @ApiPropertyOptional()
  acknowledgedCount?: number;
}


export class AdminAnnouncementKPIDataDto {
  @ApiProperty()
  total!: number;
  @ApiProperty()
  active!: number;
  @ApiProperty()
  scheduled!: number;
  @ApiProperty()
  expired!: number;
  @ApiProperty()
  totalViews!: number;
  @ApiProperty()
  pinned!: number;
}
