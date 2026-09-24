// RESPONSIBILITY: Owns durable Gym CSV export job persistence.
// FLOW: Export service/worker -> repository -> superadmin_gyms_export_jobs.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SuperadminGymsExportJobNotFoundException } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminGymsExportJobEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-export-job.entity';
import { SuperadminGymsExportJobStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';

/**
 * Primary Intent: Defines SuperadminGymsExportJobRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsExportJobRepository {
  constructor(@InjectRepository(SuperadminGymsExportJobEntity) private readonly repository:Repository<SuperadminGymsExportJobEntity>){}
  /**
 * Primary Intent: Executes the create use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async create(input:Pick<SuperadminGymsExportJobEntity,'requestedByUserId'|'search'|'statusFilter'|'planFilter'>):Promise<SuperadminGymsExportJobEntity>{ return this.repository.save(this.repository.create({...input,status:SuperadminGymsExportJobStatus.QUEUED,attempts:0,errorCode:null,resultPath:null,completedAt:null})); }
  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id:string):Promise<SuperadminGymsExportJobEntity|null>{ return this.repository.findOne({where:{id,deletedAt:null} as never}); }
  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id:string):Promise<SuperadminGymsExportJobEntity>{ const job=await this.findById(id); if(!job) throw new NotFoundException({error:'NOT_FOUND',errorCode:'GYMS.EXPORT.JOB.NOT_FOUND',message:{key:'gyms.ERRORS.NOT_FOUND'}}); return job; }

  /**
 * Primary Intent: Executes the markProcessing use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markProcessing(id:string):Promise<SuperadminGymsExportJobEntity>{ await this.repository.increment({id,deletedAt:null} as never,'attempts',1); await this.repository.update({id,deletedAt:null} as never,{status:SuperadminGymsExportJobStatus.PROCESSING} as never); const job=await this.findById(id); if(!job) throw new SuperadminGymsExportJobNotFoundException(); return job; }
  /**
 * Primary Intent: Executes the markQueuedForRetry use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markQueuedForRetry(id:string):Promise<void>{ await this.repository.update({id,deletedAt:null} as never,{status:SuperadminGymsExportJobStatus.QUEUED,completedAt:null} as never); }
  /**
 * Primary Intent: Executes the markSuccess use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markSuccess(id:string,resultPath:string):Promise<void>{ await this.repository.update({id,deletedAt:null} as never,{status:SuperadminGymsExportJobStatus.SUCCESS,resultPath,completedAt:new Date(),errorCode:null} as never); }
  /**
 * Primary Intent: Executes the markFailed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markFailed(id:string,errorCode:string):Promise<void>{ await this.repository.update({id,deletedAt:null} as never,{status:SuperadminGymsExportJobStatus.FAILED,errorCode,completedAt:new Date()} as never); }

  /**
   * Primary Intent: Finds the newest active export job with the same actor and filter tuple for safe GET compatibility reuse.
   * Edge Cases: Only queued/processing/success jobs are reusable; terminal failures may be retried with a fresh job.
   * Side-Effects: None.
   * AI-Note: This lookup prevents duplicate export jobs when the legacy GET client retries automatically.
   */
  /**
   * Primary Intent: Executes the findLatestEquivalent use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findLatestEquivalent(requestedByUserId:string,search:string|null,statusFilter:string|null,planFilter:string|null):Promise<SuperadminGymsExportJobEntity|null>{
    return this.activeRepository.findOne({where:{requestedByUserId,search,statusFilter,planFilter,deletedAt:null} as never,order:{createdAt:'DESC'} as never});
  }
}
