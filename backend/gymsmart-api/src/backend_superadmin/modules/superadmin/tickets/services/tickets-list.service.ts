// RESPONSIBILITY: Executes paginated read logic for the tickets feature.
// FLOW: QueryController -> TicketsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/backend_superadmin/modules/superadmin/tickets/tickets.repository';
import { TicketsMapper } from '@/backend_superadmin/modules/superadmin/tickets/tickets.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { TicketsListQuery } from '@/backend_superadmin/modules/superadmin/tickets/types/tickets.interfaces';

@Injectable()
export class TicketsListService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findTicketsPage(query: TicketsListQuery): Promise<{ data: ReturnType<typeof TicketsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: TicketsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
