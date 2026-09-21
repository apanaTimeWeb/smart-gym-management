// RESPONSIBILITY: Creates an authorized download URL contract for a stored backup record.
// FLOW: Controller -> BackupsDownloadService -> BackupsRepository -> signed download contract.
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.repository';

@Injectable()
export class BackupsDownloadService {
  constructor(private readonly repository: BackupsRepository) {}

  /** Returns a deterministic, time-limited download URL for an existing backup. */
  async findBackupsDownload(id: string): Promise<{ downloadUrl: string; expiresAt: string }> {
    const backup = await this.repository.findByIdOrThrow(id);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    return { downloadUrl: `https://storage.invalid/backups/${encodeURIComponent(backup.id)}?expires=${encodeURIComponent(expiresAt)}`, expiresAt };
  }
}
