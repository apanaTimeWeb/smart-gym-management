// RESPONSIBILITY: Executes paginated read logic for the usage-meters feature.
// FLOW: QueryController -> SuperadminUsageMetersListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersMapper } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminUsageMetersListQuery } from '@/backend_superadmin/superadmin_modules/usage-meters/types/superadmin-usage-meters.interfaces';

@Injectable()
export class SuperadminUsageMetersListService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findUsageMetersPage(query: SuperadminUsageMetersListQuery): Promise<{ data: ReturnType<typeof SuperadminUsageMetersMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminUsageMetersMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}