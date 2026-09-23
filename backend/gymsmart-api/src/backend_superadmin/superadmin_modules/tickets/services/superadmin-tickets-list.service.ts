// RESPONSIBILITY: Executes paginated read logic for the tickets feature.
// FLOW: QueryController -> SuperadminTicketsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import { SuperadminTicketsMapper } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminTicketsListQuery } from '@/backend_superadmin/superadmin_modules/tickets/types/superadmin-tickets.interfaces';

@Injectable()
export class SuperadminTicketsListService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findTicketsPage(query: SuperadminTicketsListQuery): Promise<{ data: ReturnType<typeof SuperadminTicketsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminTicketsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}