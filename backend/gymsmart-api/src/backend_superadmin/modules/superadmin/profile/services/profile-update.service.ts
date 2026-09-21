// RESPONSIBILITY: Handles the update endpoint for the profile feature without owning unrelated business flows.
// FLOW: Controller -> ProfileUpdateService -> feature repository/infra dependency -> typed result.
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/backend_superadmin/modules/superadmin/profile/profile.mapper';
import type { ProfileDomainModel, ProfileUpdateInput } from '@/backend_superadmin/modules/superadmin/profile/types/profile.interfaces';
@Injectable()
export class ProfileUpdateService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Updates the Superadmin profile and returns the persisted profile. */
  async updateProfile(id: string, input: ProfileUpdateInput): Promise<ProfileDomainModel> {
    return ProfileMapper.toDomain(await this.repository.updateProfileById(id, input));
  }
}
