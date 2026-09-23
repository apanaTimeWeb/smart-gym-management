// RESPONSIBILITY: Executes single-record retrieval for the compliance feature.
// FLOW: QueryController -> SuperadminComplianceFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
import { SuperadminComplianceMapper } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.mapper';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';
@Injectable()
export class SuperadminComplianceFindService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}
  /** Retrieves one active compliance record by UUID. */
  async findComplianceById(id: string): Promise<SuperadminComplianceResponseDto> { return SuperadminComplianceMapper.toResponse(SuperadminComplianceMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}