// RESPONSIBILITY: Owns the atomic transaction boundary for affiliate payouts.
// FLOW: CommandController -> Orchestrator -> UnitOfWork -> payout service -> ledger + projection -> commit/rollback.
import { Injectable } from '@nestjs/common';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminAffiliatesPayoutService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-payout.service';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';

/**
 * Primary Intent: Ensures affiliate payout ledger entry creation and business-state projection mutation commit or roll back together.
 * Edge Cases: Any repository/ledger/audit failure aborts the entire transaction.
 * Side-Effects: Starts one database transaction.
 * AI-Note: Do not put payout business calculations here; keep them in the micro-service.
 */
@Injectable()
/**
 * Primary Intent: Defines SuperadminAffiliatesPayoutOrchestratorService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminAffiliatesPayoutOrchestratorService {
  constructor(private readonly unitOfWork:SuperadminCoreUnitOfWorkService, private readonly payout:SuperadminAffiliatesPayoutService) {}

  /**
 * Primary Intent: Executes the pay use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async pay(id:string):Promise<SuperadminAffiliatesResponseDto>{ return this.unitOfWork.run(()=>this.payout.payLocked(id)); }
}
