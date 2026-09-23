// RESPONSIBILITY: Executes partial update business flow for the global-audit feature.
// FLOW: CommandController -> SuperadminGlobalAuditUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';
import { SuperadminGlobalAuditMapper } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.mapper';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';
import type { SuperadminGlobalAuditUpdateInput } from '@/backend_superadmin/superadmin_modules/global-audit/types/superadmin-global-audit.interfaces';
@Injectable()
export class SuperadminGlobalAuditUpdateService {
  constructor(private readonly repository: SuperadminGlobalAuditRepository) {}
  /** Updates a global-audit record by UUID. */
  async updateGlobalAudit(id: string, input: SuperadminGlobalAuditUpdateInput): Promise<SuperadminGlobalAuditResponseDto> { return SuperadminGlobalAuditMapper.toResponse(SuperadminGlobalAuditMapper.toDomain(await this.repository.updateGlobalAuditById(id, input))); }
}