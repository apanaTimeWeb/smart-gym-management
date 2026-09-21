// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> GlobalAuditInvestigationService -> GlobalAuditContractSnapshotRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { GlobalAuditInvestigationResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-investigation-response.dto';
import { GlobalAuditContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit-contract-snapshot.repository';
import { GLOBAL_AUDIT_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.constants';

@Injectable()
export class GlobalAuditInvestigationService {
  constructor(private readonly repository: GlobalAuditContractSnapshotRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findGlobalAuditInvestigation(input: Record<string, unknown> = {}): Promise<GlobalAuditInvestigationResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(GLOBAL_AUDIT_SNAPSHOT_KINDS.INVESTIGATION);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as unknown as GlobalAuditInvestigationResponseDto;
  }
}
