// RESPONSIBILITY: Executes the soft-delete flow for the gyms feature.
// FLOW: CommandController -> GymsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
@Injectable()
export class GymsDeleteService {
  constructor(private readonly repository: GymsRepository) {}
  /** Soft-deletes one gyms record. */
  async deleteGyms(id: string): Promise<null> { await this.repository.deleteGymsById(id); return null; }
}