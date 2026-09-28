// RESPONSIBILITY: Performs Trainer resource-level authorization for member mutations and reads.
// FLOW: Controller → TrainerMembersAuthorizationService → TrainerMembersRepository ownership query → feature service.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';
/**
 * Intent: Defines the TrainerMembersAuthorizationService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerMembersAuthorizationService {
  constructor(private readonly repository: TrainerMembersRepository) {}
  /** Verifies that the authenticated Trainer owns the requested active member. */
  /**
 * Intent: Executes the assertMember operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes assertMember inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for assertMember.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async assertMember(memberId: string): Promise<void> {
    await this.repository.findByIdForTrainerOrThrow(CoreRequestContext.getUserIdOrThrow(), memberId);
  }
}
