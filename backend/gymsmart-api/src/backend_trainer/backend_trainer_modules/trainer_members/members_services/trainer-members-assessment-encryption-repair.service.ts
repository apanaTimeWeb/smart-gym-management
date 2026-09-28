// RESPONSIBILITY: Orchestrates bounded member-assessment encryption repair without direct ORM access.
// FLOW: Repair command → repository batch → repository update.
import { Injectable } from '@nestjs/common';
import { TrainerMembersAssessmentRepairRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-assessment-repair.repository';
/**
 * Intent: Defines the TrainerMembersAssessmentEncryptionRepairService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerMembersAssessmentEncryptionRepairService {
  private static readonly BATCH_SIZE = 100;
  constructor(private readonly repository: TrainerMembersAssessmentRepairRepository) {}
  /** Repairs one bounded batch; returns the number of inspected rows. */
  /**
 * Intent: Executes the repairBatch operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes repairBatch inside the owning backend service/repository boundary without exposing ORM details.
 * @param offset - Input for repairBatch.
 * @returns {Promise<number>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async repairBatch(offset = 0): Promise<number> {
    const rows = await this.repository.findBatch(offset, TrainerMembersAssessmentEncryptionRepairService.BATCH_SIZE);
    for (const row of rows) if (row.assessment) await this.repository.updateAssessment(row.id, row.assessment);
    return rows.length;
  }
}
