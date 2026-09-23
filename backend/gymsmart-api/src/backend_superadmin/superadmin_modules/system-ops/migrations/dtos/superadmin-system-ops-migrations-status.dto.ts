// RESPONSIBILITY: Validates SuperadminMigrationsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { MigrationsStatus } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-update.dto';

export class SuperadminMigrationsStatusDto {
  @IsEnum(MigrationsStatus)
  status!: MigrationsStatus;
}