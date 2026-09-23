// RESPONSIBILITY: Executes paginated read logic for the profile feature.
// FLOW: QueryController -> SuperadminProfileListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminProfileListQuery } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';

@Injectable()
export class SuperadminProfileListService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findProfilePage(query: SuperadminProfileListQuery): Promise<{ data: ReturnType<typeof SuperadminProfileMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminProfileMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}