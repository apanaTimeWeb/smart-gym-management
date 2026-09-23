// RESPONSIBILITY: Executes single-record retrieval for the affiliates feature.
// FLOW: QueryController -> SuperadminAffiliatesFindService -> repository findByIdOrThrow -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
@Injectable()
export class SuperadminAffiliatesFindService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService) {}
  /** Retrieves one active affiliates record by UUID. */
  async findAffiliatesById(id: string): Promise<SuperadminAffiliatesResponseDto> { return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}