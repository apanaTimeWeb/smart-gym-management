// RESPONSIBILITY: Owns TypeORM access to master Admin authentication records.
// FLOW: Core/admin feature service â†’ AdminCoreMasterAdminRepository â†’ TypeORM â†’ master database.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AdminCoreMasterAdminEntity } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin.entity'
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'

@Injectable()
/**
 * @description Defines the AdminCoreMasterAdminRepository boundary for the admin_core_auth backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterAdminRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource, private readonly context: AdminCoreRequestContextService) {}

  /** @description Finds an active Admin authentication record by UUID. @param id Actor UUID. @returns Active Admin or null. */
  async findActiveById(id: string): Promise<AdminCoreMasterAdminEntity | null> {
    return (this.context.get().masterEntityManager ?? this.dataSource.manager).getRepository(AdminCoreMasterAdminEntity).findOne({ where: { id, isActive: true } });
  }


  /** @description Finds an active Admin record by normalized email for login without exposing inactive accounts. @param email Normalized login email. @returns Active Admin or null. */
  async findActiveByEmail(email: string): Promise<AdminCoreMasterAdminEntity | null> {
    return (this.context.tryGet()?.masterEntityManager ?? this.dataSource.manager).getRepository(AdminCoreMasterAdminEntity).findOne({ where: { email, isActive: true } });
  }

  /** @description Atomically increments failed login attempts to avoid lost updates during concurrent password failures. @param id Actor UUID. @returns Current failure count. */
  async incrementFailedLoginCount(id: string): Promise<number> {
    const repository = (this.context.tryGet()?.masterEntityManager ?? this.dataSource.manager).getRepository(AdminCoreMasterAdminEntity);
    await repository.increment({ id, isActive: true }, 'failedLoginCount', 1);
    const current = await repository.findOne({ where: { id, isActive: true } });
    return current?.failedLoginCount ?? 0;
  }

  /** @description Resets the failed-login counter after successful authentication through an explicit repository mutation. @param id Actor UUID. @returns Promise completion. */
  async resetFailedLoginCount(id: string): Promise<void> {
    const repository = (this.context.tryGet()?.masterEntityManager ?? this.dataSource.manager).getRepository(AdminCoreMasterAdminEntity);
    await repository.update({ id, isActive: true }, { failedLoginCount: 0 });
  }

  /** @description Replaces the password hash for an active Admin authentication record. @param id Actor UUID. @param passwordHash Argon2 password hash. @returns Updated Admin entity. */
  async updatePasswordHashById(id: string, passwordHash: string): Promise<AdminCoreMasterAdminEntity | null> {
    const repository = (this.context.get().masterEntityManager ?? this.dataSource.manager).getRepository(AdminCoreMasterAdminEntity);
    const admin = await repository.findOne({ where: { id, isActive: true } });
    if (!admin) return null;
    admin.passwordHash = passwordHash;
    return repository.save(admin);
  }
}
