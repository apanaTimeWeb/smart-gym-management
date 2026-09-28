// RESPONSIBILITY: Assigns one authorized diet plan to one authorized member with atomic auditing.
// FLOW: TrainerLibraryCommandController → assignment service → UnitOfWork → repository + audit.
import { Injectable } from '@nestjs/common';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { TrainerLibraryDietPlanRepository } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_repositories/trainer-library-diet-plan.repository';
import { TrainerLibraryAssignDietDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-assign-diet.dto';
import type { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
/**
 * Intent: Defines the TrainerLibraryDietAssignmentService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerLibraryDietAssignmentService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly repo: TrainerLibraryDietPlanRepository, private readonly audit: CoreAuditService) {}
  /** Atomically assigns an existing diet plan to a Trainer-owned member. */
  /**
 * Intent: Executes the assign operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes assign inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for assign.
 * @param dto - Input for assign.
 * @returns {Promise<{ memberId: string; dietPlanId: string }>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async assign(memberId: string, dto: TrainerLibraryAssignDietDto): Promise<{ memberId: string; dietPlanId: string }> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    await this.repo.assertMemberOwnedByTrainer(memberId, trainerId);
    const plan = await this.repo.findById(dto.dietPlanId);
    if (!plan) throw new CoreNotFoundException('LIBRARY.DIET_PLAN', dto.dietPlanId);
    const before = await this.repo.findMemberDietAssignmentState(memberId, trainerId);
    const snapshot = plan as unknown as Record<string, unknown>;
    await this.uow.execute(async (context) => this.assignAndAudit(memberId, dto.dietPlanId, trainerId, before, snapshot, context));
    return { memberId, dietPlanId: dto.dietPlanId };
  }
  /** Performs the relation write and audit record in one transaction. */
  /**
 * Intent: Executes the assignAndAudit operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes assignAndAudit inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for assignAndAudit.
 * @param dietPlanId - Input for assignAndAudit.
 * @param trainerId - Input for assignAndAudit.
 * @param before - Input for assignAndAudit.
 * @param snapshot - Input for assignAndAudit.
 * @param context - Input for assignAndAudit.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async assignAndAudit(memberId: string, dietPlanId: string, trainerId: string, before: { assignedDietId: string | null; assignedDietSnapshot: Record<string, unknown> | null }, snapshot: Record<string, unknown>, context: CoreTransactionContext): Promise<void> {
    await this.repo.assignDiet(memberId, dietPlanId, trainerId, snapshot, context);
    await this.audit.record('MEMBER_DIET_ASSIGNED', 'DIET_PLAN_ASSIGNMENT', memberId, { assignedDietId: before.assignedDietId, assignedDietSnapshot: before.assignedDietSnapshot }, { assignedDietId: dietPlanId, assignedDietSnapshot: snapshot }, context);
  }
}
