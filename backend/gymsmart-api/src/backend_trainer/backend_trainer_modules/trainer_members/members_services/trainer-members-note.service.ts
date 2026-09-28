// RESPONSIBILITY: Adds one trainer-authored member note and records it atomically.
// FLOW: Members command controller → note service → UnitOfWork → repository + audit → response.
import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreSanitizationService } from '@/backend_trainer/backend_core/core_security/core-sanitization.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';
import { TrainerMembersCreateMemberNoteDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-create-member-note.dto';
/**
 * Intent: Defines the TrainerMembersNoteService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerMembersNoteService {
  constructor(
    private readonly repo: TrainerMembersRepository,
    private readonly audit: CoreAuditService,
    private readonly sanitizer: CoreSanitizationService,
    private readonly uow: CoreUnitOfWorkService,
  ) {}
  /** Adds a member note and returns the complete member-detail response shape. */
  /**
 * Intent: Executes the create operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes create inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for create.
 * @param dto - Input for create.
 * @returns {Promise<Record<string, unknown>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async create(memberId: string, dto: TrainerMembersCreateMemberNoteDto): Promise<Record<string, unknown>> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const member = await this.repo.findByIdForTrainerOrThrow(trainerId, memberId);
    await this.uow.execute(async (context) => {
      const row = await this.repo.createNote(memberId, trainerId, this.sanitizer.text(dto.text) ?? '', context);
      await this.audit.record('MEMBER_NOTE_CREATED', 'MEMBER_NOTE', row.id, null, { memberId }, context);
    });
    const notes = await this.repo.findNotes(memberId);
    return { ...member, trainerNotes: notes };
  }
}
