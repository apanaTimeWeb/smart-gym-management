// RESPONSIBILITY: Resolves trusted tenant authorization and database-name metadata in the master database.
// FLOW: JWT actor + tenant → membership verification → trusted tenant context → DataSource resolver.

import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoreMasterTenantEntity } from '@/backend_admin/core/tenant/core-master-tenant.entity';
import { CoreMasterAdminEntity } from '@/backend_admin/core/auth/core-master-admin.entity';
import { CoreMasterTenantMembershipEntity } from '@/backend_admin/core/tenant/core-master-tenant-membership.entity';

@Injectable()
export class CoreMasterTenantLookupService {
  constructor(@InjectDataSource() private readonly masterDataSource: DataSource) {}

  /** @description Verifies actor-to-tenant membership and active tenant state before routing any feature request. @param userId Actor UUID. @param tenantId Requested tenant UUID. @returns Authorization boolean. */
  async isUserAuthorizedForTenant(userId: string, tenantId: string): Promise<boolean> {
    const [admin, membership, tenant] = await Promise.all([
      this.masterDataSource.getRepository(CoreMasterAdminEntity).findOne({ where: { id: userId, tenantId, isActive: true } }),
      this.masterDataSource.getRepository(CoreMasterTenantMembershipEntity).findOne({ where: { actorId: userId, tenantId, isActive: true } }),
      this.masterDataSource.getRepository(CoreMasterTenantEntity).findOne({ where: { id: tenantId, isActive: true } }),
    ]);
    return Boolean(tenant && (admin || membership));
  }

  /** @description Retrieves a tenant database name only after the tenant is active. @param tenantId Tenant UUID. @returns Database name. @throws NotFoundException when the tenant is missing/inactive. */
  async findTenantDatabaseNameOrThrow(tenantId: string): Promise<string> {
    const tenant = await this.masterDataSource.getRepository(CoreMasterTenantEntity).findOne({ where: { id: tenantId, isActive: true } });
    if (!tenant) throw new NotFoundException('Tenant not found.');
    return tenant.databaseName;
  }
}
