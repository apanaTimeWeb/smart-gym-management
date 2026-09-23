// RESPONSIBILITY: Performs status transitions for affiliates records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
@Injectable()
export class SuperadminAffiliatesStatusService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService) {}
  /** Changes a status value after controller-level role authorization. */
  async changeAffiliatesStatus(id: string, status: string): Promise<SuperadminAffiliatesResponseDto> { return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, { status })), this.config.getOrThrow<string>('app.defaultCurrency')); }
}