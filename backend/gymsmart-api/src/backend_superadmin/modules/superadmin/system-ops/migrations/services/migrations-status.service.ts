// RESPONSIBILITY: Performs status transitions for migrations records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.repository';
import { MigrationsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.mapper';
import type { MigrationsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/types/migrations.interfaces';
@Injectable()
export class MigrationsStatusService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeMigrationsStatus(id: string, status: string): Promise<MigrationsDomainModel> { return MigrationsMapper.toDomain(await this.repository.updateMigrationsById(id, { status })); }
}