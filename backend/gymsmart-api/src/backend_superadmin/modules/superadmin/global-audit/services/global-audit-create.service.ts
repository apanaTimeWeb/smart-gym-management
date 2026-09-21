// RESPONSIBILITY: Executes creation business flow for the global-audit feature.
// FLOW: CommandController -> GlobalAuditCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.mapper';
import type { GlobalAuditCreateInput } from '@/backend_superadmin/modules/superadmin/global-audit/types/global-audit.interfaces';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';
@Injectable()
export class GlobalAuditCreateService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Creates a new global-audit record. */
  async createGlobalAudit(input: GlobalAuditCreateInput): Promise<GlobalAuditResponseDto> { return GlobalAuditMapper.toResponse(GlobalAuditMapper.toDomain(await this.repository.createGlobalAudit(input))); }
}
