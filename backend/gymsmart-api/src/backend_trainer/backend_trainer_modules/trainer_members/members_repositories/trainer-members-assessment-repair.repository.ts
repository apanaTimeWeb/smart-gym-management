// RESPONSIBILITY: Owns tenant persistence for bounded member-assessment encryption repair batches.
// FLOW: Repair service → TrainerMembersAssessmentRepairRepository → tenant TypeORM.
import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { TrainerMembersMemberEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.entity';

/**
 * Intent: Defines the TrainerMembersAssessmentRepairRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerMembersAssessmentRepairRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) {}
  /** Loads one deterministic repair batch. */
  /**
 * @description Executes findBatch inside the owning backend service/repository boundary without exposing ORM details.
 * @param offset - Input for findBatch.
 * @param limit - Input for findBatch.
 * @returns {Promise<TrainerMembersMemberEntity[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findBatch(offset: number, limit: number): Promise<TrainerMembersMemberEntity[]> {
    const repo = await this.resolver.getRepository(TrainerMembersMemberEntity);
    return repo.find({ where: { deletedAt: IsNull() }, order: { id: 'ASC' }, skip: offset, take: limit });
  }
  /** Persists one repaired assessment without exposing ORM access to the service layer. */
  /**
 * @description Executes updateAssessment inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for updateAssessment.
 * @param assessment - Input for updateAssessment.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateAssessment(id: string, assessment: Record<string, unknown>): Promise<void> {
    const repo = await this.resolver.getRepository(TrainerMembersMemberEntity);
    await repo.update({ id, deletedAt: IsNull() }, { assessment } as any);
  }
}
