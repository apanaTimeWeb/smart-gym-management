// RESPONSIBILITY: Executes single-record retrieval for the broadcasts feature.
// FLOW: QueryController -> SuperadminBroadcastsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
@Injectable()
export class SuperadminBroadcastsFindService {
  constructor(private readonly repository: SuperadminBroadcastsRepository) {}
  /** Retrieves one active broadcasts record by UUID. */
  async findBroadcastsById(id: string): Promise<SuperadminBroadcastsResponseDto> { return SuperadminBroadcastsMapper.toResponse(SuperadminBroadcastsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}