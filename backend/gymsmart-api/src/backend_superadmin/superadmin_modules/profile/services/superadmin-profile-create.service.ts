// RESPONSIBILITY: Executes creation business flow for the profile feature.
// FLOW: CommandController -> SuperadminProfileCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import type { SuperadminProfileCreateInput, SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';
@Injectable()
export class SuperadminProfileCreateService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Creates a new profile record. */
  async createProfile(input: SuperadminProfileCreateInput): Promise<SuperadminProfileDomainModel> { return SuperadminProfileMapper.toDomain(await this.repository.createProfile(input)); }
}