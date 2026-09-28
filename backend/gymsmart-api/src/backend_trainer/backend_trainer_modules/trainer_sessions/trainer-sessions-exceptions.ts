// RESPONSIBILITY: Defines session-specific business exceptions for trainer/member ownership rules.
// FLOW: Sessions command service detects invalid relationship → typed exception → canonical error envelope.

import { CoreDomainException } from '@/backend_trainer/backend_core/core_errors/core-domain.exception';


/**
 * Intent: Defines the TrainerSessionsExceptions boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsExceptions extends CoreDomainException {
  constructor() { super('DOMAIN.SESSIONS.MEMBER_FORBIDDEN', 'The member is not assigned to this Trainer.'); }
}
