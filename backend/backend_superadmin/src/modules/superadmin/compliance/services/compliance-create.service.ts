// RESPONSIBILITY: Executes creation business flow for the compliance feature.
// FLOW: CommandController -> ComplianceCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/modules/superadmin/compliance/compliance.mapper';
import type { ComplianceCreateInput, ComplianceDomainModel } from '@/modules/superadmin/compliance/types/compliance.interfaces';
@Injectable()
export class ComplianceCreateService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Creates a new compliance record. */
  async createCompliance(input: ComplianceCreateInput): Promise<ComplianceDomainModel> { return ComplianceMapper.toDomain(await this.repository.createCompliance(input)); }
}
