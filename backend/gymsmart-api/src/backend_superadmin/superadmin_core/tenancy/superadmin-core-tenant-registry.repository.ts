// RESPONSIBILITY: Owns master-database tenant registry metadata and tenant-admin credential records.
// FLOW: Tenant provisioning -> registry repository -> tenants / tenant_admin_accounts.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DataSource } from 'typeorm';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminTenantRegistryNotFoundException } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.exceptions';

@Injectable()
export class SuperadminTenantRegistryRepository {
  constructor(private readonly dataSource: DataSource, private readonly transactionContext: SuperadminTransactionContext) {}

  /** Executes a master-database registry query inside the active UnitOfWork when one exists. */
  private query<T = unknown>(sql: string, parameters: unknown[] = []): Promise<T[]> {
    const manager = this.transactionContext.getManager();
    return manager ? manager.query(sql, parameters) as Promise<T[]> : this.dataSource.query(sql, parameters) as Promise<T[]>;
  }

  /** Finds a tenant by id in the master database. */
  async findById(id: string): Promise<{ id: string; databaseName: string } | null> {
    const rows = await this.query<{ id: string; databaseName: string }>('SELECT id, database_name AS "databaseName" FROM tenants WHERE id = $1 AND deleted_at IS NULL', [id]);
    return rows[0] ?? null;
  }

  /** Returns a tenant by id or fails immediately when the tenant is absent. */
  async findByIdOrThrow(id: string): Promise<{ id: string; databaseName: string }> {
    const tenant = await this.findById(id);
    if (!tenant) throw new SuperadminTenantRegistryNotFoundException();
    return tenant;
  }

  /** Lists active tenant options required by Superadmin messaging recipient selectors. */
  async listActiveTenantsForMessaging(): Promise<Array<{ id: string; name: string; plan: string }>> {
    return this.query<{ id: string; name: string; plan: string }>('SELECT id, name, plan FROM tenants WHERE deleted_at IS NULL ORDER BY name ASC');
  }


  /** Finds the active administrative email for one authorized tenant. */
  async findTenantAdminEmail(id: string): Promise<string | null> {
    const rows = await this.query<{ email: string }>('SELECT email FROM tenant_admin_accounts WHERE tenant_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC LIMIT 1', [id]);
    return rows[0]?.email ?? null;
  }


  /** Finds the preferred administrative email and phone for proof-of-delivery fallback. */
  async findTenantAdminContact(id: string): Promise<{ email: string | null; phone: string | null } | null> {
    const rows = await this.query<{ email: string | null; phone: string | null }>('SELECT taa.email, t.phone FROM tenant_admin_accounts taa JOIN tenants t ON t.id = taa.tenant_id WHERE taa.tenant_id = $1 AND taa.deleted_at IS NULL AND t.deleted_at IS NULL ORDER BY taa.created_at ASC LIMIT 1', [id]);
    return rows[0] ?? null;
  }

  /** Lists soft-deleted tenants whose 90-day retention window has elapsed. */
  async findTenantsReadyForPermanentRemoval(cutoff: Date): Promise<Array<{ id: string; databaseName: string }>> {
    return this.query<{ id: string; databaseName: string }>('SELECT id, database_name AS "databaseName" FROM tenants WHERE deleted_at IS NOT NULL AND deleted_at <= $1 ORDER BY deleted_at ASC', [cutoff]);
  }

  /** Permanently removes master tenant metadata after the documented retention window. */
  async hardDeleteTenantMetadata(tenantId: string): Promise<void> {
    await this.query('DELETE FROM tenant_admin_accounts WHERE tenant_id = $1', [tenantId]);
    await this.query('DELETE FROM tenants WHERE id = $1', [tenantId]);
  }

  /** Updates the tenant database name after provisioning. */
  async setDatabaseName(id: string, databaseName: string): Promise<void> {
    await this.query('UPDATE tenants SET database_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [databaseName, id]);
  }

  /** Creates a tenant-admin credential row without storing plaintext passwords. */
  async createAdminAccount(tenantId: string, email: string, passwordHash: string): Promise<void> {
    await this.query('INSERT INTO tenant_admin_accounts (id, tenant_id, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)', [randomUUID(), tenantId, email, passwordHash, 'ADMIN']);
  }

  /** Creates or updates the tenant-admin login record without exposing persistence details to the feature service. */
  async syncAdminAccount(tenantId: string, email: string, passwordHash?: string): Promise<void> {
    const rows = await this.query<{ id: string }>('SELECT id FROM tenant_admin_accounts WHERE tenant_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC LIMIT 1', [tenantId]);
    if (rows[0]) {
      if (passwordHash) {
        await this.query('UPDATE tenant_admin_accounts SET email = $1, password_hash = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3', [email, passwordHash, rows[0].id]);
      } else {
        await this.query('UPDATE tenant_admin_accounts SET email = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [email, rows[0].id]);
      }
      return;
    }
    if (!passwordHash) return;
    await this.createAdminAccount(tenantId, email, passwordHash);
  }
}
