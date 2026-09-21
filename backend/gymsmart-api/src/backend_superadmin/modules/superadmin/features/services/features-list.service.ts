// RESPONSIBILITY: Executes paginated read logic for the features feature.
// FLOW: QueryController -> FeaturesListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesMapper } from '@/backend_superadmin/modules/superadmin/features/features.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { FeaturesListQuery } from '@/backend_superadmin/modules/superadmin/features/types/features.interfaces';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';

@Injectable()
export class FeaturesListService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findFeaturesPage(query: FeaturesListQuery): Promise<{ data: FeaturesResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => FeaturesMapper.toResponse(FeaturesMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
