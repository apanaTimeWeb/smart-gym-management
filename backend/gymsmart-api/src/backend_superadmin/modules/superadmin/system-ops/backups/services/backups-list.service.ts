// RESPONSIBILITY: Executes paginated read logic for the backups feature.
// FLOW: QueryController -> BackupsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';
import { BackupsMapper } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { BackupsListQuery } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';

@Injectable()
export class BackupsListService {
  constructor(private readonly repository: BackupsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findBackupsPage(query: BackupsListQuery): Promise<{ data: ReturnType<typeof BackupsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: BackupsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}