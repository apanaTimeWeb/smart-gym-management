// @ts-nocheck
// RESPONSIBILITY: Provisions a tenant PostgreSQL database from a validated tenant identifier.
// FLOW: Tenant ID -> validated database name -> master postgres catalog -> tenant database.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';

@Injectable()
export class CoreTenantProvisioningService {
  constructor(private readonly config: CoreConfigService, private readonly master: DataSource) {}

  /** @description Creates or returns the deterministic tenant database name. @param tenantId - Tenant identifier. @returns Provisioned database name. */
  async provision(tenantId: string): Promise<string> {
    const safe = tenantId.replace(/[^A-Za-z0-9_-]/g, '');
    if (!safe) throw new CoreContextException('Invalid tenant identifier', 'TENANT.ID.INVALID');
    const databaseName = `${this.config.tenantDbPrefix}${safe}`;
    const exists = await this.master.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
    if (!exists.length) await this.createDatabase(databaseName);
    return databaseName;
  }

  /** @description Creates a database after safe identifier construction. @param databaseName - Validated database identifier. @returns Nothing. */
  private async createDatabase(databaseName: string): Promise<void> {
    await this.master.query(`CREATE DATABASE "${databaseName.replace(/"/g, '""')}"`);
  }
}
