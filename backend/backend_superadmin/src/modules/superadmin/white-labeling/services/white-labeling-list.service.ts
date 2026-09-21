// RESPONSIBILITY: Executes paginated read logic for the white-labeling feature.
// FLOW: QueryController -> WhiteLabelingListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { WhiteLabelingRepository } from '@/modules/superadmin/white-labeling/white-labeling.repository';
import { WhiteLabelingMapper } from '@/modules/superadmin/white-labeling/white-labeling.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { WhiteLabelingListQuery } from '@/modules/superadmin/white-labeling/types/white-labeling.interfaces';

@Injectable()
export class WhiteLabelingListService {
  constructor(private readonly repository: WhiteLabelingRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findWhiteLabelingPage(query: WhiteLabelingListQuery): Promise<{ data: ReturnType<typeof WhiteLabelingMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: WhiteLabelingMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
