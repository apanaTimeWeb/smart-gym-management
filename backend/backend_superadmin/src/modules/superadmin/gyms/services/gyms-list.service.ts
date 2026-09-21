// RESPONSIBILITY: Executes paginated read logic for the gyms feature.
// FLOW: QueryController -> GymsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/modules/superadmin/gyms/gyms.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { GymsListQuery } from '@/modules/superadmin/gyms/types/gyms.interfaces';

@Injectable()
export class GymsListService {
  constructor(private readonly repository: GymsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findGymsPage(query: GymsListQuery): Promise<{ data: ReturnType<typeof GymsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: GymsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
