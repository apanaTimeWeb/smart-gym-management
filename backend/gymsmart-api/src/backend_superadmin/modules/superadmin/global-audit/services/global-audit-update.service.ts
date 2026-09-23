// RESPONSIBILITY: Executes partial update business flow for the global-audit feature.
// FLOW: CommandController -> GlobalAuditUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.mapper';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/backend_superadmin/global-audit/responses/global-audit-response.dto';
import type { GlobalAuditUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/global-audit/types/global-audit.interfaces';
@Injectable()
export class GlobalAuditUpdateService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Updates a global-audit record by UUID. */
  async updateGlobalAudit(id: string, input: GlobalAuditUpdateInput): Promise<GlobalAuditResponseDto> { return GlobalAuditMapper.toResponse(GlobalAuditMapper.toDomain(await this.repository.updateGlobalAuditById(id, input))); }
}