// RESPONSIBILITY: Executes the soft-delete flow for the global-audit feature.
// FLOW: CommandController -> GlobalAuditDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.repository';
@Injectable()
export class GlobalAuditDeleteService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Soft-deletes one global-audit record. */
  async deleteGlobalAudit(id: string): Promise<null> { await this.repository.deleteGlobalAuditById(id); return null; }
}