// RESPONSIBILITY: Executes paginated read logic for the features feature.
// FLOW: QueryController -> SuperadminFeaturesListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
import type { SuperadminFeaturesListQuery } from '@/backend_superadmin/superadmin_modules/features/types/superadmin-features.interfaces';

@Injectable()
export class SuperadminFeaturesListService {
  constructor(private readonly repository: SuperadminFeaturesRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findFeaturesPage(query: SuperadminFeaturesListQuery): Promise<{ data: SuperadminFeaturesResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminFeaturesMapper.toResponse(SuperadminFeaturesMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}