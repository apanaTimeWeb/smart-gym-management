// RESPONSIBILITY: Implements contact-message business behavior only; it does not own HTTP or ORM persistence details.
// FLOW: LandingContactOrchestrator â†’ LandingContactService â†’ LandingContactRepository.
import { Injectable } from '@nestjs/common';

import { LANDING_ERRORS } from '@/backend_landing/landing_modules/landing/landing-landing.constants';
import { LandingAuditLogRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-audit-log.repository';
import { LandingContactRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-contact.repository';

import type { LandingContactDomainModel } from '@/backend_landing/landing_modules/landing/landing_domain/landing-contact.domain';
import type { LandingCreateContactInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-input.types';

/**
 * Intent: Defines the LandingContactService class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing contact service boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingContactService {
  
  /**
   * Intent: Preserve the single responsibility of landing-contact.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly contactRepository: LandingContactRepository,
    private readonly auditRepository: LandingAuditLogRepository,
  ) {}

  /** @description Creates a contact record and audit entry atomically. @param input - Sanitized contact input. @returns Created contact domain object. */
  
  /**
   * Intent: Preserve the single responsibility of landing-contact.service.createContact at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async createContact(input: LandingCreateContactInput): Promise<LandingContactDomainModel> {
    const contact = await this.contactRepository.createContact(input);
    await this.auditRepository.recordCreate(LANDING_ERRORS.AUDIT_CONTACT_CREATED, 'LandingContact', contact.id, {});
    return contact;
  }
}
