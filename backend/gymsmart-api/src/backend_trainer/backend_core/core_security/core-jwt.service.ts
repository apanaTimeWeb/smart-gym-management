// RESPONSIBILITY: Provides short-lived access token issuing for test/bootstrap workflows without exposing secrets.
// FLOW: Trusted seed/user auth → JwtService → signed access token.
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import type { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';
/**
 * Intent: Defines the CoreJwtService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreJwtService {
  constructor(private readonly jwt: JwtService) {}
  /** Creates a short-lived access token for a known actor. */
  /**
 * Intent: Executes the signAccessToken operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes signAccessToken inside the owning backend service/repository boundary without exposing ORM details.
 * @param userId - Input for signAccessToken.
 * @param email - Input for signAccessToken.
 * @param role - Input for signAccessToken.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
signAccessToken(userId: string, email: string, role: CoreRole): string { return this.jwt.sign({ userId, email, role }); }
  /** Returns the currently authenticated user identifier for audit helpers. */
  /**
 * Intent: Executes the getCurrentUserId operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getCurrentUserId inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getCurrentUserId(): string { return CoreRequestContext.getUserIdOrThrow(); }
}
