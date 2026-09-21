// RESPONSIBILITY: Executes partial update business flow for the migrations feature.
// FLOW: CommandController -> MigrationsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.repository';
import { MigrationsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.mapper';
import type { MigrationsDomainModel, MigrationsUpdateInput } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/types/migrations.interfaces';
@Injectable()
export class MigrationsUpdateService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Updates a migrations record by UUID. */
  async updateMigrations(id: string, input: MigrationsUpdateInput): Promise<MigrationsDomainModel> { return MigrationsMapper.toDomain(await this.repository.updateMigrationsById(id, input)); }
}
