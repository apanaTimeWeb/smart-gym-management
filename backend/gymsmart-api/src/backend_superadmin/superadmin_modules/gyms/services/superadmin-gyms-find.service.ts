// RESPONSIBILITY: Executes single-record retrieval for the gyms feature.
// FLOW: QueryController -> SuperadminGymsFindService -> repository findByIdOrThrow -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
@Injectable()
export class SuperadminGymsFindService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly config: ConfigService) {}
  /** Retrieves one active gyms record by UUID. */
  async findGymsById(id: string): Promise<SuperadminGymsResponseDto> { return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(await this.repository.findByIdOrThrow(id)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}