// RESPONSIBILITY: Defines typed Trainer profile/password business exceptions.
// FLOW: Profile password service → typed exception → canonical error envelope.
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';

/**
 * Intent: Defines the ProfilePasswordConfirmationMismatchException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class ProfilePasswordConfirmationMismatchException extends CoreDomainBadRequestException { constructor(){super('PROFILE.PASSWORD.CONFIRMATION_MISMATCH');} }

/**
 * Intent: Defines the ProfileTrainerNotFoundException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class ProfileTrainerNotFoundException extends CoreDomainBadRequestException { constructor(){super('PROFILE.TRAINER_PROFILE.NOT_FOUND');} }

/**
 * Intent: Defines the ProfileCurrentPasswordInvalidException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class ProfileCurrentPasswordInvalidException extends CoreDomainBadRequestException { constructor(){super('PROFILE.PASSWORD.CURRENT_PASSWORD_INVALID');} }
