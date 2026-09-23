// RESPONSIBILITY: Executes creation business flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesCreateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
import type { AffiliatesCreateInput } from '@/backend_superadmin/modules/superadmin/affiliates/types/affiliates.interfaces';
@Injectable()
export class AffiliatesCreateService {
  constructor(private readonly repository: AffiliatesRepository, private readonly config: ConfigService) {}
  /** Creates a new affiliates record. */
  async createAffiliates(input: AffiliatesCreateInput): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.createAffiliates(input)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}