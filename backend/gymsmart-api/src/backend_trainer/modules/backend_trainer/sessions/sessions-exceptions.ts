// RESPONSIBILITY: Defines session-specific business exceptions for trainer/member ownership rules.
// FLOW: Sessions command service detects invalid relationship → typed exception → canonical error envelope.

import { CoreDomainException } from '@/backend_trainer/core/errors/core-domain.exception';

export class SessionsMemberForbiddenException extends CoreDomainException {
  constructor() { super('DOMAIN.SESSIONS.MEMBER_FORBIDDEN', 'The member is not assigned to this Trainer.'); }
}
