// RESPONSIBILITY: Performs status transitions for broadcasts records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.repository';
import { BroadcastsMapper } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.mapper';
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
@Injectable()
export class BroadcastsStatusService {
  constructor(private readonly repository: BroadcastsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeBroadcastsStatus(id: string, status: string): Promise<BroadcastsResponseDto> { return BroadcastsMapper.toResponse(BroadcastsMapper.toDomain(await this.repository.updateBroadcastsById(id, { status }))); }
}