// RESPONSIBILITY: Defines stable domain exceptions for the Admin sales feature.
// FLOW: Feature business error -> feature exception -> global canonical validation/error filter.
import { NotFoundException } from '@nestjs/common';

/**
 * @description Defines the AdminSalesNotFoundException boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesNotFoundException extends NotFoundException {
  /** @description Creates a deterministic feature-scoped not-found error. @param entity Feature entity name. @returns Exception instance. */
  constructor(entity: string) { super({ message: `${entity} record not found.`, errorCode: 'ADMIN.SALES.NOT_FOUND' }); }
}
