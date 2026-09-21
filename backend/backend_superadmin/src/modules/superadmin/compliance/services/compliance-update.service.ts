// RESPONSIBILITY: Executes partial update business flow for the compliance feature.
// FLOW: CommandController -> ComplianceUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/modules/superadmin/compliance/compliance.mapper';
import type { ComplianceDomainModel, ComplianceUpdateInput } from '@/modules/superadmin/compliance/types/compliance.interfaces';
@Injectable()
export class ComplianceUpdateService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Updates a compliance record by UUID. */
  async updateCompliance(id: string, input: ComplianceUpdateInput): Promise<ComplianceDomainModel> { return ComplianceMapper.toDomain(await this.repository.updateComplianceById(id, input)); }
}
