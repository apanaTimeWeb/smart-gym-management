// RESPONSIBILITY: Executes partial update business flow for the compliance feature.
// FLOW: CommandController -> ComplianceUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/backend_superadmin/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/backend_superadmin/modules/superadmin/compliance/compliance.mapper';
import { ComplianceResponseDto } from '@/backend_superadmin/modules/superadmin/compliance/responses/compliance-response.dto';
import type { ComplianceUpdateInput } from '@/backend_superadmin/modules/superadmin/compliance/types/compliance.interfaces';
@Injectable()
export class ComplianceUpdateService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Updates a compliance record by UUID. */
  async updateCompliance(id: string, input: ComplianceUpdateInput): Promise<ComplianceResponseDto> { return ComplianceMapper.toResponse(ComplianceMapper.toDomain(await this.repository.updateComplianceById(id, input))); }
}