// RESPONSIBILITY: Soft-deletes a Trainer library diet plan and records the mutation.
// FLOW: LibraryCommandController → LibraryDietPlanDeleteService → repository → audit.

import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { LibraryDietPlanRepository } from '@/backend_trainer/modules/backend_trainer/library/repositories/library-diet-plan.repository';

@Injectable()
export class LibraryDietPlanDeleteService {
  constructor(private readonly repo: LibraryDietPlanRepository, private readonly audit: CoreAuditService) {}

  /** Soft-deletes a diet plan and records the actor and resource change. */
  async deleteDietPlan(id: string): Promise<{ deleted: true }> {
    await this.repo.findByIdOrThrow(id);
    await this.repo.softDeleteDietPlan(id);
    await this.audit.record('DIET_PLAN_DELETED', 'DIET_PLAN', id, null, { deleted: true, actorId: CoreRequestContext.get().userId ?? null });
    return { deleted: true };
  }
}
