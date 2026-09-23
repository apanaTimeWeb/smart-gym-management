// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> ComplianceMainService -> ComplianceRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { ComplianceResponseDataDto } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance-response-data.dto';
import { ComplianceRepository } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance.repository';

@Injectable()
export class ComplianceMainService {
  constructor(private readonly repository: ComplianceRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findComplianceData(input: Record<string, unknown> = {}): Promise<ComplianceResponseDataDto> {
    return await this.repository.getLiveCompliance() as unknown as ComplianceResponseDataDto;
  }
}