// RESPONSIBILITY: Executes partial update business flow for the infrastructure feature.
// FLOW: CommandController -> SuperadminSystemOpsInfrastructureUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSystemOpsInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminSystemOpsInfrastructureMapper } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.mapper';
import type { SuperadminInfrastructureDomainModel, SuperadminInfrastructureUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_types/superadmin-system-ops-infrastructure.interfaces';
/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsInfrastructureUpdateService {
  constructor(private readonly repository: SuperadminSystemOpsInfrastructureRepository) {}
/**
 * Primary Intent: Executes the updateInfrastructure use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateInfrastructure use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateInfrastructure(id: string, input: SuperadminInfrastructureUpdateInput): Promise<SuperadminInfrastructureDomainModel> { return SuperadminSystemOpsInfrastructureMapper.toDomain(await this.repository.updateInfrastructureById(id, input)); }
}
