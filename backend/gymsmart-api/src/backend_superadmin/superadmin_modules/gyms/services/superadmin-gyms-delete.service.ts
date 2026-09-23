// RESPONSIBILITY: Executes the soft-delete flow for the gyms feature.
// FLOW: CommandController -> SuperadminGymsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
@Injectable()
export class SuperadminGymsDeleteService {
  constructor(private readonly repository: SuperadminGymsRepository) {}
  /** Soft-deletes one gyms record. */
  async deleteGyms(id: string): Promise<null> { await this.repository.deleteGymsById(id); return null; }
}