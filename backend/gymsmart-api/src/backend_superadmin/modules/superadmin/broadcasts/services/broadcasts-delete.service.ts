// RESPONSIBILITY: Executes the soft-delete flow for the broadcasts feature.
// FLOW: CommandController -> BroadcastsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
@Injectable()
export class BroadcastsDeleteService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Soft-deletes one broadcasts record. */
  async deleteBroadcasts(id: string): Promise<null> { await this.repository.deleteBroadcastsById(id); return null; }
}
