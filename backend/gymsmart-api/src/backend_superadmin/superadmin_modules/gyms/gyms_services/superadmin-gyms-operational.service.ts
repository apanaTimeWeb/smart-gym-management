// RESPONSIBILITY: Executes gym operational commands, including asynchronous CSV export orchestration.
// FLOW: Controller -> validation -> durable export job -> Redis queue -> export worker.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsExportJobRepository } from '@/backend_superadmin/superadmin_modules/gyms/gyms_repositories/superadmin-gyms-export-job.repository';
import { SuperadminCoreDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-distributed-job-queue.service';
import { SUPERADMIN_GYMS_EXPORT_QUEUE } from '@/backend_superadmin/superadmin_modules/gyms/gyms_workers/superadmin-gyms-export-worker.service';
import { SuperadminGymsExportDownloadTokenService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-export-download-token.service';

/**
 * Primary Intent: Defines SuperadminGymsOperationalService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsOperationalService {
  constructor(private readonly repository:SuperadminGymsRepository,private readonly config:ConfigService,private readonly jwtService:JwtService,private readonly jobs:SuperadminGymsExportJobRepository,private readonly queue:SuperadminCoreDistributedJobQueueService,private readonly downloadTokens:SuperadminGymsExportDownloadTokenService){}
/**
 * Primary Intent: Executes the stats use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the stats use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async stats():Promise<{totalActive:number;totalSuspended:number;mrrContribution:number}>{return this.repository.getStats();}
/**
 * Primary Intent: Executes the emailOwner use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the emailOwner use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async emailOwner(id:string,subject:string,message:string):Promise<null>{ await this.repository.findByIdOrThrow(id); if(!subject.trim()||!message.trim()) throw new BadRequestException({error:'BAD_REQUEST',errorCode:'GYMS.EMAIL.INPUT_REQUIRED',message:{key:'gyms.ERRORS.BAD_REQUEST'}}); await this.repository.recordAdministrativeAction(id,'EMAIL_OWNER_REQUESTED'); return null; }
/**
 * Primary Intent: Executes the impersonate use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the impersonate use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async impersonate(id:string):Promise<{token:string}>{ const tenant=await this.repository.findByIdOrThrow(id); const actor=getRequestContext()?.userId ?? null; if(!actor) throw new BadRequestException({error:'BAD_REQUEST',errorCode:'GYMS.EMAIL.ACTOR_REQUIRED',message:{key:'gyms.ERRORS.BAD_REQUEST'}}); const secret=this.config.getOrThrow<string>('app.jwtAccessSecret'); const token=await this.jwtService.signAsync({sub:actor,impersonatedTenantId:tenant.id,purpose:'GYM_IMPERSONATION'},{secret,expiresIn:'10m'}); await this.repository.recordAdministrativeAction(id,'IMPERSONATION_ISSUED'); return {token}; }
  /**
 * Primary Intent: Executes the `exportGyms` responsibility owned by this feature-local superadmin-gyms-operational.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  async exportGyms(input:{search?:string;status?:string;plan?:string}={}):Promise<{jobId:string;statusUrl:string;downloadUrl:string}>{ const actor=getRequestContext()?.userId; if(!actor) throw new BadRequestException({error:'BAD_REQUEST',errorCode:'GYMS.EXPORT.ACTOR_REQUIRED',message:{key:'gyms.ERRORS.BAD_REQUEST'}}); const job=await this.jobs.create({requestedByUserId:actor,search:input.search?.trim()||null,statusFilter:input.status?.trim()||null,planFilter:input.plan?.trim()||null}); await this.queue.enqueue({jobId:job.id,queueName:SUPERADMIN_GYMS_EXPORT_QUEUE,tenantId:null,payload:{search:job.search??undefined,status:job.statusFilter??undefined,plan:job.planFilter??undefined},enqueuedAt:new Date().toISOString()});         return {jobId:job.id,statusUrl:`/superadmin/gyms/export/${job.id}`,downloadUrl:`${process.env.API_URL || 'http://localhost:5000'}/superadmin/gyms/export/${job.id}/download?token=${encodeURIComponent(this.downloadTokens.create(job.id))}`}; }

  /**
   * Primary Intent: Serves the legacy frontend GET export contract by reusing an existing equivalent active job when possible, otherwise queueing a new async job.
   * Edge Cases: Repeated GET requests must not create unbounded duplicate jobs; completed/processing matches are reused.
   * Side-Effects: May create or enqueue one export job; CSV generation remains in the distributed worker.
   * AI-Note: This method is a compatibility bridge; the versioned POST remains the canonical mutating contract.
   */
  async exportGymsCompatibility(input:{search?:string;status?:string;plan?:string}={}):Promise<{jobId:string;statusUrl:string;downloadUrl:string}>{
    const actor=getRequestContext()?.userId;
    if(!actor) throw new BadRequestException({error:'BAD_REQUEST',errorCode:'GYMS.EXPORT.ACTOR_REQUIRED',message:{key:'gyms.ERRORS.BAD_REQUEST'}});
    const existing=await this.jobs.findLatestEquivalent(actor,input.search?.trim()||null,input.status?.trim()||null,input.plan?.trim()||null);
    if(existing) return {jobId:existing.id,statusUrl:`/superadmin/gyms/export/${existing.id}`,downloadUrl:`${process.env.API_URL || 'http://localhost:5000'}/superadmin/gyms/export/${existing.id}/download?token=${encodeURIComponent(this.downloadTokens.create(existing.id))}`};
    return this.exportGyms(input);
  }
}


