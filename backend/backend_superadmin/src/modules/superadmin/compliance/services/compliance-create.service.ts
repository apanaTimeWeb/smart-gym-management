// RESPONSIBILITY: Executes creation business flow for the compliance feature.
// FLOW: CommandController -> ComplianceCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { ComplianceMapper } from '@/modules/superadmin/compliance/compliance.mapper';
import type { ComplianceCreateInput } from '@/modules/superadmin/compliance/types/compliance.interfaces';
import { ComplianceResponseDto } from '@/modules/superadmin/compliance/responses/compliance-response.dto';
@Injectable()
export class ComplianceCreateService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Creates a new compliance record. */
  async createCompliance(input: ComplianceCreateInput): Promise<ComplianceResponseDto> { return ComplianceMapper.toResponse(ComplianceMapper.toDomain(await this.repository.createCompliance(input))); }
}
