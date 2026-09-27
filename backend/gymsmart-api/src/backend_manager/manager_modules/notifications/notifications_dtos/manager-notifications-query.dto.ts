// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { NotificationPriority, NotificationStatus, NotificationType } from '@/backend_manager/manager_modules/notifications/manager-notifications.constants';

export class ManagerNotificationsQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(NotificationStatus) status?: NotificationStatus;
  @IsOptional() @IsEnum(NotificationPriority) priority?: NotificationPriority;
  @IsOptional() @IsEnum(NotificationType) type?: NotificationType;
}

export { ManagerNotificationsQueryDto as NotificationsQueryDto };
