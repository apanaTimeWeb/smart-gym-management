// RESPONSIBILITY: Executes single-record retrieval for the gyms feature.
// FLOW: QueryController -> GymsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/superadmin/gyms/gyms.mapper';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
@Injectable()
export class GymsFindService {
  constructor(private readonly repository: GymsRepository) {}
  /** Retrieves one active gyms record by UUID. */
  async findGymsById(id: string): Promise<GymsResponseDto> { return GymsMapper.toResponse(GymsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}
