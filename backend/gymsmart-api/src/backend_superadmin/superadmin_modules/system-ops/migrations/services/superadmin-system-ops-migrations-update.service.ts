// RESPONSIBILITY: Executes partial update business flow for the migrations feature.
// FLOW: CommandController -> SuperadminMigrationsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import type { SuperadminMigrationsDomainModel, SuperadminMigrationsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';
@Injectable()
export class SuperadminMigrationsUpdateService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Updates a migrations record by UUID. */
  async updateMigrations(id: string, input: SuperadminMigrationsUpdateInput): Promise<SuperadminMigrationsDomainModel> { return SuperadminMigrationsMapper.toDomain(await this.repository.updateMigrationsById(id, input)); }
}