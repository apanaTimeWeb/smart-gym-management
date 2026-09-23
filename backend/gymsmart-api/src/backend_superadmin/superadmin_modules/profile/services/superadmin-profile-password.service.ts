// RESPONSIBILITY: Changes the authenticated Superadmin password after verifying the current credential.
// FLOW: ProfileSpecialController -> bcrypt verification -> repository update -> completion.
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperadminProfilePasswordService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
  /** Verifies the old password, enforces confirmation, and persists a new hash. */
  async updatePassword(userId: string, currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    if (newPassword !== confirmPassword) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'PROFILE.PASSWORD.MISMATCH', message: { key: 'profile.ERRORS.BAD_REQUEST' } });
    const profile = await this.repository.findByIdOrThrow(userId);
    if (!await bcrypt.compare(currentPassword, profile.passwordHash)) throw new UnauthorizedException({ error: 'UNAUTHORIZED', errorCode: 'PROFILE.PASSWORD.INVALID', message: { key: 'profile.ERRORS.UNAUTHORIZED' } });
    await this.repository.updateProfileById(userId, { passwordHash: await bcrypt.hash(newPassword, 12) });
  }
}