// RESPONSIBILITY: Validates BroadcastsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { BroadcastsStatus } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/dtos/broadcasts-update.dto';

export class BroadcastsStatusDto {
  @IsEnum(BroadcastsStatus)
  status!: BroadcastsStatus;
}