// RESPONSIBILITY: Executes paginated read logic for the usage-meters feature.
// FLOW: QueryController -> UsageMetersListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { UsageMetersRepository } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.repository';
import { UsageMetersMapper } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { UsageMetersListQuery } from '@/backend_superadmin/modules/superadmin/usage-meters/types/usage-meters.interfaces';

@Injectable()
export class UsageMetersListService {
  constructor(private readonly repository: UsageMetersRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findUsageMetersPage(query: UsageMetersListQuery): Promise<{ data: ReturnType<typeof UsageMetersMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: UsageMetersMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}