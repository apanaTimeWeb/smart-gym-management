// RESPONSIBILITY: Stores completed export archives in a protected local filesystem volume.
// FLOW: Export worker -> storage adapter -> chmod 0700 directory / 0600 archive.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class SuperadminExportDataStorageAdapter {
  private readonly root: string;

  constructor(config: ConfigService) { this.root = config.getOrThrow<string>('app.exportStoragePath'); }

  /** Persists an archive and returns its protected absolute path. */
  async store(jobId: string, archive: Buffer): Promise<string> {
    await fs.mkdir(this.root, { recursive: true, mode: 0o700 });
    const path = join(this.root, `${jobId}.zip`);
    await fs.writeFile(path, archive, { mode: 0o600 });
    return path;
  }

  /** Removes an expired export artifact without affecting other tenant data. */
  async remove(path: string): Promise<void> { await fs.rm(path, { force: true }); }
}
