// RESPONSIBILITY: Executes partial update business flow for the affiliates feature.
// FLOW: CommandController -> AffiliatesUpdateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/backend_superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/backend_superadmin/affiliates/responses/affiliates-response.dto';
import type { AffiliatesUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/affiliates/types/affiliates.interfaces';
@Injectable()
export class AffiliatesUpdateService {
  constructor(private readonly repository: AffiliatesRepository, private readonly config: ConfigService) {}
  /** Updates a affiliates record by UUID. */
  async updateAffiliates(id: string, input: AffiliatesUpdateInput): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, input)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}