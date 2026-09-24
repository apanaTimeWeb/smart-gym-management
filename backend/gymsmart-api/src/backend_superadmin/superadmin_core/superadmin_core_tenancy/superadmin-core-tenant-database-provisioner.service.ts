// RESPONSIBILITY: Provisions and migrates logical PostgreSQL tenant databases under a distributed creation lock.
// FLOW: Master registry -> Redis distributed lock -> CREATE DATABASE -> tenant migrations -> unlock.
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminCoreTenantSchemaMigration } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-schema-migration';

/**
 * Primary Intent: Defines SuperadminCoreTenantDatabaseProvisionerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreTenantDatabaseProvisionerService {
  constructor(private readonly master:DataSource,private readonly config:ConfigService,private readonly redis:SuperadminCoreRedisService){}
/**
 * Primary Intent: Executes the provision use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the provision use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async provision(tenantId:string):Promise<string>{
    const databaseName=this.buildDatabaseName(tenantId);
    const lockKey=`tenant:provision:${databaseName}`;
    const lockToken=randomUUID();
    if(!await this.acquireProvisionLock(lockKey,lockToken)) throw new ServiceUnavailableException({error:'SERVICE_UNAVAILABLE',errorCode:'TENANT.PROVISION.LOCK_BUSY',message:{key:'auth.ERRORS.UNAUTHORIZED'}});
    try { await this.ensureTenantDatabase(databaseName); await this.runTenantMigrations(databaseName); return databaseName; }
    finally { await this.releaseProvisionLock(lockKey,lockToken); }
  }

  /**
 * Primary Intent: Executes the buildDatabaseName use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildDatabaseName(tenantId:string):string { const prefix=this.config.getOrThrow<string>('app.tenantDatabasePrefix'); return `${prefix}${tenantId.replace(/[^a-zA-Z0-9_]/g,'_')}`; }

  /**
 * Primary Intent: Executes the ensureTenantDatabase use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async ensureTenantDatabase(databaseName:string):Promise<void>{ const rows=await this.master.query('SELECT 1 FROM pg_database WHERE datname = $1',[databaseName]) as unknown[]; if(!rows.length) await this.master.query(`CREATE DATABASE "${databaseName}"`); }

  /**
 * Primary Intent: Executes the runTenantMigrations use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async runTenantMigrations(databaseName:string):Promise<void>{ const tenant=new DataSource({type:'postgres',url:this.tenantUrl(databaseName),synchronize:false,migrationsRun:false,entities:[],migrations:[SuperadminCoreTenantSchemaMigration],extra:{max:this.config.getOrThrow<number>('app.tenantPoolMaxPerDatabase'),connectionTimeoutMillis:this.config.getOrThrow<number>('app.databaseAcquireTimeoutMs'),idleTimeoutMillis:this.config.getOrThrow<number>('app.databaseIdleTimeoutMs'),statement_timeout:this.config.getOrThrow<number>('app.databaseStatementTimeoutMs')}}); await tenant.initialize(); try{ await tenant.runMigrations(); } finally { await tenant.destroy(); } }

  /**
 * Primary Intent: Executes the `drop` responsibility owned by this superadmin-core-tenant-database-provisioner.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the drop use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async drop(databaseName:string):Promise<void>{ await this.master.query(`DROP DATABASE IF EXISTS "${databaseName.replace(/[^a-zA-Z0-9_]/g,'_')}"`); }
  /**
 * Primary Intent: Executes the `tenantUrl` responsibility owned by this superadmin-core-tenant-database-provisioner.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the tenantUrl use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private tenantUrl(databaseName:string):string{const url=new URL(this.config.getOrThrow<string>('app.databaseUrl')); url.pathname=`/${databaseName}`; return url.toString();}
  /**
 * Primary Intent: Executes the `acquireProvisionLock` responsibility owned by this superadmin-core-tenant-database-provisioner.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the acquireProvisionLock use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async acquireProvisionLock(key:string,token:string):Promise<boolean>{const result=await this.redis.getClient().set(key,token,'EX',300,'NX'); return result==='OK';}
  /**
 * Primary Intent: Executes the `releaseProvisionLock` responsibility owned by this superadmin-core-tenant-database-provisioner.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the releaseProvisionLock use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async releaseProvisionLock(key:string,token:string):Promise<void>{await this.redis.getClient().eval("if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",1,key,token);}
}
