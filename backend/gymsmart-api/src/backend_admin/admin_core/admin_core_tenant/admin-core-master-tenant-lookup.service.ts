// RESPONSIBILITY: Resolves trusted tenant authorization and database-name metadata in the master database.
// FLOW: JWT actor + tenant → membership verification → trusted tenant context → DataSource resolver.
// NOTE: Uses raw SQL to avoid TypeORM entity column-mapping conflicts between the AdminCore entity
//       definitions and the Superadmin-owned `tenants` table schema (which uses `status` not `is_active`).
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

@Injectable()
/**
 * @description Defines the AdminCoreMasterTenantLookupService boundary for the admin_core_tenant backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterTenantLookupService {
  constructor(@InjectDataSource() private readonly masterDataSource: DataSource) {}

  /** @description Verifies actor-to-tenant membership and active tenant state before routing any feature request.
   *  Uses raw SQL because the shared `tenants` table is owned by Superadmin and uses `status='ACTIVE'` not `is_active`.
   *  The `admins` and `tenant_memberships` tables are AdminCore-specific and use `is_active`.
   *  @param userId Actor UUID. @param tenantId Requested tenant UUID. @returns Authorization boolean. */
  async isUserAuthorizedForTenant(userId: string, tenantId: string): Promise<boolean> {
    // Check tenant is active; Superadmin-owned tenants table uses `status` column
    const tenantRows = await this.masterDataSource.query(
      `SELECT id FROM tenants WHERE id = $1 AND status = 'ACTIVE'`,
      [tenantId],
    );
    if (tenantRows.length === 0) return false;

    // Check admin membership via AdminCore tables
    const [adminRows, membershipRows] = await Promise.all([
      this.masterDataSource.query(
        `SELECT id FROM admins WHERE id = $1 AND tenant_id = $2 AND is_active = true`,
        [userId, tenantId],
      ),
      this.masterDataSource.query(
        `SELECT id FROM tenant_memberships WHERE actor_id = $1 AND tenant_id = $2 AND is_active = true`,
        [userId, tenantId],
      ),
    ]);
    return adminRows.length > 0 || membershipRows.length > 0;
  }

  /** @description Retrieves a tenant database name only after the tenant is active.
   *  Uses raw SQL to avoid TypeORM column mapping conflicts with the Superadmin-owned tenants table.
   *  @param tenantId Tenant UUID. @returns Database name. @throws NotFoundException when the tenant is missing/inactive. */
  async findTenantDatabaseNameOrThrow(tenantId: string): Promise<string> {
    const rows = await this.masterDataSource.query(
      `SELECT database_name FROM tenants WHERE id = $1 AND status = 'ACTIVE'`,
      [tenantId],
    );
    console.log('!!!!!!! LOOKUP DB NAME:', rows);
    if (rows.length === 0) throw new NotFoundException({ message: 'Tenant not found.', errorCode: 'CORE.CORE.NOT_FOUND' });
    return rows[0].database_name as string;
  }
}
