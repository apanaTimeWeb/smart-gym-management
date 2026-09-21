// RESPONSIBILITY: Executes partial update business flow for the global-audit feature.
// FLOW: CommandController -> GlobalAuditUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/modules/superadmin/global-audit/global-audit.mapper';
import type { GlobalAuditDomainModel, GlobalAuditUpdateInput } from '@/modules/superadmin/global-audit/types/global-audit.interfaces';
@Injectable()
export class GlobalAuditUpdateService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Updates a global-audit record by UUID. */
  async updateGlobalAudit(id: string, input: GlobalAuditUpdateInput): Promise<GlobalAuditDomainModel> { return GlobalAuditMapper.toDomain(await this.repository.updateGlobalAuditById(id, input)); }
}
