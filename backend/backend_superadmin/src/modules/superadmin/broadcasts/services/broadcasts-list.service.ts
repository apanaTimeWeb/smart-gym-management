// RESPONSIBILITY: Executes paginated read logic for the broadcasts feature.
// FLOW: QueryController -> BroadcastsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/modules/superadmin/broadcasts/broadcasts.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { BroadcastsListQuery } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';

@Injectable()
export class BroadcastsListService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findBroadcastsPage(query: BroadcastsListQuery): Promise<{ data: ReturnType<typeof BroadcastsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: BroadcastsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
