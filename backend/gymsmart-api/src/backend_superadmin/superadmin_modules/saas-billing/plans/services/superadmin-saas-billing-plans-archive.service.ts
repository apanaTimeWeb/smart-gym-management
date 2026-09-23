// RESPONSIBILITY: Executes the plan archive state transition through a named repository mutation.
// FLOW: Controller -> archive service -> repository update -> active plan response.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';

@Injectable()
export class SuperadminPlansArchiveService {
  constructor(private readonly repository: SuperadminPlansRepository) {}
  /** Archives a subscription plan without physically deleting its row. */
  async archive(id: string): Promise<unknown> { await this.repository.findByIdOrThrow(id); return this.repository.updatePlansById(id, { isArchived: true }); }
}