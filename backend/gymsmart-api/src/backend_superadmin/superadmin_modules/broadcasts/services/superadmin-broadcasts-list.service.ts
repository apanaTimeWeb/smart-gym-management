// RESPONSIBILITY: Executes paginated read logic for the broadcasts feature.
// FLOW: QueryController -> SuperadminBroadcastsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
import type { SuperadminBroadcastsListQuery } from '@/backend_superadmin/superadmin_modules/broadcasts/types/superadmin-broadcasts.interfaces';

@Injectable()
export class SuperadminBroadcastsListService {
  constructor(private readonly repository: SuperadminBroadcastsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findBroadcastsPage(query: SuperadminBroadcastsListQuery): Promise<{ data: SuperadminBroadcastsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminBroadcastsMapper.toResponse(SuperadminBroadcastsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}