// RESPONSIBILITY: Executes paginated read logic for the profile feature.
// FLOW: QueryController -> ProfileListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/backend_superadmin/modules/superadmin/profile/profile.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { ProfileListQuery } from '@/backend_superadmin/modules/superadmin/profile/types/profile.interfaces';

@Injectable()
export class ProfileListService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findProfilePage(query: ProfileListQuery): Promise<{ data: ReturnType<typeof ProfileMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: ProfileMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}