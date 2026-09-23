// RESPONSIBILITY: Reads the authenticated Superadmin profile for the profile page.
// FLOW: ProfileSpecialController -> SuperadminProfileMainService -> SuperadminProfileRepository -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import type { SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';

@Injectable()
export class SuperadminProfileMainService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Returns the currently authenticated Superadmin profile by id. */
  async findProfile(userId: string): Promise<SuperadminProfileDomainModel> {
    const entity = await this.repository.findByIdOrThrow(userId);
    return SuperadminProfileMapper.toDomain(entity);
  }
}