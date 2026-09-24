// RESPONSIBILITY: Defines circuit-breaker failures as machine-readable infrastructure exceptions.
// FLOW: SuperadminCoreCircuitBreakerService -> SuperadminCircuitBreakerOpenException -> SuperadminCoreDomainExceptionFilter.
import { ServiceUnavailableException } from '@nestjs/common';

/**
 * Primary Intent: Represents the typed circuit-breaker exception for the infrastructure boundary.
 * Edge Cases: Consumers must preserve the declared machine-readable error contract.
 * Side-Effects: None; the exception communicates a controlled failure state.
 * AI-Note: Keep the exception type stable so tests and API error mapping remain deterministic.
 */
export class SuperadminCircuitBreakerOpenException extends ServiceUnavailableException {
  constructor() {
    super({ error: 'SERVICE_UNAVAILABLE', errorCode: 'EXTERNAL.CIRCUIT.OPEN', message: { key: 'core.ERRORS.CIRCUIT_OPEN' } });
  }
}
