// RESPONSIBILITY: Executes partial update business flow for the broadcasts feature.
// FLOW: CommandController -> BroadcastsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/broadcasts.mapper';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/responses/broadcasts-response.dto';
import type { BroadcastsUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/broadcasts/types/broadcasts.interfaces';
@Injectable()
export class BroadcastsUpdateService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Updates a broadcasts record by UUID. */
  async updateBroadcasts(id: string, input: BroadcastsUpdateInput): Promise<BroadcastsResponseDto> { return BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(await this.repository.updateBroadcastsById(id, input))); }
}