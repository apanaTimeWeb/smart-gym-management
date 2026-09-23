// RESPONSIBILITY: Executes creation business flow for the affiliates feature.
// FLOW: CommandController -> SuperadminAffiliatesCreateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesCreateInput } from '@/backend_superadmin/superadmin_modules/affiliates/types/superadmin-affiliates.interfaces';
@Injectable()
export class SuperadminAffiliatesCreateService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService) {}
  /** Creates a new affiliates record. */
  async createAffiliates(input: SuperadminAffiliatesCreateInput): Promise<SuperadminAffiliatesResponseDto> { return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(await this.repository.createAffiliates(input)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}