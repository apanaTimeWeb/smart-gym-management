// RESPONSIBILITY: Performs status transitions for gyms records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/superadmin/gyms/gyms.mapper';
import { GymsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/responses/gyms-response.dto';
@Injectable()
export class GymsStatusService {
  constructor(private readonly repository: GymsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeGymsStatus(id: string, status: string): Promise<GymsResponseDto> { return GymsMapper.toResponse(GymsMapper.toDomain(await this.repository.updateGymsById(id, { status: status as any }))); }
}
