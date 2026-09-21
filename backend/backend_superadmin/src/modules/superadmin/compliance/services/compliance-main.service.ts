// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> ComplianceMainService -> ComplianceRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { ComplianceResponseDataDto } from '@/modules/superadmin/compliance/compliance-response-data.dto';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { COMPLIANCE_SNAPSHOT_KINDS } from '@/modules/superadmin/compliance/compliance.constants';

@Injectable()
export class ComplianceMainService {
  constructor(private readonly repository: ComplianceRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findComplianceData(input: Record<string, unknown> = {}): Promise<ComplianceResponseDataDto> {
    void input;
    const payload = await this.repository.findLatestByKind(COMPLIANCE_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as ComplianceResponseDataDto;
  }
}
