// RESPONSIBILITY: Executes creation business flow for the gyms feature.
// FLOW: CommandController -> GymsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/superadmin/gyms/gyms.mapper';
import type { GymsCreateInput } from '@/backend_superadmin/modules/superadmin/gyms/types/gyms.interfaces';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
@Injectable()
export class GymsCreateService {
  constructor(private readonly repository: GymsRepository) {}
  /** Creates a new gyms record. */
  async createGyms(input: GymsCreateInput): Promise<GymsResponseDto> { return GymsMapper.toResponse(GymsMapper.toDomain(await this.repository.createGyms(input))); }
}
