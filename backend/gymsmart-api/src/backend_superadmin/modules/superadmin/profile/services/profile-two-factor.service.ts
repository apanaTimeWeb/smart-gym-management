// RESPONSIBILITY: Enables or disables profile 2FA after validating the current password.
// FLOW: ProfileSpecialController -> repository credential lookup -> bcrypt -> repository update -> mapper.
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';
import { ProfileMapper } from '@/backend_superadmin/modules/superadmin/profile/profile.mapper';
import type { ProfileDomainModel } from '@/backend_superadmin/modules/superadmin/profile/types/profile.interfaces';

@Injectable()
export class ProfileTwoFactorService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Toggles 2FA only after confirming the actor's current password. */
  async updateTwoFactor(userId: string, enabled: boolean, password: string): Promise<ProfileDomainModel> {
    const profile = await this.repository.findByIdOrThrow(userId);
    if (!await bcrypt.compare(password, profile.passwordHash)) throw new UnauthorizedException('Current password is incorrect');
    return ProfileMapper.toDomain(await this.repository.updateProfileById(userId, { twoFactorEnabled: enabled }));
  }
}
