// RESPONSIBILITY: Executes partial update business flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
import type { AffiliatesUpdateInput } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';
import { AffiliatesResponseDto } from '@/modules/superadmin/affiliates/responses/affiliates-response.dto';
@Injectable()
export class AffiliatesUpdateService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Updates a affiliates record by UUID. */
  async updateAffiliates(id: string, input: AffiliatesUpdateInput): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, input))); }
}
