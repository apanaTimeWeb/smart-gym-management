// RESPONSIBILITY: Provisions a logical PostgreSQL database for a newly created tenant.
// FLOW: Master tenant record -> database CREATE -> tenant migrations -> ready tenant context.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
@Injectable()
export class TenantDatabaseProvisionerService {
  constructor(private readonly master: DataSource, private readonly config: ConfigService) {}
  /** Creates the tenant database using a sanitized deterministic database name. */
  async provision(tenantId: string): Promise<string> {
    const prefix = this.config.getOrThrow<string>('app.tenantDatabasePrefix');
    const databaseName = `${prefix}${tenantId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
    await this.master.query(`CREATE DATABASE \"${databaseName}\"`);
    return databaseName;
  }
}
