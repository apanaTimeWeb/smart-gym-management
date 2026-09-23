// RESPONSIBILITY: Executes single-record retrieval for the migrations feature.
// FLOW: QueryController -> SuperadminMigrationsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import type { SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';
@Injectable()
export class SuperadminMigrationsFindService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Retrieves one active migrations record by UUID. */
  async findMigrationsById(id: string): Promise<SuperadminMigrationsDomainModel> { return SuperadminMigrationsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}