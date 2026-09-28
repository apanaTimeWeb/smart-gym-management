// RESPONSIBILITY: Defines a typed domain 400 exception for deterministic business-rule failures.
// FLOW: Service validation → typed domain exception → global exception filter → canonical error envelope.
import { CoreDomainException } from '@/backend_trainer/backend_core/core_errors/core-domain.exception';

/**
 * Intent: Defines the CoreDomainBadRequestException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreDomainBadRequestException extends CoreDomainException {
  constructor(errorCode: string, message = errorCode) { super(errorCode, message); }
}
