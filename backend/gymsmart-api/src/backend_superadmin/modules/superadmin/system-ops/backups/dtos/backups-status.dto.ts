// RESPONSIBILITY: Validates BackupsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { BackupsStatus } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-update.dto';

export class BackupsStatusDto {
  @IsEnum(BackupsStatus)
  status!: BackupsStatus;
}