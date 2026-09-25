// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminComplianceMainService -> SuperadminComplianceRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceResponseDataDto } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-response-data.dto';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';

/**
 * Primary Intent: Defines SuperadminComplianceMainService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminComplianceMainService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}
/**
 * Primary Intent: Executes the findComplianceData use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findComplianceData use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findComplianceData(input: Record<string, unknown> = {}): Promise<SuperadminComplianceResponseDataDto> {
    return await this.repository.getLiveCompliance() as unknown as SuperadminComplianceResponseDataDto;
  }
}
