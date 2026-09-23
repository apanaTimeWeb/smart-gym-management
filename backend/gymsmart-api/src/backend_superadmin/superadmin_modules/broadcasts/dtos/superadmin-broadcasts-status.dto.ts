// RESPONSIBILITY: Validates SuperadminBroadcastsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { BroadcastsStatus } from '@/backend_superadmin/superadmin_modules/broadcasts/dtos/superadmin-broadcasts-update.dto';

export class SuperadminBroadcastsStatusDto {
  @IsEnum(BroadcastsStatus)
  status!: BroadcastsStatus;
}