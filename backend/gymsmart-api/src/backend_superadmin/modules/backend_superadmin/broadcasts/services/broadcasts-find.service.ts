// RESPONSIBILITY: Executes single-record retrieval for the broadcasts feature.
// FLOW: QueryController -> BroadcastsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.mapper';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/responses/broadcasts-response.dto';
@Injectable()
export class BroadcastsFindService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Retrieves one active broadcasts record by UUID. */
  async findBroadcastsById(id: string): Promise<BroadcastsResponseDto> { return BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}