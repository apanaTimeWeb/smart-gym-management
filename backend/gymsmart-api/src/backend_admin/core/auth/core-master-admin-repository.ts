// RESPONSIBILITY: Owns TypeORM access to master Admin authentication records.
// FLOW: Core/admin feature service â†’ CoreMasterAdminRepository â†’ TypeORM â†’ master database.

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoreMasterAdminEntity } from '@/backend_admin/core/auth/core-master-admin.entity';

@Injectable()
export class CoreMasterAdminRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /** @description Finds an active Admin authentication record by UUID. @param id Actor UUID. @returns Active Admin or null. */
  async findActiveById(id: string): Promise<CoreMasterAdminEntity | null> {
    return this.dataSource.getRepository(CoreMasterAdminEntity).findOne({ where: { id, isActive: true } });
  }

  /** @description Replaces the password hash for an active Admin authentication record. @param id Actor UUID. @param passwordHash Argon2 password hash. @returns Updated Admin entity. */
  async updatePasswordHashById(id: string, passwordHash: string): Promise<CoreMasterAdminEntity | null> {
    const repository = this.dataSource.getRepository(CoreMasterAdminEntity);
    const admin = await repository.findOne({ where: { id, isActive: true } });
    if (!admin) return null;
    admin.passwordHash = passwordHash;
    return repository.save(admin);
  }
}
