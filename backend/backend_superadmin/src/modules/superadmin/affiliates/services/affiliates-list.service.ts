// RESPONSIBILITY: Executes paginated read logic for the affiliates feature.
// FLOW: QueryController -> AffiliatesListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { AffiliatesListQuery } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';

@Injectable()
export class AffiliatesListService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAffiliatesPage(query: AffiliatesListQuery): Promise<{ data: ReturnType<typeof AffiliatesMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: AffiliatesMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
