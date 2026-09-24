// RESPONSIBILITY: Enables or disables profile 2FA after validating the current password.
// FLOW: ProfileSpecialController -> repository credential lookup -> bcrypt -> repository update -> mapper.
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import * as bcrypt from 'bcrypt';
import type { SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/profile_types/superadmin-profile.interfaces';

/**
 * Primary Intent: Defines SuperadminProfileTwoFactorService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminProfileTwoFactorService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
/**
 * Primary Intent: Executes the updateTwoFactor use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateTwoFactor use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateTwoFactor(userId: string, enabled: boolean, password: string): Promise<SuperadminProfileDomainModel> {
    const profile = await this.repository.findByIdOrThrow(userId);
    if (!await bcrypt.compare(password, profile.passwordHash)) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'PROFILE.PASSWORD.INVALID', message: { key: 'profile.ERRORS.UNAUTHORIZED' } });
    return SuperadminProfileMapper.toDomain(await this.repository.updateProfileById(userId, { twoFactorEnabled: enabled }));
  }
}
