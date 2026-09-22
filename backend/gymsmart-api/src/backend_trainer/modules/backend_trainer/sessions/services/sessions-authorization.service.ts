// RESPONSIBILITY: Performs Trainer resource-level authorization for session mutations.
// FLOW: Controller → SessionsAuthorizationService → SessionsRepository ownership query → command service.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { SessionsRepository } from '@/backend_trainer/modules/backend_trainer/sessions/repositories/sessions-repository';

@Injectable()
export class SessionsAuthorizationService {
  constructor(private readonly repository: SessionsRepository) {}
  /** Verifies that the authenticated Trainer owns the active session. */
  async assertSession(sessionId: string): Promise<void> {
    await this.repository.findByIdOrThrow(CoreRequestContext.get().userId ?? '', sessionId);
  }
}
