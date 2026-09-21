// RESPONSIBILITY: Executes single-record retrieval for the gyms feature.
// FLOW: QueryController -> GymsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/modules/superadmin/gyms/gyms.mapper';
import type { GymsDomainModel } from '@/modules/superadmin/gyms/types/gyms.interfaces';
@Injectable()
export class GymsFindService {
  constructor(private readonly repository: GymsRepository) {}
  /** Retrieves one active gyms record by UUID. */
  async findGymsById(id: string): Promise<GymsDomainModel> { return GymsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
