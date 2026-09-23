// RESPONSIBILITY: Validates MigrationsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { MigrationsStatus } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/dtos/migrations-update.dto';

export class MigrationsStatusDto {
  @IsEnum(MigrationsStatus)
  status!: MigrationsStatus;
}