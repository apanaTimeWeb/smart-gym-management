// RESPONSIBILITY: Owns Trainer profile tenant persistence and master credential persistence for profile use cases.
// FLOW: Profile services → ProfileTrainerProfileRepository → tenant trainer_profiles or master core_users.

import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { CoreUserEntity } from '@/backend_trainer/core/database/core-user.entity';
import { ProfileTrainerProfileEntity } from '@/backend_trainer/modules/backend_trainer/profile/profile-trainer-profile.entity';

export interface ProfileMasterCredential { userId: string; passwordHash: string; }

@Injectable()
export class ProfileTrainerProfileRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDataSourceResolver, @InjectRepository(CoreUserEntity, 'master') private readonly users: Repository<CoreUserEntity>) {super();}

  /** Finds the tenant-scoped Trainer profile by authenticated master user ID. */
  async findByUserId(userId: string): Promise<ProfileTrainerProfileEntity | null> { return (await this.resolver.getRepository(ProfileTrainerProfileEntity)).findOneBy({ userId, deletedAt: IsNull() }); }

  /** Updates only profile fields approved by the profile DTO. */
  async updateByUserId(userId: string, input: Pick<ProfileTrainerProfileEntity, 'name' | 'phone' | 'specialization'>): Promise<ProfileTrainerProfileEntity> { const repo = await this.resolver.getRepository(ProfileTrainerProfileEntity); await repo.update({ userId, deletedAt: IsNull() }, input); return repo.findOneByOrFail({ userId, deletedAt: IsNull() }); }

  /** Reads only the master credential material required by the password use case. */
  async findMasterCredentialByUserId(userId: string): Promise<ProfileMasterCredential | null> { const row = await this.users.findOne({ select: { id: true, passwordHash: true, isActive: true }, where: { id: userId, isActive: true } }); return row ? { userId: row.id, passwordHash: row.passwordHash } : null; }

  /** Updates the master password hash without exposing an ORM entity to the service layer. */
  async updateMasterPasswordHash(userId: string, passwordHash: string): Promise<void> { await this.users.update({ id: userId, isActive: true }, { passwordHash }); }
}
