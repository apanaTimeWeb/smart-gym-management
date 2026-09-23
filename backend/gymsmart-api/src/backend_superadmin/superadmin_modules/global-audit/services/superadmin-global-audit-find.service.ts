// RESPONSIBILITY: Executes single-record retrieval for the global-audit feature.
// FLOW: QueryController -> SuperadminGlobalAuditFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminGlobalAuditRepository } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.repository';
import { SuperadminGlobalAuditMapper } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.mapper';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';
@Injectable()
export class SuperadminGlobalAuditFindService {
  constructor(private readonly repository: SuperadminGlobalAuditRepository) {}
  /** Retrieves one active global-audit record by UUID. */
  async findGlobalAuditById(id: string): Promise<SuperadminGlobalAuditResponseDto> { return SuperadminGlobalAuditMapper.toResponse(SuperadminGlobalAuditMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}