// RESPONSIBILITY: Executes creation business flow for the migrations feature.
// FLOW: CommandController -> SuperadminMigrationsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import type { SuperadminMigrationsCreateInput, SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';
@Injectable()
export class SuperadminMigrationsCreateService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Creates a new migrations record. */
  async createMigrations(input: SuperadminMigrationsCreateInput): Promise<SuperadminMigrationsDomainModel> { return SuperadminMigrationsMapper.toDomain(await this.repository.createMigrations(input)); }
}