// RESPONSIBILITY: Executes partial update business flow for the broadcasts feature.
// FLOW: CommandController -> SuperadminBroadcastsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
import type { SuperadminBroadcastsUpdateInput } from '@/backend_superadmin/superadmin_modules/broadcasts/types/superadmin-broadcasts.interfaces';
@Injectable()
export class SuperadminBroadcastsUpdateService {
  constructor(private readonly repository: SuperadminBroadcastsRepository) {}
  /** Updates a broadcasts record by UUID. */
  async updateBroadcasts(id: string, input: SuperadminBroadcastsUpdateInput): Promise<SuperadminBroadcastsResponseDto> { return SuperadminBroadcastsMapper.toResponse(SuperadminBroadcastsMapper.toDomain(await this.repository.updateBroadcastsById(id, input))); }
}