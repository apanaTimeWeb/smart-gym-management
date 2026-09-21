// RESPONSIBILITY: Executes creation business flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesCreateInput } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';
import { AffiliatesResponseDto } from '@/modules/superadmin/affiliates/responses/affiliates-response.dto';
@Injectable()
export class AffiliatesCreateService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Creates a new affiliates record. */
  async createAffiliates(input: AffiliatesCreateInput): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.createAffiliates(input))); }
}
