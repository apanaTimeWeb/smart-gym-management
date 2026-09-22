// RESPONSIBILITY: Changes the authenticated Trainer password without direct ORM access.
// FLOW: ProfileCommandController → ProfileTrainerPasswordChangeService → ProfileTrainerProfileRepository → master identity store.

import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { ProfileTrainerProfileRepository } from '@/backend_trainer/modules/backend_trainer/profile/repositories/profile-trainer-profile.repository';
import { ProfileChangePasswordDto } from '@/backend_trainer/modules/backend_trainer/profile/dtos/profile-change-password.dto';

@Injectable()
export class ProfileTrainerPasswordChangeService {
  constructor(private readonly repo: ProfileTrainerProfileRepository, private readonly audit: CoreAuditService) {}

  /** Verifies the current credential and atomically writes a newly hashed master password. */
  async change(dto: ProfileChangePasswordDto): Promise<{ changed: true }> {
    if (dto.newPassword !== dto.confirmPassword) throw new BadRequestException('DOMAIN.PROFILE.PASSWORD.CONFIRMATION_MISMATCH');
    const userId = CoreRequestContext.get().userId ?? '';
    const identity = await this.repo.findMasterCredentialByUserId(userId);
    if (!identity) throw new BadRequestException('DOMAIN.PROFILE.TRAINER_PROFILE.NOT_FOUND');
    if (!(await bcrypt.compare(dto.currentPassword, identity.passwordHash))) throw new BadRequestException('DOMAIN.PROFILE.PASSWORD.CURRENT_PASSWORD_INVALID');
    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.repo.updateMasterPasswordHash(userId, passwordHash);
    await this.audit.record('TRAINER_PASSWORD_CHANGED', 'CORE_USER', userId, null, { changed: true });
    return { changed: true };
  }
}
