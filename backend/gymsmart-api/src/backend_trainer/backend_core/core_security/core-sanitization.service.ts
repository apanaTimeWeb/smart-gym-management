// RESPONSIBILITY: Applies bounded free-text sanitization before persistence.
// FLOW: DTO/service input → CoreSanitizationService → normalized safe text.
import { Injectable } from '@nestjs/common';
/**
 * Intent: Defines the CoreSanitizationService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreSanitizationService {
  /**
 * Intent: Executes the text operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes text inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for text.
 * @returns {string | null} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
text(value: string | null | undefined): string | null {
    if (value == null) return null;
    return value.replace(/[<>]/g, '').replace(/javascript\s*:/gi, '').replace(/on[a-z]+\s*=/gi, '').trim();
  }
}
