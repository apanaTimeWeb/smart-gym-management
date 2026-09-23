// RESPONSIBILITY: Executes the soft-delete flow for the global-audit feature.
// FLOW: CommandController -> SuperadminGlobalAuditDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';
@Injectable()
export class SuperadminGlobalAuditDeleteService {
  constructor(private readonly repository: SuperadminGlobalAuditRepository) {}
  /** Soft-deletes one global-audit record. */
  async deleteGlobalAudit(id: string): Promise<null> { await this.repository.deleteGlobalAuditById(id); return null; }
}