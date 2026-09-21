// RESPONSIBILITY: Executes creation business flow for the gyms feature.
// FLOW: CommandController -> GymsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/modules/superadmin/gyms/gyms.mapper';
import type { GymsCreateInput, GymsDomainModel } from '@/modules/superadmin/gyms/types/gyms.interfaces';
@Injectable()
export class GymsCreateService {
  constructor(private readonly repository: GymsRepository) {}
  /** Creates a new gyms record. */
  async createGyms(input: GymsCreateInput): Promise<GymsDomainModel> { return GymsMapper.toDomain(await this.repository.createGyms(input)); }
}
