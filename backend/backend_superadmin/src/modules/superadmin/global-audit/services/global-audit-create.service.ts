// RESPONSIBILITY: Executes creation business flow for the global-audit feature.
// FLOW: CommandController -> GlobalAuditCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/modules/superadmin/global-audit/global-audit.mapper';
import type { GlobalAuditCreateInput, GlobalAuditDomainModel } from '@/modules/superadmin/global-audit/types/global-audit.interfaces';
@Injectable()
export class GlobalAuditCreateService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Creates a new global-audit record. */
  async createGlobalAudit(input: GlobalAuditCreateInput): Promise<GlobalAuditDomainModel> { return GlobalAuditMapper.toDomain(await this.repository.createGlobalAudit(input)); }
}
