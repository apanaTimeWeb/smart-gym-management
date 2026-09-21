// RESPONSIBILITY: Executes single-record retrieval for the affiliates feature.
// FLOW: QueryController -> AffiliatesFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesDomainModel } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';
@Injectable()
export class AffiliatesFindService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Retrieves one active affiliates record by UUID. */
  async findAffiliatesById(id: string): Promise<AffiliatesDomainModel> { return AffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
