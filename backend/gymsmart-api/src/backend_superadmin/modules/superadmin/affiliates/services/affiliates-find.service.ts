// RESPONSIBILITY: Executes single-record retrieval for the affiliates feature.
// FLOW: QueryController -> AffiliatesFindService -> repository findByIdOrThrow -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
@Injectable()
export class AffiliatesFindService {
  constructor(private readonly repository: AffiliatesRepository, private readonly config: ConfigService) {}
  /** Retrieves one active affiliates record by UUID. */
  async findAffiliatesById(id: string): Promise<AffiliatesResponseDto> { return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}