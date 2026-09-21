// RESPONSIBILITY: Executes single-record retrieval for the global-audit feature.
// FLOW: QueryController -> GlobalAuditFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/modules/superadmin/global-audit/global-audit.mapper';
import type { GlobalAuditDomainModel } from '@/modules/superadmin/global-audit/types/global-audit.interfaces';
@Injectable()
export class GlobalAuditFindService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Retrieves one active global-audit record by UUID. */
  async findGlobalAuditById(id: string): Promise<GlobalAuditDomainModel> { return GlobalAuditMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
