// RESPONSIBILITY: Performs status transitions for migrations records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import type { SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';
@Injectable()
export class SuperadminMigrationsStatusService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeMigrationsStatus(id: string, status: string): Promise<SuperadminMigrationsDomainModel> { return SuperadminMigrationsMapper.toDomain(await this.repository.updateMigrationsById(id, { status })); }
}