// RESPONSIBILITY: Provides a typed infrastructure timeout failure for external and database operations.
// FLOW: Timeout wrapper → CoreTimeoutException → canonical error filter → localized message resolution.

import { HttpStatus } from '@nestjs/common';
import { CoreDomainException } from '@/backend_trainer/backend_core/core_errors/core-domain.exception';


/**
 * Intent: Defines the CoreTimeoutException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreTimeoutException extends CoreDomainException {
  constructor(operation: string) {
    super(`CORE.TIMEOUT.${operation.toUpperCase()}`, undefined, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
