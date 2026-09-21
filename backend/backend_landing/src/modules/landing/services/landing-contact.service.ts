// RESPONSIBILITY: Implements contact-message business behavior only; it does not own HTTP or ORM persistence details.
// FLOW: LandingContactOrchestrator → LandingContactService → LandingContactRepository.
import { Injectable } from '@nestjs/common';

import { LandingContactRepository } from '@/modules/landing/repositories/landing-contact.repository';

import { LandingAuditLogRepository } from '@/modules/landing/repositories/landing-audit-log.repository';

import { LANDING_ERRORS } from '@/modules/landing/landing.constants';

import type { LandingContactDomainModel } from '@/modules/landing/domain/landing-contact.domain';

import type { LandingCreateContactInput } from '@/modules/landing/services/landing-contact-input.types';

import type { TransactionContext } from '@/core/database/transaction-context';


@Injectable()
export class LandingContactService {
  constructor(
    private readonly contactRepository: LandingContactRepository,
    private readonly auditRepository: LandingAuditLogRepository,
  ) {}

  /** @description Creates a contact record and audit entry atomically. @param input - Sanitized contact input. @param context - Active transaction context. @returns Created contact domain object. */
  async createContact(input: LandingCreateContactInput, context: TransactionContext): Promise<LandingContactDomainModel> {
    const contact = await this.contactRepository.createContact(input, context);
    await this.auditRepository.recordCreate(context, LANDING_ERRORS.AUDIT_CONTACT_CREATED, 'LandingContact', contact.id, {});
    return contact;
  }
}
