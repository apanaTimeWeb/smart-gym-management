// RESPONSIBILITY: Performs status transitions for affiliates records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/backend_superadmin/affiliates/responses/affiliates-response.dto';
@Injectable()
export class AffiliatesStatusService {
  constructor(private readonly repository: AffiliatesRepository, private readonly config: ConfigService) {}
  /** Changes a status value after controller-level role authorization. */
  async changeAffiliatesStatus(id: string, status: string): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, { status })), this.config.getOrThrow<string>('app.defaultCurrency')); }
}