// RESPONSIBILITY: Changes the authenticated Trainer master password and records a master security audit atomically.
// FLOW: TrainerProfileCommandController → password service → master UnitOfWork → user repository + auth audit repository.
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreMasterUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-master-unit-of-work.service';
import { CoreAuthAuditRepository } from '@/backend_trainer/backend_core/core_database/core-auth-audit.repository';
import { TrainerProfileTrainerProfileRepository } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_repositories/trainer-profile-trainer-profile.repository';
import { TrainerProfileChangePasswordDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-change-password.dto';
import { ProfileCurrentPasswordInvalidException, ProfilePasswordConfirmationMismatchException, ProfileTrainerNotFoundException } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-exceptions';
/**
 * Intent: Defines the TrainerProfileTrainerPasswordChangeService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerProfileTrainerPasswordChangeService {
  constructor(private readonly repo: TrainerProfileTrainerProfileRepository, private readonly masterUow: CoreMasterUnitOfWorkService, private readonly authAudit: CoreAuthAuditRepository) {}
  /** Verifies the current credential and atomically writes a newly hashed master password with a security audit. */
  /**
 * Intent: Executes the change operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes change inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for change.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws ProfilePasswordConfirmationMismatchException, ProfileTrainerNotFoundException, ProfileCurrentPasswordInvalidException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async change(dto: TrainerProfileChangePasswordDto): Promise<null> {
    if (dto.newPassword !== dto.confirmPassword) throw new ProfilePasswordConfirmationMismatchException();
    const userId = CoreRequestContext.getUserIdOrThrow();
    const identity = await this.repo.findMasterCredentialByUserId(userId);
    if (!identity) throw new ProfileTrainerNotFoundException();
    if (!(await bcrypt.compare(dto.currentPassword, identity.passwordHash))) throw new ProfileCurrentPasswordInvalidException();
    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.masterUow.execute(async (context) => {
      await this.repo.updateMasterPasswordHash(userId, passwordHash, context);
      await this.authAudit.createPasswordChangeAudit(userId, context);
    });
    return null;
  }
}
