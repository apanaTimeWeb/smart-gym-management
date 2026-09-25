// RESPONSIBILITY: Defines typed master-tenant registry failures; no HTTP or persistence behavior.
// FLOW: SuperadminCoreTenantRegistryRepository -> typed exception -> global domain exception filter.
import { NotFoundException } from '@nestjs/common';

/**
 * Primary Intent: Represents the typed not-found tenant exception for the infrastructure boundary.
 * Edge Cases: Consumers must preserve the declared machine-readable error contract.
 * Side-Effects: None; the exception communicates a controlled failure state.
 * AI-Note: Keep the exception type stable so tests and API error mapping remain deterministic.
 */
export class SuperadminTenantRegistryNotFoundException extends NotFoundException {
  constructor() { super({ error: 'NOT_FOUND', errorCode: 'TENANT.RESOURCE.NOT_FOUND', message: { key: 'core.ERRORS.NOT_FOUND' } }); }
}
