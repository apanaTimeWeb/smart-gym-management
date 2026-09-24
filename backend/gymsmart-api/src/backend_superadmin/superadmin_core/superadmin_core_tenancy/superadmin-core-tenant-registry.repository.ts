// RESPONSIBILITY: Owns master-database tenant registry metadata and tenant-admin credential records.
// FLOW: Tenant provisioning -> registry repository -> tenants / tenant_admin_accounts.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DataSource } from 'typeorm';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminTenantRegistryNotFoundException } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.exceptions';

/**
 * Primary Intent: Defines SuperadminCoreTenantRegistryRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreTenantRegistryRepository {
  constructor(private readonly dataSource: DataSource, private readonly transactionContext: SuperadminCoreTransactionContext) {}

  /**
 * Primary Intent: Executes the query use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private query<T = unknown>(sql: string, parameters: unknown[] = []): Promise<T[]> {
    const manager = this.transactionContext.getManager();
    return manager ? manager.query(sql, parameters) as Promise<T[]> : this.dataSource.query(sql, parameters) as Promise<T[]>;
  }

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<{ id: string; databaseName: string; name: string } | null> {
    const rows = await this.query<{ id: string; databaseName: string; name: string }>('SELECT id, database_name AS "databaseName", name FROM tenants WHERE id = $1 AND deleted_at IS NULL', [id]);
    return rows[0] ?? null;
  }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<{ id: string; databaseName: string; name: string }> {
    const tenant = await this.findById(id);
    if (!tenant) throw new SuperadminTenantRegistryNotFoundException();
    return tenant;
  }

  /**
 * Primary Intent: Executes the listActiveTenantsForMessaging use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async listActiveTenantsForMessaging(): Promise<Array<{ id: string; name: string; plan: string }>> {
    return this.query<{ id: string; name: string; plan: string }>('SELECT id, name, plan FROM tenants WHERE deleted_at IS NULL ORDER BY name ASC');
  }

  /**
 * Primary Intent: Executes the findTenantAdminEmail use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findTenantAdminEmail(id: string): Promise<string | null> {
    const rows = await this.query<{ email: string }>('SELECT email FROM tenant_admin_accounts WHERE tenant_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC LIMIT 1', [id]);
    return rows[0]?.email ?? null;
  }

  /**
 * Primary Intent: Executes the findTenantAdminContact use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findTenantAdminContact(id: string): Promise<{ email: string | null; phone: string | null } | null> {
    const rows = await this.query<{ email: string | null; phone: string | null }>('SELECT taa.email, t.phone FROM tenant_admin_accounts taa JOIN tenants t ON t.id = taa.tenant_id WHERE taa.tenant_id = $1 AND taa.deleted_at IS NULL AND t.deleted_at IS NULL ORDER BY taa.created_at ASC LIMIT 1', [id]);
    return rows[0] ?? null;
  }

  /**
 * Primary Intent: Executes the findTenantsReadyForPermanentRemoval use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findTenantsReadyForPermanentRemoval(cutoff: Date): Promise<Array<{ id: string; databaseName: string }>> {
    return this.query<{ id: string; databaseName: string }>('SELECT id, database_name AS "databaseName" FROM tenants WHERE deleted_at IS NOT NULL AND deleted_at <= $1 ORDER BY deleted_at ASC', [cutoff]);
  }

  /**
 * Primary Intent: Executes the hardDeleteTenantMetadata use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async hardDeleteTenantMetadata(tenantId: string): Promise<void> {
    await this.query('DELETE FROM tenant_admin_accounts WHERE tenant_id = $1', [tenantId]);
    await this.query('DELETE FROM tenants WHERE id = $1', [tenantId]);
  }

  /**
 * Primary Intent: Executes the setDatabaseName use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async setDatabaseName(id: string, databaseName: string): Promise<void> {
    await this.query('UPDATE tenants SET database_name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [databaseName, id]);
  }

  /**
 * Primary Intent: Executes the createAdminAccount use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createAdminAccount(tenantId: string, email: string, passwordHash: string): Promise<void> {
    await this.query('INSERT INTO tenant_admin_accounts (id, tenant_id, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)', [randomUUID(), tenantId, email, passwordHash, 'ADMIN']);
  }

  /**
 * Primary Intent: Executes the syncAdminAccount use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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
