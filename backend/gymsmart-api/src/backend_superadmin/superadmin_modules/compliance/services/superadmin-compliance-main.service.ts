// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminComplianceMainService -> SuperadminComplianceRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceResponseDataDto } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-response-data.dto';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';

@Injectable()
export class SuperadminComplianceMainService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findComplianceData(input: Record<string, unknown> = {}): Promise<SuperadminComplianceResponseDataDto> {
    return await this.repository.getLiveCompliance() as unknown as SuperadminComplianceResponseDataDto;
  }
}