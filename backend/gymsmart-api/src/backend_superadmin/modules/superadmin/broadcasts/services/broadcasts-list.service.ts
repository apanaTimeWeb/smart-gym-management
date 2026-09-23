// RESPONSIBILITY: Executes paginated read logic for the broadcasts feature.
// FLOW: QueryController -> BroadcastsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import type { BroadcastsListQuery } from '@/backend_superadmin/modules/superadmin/broadcasts/types/broadcasts.interfaces';

@Injectable()
export class BroadcastsListService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findBroadcastsPage(query: BroadcastsListQuery): Promise<{ data: BroadcastsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}