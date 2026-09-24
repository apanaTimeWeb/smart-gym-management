// RESPONSIBILITY: Executes real pg_dump/pg_restore work from the distributed backup queue.
// FLOW: Redis queue -> durable job -> tenant DataSource -> child process -> backup artifact/state.
import { Injectable, OnModuleDestroy, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import { PinoLogger } from 'nestjs-pino';
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminSystemOpsBackupJobRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository';
import { SuperadminCoreTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-resolver.service';
import { SuperadminBackupsProcessException } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.exceptions';

export const SUPERADMIN_BACKUP_QUEUE = 'superadmin:backups';
export const SUPERADMIN_RESTORE_QUEUE = 'superadmin:backups-restore';

/**
 * Primary Intent: Defines the BackupEnvelope type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface BackupEnvelope { jobId:string; queueName:string; tenantId:string; payload:{ backupId:string; type:'SNAPSHOT'|'RESTORE'; requestedByUserId:string }; }

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsWorkerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsWorkerService implements OnModuleInit, OnModuleDestroy {
  private running = true;
  private readonly maxAttempts = 3;
  constructor(
    private readonly redis: SuperadminCoreRedisService,
    private readonly repository: SuperadminSystemOpsBackupsRepository,
    private readonly jobs: SuperadminSystemOpsBackupJobRepository,
    private readonly resolver: SuperadminCoreTenantDatasourceResolverService,
    private readonly config: ConfigService,
    private readonly logger: PinoLogger,
  ) {}

  /**
 * Primary Intent: Executes the `onModuleInit` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleInit(): void { void this.consume(SUPERADMIN_BACKUP_QUEUE); void this.consume(SUPERADMIN_RESTORE_QUEUE); }

  /**
 * Primary Intent: Executes the `onModuleDestroy` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the onModuleDestroy use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleDestroy(): void { this.running = false; }

  /**
 * Primary Intent: Executes the `consume` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the consume use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async consume(queue: string): Promise<void> {
    while (this.running) {
      const result = await this.redis.getClient().brpop(queue, 2);
      if (!result) continue;
      const job = JSON.parse(result[1]) as BackupEnvelope;
      try { await this.process(job); }
      /**
       * Primary Intent: Executes the catch use case within its owning backend boundary.
       * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
       * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
       * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
       */
      catch (error) { this.logger.error({ err:error, jobId:job.jobId, context:SuperadminSystemOpsBackupsWorkerService.name }, 'Backup worker iteration failed'); }
    }
  }

  /**
 * Primary Intent: Executes the `process` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
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
  private async process(job: BackupEnvelope): Promise<void> {
    const claim = await this.jobs.markProcessing(job.jobId);
    if (!claim.claimed) return;
    const state = claim.job;
    try {
      if (job.payload.type === 'SNAPSHOT') await this.snapshot(job);
      else await this.restore(job);
      await this.jobs.markSuccess(job.jobId);
    } catch (error) {
      const errorCode = error instanceof Error && error.message.includes('.') ? error.message : 'BACKUPS.JOB.FAILED';
      if (state.attempts < this.maxAttempts) { await this.jobs.markQueuedForRetry(job.jobId); await this.redis.getClient().lpush(job.queueName, JSON.stringify(job)); return; }
      if (job.payload.type === 'SNAPSHOT') await this.repository.markSnapshotFailed(job.payload.backupId);
      await this.jobs.markFailed(job.jobId, errorCode);
      await this.redis.getClient().lpush(`${job.queueName}:dlq`, JSON.stringify(job));
    }
  }

  /**
 * Primary Intent: Executes the `snapshot` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the snapshot use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async snapshot(job: BackupEnvelope): Promise<void> {
    const backup = await this.repository.findByIdOrThrow(job.payload.backupId);
    const dataSource = await this.resolver.resolve(job.payload.requestedByUserId, job.tenantId);
    try {
      const connection = this.connectionDetails(dataSource.options.url?.toString() ?? '');
      const root = this.config.getOrThrow<string>('app.backupStoragePath');
      const path = join(root, job.tenantId, `${backup.id}.dump`);
      await fs.mkdir(dirname(path), { recursive: true, mode: 0o700 });
      await this.runProcess(this.config.getOrThrow<string>('app.pgDumpBin'), [
        '--format=custom', '--no-owner', '--no-acl', '--host', connection.host,
        '--port', connection.port, '--username', connection.user,
        '--dbname', connection.database, '--file', path,
      ], connection.password);
      const stat = await fs.stat(path);
      await fs.chmod(path, 0o600);
      await this.repository.markSnapshotSuccess(backup.id, path, Math.ceil(stat.size / (1024*1024)));
    } finally {
      await this.resolver.releaseRequest(job.tenantId);
    }
  }

  /**
 * Primary Intent: Executes the `restore` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the restore use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async restore(job: BackupEnvelope): Promise<void> {
    const backup = await this.repository.findCompletedWithArtifactOrThrow(job.payload.backupId);
    const maintenanceKey = `tenant:maintenance:${job.tenantId}`;
    const acquired = await this.redis.getClient().set(maintenanceKey, job.jobId, 'EX', 1800, 'NX');
    if (acquired !== 'OK') throw new ServiceUnavailableException({ error:'SERVICE_UNAVAILABLE', errorCode:'TENANT.MAINTENANCE.ALREADY_ACTIVE', message:{ key:'auth.ERRORS.UNAUTHORIZED' } });
    await this.resolver.waitForIdle(job.tenantId);
    const dataSource = await this.resolver.resolve(job.payload.requestedByUserId, job.tenantId);
    try {
      const connection = this.connectionDetails(dataSource.options.url?.toString() ?? '');
      await this.runProcess(this.config.getOrThrow<string>('app.pgRestoreBin'), [
        '--clean', '--if-exists', '--no-owner', '--no-acl', '--host', connection.host,
        '--port', connection.port, '--username', connection.user,
        '--dbname', connection.database, backup.artifactPath!,
      ], connection.password);
    } finally {
      await this.redis.getClient().del(maintenanceKey);
      await this.resolver.release(job.tenantId).catch(() => undefined);
    }
  }

  /**
 * Primary Intent: Executes the `connectionDetails` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the connectionDetails use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private connectionDetails(raw:string): {host:string; port:string; user:string; password:string; database:string} {
    const url = new URL(raw);
    return { host:url.hostname, port:url.port || '5432', user:decodeURIComponent(url.username), password:decodeURIComponent(url.password), database:url.pathname.replace(/^\//,'') };
  }

  /**
 * Primary Intent: Executes the `runProcess` responsibility owned by this superadmin-system-ops-backups-worker.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the runProcess use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private runProcess(binary:string,args:string,password:string):Promise<void> {
    return new Promise((resolve,reject)=>{
      const child=spawn(binary,args,{env:{PGPASSWORD:password},stdio:['ignore','ignore','pipe']});
      let stderr='';
      child.stderr.on('data',(chunk:Buffer|string)=>{ stderr += String(chunk); if(stderr.length>4000) stderr=stderr.slice(-4000); });
      child.on('error',reject);
      child.on('close',(code)=> code===0 ? resolve() : reject(new SuperadminBackupsProcessException(`BACKUPS.PROCESS.EXIT_${code ?? 'UNKNOWN'}:${stderr.replaceAll(/\s+/g,' ').trim()}`)));
    });
  }
}
