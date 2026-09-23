// RESPONSIBILITY: Validates MessagingStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { MessagingStatus } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-update.dto';

export class MessagingStatusDto {
  @IsEnum(MessagingStatus)
  status!: MessagingStatus;
}