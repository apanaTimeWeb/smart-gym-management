// RESPONSIBILITY: Executes creation business flow for the global-audit feature.
// FLOW: CommandController -> SuperadminGlobalAuditCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';
import { SuperadminGlobalAuditMapper } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.mapper';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';
import type { SuperadminGlobalAuditCreateInput } from '@/backend_superadmin/superadmin_modules/global-audit/types/superadmin-global-audit.interfaces';
@Injectable()
export class SuperadminGlobalAuditCreateService {
  constructor(private readonly repository: SuperadminGlobalAuditRepository) {}
  /** Creates a new global-audit record. */
  async createGlobalAudit(input: SuperadminGlobalAuditCreateInput): Promise<SuperadminGlobalAuditResponseDto> { return SuperadminGlobalAuditMapper.toResponse(SuperadminGlobalAuditMapper.toDomain(await this.repository.createGlobalAudit(input))); }
}