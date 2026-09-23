// RESPONSIBILITY: Executes creation business flow for the compliance feature.
// FLOW: CommandController -> SuperadminComplianceCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
import { SuperadminComplianceMapper } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.mapper';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';
import type { SuperadminComplianceCreateInput } from '@/backend_superadmin/superadmin_modules/compliance/types/superadmin-compliance.interfaces';
@Injectable()
export class SuperadminComplianceCreateService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}
  /** Creates a new compliance record. */
  async createCompliance(input: SuperadminComplianceCreateInput): Promise<SuperadminComplianceResponseDto> { return SuperadminComplianceMapper.toResponse(SuperadminComplianceMapper.toDomain(await this.repository.createCompliance(input))); }
}