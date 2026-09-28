// RESPONSIBILITY: Soft-deletes a Trainer library diet plan and records the mutation.
// FLOW: TrainerLibraryCommandController → TrainerLibraryDietPlanDeleteService → repository → audit.
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerLibraryDietPlanRepository } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_repositories/trainer-library-diet-plan.repository';
/**
 * Intent: Defines the TrainerLibraryDietPlanDeleteService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerLibraryDietPlanDeleteService {
  constructor(private readonly repo: TrainerLibraryDietPlanRepository, private readonly audit: CoreAuditService, private readonly uow: CoreUnitOfWorkService) {}
  /** Soft-deletes a diet plan and records the actor and resource change. */
  /**
 * Intent: Executes the deleteDietPlan operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes deleteDietPlan inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for deleteDietPlan.
 * @returns {Promise<{ deleted: true }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async deleteDietPlan(id: string): Promise<{ deleted: true }> {
    await this.repo.findByIdOrThrow(id);
    await this.uow.execute(async (context) => {
      await this.repo.softDeleteDietPlan(id, context);
      await this.audit.record('DIET_PLAN_DELETED', 'DIET_PLAN', id, null, { deleted: true }, context);
    });
    return { deleted: true };
  }
}
