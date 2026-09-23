// RESPONSIBILITY: Owns backend core business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable, OnModuleDestroy } from '@nestjs/common';

import { DataSource, EntityTarget, Repository } from 'typeorm';

import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';
import { TIMEOUT_CONFIG } from '@/backend_manager/core/config/timeout.config';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreTenantEntities } from '@/backend_manager/core/database/core-tenant-entities';
import { ManagerTenantSchema1711000000100 } from '@/backend_manager/core/database/migrations/1711000000100-manager-tenant-schema';
import { ManagerHardening1711000000200 } from '@/backend_manager/core/database/migrations/tenant/1711000000200-manager-hardening';
import { ManagerTableNameNormalization1711000000300 } from '@/backend_manager/core/database/migrations/tenant/1711000000300-manager-table-name-normalization';
import { ManagerQueryIndexes1711000000400 } from '@/backend_manager/core/database/migrations/tenant/1711000000400-manager-query-indexes';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

@Injectable()
export class CoreTenantDatasourceService implements OnModuleDestroy {
  private readonly cache=new Map<string,DataSource>();
  constructor(private readonly config:CoreConfigService,private readonly context:CoreRequestContextService) {}
  /** @description Resolves the authorized tenant DataSource with an aggregate pool budget. @returns Initialized DataSource. @throws CoreContextException when trusted database context is missing. */
  async getDataSource():Promise<DataSource> { const current=this.context.get(); if(!current.tenantDatabaseName) throw new CoreContextException('Trusted tenant database context missing','CORE.CONTEXT.TENANT_DATABASE_MISSING'); const cached=this.cache.get(current.tenantDatabaseName); if(cached?.isInitialized) return cached; const max=Math.max(1,Math.floor(this.config.tenantPoolBudget/Math.max(1,this.config.tenantDbMaxCached))); const ds=new DataSource({type:'postgres',host:this.config.tenantDbHost,port:this.config.tenantDbPort,username:this.config.tenantDbUser,password:this.config.tenantDbPassword,database:current.tenantDatabaseName,entities:CoreTenantEntities,migrations:[ManagerTenantSchema1711000000100,ManagerHardening1711000000200,ManagerTableNameNormalization1711000000300,ManagerQueryIndexes1711000000400],synchronize:false,extra:{max,min:0,idleTimeoutMillis:this.config.tenantDbIdleTimeoutMs,connectionTimeoutMillis:this.config.tenantDbAcquireTimeoutMs,statement_timeout:TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS}}); await ds.initialize(); await ds.runMigrations(); if(this.cache.size>=this.config.tenantDbMaxCached) await this.evictOne(); this.cache.set(current.tenantDatabaseName,ds); return ds; }
  /** @description Returns a repository bound to the trusted tenant database. @param entity - Entity target. @returns Tenant repository. */
  async getRepository<T extends import("typeorm").ObjectLiteral>(entity:EntityTarget<T>):Promise<Repository<T>> { return (await this.getDataSource()).getRepository(entity); }
  /** @description Evicts one cached tenant DataSource. @returns Nothing. */
  private async evictOne():Promise<void> { const key=this.cache.keys().next().value as string|undefined; if(!key) return; const ds=this.cache.get(key); this.cache.delete(key); if(ds?.isInitialized) await ds.destroy(); }
  /** @description Closes all cached tenant DataSources. @returns Nothing. */
  async onModuleDestroy():Promise<void> { for(const ds of this.cache.values()) if(ds.isInitialized) await ds.destroy(); this.cache.clear(); }
}
