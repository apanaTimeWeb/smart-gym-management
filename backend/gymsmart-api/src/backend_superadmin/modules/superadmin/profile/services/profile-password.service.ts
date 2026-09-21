// RESPONSIBILITY: Changes the authenticated Superadmin password after verifying the current credential.
// FLOW: ProfileSpecialController -> bcrypt verification -> repository update -> completion.
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';

@Injectable()
export class ProfilePasswordService {
  constructor(private readonly repository: ProfileRepository) {}
  /** Verifies the old password, enforces confirmation, and persists a new hash. */
  async updatePassword(userId: string, currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    if (newPassword !== confirmPassword) throw new BadRequestException('Passwords do not match');
    const profile = await this.repository.findByIdOrThrow(userId);
    if (!await bcrypt.compare(currentPassword, profile.passwordHash)) throw new UnauthorizedException('Current password is incorrect');
    await this.repository.updateProfileById(userId, { passwordHash: await bcrypt.hash(newPassword, 12) });
  }
}
