// RESPONSIBILITY: Changes the authenticated Superadmin password after verifying the current credential.
// FLOW: ProfileSpecialController -> bcrypt verification -> repository update -> completion.
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import * as bcrypt from 'bcrypt';

/**
 * Primary Intent: Defines SuperadminProfilePasswordService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminProfilePasswordService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
/**
 * Primary Intent: Executes the updatePassword use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updatePassword use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updatePassword(userId: string, currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    if (newPassword !== confirmPassword) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'PROFILE.PASSWORD.MISMATCH', message: { key: 'profile.ERRORS.BAD_REQUEST' } });
    const profile = await this.repository.findByIdOrThrow(userId);
    if (!await bcrypt.compare(currentPassword, profile.passwordHash)) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'PROFILE.PASSWORD.INVALID', message: { key: 'profile.ERRORS.UNAUTHORIZED' } });
    await this.repository.updatePasswordAndIncrementTokenVersion(userId, await bcrypt.hash(newPassword, 12));
  }
}
