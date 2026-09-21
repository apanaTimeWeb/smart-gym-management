// RESPONSIBILITY: Executes the plan archive state transition through a named repository mutation.
// FLOW: Controller -> archive service -> repository update -> active plan response.
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '@/modules/superadmin/saas-billing/plans/plans.repository';

@Injectable()
export class PlansArchiveService {
  constructor(private readonly repository: PlansRepository) {}
  /** Archives a subscription plan without physically deleting its row. */
  async archive(id: string): Promise<unknown> { await this.repository.findByIdOrThrow(id); return this.repository.updatePlansById(id, { isArchived: true }); }
}
