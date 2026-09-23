// RESPONSIBILITY: Owns master-database authentication user lookups for login and refresh flows.
// FLOW: Auth service → master user repository → TypeORM master repository → CoreUserEntity.

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { CoreUserEntity } from '@/backend_trainer/core/database/core-user.entity';

@Injectable()
export class CoreAuthUserRepository {
  constructor(@InjectRepository(CoreUserEntity) private readonly repository: Repository<CoreUserEntity>) {}

  /** Finds an active master user by normalized email. */
  async findActiveByEmail(email: string): Promise<CoreUserEntity | null> {
    return this.repository.findOneBy({ email, isActive: true });
  }

  /** Finds an active master user by UUID. */
  async findActiveById(id: string): Promise<CoreUserEntity | null> {
    return this.repository.findOneBy({ id, isActive: true });
  }
}
