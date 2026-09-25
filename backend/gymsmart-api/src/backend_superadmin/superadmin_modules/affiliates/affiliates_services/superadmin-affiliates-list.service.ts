// RESPONSIBILITY: Executes paginated read logic for the affiliates feature.
// FLOW: QueryController -> SuperadminAffiliatesListService -> repository -> mapper -> response DTO.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-paginated-result';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesLedgerRepository } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_repositories/superadmin-affiliates-ledger.repository';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';
import type { SuperadminAffiliatesListQuery } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_types/superadmin-affiliates.interfaces';

/**
 * Primary Intent: Defines SuperadminAffiliatesListService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAffiliatesListService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly ledger: SuperadminAffiliatesLedgerRepository, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the findAffiliatesPage use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findAffiliatesPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAffiliatesPage(query: SuperadminAffiliatesListQuery): Promise<SuperadminPaginatedResult<SuperadminAffiliatesResponseDto>> {
    const result = await this.repository.findPage(query);
    const currencies = new Map(result.items.map((item) => [item.id, item.currency]));
    const balances = await this.ledger.findPayableBalances(result.items.map((item) => item.id), currencies);
    return {
      data: result.items.map((e) => SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(e, balances.get(e.id) ?? 0), this.config.getOrThrow<string>('app.defaultCurrency'))),
      meta: buildPaginationMeta(query.page, query.limit, result.total),
    };
  }
}
