// RESPONSIBILITY: Executes single-record retrieval for the migrations feature.
// FLOW: QueryController -> MigrationsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.repository';
import { MigrationsMapper } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.mapper';
import type { MigrationsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/types/migrations.interfaces';
@Injectable()
export class MigrationsFindService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Retrieves one active migrations record by UUID. */
  async findMigrationsById(id: string): Promise<MigrationsDomainModel> { return MigrationsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}