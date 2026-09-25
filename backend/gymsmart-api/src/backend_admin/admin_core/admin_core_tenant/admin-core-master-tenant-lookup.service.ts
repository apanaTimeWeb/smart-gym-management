// RESPONSIBILITY: Resolves trusted tenant authorization and database-name metadata in the master database.
// FLOW: JWT actor + tenant â†’ membership verification â†’ trusted tenant context â†’ DataSource resolver.
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AdminCoreMasterAdminEntity } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin.entity.js';
import { AdminCoreMasterTenantMembershipEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-membership.entity.js';
import { AdminCoreMasterTenantEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant.entity.js';

@Injectable()
/**
 * @description Defines the AdminCoreMasterTenantLookupService boundary for the admin_core_tenant backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterTenantLookupService {
  constructor(@InjectDataSource() private readonly masterDataSource: DataSource) {}

  /** @description Verifies actor-to-tenant membership and active tenant state before routing any feature request. @param userId Actor UUID. @param tenantId Requested tenant UUID. @returns Authorization boolean. */
  async isUserAuthorizedForTenant(userId: string, tenantId: string): Promise<boolean> {
    const [admin, membership, tenant] = await Promise.all([
      this.masterDataSource.getRepository(AdminCoreMasterAdminEntity).findOne({ where: { id: userId, tenantId, isActive: true } }),
      this.masterDataSource.getRepository(AdminCoreMasterTenantMembershipEntity).findOne({ where: { actorId: userId, tenantId, isActive: true } }),
      this.masterDataSource.getRepository(AdminCoreMasterTenantEntity).findOne({ where: { id: tenantId, isActive: true } }),
    ]);
    return Boolean(tenant && (admin || membership));
  }

  /** @description Retrieves a tenant database name only after the tenant is active. @param tenantId Tenant UUID. @returns Database name. @throws NotFoundException when the tenant is missing/inactive. */
  async findTenantDatabaseNameOrThrow(tenantId: string): Promise<string> {
    const tenant = await this.masterDataSource.getRepository(AdminCoreMasterTenantEntity).findOne({ where: { id: tenantId, isActive: true } });
    if (!tenant) throw new NotFoundException({ message: 'Tenant not found.', errorCode: 'CORE.CORE.NOT_FOUND' });
    return tenant.databaseName;
  }
}
