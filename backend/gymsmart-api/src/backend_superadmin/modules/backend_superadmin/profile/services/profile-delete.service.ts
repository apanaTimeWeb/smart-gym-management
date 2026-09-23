// RESPONSIBILITY: Executes the soft-delete flow for the profile feature.
// FLOW: CommandController -> ProfileDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '@/backend_superadmin/modules/backend_superadmin/profile/profile.repository';
@Injectable()
export class ProfileDeleteService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Soft-deletes one profile record. */
  async deleteProfile(id: string): Promise<null> { await this.repository.deleteProfileById(id); return null; }
}