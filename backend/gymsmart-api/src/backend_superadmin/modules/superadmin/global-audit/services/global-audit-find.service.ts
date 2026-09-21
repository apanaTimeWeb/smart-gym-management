// RESPONSIBILITY: Executes single-record retrieval for the global-audit feature.
// FLOW: QueryController -> GlobalAuditFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { GlobalAuditRepository } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.repository';
import { GlobalAuditMapper } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.mapper';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';
@Injectable()
export class GlobalAuditFindService {
  constructor(private readonly repository: GlobalAuditRepository) {}
  /** Retrieves one active global-audit record by UUID. */
  async findGlobalAuditById(id: string): Promise<GlobalAuditResponseDto> { return GlobalAuditMapper.toResponse(GlobalAuditMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}
