// RESPONSIBILITY: Builds large Gym CSV exports asynchronously using bounded paginated DB reads.
// FLOW: Redis queue -> job -> repository page -> CSV stream -> protected file -> success/DLQ.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'node:fs';
import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsExportJobRepository } from '@/backend_superadmin/superadmin_modules/gyms/gyms_repositories/superadmin-gyms-export-job.repository';

export const SUPERADMIN_GYMS_EXPORT_QUEUE='superadmin:gyms-export';

/**
 * Primary Intent: Defines the ExportEnvelope type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ExportEnvelope { jobId:string; tenantId:string|null; payload:{ search?:string; status?:string; plan?:string }; }

/**
 * Primary Intent: Defines SuperadminGymsExportWorkerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsExportWorkerService implements OnModuleInit, OnModuleDestroy {
  private running=true;
  private readonly pageSize=500;
  private readonly maxAttempts=3;
  constructor(private readonly redis:SuperadminCoreRedisService,private readonly repository:SuperadminGymsRepository,private readonly jobs:SuperadminGymsExportJobRepository,private readonly config:ConfigService,private readonly logger:PinoLogger){}
/**
 * Primary Intent: Executes the onModuleInit use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleInit():void{ void this.consume(); }
  /**
 * Primary Intent: Executes the `onModuleDestroy` responsibility owned by this feature-local superadmin-gyms-export-worker.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleDestroy():void{ this.running=false; }
  /**
 * Primary Intent: Executes the `consume` responsibility owned by this feature-local superadmin-gyms-export-worker.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the consume use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async consume():Promise<void>{ while(this.running){ const result=await this.redis.getClient().brpop(SUPERADMIN_GYMS_EXPORT_QUEUE,2); if(!result) continue; const job=JSON.parse(result[1]) as ExportEnvelope; try{ await this.process(job); }catch(error){ this.logger.error({err:error,jobId:job.jobId,context:SuperadminGymsExportWorkerService.name},'Gym export worker iteration failed'); } } }
  /**
 * Primary Intent: Executes the `process` responsibility owned by this superadmin-gyms-export-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the process use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async process(job:ExportEnvelope):Promise<void>{ const state=await this.jobs.markProcessing(job.jobId); try{ const root=this.config.getOrThrow<string>('app.exportStoragePath'); const path=join(root,'gyms',`${job.jobId}.csv`); await fs.mkdir(dirname(path),{recursive:true,mode:0o700}); const stream=createWriteStream(path,{encoding:'utf8',mode:0o600}); stream.write(['id','name','ownerName','adminEmail','phone','status','plan','memberCount','monthlyRevenue','createdAt'].join(',')+'\n'); let page=1; while(true){ const result=await this.repository.findExportPage({page,limit:this.pageSize,search:job.payload.search,status:job.payload.status,plan:job.payload.plan}); for(const row of result.items){ stream.write([row.id,row.name,row.ownerName,row.adminEmail,row.phone,row.status,row.plan,row.memberCount,row.monthlyRevenue,row.createdAt.toISOString()].map((value)=>`"${String(value??'').replaceAll('"','""')}"`).join(',')+'\n'); } if(page*this.pageSize>=result.total || result.items.length===0) break; page+=1; } await new Promise<void>((resolve,reject)=>{stream.on('finish',resolve);stream.on('error',reject);stream.end();}); await this.jobs.markSuccess(job.jobId,path); }catch(error){ if(state.attempts < this.maxAttempts){ await this.jobs.markQueuedForRetry(job.jobId); await this.redis.getClient().lpush(SUPERADMIN_GYMS_EXPORT_QUEUE,JSON.stringify(job)); return; } const code=error instanceof Error && error.message.includes('.')?error.message:'GYMS.EXPORT.FAILED'; await this.jobs.markFailed(job.jobId,code); await this.redis.getClient().lpush(`${SUPERADMIN_GYMS_EXPORT_QUEUE}:dlq`,JSON.stringify(job)); } }
}
