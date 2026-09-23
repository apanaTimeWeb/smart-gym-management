// RESPONSIBILITY: Executes creation business flow for the migrations feature.
// FLOW: CommandController -> MigrationsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.repository';
import { MigrationsMapper } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.mapper';
import type { MigrationsCreateInput, MigrationsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/types/migrations.interfaces';
@Injectable()
export class MigrationsCreateService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Creates a new migrations record. */
  async createMigrations(input: MigrationsCreateInput): Promise<MigrationsDomainModel> { return MigrationsMapper.toDomain(await this.repository.createMigrations(input)); }
}