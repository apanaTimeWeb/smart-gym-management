// RESPONSIBILITY: Executes partial update business flow for the affiliates feature.
// FLOW: CommandController -> SuperadminAffiliatesUpdateService -> named repository mutation -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesUpdateInput } from '@/backend_superadmin/superadmin_modules/affiliates/types/superadmin-affiliates.interfaces';
@Injectable()
export class SuperadminAffiliatesUpdateService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService) {}
  /** Updates a affiliates record by UUID. */
  async updateAffiliates(id: string, input: SuperadminAffiliatesUpdateInput): Promise<SuperadminAffiliatesResponseDto> { return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(await this.repository.updateAffiliatesById(id, input)), this.config.getOrThrow<string>('app.defaultCurrency')); }
}