// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin notifications.
// FLOW: Repository domain â†’ Notifications response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AdminNotificationsSeverity } from '@/backend_admin/admin_modules/admin_notifications/admin-notifications.constants.js';

/**
 * @description Defines the AdminNotificationDto boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  body!: string;
  @ApiProperty({ enum: ['INFO', 'WARNING', 'CRITICAL'] })
  severity!: AdminNotificationsSeverity;
  @ApiProperty()
  read!: boolean;
  @ApiProperty()
  createdAt!: string;
  @ApiPropertyOptional()
  branchId?: string;
  @ApiPropertyOptional()
  branchName?: string;
}
