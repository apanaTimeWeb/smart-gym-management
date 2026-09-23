// RESPONSIBILITY: Executes the soft-delete flow for the compliance feature.
// FLOW: CommandController -> SuperadminComplianceDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
@Injectable()
export class SuperadminComplianceDeleteService {
  constructor(private readonly repository: SuperadminComplianceRepository) {}
  /** Soft-deletes one compliance record. */
  async deleteCompliance(id: string): Promise<null> { await this.repository.deleteComplianceById(id); return null; }
}