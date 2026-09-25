// RESPONSIBILITY: Stores completed export archives in a protected local filesystem volume.
// FLOW: Export worker -> storage adapter -> chmod 0700 directory / 0600 archive.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

/**
 * Primary Intent: Defines SuperadminExportDataStorageAdapter as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataStorageAdapter {
  private readonly root: string;

  constructor(config: ConfigService) { this.root = config.getOrThrow<string>('app.exportStoragePath'); }

  /**
 * Primary Intent: Executes the store use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async store(jobId: string, archive: Buffer): Promise<string> {
    await fs.mkdir(this.root, { recursive: true, mode: 0o700 });
    const path = join(this.root, `${jobId}.zip`);
    await fs.writeFile(path, archive, { mode: 0o600 });
    return path;
  }

  /**
 * Primary Intent: Executes the `remove` responsibility owned by this superadmin-export-data-storage.adapter construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the remove use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async remove(path: string): Promise<void> { await fs.rm(path, { force: true }); }
}
