// RESPONSIBILITY: Executes single-record retrieval for the team feature.
// FLOW: QueryController -> SuperadminTeamFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
import { SuperadminTeamMapper } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.mapper';
import type { SuperadminTeamDomainModel } from '@/backend_superadmin/superadmin_modules/team/types/superadmin-team.interfaces';
@Injectable()
export class SuperadminTeamFindService {
  constructor(private readonly repository: SuperadminTeamRepository) {}
  /** Retrieves one active team record by UUID. */
  async findTeamById(id: string): Promise<SuperadminTeamDomainModel> { return SuperadminTeamMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}