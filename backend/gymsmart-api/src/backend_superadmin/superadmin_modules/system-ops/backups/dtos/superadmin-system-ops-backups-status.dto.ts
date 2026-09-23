// RESPONSIBILITY: Validates SuperadminBackupsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { BackupsStatus } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-update.dto';

export class SuperadminBackupsStatusDto {
  @IsEnum(BackupsStatus)
  status!: BackupsStatus;
}