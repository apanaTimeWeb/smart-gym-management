// RESPONSIBILITY: Executes single-record retrieval for the broadcasts feature.
// FLOW: QueryController -> BroadcastsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/modules/superadmin/broadcasts/broadcasts.mapper';
import type { BroadcastsDomainModel } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';
@Injectable()
export class BroadcastsFindService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Retrieves one active broadcasts record by UUID. */
  async findBroadcastsById(id: string): Promise<BroadcastsDomainModel> { return BroadcastsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
