// RESPONSIBILITY: Executes creation business flow for the integrations feature.
// FLOW: CommandController -> SuperadminIntegrationsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsMapper } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.mapper';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_responses/superadmin-integrations-response.dto';
import type { SuperadminIntegrationsCreateInput } from '@/backend_superadmin/superadmin_modules/integrations/integrations_types/superadmin-integrations.interfaces';
/**
 * Primary Intent: Defines SuperadminIntegrationsCreateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminIntegrationsCreateService {
  constructor(private readonly repository: SuperadminIntegrationsRepository) {}
/**
 * Primary Intent: Executes the createIntegrations use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the createIntegrations use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createIntegrations(input: SuperadminIntegrationsCreateInput): Promise<SuperadminIntegrationsResponseDto> { return SuperadminIntegrationsMapper.toResponse(SuperadminIntegrationsMapper.toDomain(await this.repository.createIntegrations(input))); }
}
