// RESPONSIBILITY: Executes paginated read logic for the migrations feature.
// FLOW: QueryController -> MigrationsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.repository';
import { MigrationsMapper } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { MigrationsListQuery } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/types/migrations.interfaces';

@Injectable()
export class MigrationsListService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findMigrationsPage(query: MigrationsListQuery): Promise<{ data: ReturnType<typeof MigrationsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: MigrationsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}