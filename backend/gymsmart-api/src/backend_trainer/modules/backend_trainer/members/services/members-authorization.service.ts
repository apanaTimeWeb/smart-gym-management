// RESPONSIBILITY: Performs Trainer resource-level authorization for member mutations and reads.
// FLOW: Controller → MembersAuthorizationService → MembersRepository ownership query → feature service.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { MembersRepository } from '@/backend_trainer/modules/backend_trainer/members/repositories/members-repository';

@Injectable()
export class MembersAuthorizationService {
  constructor(private readonly repository: MembersRepository) {}
  /** Verifies that the authenticated Trainer owns the requested active member. */
  async assertMember(memberId: string): Promise<void> {
    await this.repository.findByIdForTrainerOrThrow(CoreRequestContext.get().userId ?? '', memberId);
  }
}
