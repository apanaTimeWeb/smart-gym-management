// RESPONSIBILITY: Executes single-record retrieval for the affiliates feature.
// FLOW: QueryController -> SuperadminAffiliatesFindService -> repository findByIdOrThrow -> mapper.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminAffiliatesLedgerRepository } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_repositories/superadmin-affiliates-ledger.repository';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';
/**
 * Primary Intent: Defines SuperadminAffiliatesFindService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAffiliatesFindService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly ledger: SuperadminAffiliatesLedgerRepository, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the findAffiliatesById use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findAffiliatesById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAffiliatesById(id: string): Promise<SuperadminAffiliatesResponseDto> { const entity = await this.repository.findByIdOrThrow(id); const balance = await this.ledger.findPayableBalance(entity.id, entity.currency); return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(entity, balance), this.config.getOrThrow<string>('app.defaultCurrency')); }
}
