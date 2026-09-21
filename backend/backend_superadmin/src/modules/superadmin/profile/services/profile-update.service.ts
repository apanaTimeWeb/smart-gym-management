// RESPONSIBILITY: Handles the update endpoint for the profile feature without owning unrelated business flows.
// FLOW: Controller -> ProfileUpdateService -> feature repository/infra dependency -> typed result.
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/modules/superadmin/profile/profile.mapper';
import type { ProfileDomainModel, ProfileUpdateInput } from '@/modules/superadmin/profile/types/profile.interfaces';
@Injectable()
export class ProfileUpdateService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Updates the Superadmin profile and returns the persisted profile. */
  async updateProfile(id: string, input: ProfileUpdateInput): Promise<ProfileDomainModel> {
    return ProfileMapper.toDomain(await this.repository.updateProfileById(id, input));
  }
}
