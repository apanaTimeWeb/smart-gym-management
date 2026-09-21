// RESPONSIBILITY: Performs status transitions for affiliates records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
@Injectable()
export class AffiliatesStatusService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeAffiliatesStatus(id: string, status: string): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, { status }))); }
}
