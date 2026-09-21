// RESPONSIBILITY: Executes single-record retrieval for the compliance feature.
// FLOW: QueryController -> ComplianceFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/modules/superadmin/compliance/compliance.mapper';
import type { ComplianceDomainModel } from '@/modules/superadmin/compliance/types/compliance.interfaces';
@Injectable()
export class ComplianceFindService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Retrieves one active compliance record by UUID. */
  async findComplianceById(id: string): Promise<ComplianceDomainModel> { return ComplianceMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
