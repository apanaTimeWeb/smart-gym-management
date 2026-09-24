// RESPONSIBILITY: Executes paginated read logic for the gyms feature.
// FLOW: QueryController -> SuperadminGymsListService -> repository -> mapper -> response DTO.
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsMapper } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
import type { SuperadminGymsListQuery } from '@/backend_superadmin/superadmin_modules/gyms/gyms_types/superadmin-gyms.interfaces';

/**
 * Primary Intent: Defines SuperadminGymsListService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsListService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the findGymsPage use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findGymsPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findGymsPage(query: SuperadminGymsListQuery): Promise<{ data: SuperadminGymsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map(e => SuperadminGymsMapper.toResponse(SuperadminGymsMapper.toDomain(e), this.config.getOrThrow<string>('app.defaultCurrency'))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
