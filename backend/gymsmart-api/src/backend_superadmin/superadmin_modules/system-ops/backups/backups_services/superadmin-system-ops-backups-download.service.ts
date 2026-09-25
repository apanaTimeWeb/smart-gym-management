// RESPONSIBILITY: Authorizes access to stored backup artifacts and produces protected application URLs.
// FLOW: Query -> persisted backup state -> same-origin protected download endpoint.
import { Injectable, NotFoundException } from '@nestjs/common';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsDownloadService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsDownloadService {
  constructor(private readonly repository: SuperadminSystemOpsBackupsRepository) {}
/**
 * Primary Intent: Executes the findBackupsDownload use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findBackupsDownload use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findBackupsDownload(id:string):Promise<{downloadUrl:string;expiresAt:string}> {
    await this.repository.findCompletedWithArtifactOrThrow(id);
    const expiresAt=new Date(Date.now()+24*60*60*1000).toISOString();
    return { downloadUrl:`${process.env.API_URL ?? ''}/superadmin/system-ops/backups/${encodeURIComponent(id)}/download/file`, expiresAt };
  }

  /**
 * Primary Intent: Executes the `findBackupsArtifact` responsibility owned by this superadmin-system-ops-backups-download.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the findBackupsArtifact use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findBackupsArtifact(id:string):Promise<{path:string}> {
    const backup=await this.repository.findCompletedWithArtifactOrThrow(id);
    if(!backup.artifactPath) throw new NotFoundException({error:'NOT_FOUND',errorCode:'BACKUPS.ARTIFACT.NOT_READY',message:{key:'backups.ERRORS.NOT_FOUND'}});
    return {path:backup.artifactPath};
  }
}
