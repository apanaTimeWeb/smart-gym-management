// RESPONSIBILITY: Executes partial update business flow for the compliance feature.
// FLOW: CommandController -> SuperadminComplianceUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
import { SuperadminComplianceMapper } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.mapper';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';
import type { SuperadminComplianceUpdateInput } from '@/backend_superadmin/superadmin_modules/compliance/types/superadmin-compliance.interfaces';
@Injectable()
export class SuperadminComplianceUpdateService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}
  /** Updates a compliance record by UUID. */
  async updateCompliance(id: string, input: SuperadminComplianceUpdateInput): Promise<SuperadminComplianceResponseDto> { return SuperadminComplianceMapper.toResponse(SuperadminComplianceMapper.toDomain(await this.repository.updateComplianceById(id, input))); }
}