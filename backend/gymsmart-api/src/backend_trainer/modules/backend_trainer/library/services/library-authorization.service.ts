// RESPONSIBILITY: Performs Trainer resource-level authorization for Library member assignment.
// FLOW: Controller → LibraryAuthorizationService → ownership query → assignment use case.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { LibraryDietPlanRepository } from '@/backend_trainer/modules/backend_trainer/library/repositories/library-diet-plan.repository';

@Injectable()
export class LibraryAuthorizationService {
  constructor(private readonly repository: LibraryDietPlanRepository) {}
  /** Verifies that the authenticated Trainer owns the member being assigned a diet plan. */
  async assertMember(memberId: string): Promise<void> {
    await this.repository.assertMemberOwnedByTrainer(memberId, CoreRequestContext.get().userId ?? '');
  }
}
