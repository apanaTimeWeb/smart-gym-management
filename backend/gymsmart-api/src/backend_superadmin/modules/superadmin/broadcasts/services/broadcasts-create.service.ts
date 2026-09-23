// RESPONSIBILITY: Executes creation business flow for the broadcasts feature.
// FLOW: CommandController -> BroadcastsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.mapper';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import type { BroadcastsCreateInput } from '@/backend_superadmin/modules/superadmin/broadcasts/types/broadcasts.interfaces';
@Injectable()
export class BroadcastsCreateService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Creates a new broadcasts record. */
  async createBroadcasts(input: BroadcastsCreateInput): Promise<BroadcastsResponseDto> { return BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(await this.repository.createBroadcasts(input))); }
}