// RESPONSIBILITY: Updates a Trainer library diet plan through an isolated repository boundary.
// FLOW: TrainerLibraryCommandController → TrainerLibraryDietPlanUpdateService → TrainerLibraryDietPlanRepository → mapper.
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { TrainerLibraryDietPlanRepository } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_repositories/trainer-library-diet-plan.repository';
import { TrainerLibraryUpdateDietPlanDto } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_dtos/trainer-library-update-diet-plan.dto';
/**
 * Intent: Defines the TrainerLibraryDietPlanUpdateService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerLibraryDietPlanUpdateService {
  constructor(private readonly repo: TrainerLibraryDietPlanRepository, private readonly audit: CoreAuditService, private readonly uow: CoreUnitOfWorkService) {}
  /** Updates only validated library fields and records the state change atomically. */
  /**
 * Intent: Executes the update operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes update inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for update.
 * @param dto - Input for update.
 * @returns {Promise<Awaited<ReturnType<TrainerLibraryDietPlanRepository['findById']>>>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async update(id: string, dto: TrainerLibraryUpdateDietPlanDto): Promise<Awaited<ReturnType<TrainerLibraryDietPlanRepository['findById']>>> {
    const before = await this.repo.findById(id);
    if (!before) throw new CoreNotFoundException('LIBRARY.DIET_PLAN', id);
    const row = await this.uow.execute(async (context) => {
      const updated = await this.repo.updateDietPlanById(id, {
        name: dto.name, goal: dto.goal, calories: dto.calories, protein: dto.protein, carbs: dto.carbs,
        fats: dto.fats, description: dto.description?.trim(), meals: dto.meals, isActive: dto.isActive,
      }, context);
      await this.audit.record('DIET_PLAN_UPDATED', 'DIET_PLAN', id, { name: before.name, goal: before.goal, calories: before.calories, protein: before.protein, carbs: before.carbs, fats: before.fats, description: before.description, meals: before.meals, isActive: before.isActive }, { name: updated.name, goal: updated.goal, calories: updated.calories, protein: updated.protein, carbs: updated.carbs, fats: updated.fats, description: updated.description, meals: updated.meals, isActive: updated.isActive }, context);
      return updated;
    });
    return row;
  }
}
