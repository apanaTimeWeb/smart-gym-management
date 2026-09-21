// RESPONSIBILITY: Executes single-record retrieval for the compliance feature.
// FLOW: QueryController -> ComplianceFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/backend_superadmin/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/backend_superadmin/modules/superadmin/compliance/compliance.mapper';
import { ComplianceResponseDto } from '@/backend_superadmin/modules/superadmin/compliance/responses/compliance-response.dto';
@Injectable()
export class ComplianceFindService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Retrieves one active compliance record by UUID. */
  async findComplianceById(id: string): Promise<ComplianceResponseDto> { return ComplianceMapper.toResponse(ComplianceMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}
