// RESPONSIBILITY: Executes creation business flow for the broadcasts feature.
// FLOW: CommandController -> SuperadminBroadcastsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminBroadcastsMapper } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.mapper';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
import type { SuperadminBroadcastsCreateInput } from '@/backend_superadmin/superadmin_modules/broadcasts/types/superadmin-broadcasts.interfaces';
@Injectable()
export class SuperadminBroadcastsCreateService {
  constructor(private readonly repository: SuperadminBroadcastsRepository) {}
  /** Creates a new broadcasts record. */
  async createBroadcasts(input: SuperadminBroadcastsCreateInput): Promise<SuperadminBroadcastsResponseDto> { return SuperadminBroadcastsMapper.toResponse(SuperadminBroadcastsMapper.toDomain(await this.repository.createBroadcasts(input))); }
}