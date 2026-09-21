// RESPONSIBILITY: Owns master-database tenant registry metadata and tenant-admin credential records.
// FLOW: Tenant provisioning -> registry repository -> tenants / tenant_admin_accounts.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantRegistryRepository {
  constructor(private readonly dataSource: DataSource) {}

  /** Finds a tenant by id in the master database. */
  async findById(id: string): Promise<{ id: string; databaseName: string } | null> {
    const rows = await this.dataSource.query('SELECT id, database_name AS "databaseName" FROM tenants WHERE id = $1 AND deleted_at IS NULL', [id]) as Array<{ id: string; databaseName: string }>;
    return rows[0] ?? null;
  }

  /** Updates the tenant database name after provisioning. */
  async setDatabaseName(id: string, databaseName: string): Promise<void> {
    await this.dataSource.query('UPDATE tenants SET database_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [databaseName, id]);
  }

  /** Creates a tenant-admin credential row without storing plaintext passwords. */
  async createAdminAccount(tenantId: string, email: string, passwordHash: string): Promise<void> {
    await this.dataSource.query('INSERT INTO tenant_admin_accounts (id, tenant_id, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)', [randomUUID(), tenantId, email, passwordHash, 'ADMIN']);
  }
}

