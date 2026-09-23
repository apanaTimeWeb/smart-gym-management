// RESPONSIBILITY: Executes single-record retrieval for the profile feature.
// FLOW: QueryController -> SuperadminProfileFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import type { SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';
@Injectable()
export class SuperadminProfileFindService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Retrieves one active profile record by UUID. */
  async findProfileById(id: string): Promise<SuperadminProfileDomainModel> { return SuperadminProfileMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}