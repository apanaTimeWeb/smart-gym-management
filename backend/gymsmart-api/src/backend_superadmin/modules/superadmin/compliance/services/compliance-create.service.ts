// RESPONSIBILITY: Executes creation business flow for the compliance feature.
// FLOW: CommandController -> ComplianceCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/backend_superadmin/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/backend_superadmin/modules/superadmin/compliance/compliance.mapper';
import type { ComplianceCreateInput } from '@/backend_superadmin/modules/superadmin/compliance/types/compliance.interfaces';
import { ComplianceResponseDto } from '@/backend_superadmin/modules/superadmin/compliance/responses/compliance-response.dto';
@Injectable()
export class ComplianceCreateService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Creates a new compliance record. */
  async createCompliance(input: ComplianceCreateInput): Promise<ComplianceResponseDto> { return ComplianceMapper.toResponse(ComplianceMapper.toDomain(await this.repository.createCompliance(input))); }
}
