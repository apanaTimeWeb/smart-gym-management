// RESPONSIBILITY: Owns backend core business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { HttpStatus, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { TIMEOUT_CONFIG } from '@/backend_manager/manager_core/manager_core_config/manager-core-timeout.config';
import { ManagerTenantSchema1711000000100 } from '@/backend_manager/manager_core/manager_core_database/migrations/1711000000100-manager-tenant-schema';
import { ManagerHardening1711000000200 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000200-manager-hardening';
import { ManagerTableNameNormalization1711000000300 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000300-manager-table-name-normalization';
import { ManagerMoneyHardening1711000000500 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000500-manager-money-hardening';
import { ManagerQueryIndexes1711000000400 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000400-manager-query-indexes';
import { ManagerCommunicationsDeliveryJobs1711000000600 } from '@/backend_manager/manager_core/manager_core_database/migrations/tenant/1711000000600-manager-communications-delivery-jobs';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';

@Injectable()
export class ManagerCoreTenantProvisioningService {
  constructor(private readonly config:ManagerCoreConfigService, private readonly master:DataSource) {}

  /** @description Creates or reuses the deterministic tenant database and guarantees its required schema migrations are applied. @param tenantId - Tenant identifier. @returns Provisioned database name. */
  async provision(tenantId:string):Promise<string> {
    const safe=tenantId.replace(/[^A-Za-z0-9_-]/g,'');
    if(!safe || safe!==tenantId) throw new ManagerCoreContextException('Invalid tenant identifier','TENANT.ID.INVALID', HttpStatus.BAD_REQUEST);
    const databaseName=`${this.config.tenantDbPrefix}${safe}`;
    const exists=await this.master.query('SELECT 1 FROM pg_database WHERE datname = $1',[databaseName]);
    if(!exists.length) await this.createDatabase(databaseName);
    await this.bootstrapSchema(databaseName);
    return databaseName;
  }

  /** @description Creates a database after safe identifier construction. @param databaseName - Validated database identifier. @returns Nothing. */
  private async createDatabase(databaseName:string):Promise<void> {
    await this.master.query(`CREATE DATABASE "${databaseName.replace(/"/g,'""')}"`);
  }

  /** @description Applies the Manager tenant schema migrations to a newly created or legacy tenant database. @param databaseName - Trusted tenant database name. @returns Nothing. */
  private async bootstrapSchema(databaseName:string):Promise<void> {
    const tenant=new DataSource({
      type:'postgres',host:this.config.tenantDbHost,port:this.config.tenantDbPort,username:this.config.tenantDbUser,password:this.config.tenantDbPassword,
      database:databaseName,entities:[],migrations:[ManagerTenantSchema1711000000100,ManagerHardening1711000000200,ManagerTableNameNormalization1711000000300,ManagerQueryIndexes1711000000400,ManagerMoneyHardening1711000000500,ManagerCommunicationsDeliveryJobs1711000000600],synchronize:false,
      extra:{max:1,min:0,idleTimeoutMillis:this.config.tenantDbIdleTimeoutMs,connectionTimeoutMillis:this.config.tenantDbAcquireTimeoutMs,statement_timeout:TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS},
    });
    await tenant.initialize();
    try { await tenant.runMigrations(); } finally { await tenant.destroy(); }
  }
}
