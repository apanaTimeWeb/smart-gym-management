// RESPONSIBILITY: Executes paginated read logic for the white-labeling feature.
// FLOW: QueryController -> SuperadminWhiteLabelingListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingMapper } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminWhiteLabelingListQuery } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';

@Injectable()
export class SuperadminWhiteLabelingListService {
  constructor(private readonly repository: SuperadminWhiteLabelingRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findWhiteLabelingPage(query: SuperadminWhiteLabelingListQuery): Promise<{ data: ReturnType<typeof SuperadminWhiteLabelingMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminWhiteLabelingMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}