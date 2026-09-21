// RESPONSIBILITY: Executes partial update business flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesDomainModel, AffiliatesUpdateInput } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';
@Injectable()
export class AffiliatesUpdateService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Updates a affiliates record by UUID. */
  async updateAffiliates(id: string, input: AffiliatesUpdateInput): Promise<AffiliatesDomainModel> { return AffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, input)); }
}
