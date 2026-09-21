// RESPONSIBILITY: Executes the soft-delete flow for the compliance feature.
// FLOW: CommandController -> ComplianceDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { ComplianceRepository } from '@/backend_superadmin/modules/superadmin/compliance/compliance.repository';
@Injectable()
export class ComplianceDeleteService {
  constructor(private readonly repository: ComplianceRepository) {}
  /** Soft-deletes one compliance record. */
  async deleteCompliance(id: string): Promise<null> { await this.repository.deleteComplianceById(id); return null; }
}
