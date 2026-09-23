// RESPONSIBILITY: Executes the soft-delete flow for the profile feature.
// FLOW: CommandController -> SuperadminProfileDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
@Injectable()
export class SuperadminProfileDeleteService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Soft-deletes one profile record. */
  async deleteProfile(id: string): Promise<null> { await this.repository.deleteProfileById(id); return null; }
}