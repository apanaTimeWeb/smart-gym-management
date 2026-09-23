// RESPONSIBILITY: Validates SuperadminMessagingStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { MessagingStatus } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-update.dto';

export class SuperadminMessagingStatusDto {
  @IsEnum(MessagingStatus)
  status!: MessagingStatus;
}