// RESPONSIBILITY: Executes creation business flow for the profile feature.
// FLOW: CommandController -> ProfileCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/modules/superadmin/profile/profile.mapper';
import type { ProfileCreateInput, ProfileDomainModel } from '@/modules/superadmin/profile/types/profile.interfaces';
@Injectable()
export class ProfileCreateService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Creates a new profile record. */
  async createProfile(input: ProfileCreateInput): Promise<ProfileDomainModel> { return ProfileMapper.toDomain(await this.repository.createProfile(input)); }
}
