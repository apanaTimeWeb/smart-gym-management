// RESPONSIBILITY: Performs status transitions for gyms records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/modules/superadmin/gyms/gyms.mapper';
import type { GymsDomainModel } from '@/modules/superadmin/gyms/types/gyms.interfaces';
@Injectable()
export class GymsStatusService {
  constructor(private readonly repository: GymsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeGymsStatus(id: string, status: string): Promise<GymsDomainModel> { return GymsMapper.toDomain(await this.repository.updateGymsById(id, { status })); }
}
