// RESPONSIBILITY: Defines typed master-tenant registry failures; no HTTP or persistence behavior.
// FLOW: SuperadminTenantRegistryRepository -> typed exception -> global domain exception filter.
import { NotFoundException } from '@nestjs/common';

/** Identifies an active master tenant that does not exist or is soft-deleted. */
export class SuperadminTenantRegistryNotFoundException extends NotFoundException {
  constructor() { super({ error: 'NOT_FOUND', errorCode: 'TENANT.RESOURCE.NOT_FOUND', message: { key: 'core.ERRORS.NOT_FOUND' } }); }
}
