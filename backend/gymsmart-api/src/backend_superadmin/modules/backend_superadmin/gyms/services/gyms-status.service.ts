// RESPONSIBILITY: Performs status transitions for gyms records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { GymsStatus } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-update.dto';
import { GymsRepository } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.repository';
import { GymsMapper } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms.mapper';
import { UnitOfWorkService } from '@/backend_superadmin/core/database/unit-of-work.service';
import { GymsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/responses/gyms-response.dto';
@Injectable()
export class GymsStatusService {
  constructor(private readonly repository: GymsRepository, private readonly unitOfWork: UnitOfWorkService, private readonly config: ConfigService) {}
  /** Changes a status value after controller-level role authorization. */
  async changeGymsStatus(id: string, status: string): Promise<GymsResponseDto> { const row = await this.unitOfWork.run(() => this.repository.updateGymStatusWithLock(id, status as GymsStatus));
    return GymsMapper.toResponse(GymsMapper.toDomain(row), this.config.getOrThrow<string>('app.defaultCurrency')); }
}