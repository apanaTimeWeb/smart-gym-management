// RESPONSIBILITY: Executes creation business flow for the broadcasts feature.
// FLOW: CommandController -> BroadcastsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/modules/superadmin/broadcasts/broadcasts.mapper';
import type { BroadcastsCreateInput } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';
import { BroadcastsResponseDto } from '@/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
@Injectable()
export class BroadcastsCreateService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Creates a new broadcasts record. */
  async createBroadcasts(input: BroadcastsCreateInput): Promise<BroadcastsResponseDto> { return BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(await this.repository.createBroadcasts(input))); }
}
