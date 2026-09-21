// RESPONSIBILITY: Performs status transitions for affiliates records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesDomainModel } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';
@Injectable()
export class AffiliatesStatusService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeAffiliatesStatus(id: string, status: string): Promise<AffiliatesDomainModel> { return AffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, { status })); }
}
