// @ts-nocheck
// RESPONSIBILITY: Creates bounded tenant PostgreSQL DataSources from trusted master-resolved database names.
// FLOW: Trusted tenant context -> bounded connection pool -> versioned tenant migrations -> repository.
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';
import { CoreTenantEntities } from '@/backend_manager/core/database/core-tenant-entities';
import { ManagerHardening1711000000200 } from '@/backend_manager/core/database/migrations/tenant/1711000000200-manager-hardening';

@Injectable()
export class CoreTenantDatasourceService implements OnModuleDestroy {
  private readonly cache=new Map<string,DataSource>();
  constructor(private readonly config:CoreConfigService,private readonly context:CoreRequestContextService) {}
  /** @description Resolves the authorized tenant DataSource with an aggregate pool budget. @returns Initialized DataSource. @throws CoreContextException when trusted database context is missing. */
  async getDataSource():Promise<DataSource> { const current=this.context.get(); if(!current.tenantDatabaseName) throw new CoreContextException('Trusted tenant database context missing','CORE.CONTEXT.TENANT_DATABASE_MISSING'); const cached=this.cache.get(current.tenantDatabaseName); if(cached?.isInitialized) return cached; const max=Math.max(1,Math.floor(this.config.tenantPoolBudget/Math.max(1,this.config.tenantDbMaxCached))); const ds=new DataSource({type:'postgres',host:this.config.tenantDbHost,port:this.config.tenantDbPort,username:this.config.tenantDbUser,password:this.config.tenantDbPassword,database:current.tenantDatabaseName,entities:CoreTenantEntities,migrations:[ManagerHardening1711000000200],synchronize:false,extra:{max,min:0,idleTimeoutMillis:this.config.tenantDbIdleTimeoutMs,connectionTimeoutMillis:this.config.tenantDbAcquireTimeoutMs,statement_timeout:3000}}); await ds.initialize(); await ds.runMigrations(); if(this.cache.size>=this.config.tenantDbMaxCached) await this.evictOne(); this.cache.set(current.tenantDatabaseName,ds); return ds; }
  /** @description Returns a repository bound to the trusted tenant database. @param entity - Entity target. @returns Tenant repository. */
  async getRepository<T>(entity:EntityTarget<T>):Promise<Repository<T>> { return (await this.getDataSource()).getRepository(entity); }
  /** @description Evicts one cached tenant DataSource. @returns Nothing. */
  private async evictOne():Promise<void> { const key=this.cache.keys().next().value as string|undefined; if(!key) return; const ds=this.cache.get(key); this.cache.delete(key); if(ds?.isInitialized) await ds.destroy(); }
  /** @description Closes all cached tenant DataSources. @returns Nothing. */
  async onModuleDestroy():Promise<void> { for(const ds of this.cache.values()) if(ds.isInitialized) await ds.destroy(); this.cache.clear(); }
}
