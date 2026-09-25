// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin announcements.
// FLOW: Repository domain â†’ Announcements response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminAnnouncementsStatus } from '@/backend_admin/admin_modules/admin_announcements/admin-announcements.constants'

/**
 * @description Defines the AdminAnnouncementViewsByBranchDto boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementViewsByBranchDto {
  @ApiProperty()
  branchId!: string;
  @ApiProperty()
  count!: number;
}

/**
 * @description Defines the AdminAnnouncementDto boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
  status!: AdminAnnouncementsStatus;
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

/**
 * @description Defines the AdminAnnouncementKPIDataDto boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
