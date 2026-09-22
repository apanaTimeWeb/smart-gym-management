// RESPONSIBILITY: Performs Trainer resource-level authorization for progress-tracking member resources.
// FLOW: Controller → ProgressTrackingAuthorizationService → ownership query → progress use case.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { ProgressTrackingRepository } from '@/backend_trainer/modules/backend_trainer/progress-tracking/repositories/progress-tracking-repository';

@Injectable()
export class ProgressTrackingAuthorizationService {
  constructor(private readonly repository: ProgressTrackingRepository) {}
  /** Verifies that the authenticated Trainer owns the active member. */
  async assertMember(memberId: string): Promise<void> {
    await this.repository.assertMemberOwnedByTrainer(CoreRequestContext.get().userId ?? '', memberId);
  }
}
