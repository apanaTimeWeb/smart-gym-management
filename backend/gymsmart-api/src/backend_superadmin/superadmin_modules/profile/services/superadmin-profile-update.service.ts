// RESPONSIBILITY: Handles the update endpoint for the profile feature without owning unrelated business flows.
// FLOW: Controller -> SuperadminProfileUpdateService -> feature repository/infra dependency -> typed result.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import type { SuperadminProfileDomainModel, SuperadminProfileUpdateInput } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';
@Injectable()
export class SuperadminProfileUpdateService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Updates the Superadmin profile and returns the persisted profile. */
  async updateProfile(id: string, input: SuperadminProfileUpdateInput): Promise<SuperadminProfileDomainModel> {
    return SuperadminProfileMapper.toDomain(await this.repository.updateProfileById(id, input));
  }
}