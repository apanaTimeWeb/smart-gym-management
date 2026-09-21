// RESPONSIBILITY: Executes paginated read logic for the broadcasts feature.
// FLOW: QueryController -> BroadcastsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/modules/superadmin/broadcasts/broadcasts.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { BroadcastsListQuery } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';
import { BroadcastsResponseDto } from '@/modules/superadmin/broadcasts/responses/broadcasts-response.dto';

@Injectable()
export class BroadcastsListService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findBroadcastsPage(query: BroadcastsListQuery): Promise<{ data: BroadcastsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
