// RESPONSIBILITY: Performs status transitions for broadcasts records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/modules/superadmin/broadcasts/broadcasts.mapper';
import type { BroadcastsDomainModel } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';
@Injectable()
export class BroadcastsStatusService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeBroadcastsStatus(id: string, status: string): Promise<BroadcastsDomainModel> { return BroadcastsMapper.toDomain(await this.repository.updateBroadcastsById(id, { status })); }
}
