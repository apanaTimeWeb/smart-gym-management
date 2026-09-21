// RESPONSIBILITY: Reads the authenticated Superadmin profile for the profile page.
// FLOW: ProfileSpecialController -> ProfileMainService -> ProfileRepository -> mapper.
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/backend_superadmin/modules/superadmin/profile/profile.mapper';
import type { ProfileDomainModel } from '@/backend_superadmin/modules/superadmin/profile/types/profile.interfaces';

@Injectable()
export class ProfileMainService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Returns the currently authenticated Superadmin profile by id. */
  async findProfile(userId: string): Promise<ProfileDomainModel> {
    const entity = await this.repository.findById(userId);
    if (!entity) throw new NotFoundException('Profile record not found');
    return ProfileMapper.toDomain(entity);
  }
}
