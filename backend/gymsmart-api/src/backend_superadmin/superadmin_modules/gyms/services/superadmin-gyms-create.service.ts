// RESPONSIBILITY: Executes creation business flow for the gyms feature.
// FLOW: CommandController -> SuperadminGymsCreateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';
import type { SuperadminGymsCreateInput } from '@/backend_superadmin/superadmin_modules/gyms/types/superadmin-gyms.interfaces';
@Injectable()
export class SuperadminGymsCreateService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly config: ConfigService) {}
  /** Creates a new gyms record. */
  async createGyms(input: SuperadminGymsCreateInput): Promise<SuperadminGymsResponseDto> { return SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(await this.repository.createGyms(input)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}