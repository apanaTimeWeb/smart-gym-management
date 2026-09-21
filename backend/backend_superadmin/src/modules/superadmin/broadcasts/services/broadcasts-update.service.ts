// RESPONSIBILITY: Executes partial update business flow for the broadcasts feature.
// FLOW: CommandController -> BroadcastsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/modules/superadmin/broadcasts/broadcasts.mapper';
import type { BroadcastsDomainModel, BroadcastsUpdateInput } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';
@Injectable()
export class BroadcastsUpdateService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Updates a broadcasts record by UUID. */
  async updateBroadcasts(id: string, input: BroadcastsUpdateInput): Promise<BroadcastsDomainModel> { return BroadcastsMapper.toDomain(await this.repository.updateBroadcastsById(id, input)); }
}
