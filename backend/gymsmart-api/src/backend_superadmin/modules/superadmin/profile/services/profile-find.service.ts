// RESPONSIBILITY: Executes single-record retrieval for the profile feature.
// FLOW: QueryController -> ProfileFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/backend_superadmin/modules/superadmin/profile/profile.mapper';
import type { ProfileDomainModel } from '@/backend_superadmin/modules/superadmin/profile/types/profile.interfaces';
@Injectable()
export class ProfileFindService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Retrieves one active profile record by UUID. */
  async findProfileById(id: string): Promise<ProfileDomainModel> { return ProfileMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
