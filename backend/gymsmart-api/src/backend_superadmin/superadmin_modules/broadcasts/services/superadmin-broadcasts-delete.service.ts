// RESPONSIBILITY: Executes the soft-delete flow for the broadcasts feature.
// FLOW: CommandController -> SuperadminBroadcastsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
@Injectable()
export class SuperadminBroadcastsDeleteService {
  constructor(private readonly repository: SuperadminBroadcastsRepository) {}
  /** Soft-deletes one broadcasts record. */
  async deleteBroadcasts(id: string): Promise<null> { await this.repository.deleteBroadcastsById(id); return null; }
}