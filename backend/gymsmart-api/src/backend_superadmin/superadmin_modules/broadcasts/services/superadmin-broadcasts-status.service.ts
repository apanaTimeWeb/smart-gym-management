// RESPONSIBILITY: Performs status transitions for broadcasts records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
@Injectable()
export class SuperadminBroadcastsStatusService {
  constructor(private readonly repository: SuperadminBroadcastsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeBroadcastsStatus(id: string, status: string): Promise<SuperadminBroadcastsResponseDto> { return SuperadminBroadcastsMapper.toResponse(SuperadminBroadcastsMapper.toDomain(await this.repository.updateBroadcastsById(id, { status }))); }
}