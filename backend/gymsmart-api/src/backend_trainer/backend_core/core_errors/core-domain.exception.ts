// RESPONSIBILITY: Represents typed domain failures with machine-readable error codes and localized message keys.
// FLOW: Service/repository failure → CoreDomainException → canonical exception filter → i18n message resolution.

import { HttpStatus } from '@nestjs/common';


/**
 * Intent: Defines the CoreDomainException boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreDomainException extends Error {
  constructor(public readonly errorCode: string, message = errorCode, public readonly status: HttpStatus = HttpStatus.BAD_REQUEST) { super(message); }
}
