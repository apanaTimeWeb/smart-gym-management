// RESPONSIBILITY: Validates SuperadminGymsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { GymsStatus } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-update.dto';

export class SuperadminGymsStatusDto {
  @IsEnum(GymsStatus)
  status!: GymsStatus;
}