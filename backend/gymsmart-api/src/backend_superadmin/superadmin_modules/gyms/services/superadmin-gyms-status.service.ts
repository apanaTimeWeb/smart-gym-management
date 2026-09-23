// RESPONSIBILITY: Performs status transitions for gyms records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { GymsStatus } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-update.dto';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { SuperadminUnitOfWorkService } from '@/backend_superadmin/superadmin_core/database/superadmin-core-unit-of-work.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
@Injectable()
export class SuperadminGymsStatusService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly unitOfWork: SuperadminUnitOfWorkService, private readonly config: ConfigService) {}
  /** Changes a status value after controller-level role authorization. */
  async changeGymsStatus(id: string, status: string): Promise<SuperadminGymsResponseDto> { const row = await this.unitOfWork.run(() => this.repository.updateGymStatusWithLock(id, status as GymsStatus));
    return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(row), this.config.getOrThrow<string>('app.defaultCurrency')); }
}