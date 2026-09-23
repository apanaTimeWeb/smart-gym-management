// RESPONSIBILITY: Enables or disables profile 2FA after validating the current password.
// FLOW: ProfileSpecialController -> repository credential lookup -> bcrypt -> repository update -> mapper.
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import * as bcrypt from 'bcrypt';
import type { SuperadminProfileDomainModel } from '@/backend_superadmin/superadmin_modules/profile/types/superadmin-profile.interfaces';

@Injectable()
export class SuperadminProfileTwoFactorService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Toggles 2FA only after confirming the actor's current password. */
  async updateTwoFactor(userId: string, enabled: boolean, password: string): Promise<SuperadminProfileDomainModel> {
    const profile = await this.repository.findByIdOrThrow(userId);
    if (!await bcrypt.compare(password, profile.passwordHash)) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'PROFILE.PASSWORD.INVALID', message: { key: 'profile.ERRORS.UNAUTHORIZED' } });
    return SuperadminProfileMapper.toDomain(await this.repository.updateProfileById(userId, { twoFactorEnabled: enabled }));
  }
}