// RESPONSIBILITY: Provisions, migrates, and cleans up logical PostgreSQL tenant databases.
// FLOW: Master provisioning -> CREATE DATABASE -> tenant migrations -> ready tenant database.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TenantSchemaMigration202609210001 } from '@/backend_superadmin/core/tenancy/tenant-schema-migration';

@Injectable()
export class TenantDatabaseProvisionerService {
  constructor(private readonly master: DataSource, private readonly config: ConfigService) {}

  /** Creates a logical tenant database and applies the isolated tenant schema migration set. */
  async provision(tenantId: string): Promise<string> {
    const prefix = this.config.getOrThrow<string>('app.tenantDatabasePrefix');
    const databaseName = `${prefix}${tenantId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
    const existing = await this.master.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]) as unknown[];
    if (!existing.length) await this.master.query(`CREATE DATABASE "${databaseName}"`);
    const tenant = new DataSource({
      type: 'postgres', url: this.tenantUrl(databaseName), synchronize: false, migrationsRun: false,
      migrations: [TenantSchemaMigration202609210001],
      extra: { max: this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase'), connectionTimeoutMillis: this.config.getOrThrow<number>('app.databaseAcquireTimeoutMs'), idleTimeoutMillis: this.config.getOrThrow<number>('app.databaseIdleTimeoutMs'), statement_timeout: this.config.getOrThrow<number>('app.databaseStatementTimeoutMs') },
    });
    await tenant.initialize();
    try { await tenant.runMigrations(); } finally { await tenant.destroy(); }
    return databaseName;
  }

  /** Drops an incompletely provisioned tenant database after a compensating failure. */
  async drop(databaseName: string): Promise<void> {
    await this.master.query(`DROP DATABASE IF EXISTS "${databaseName.replace(/[^a-zA-Z0-9_]/g, '_')}"`);
  }

  /** Builds a safe connection URL for one logical tenant database. */
  private tenantUrl(databaseName: string): string { const url = new URL(this.config.getOrThrow<string>('app.databaseUrl')); url.pathname = `/${databaseName}`; return url.toString(); }
}
