// RESPONSIBILITY: Executes creation business flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesCreateInput, AffiliatesDomainModel } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';
@Injectable()
export class AffiliatesCreateService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Creates a new affiliates record. */
  async createAffiliates(input: AffiliatesCreateInput): Promise<AffiliatesDomainModel> { return AffiliatesMapper.toDomain(await this.repository.createAffiliates(input)); }
}
