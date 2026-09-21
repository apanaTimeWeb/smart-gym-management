// RESPONSIBILITY: Executes partial update business flow for the gyms feature.
// FLOW: CommandController -> GymsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/superadmin/gyms/gyms.mapper';
import type { GymsUpdateInput } from '@/backend_superadmin/modules/superadmin/gyms/types/gyms.interfaces';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
@Injectable()
export class GymsUpdateService {
  constructor(private readonly repository: GymsRepository) {}
  /** Updates a gyms record by UUID. */
  async updateGyms(id: string, input: GymsUpdateInput): Promise<GymsResponseDto> { return GymsMapper.toResponse(GymsMapper.toDomain(await this.repository.updateGymsById(id, input))); }
}
