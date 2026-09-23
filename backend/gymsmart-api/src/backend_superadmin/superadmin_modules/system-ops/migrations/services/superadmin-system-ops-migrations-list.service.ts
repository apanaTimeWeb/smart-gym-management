// RESPONSIBILITY: Executes paginated read logic for the migrations feature.
// FLOW: QueryController -> SuperadminMigrationsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminMigrationsListQuery } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';

@Injectable()
export class SuperadminMigrationsListService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findMigrationsPage(query: SuperadminMigrationsListQuery): Promise<{ data: ReturnType<typeof SuperadminMigrationsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminMigrationsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}