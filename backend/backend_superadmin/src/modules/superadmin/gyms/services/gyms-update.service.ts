// RESPONSIBILITY: Executes partial update business flow for the gyms feature.
// FLOW: CommandController -> GymsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/modules/superadmin/gyms/gyms.mapper';
import type { GymsDomainModel, GymsUpdateInput } from '@/modules/superadmin/gyms/types/gyms.interfaces';
@Injectable()
export class GymsUpdateService {
  constructor(private readonly repository: GymsRepository) {}
  /** Updates a gyms record by UUID. */
  async updateGyms(id: string, input: GymsUpdateInput): Promise<GymsDomainModel> { return GymsMapper.toDomain(await this.repository.updateGymsById(id, input)); }
}
