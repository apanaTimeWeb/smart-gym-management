// RESPONSIBILITY: Represents fail-fast core configuration defects that prevent safe infrastructure operation.
// FLOW: Configuration boundary → CoreConfigurationException → startup/infra failure handling.

import { HttpStatus } from '@nestjs/common';
import { CoreDomainException } from '@/backend_trainer/backend_core/core_errors/core-domain.exception';


/**
 * Intent: Defines the CoreConfigurationException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreConfigurationException extends CoreDomainException {
  constructor(errorCode: string) { super(errorCode, errorCode, HttpStatus.INTERNAL_SERVER_ERROR); }
}
