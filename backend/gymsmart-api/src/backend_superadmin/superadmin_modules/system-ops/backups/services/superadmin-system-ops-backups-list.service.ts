// RESPONSIBILITY: Executes paginated read logic for the backups feature.
// FLOW: QueryController -> SuperadminBackupsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminBackupsListQuery } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';

@Injectable()
export class SuperadminBackupsListService {
  constructor(private readonly repository: SuperadminBackupsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findBackupsPage(query: SuperadminBackupsListQuery): Promise<{ data: ReturnType<typeof SuperadminBackupsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminBackupsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}