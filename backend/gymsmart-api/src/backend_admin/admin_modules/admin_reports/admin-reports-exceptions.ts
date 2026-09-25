// RESPONSIBILITY: Defines stable domain exceptions for the Admin reports feature.
// FLOW: Feature business error -> feature exception -> global canonical validation/error filter.
import { NotFoundException } from '@nestjs/common';

/**
 * @description Defines the AdminReportsNotFoundException boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsNotFoundException extends NotFoundException {
  /** @description Creates a deterministic feature-scoped not-found error. @param entity Feature entity name. @returns Exception instance. */
  constructor(entity: string) { super({ message: `${entity} record not found.`, errorCode: 'ADMIN.REPORTS.NOT_FOUND' }); }
}
