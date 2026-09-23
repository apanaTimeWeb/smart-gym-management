// RESPONSIBILITY: Validates GymsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { GymsStatus } from '@/backend_superadmin/modules/superadmin/gyms/dtos/gyms-update.dto';

export class GymsStatusDto {
  @IsEnum(GymsStatus)
  status!: GymsStatus;
}